# 3. Backend reference

A file-by-file tour of `server/`. Read [02-architecture.md](02-architecture.md) first for the
mental model; this is the detail.

```
server/
├── server.ts                 process entry point
├── db/connection.ts          mongoose.connect
├── scripts/seed-admin.ts     creates/rotates the admin account
├── src/
│   ├── app.ts                Express app assembly — middleware order, route mounting
│   ├── middleware/
│   │   ├── requireAdmin.ts   the auth guard
│   │   ├── validate.ts       zod body validation factory
│   │   ├── rateLimit.ts      300 req / 15 min / IP
│   │   ├── notFound.ts       404 fallback
│   │   └── errorHandler.ts   500 fallback
│   ├── models/               Mongoose schemas
│   ├── routes/               request handlers (inline, no controllers)
│   ├── schemas/              zod request-body schemas
│   └── utils/
│       ├── apiError.ts       sendError() — the one error shape
│       └── adminSession.ts   cookie name, TTL, secret, options
└── dist/                     STALE BUILD OUTPUT — ignore it entirely
```

There is no `controllers/`, no `services/`, no `repositories/`. Route handlers call Mongoose
directly. For a codebase this size that's the right call — a service layer that only forwards to
a model is indirection with no payoff. If a handler ever grows past ~40 lines or two routes need
the same logic, *then* extract.

## Boot sequence

`server/server.ts` is the entry point. (`package.json` says `"main": "index.js"` — that's a lie,
nothing reads it.)

```ts
import "dotenv/config";          // MUST be the first import — see below

import connectDB from "./db/connection.js";
import app from "./src/app.js";

if (process.env.NODE_ENV === "production" && !process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET must be set in production");
}

const PORT = process.env.PORT || 5050;

connectDB();                     // note: NOT awaited

app.listen(PORT, () => { console.log(`server is running on port ${PORT}`); });
```

Three things worth knowing:

- **`import "dotenv/config"` must stay first.** Static imports are hoisted and evaluated before
  any other code in the file, so if it came second, every module imported above it would already
  have read an empty `process.env`. Same rule in `scripts/seed-admin.ts`.
- **`connectDB()` is not awaited.** The server starts listening immediately and Mongoose buffers
  queries until the connection is up. In practice you'll never notice; it does mean a request
  arriving in the first few hundred milliseconds waits rather than failing.
- **A failed connection calls `process.exit(1)`** (`db/connection.ts`). There are no reconnect
  handlers and no pool tuning — Mongoose's defaults are fine at our traffic.

Note the `.js` extensions on relative imports. That is required, not a typo: the server is
native ESM (`"type": "module"`) with `moduleResolution: "NodeNext"`, so TypeScript wants the
*output* filename. Omit it and the build compiles but the process crashes at runtime.

## `src/app.ts`

The whole file is 47 lines and worth reading in full. The part that matters:

```ts
app.use("/api/content", contentRoutes);

app.use("/api/admin/auth", adminAuthRoutes);   // login/logout/me — above the guard
// every /api/admin/* route below requires a logged-in admin account
app.use("/api/admin", requireAdmin);
app.use("/api/admin/content", adminContentRoutes);
```

**Mount your admin router below the `requireAdmin` line and it's protected automatically.** Only
the auth router sits above it, because you have to be able to reach `/login` while logged out.

A consequence to expect: `GET /api/admin/anything-that-doesnt-exist` returns **401, not 404**,
when you're logged out. The guard runs before routing gets a chance to miss.

## Models — `src/models/`

Two of them. Both use `{ timestamps: true }` (adds `createdAt` / `updatedAt`). Neither has hooks,
virtuals, instance methods, refs, enums or custom indexes — deliberately plain.

| Model | Fields | Shape |
|---|---|---|
| `AdminUser.ts` | `email` (required, **unique**, lowercased, trimmed), `passwordHash` (required) | list, but effectively one row |
| `HomeContent.ts` | `heading` (required), `subtitle` (required) | **singleton** |

`AdminUser`'s `unique: true` is the only index in the codebase (Mongoose creates it for you).

One caveat to keep in mind:

- **Nothing enforces singleton-ness at the database level.** `HomeContent` is a singleton only
  because every query is `findOne()` with no filter. Two documents would not error, the second
  would just be invisible.

## Routes — `src/routes/`

Handlers are inline async arrows. The house convention, visible in every file:

```ts
router.get("/", async (_req, res) => {
  try {
    const items = await Model.find();
    res.json(items);
  } catch {
    sendError(res, 500, "INTERNAL_ERROR", "Unable to fetch items");
  }
});
```

`try { … } catch { sendError(…) }` with a **domain-specific message**. The catch takes no
binding because the error object is never inspected — it's logged by the global handler if it
gets that far. Follow this pattern; a reviewer will ask why if you don't.

For anything taking an `:id`, guard the ObjectId before hitting the database:

```ts
if (!mongoose.isValidObjectId(req.params.id)) {
  return sendError(res, 400, "BAD_REQUEST", "Invalid id");
}
```

Without it, a malformed id throws a `CastError` and surfaces as a 500 — which is a lie, since
the client sent a bad request.

Full endpoint list is in [05-api-reference.md](05-api-reference.md).

## Validation — `src/middleware/validate.ts` and `src/schemas/`

One factory, used by every write endpoint:

```ts
export const validate =
  (schema: ZodType): RequestHandler =>
    (req, res, next) => {
      // Express 5 leaves req.body undefined when no JSON body was sent
      const result = schema.safeParse(req.body ?? {});

      if (!result.success) {
        const message = result.error.issues.map((issue) => issue.message).join(", ");
        return sendError(res, 400, "VALIDATION_ERROR", message);
      }

      req.body = result.data;
      next();
    };
```

The line that does the quiet work is `req.body = result.data`. Your handler receives the
**parsed** body — strings trimmed, unknown keys stripped. That last part is free
mass-assignment protection: a client that POSTs `{ heading, subtitle, isAdmin: true }` can't
smuggle `isAdmin` into a `findOneAndUpdate`, because zod dropped it before your code ran.

Schemas live in `src/schemas/` and describe a valid *request body*, not a database document:

```ts
export const homeContentSchema = z.object({
  heading: z.string().trim().min(1, "Heading is required")
    .max(200, "Heading is too long (200 characters max)"),
  subtitle: z.string().trim().min(1, "Subtitle is required")
    .max(500, "Subtitle is too long (500 characters max)"),
});

export type HomeContentInput = z.infer<typeof homeContentSchema>;
```

Every message is user-facing — it goes straight into the API response and then into the form.
Write them as you'd want to read them.

Export the `z.infer` type alongside the schema and use it in the handler
(`req.body as HomeContentInput`). One definition, both the runtime check and the type.

**Not validated today**: route params and query strings anywhere. If you add a query parameter,
validate it.

## Errors — `src/utils/apiError.ts`

Every error response in the app has one shape, and the client's `apiErrorMessage()` depends on
it:

```json
{ "error": { "code": "VALIDATION_ERROR", "message": "Heading is required" } }
```

```ts
export type ApiErrorCode =
  | "BAD_REQUEST" | "INTERNAL_ERROR" | "NOT_FOUND" | "UNAUTHORIZED" | "VALIDATION_ERROR";
```

| Code | Status | When |
|---|---|---|
| `VALIDATION_ERROR` | 400 | zod rejected the body. |
| `BAD_REQUEST` | 400 | Malformed input zod didn't cover — a bad ObjectId, say. |
| `UNAUTHORIZED` | 401 | No cookie, dead token, or deleted account. |
| `NOT_FOUND` | 404 | No such document, or no such route. |
| `INTERNAL_ERROR` | 500 | Something threw. |

If you need a code that isn't in the union, add it there — don't invent a new envelope.

## The two fallbacks

`notFound` returns 404 for anything unmatched. `errorHandler` is the terminal handler: it logs
(unless `NODE_ENV === "test"`) and always returns a **generic** 500, never the real message.
That's deliberate — stack traces and Mongo errors leak schema details.

Express 5 forwards rejected promises to `errorHandler` automatically, so an unhandled async
throw becomes a 500 rather than a hung request. Since every handler already has its own
try/catch, `errorHandler` is a backstop rather than the main path. The one place it actually
fires today is `requireAdmin`'s `findById`, which isn't wrapped.

## Rate limiting — `src/middleware/rateLimit.ts`

300 requests per 15 minutes per IP, applied to all of `/api` including login. This is a
brute-force backstop, not a tuned policy. `app.set("trust proxy", 1)` is what makes "per IP"
true behind nginx — without it, every visitor in production shares a single bucket and one
enthusiastic user locks out the club.

A dedicated, much stricter limiter on the login route is listed in
[blueprints/06-admin-accounts.md](blueprints/06-admin-accounts.md).
