# 2. Architecture

## The shape of it

```
 PUBLIC                                                   ADMIN
 ┌──────────────┐                                        ┌───────────────────┐
 │ Homepage     │  GET /api/content/home                 │/admin/login       │
 │ (App.tsx)    │◄──────────────┐                        │POST …/auth/login ─┼─► sets umsa_admin
 └──────────────┘               │                        └───────────────────┘    cookie (httpOnly)
                                │                        ┌───────────────────┐
                       ┌────────┴────────┐   PUT (cookie)│/admin/home-content│
                       │ Express + zod   │◄──────────────┤HomeContentEditor  │
                       │ requireAdmin    │               └───────────────────┘
                       └────────┬────────┘
                                │ Mongoose
                           ┌────┴────┐
                           │ MongoDB │  HomeContent (singleton), AdminUser
                           └─────────┘
```

Two ideas hold the whole thing together, one per side:

**Server: auth is applied once, structurally.** `app.use("/api/admin", requireAdmin)` sits
between the auth router and every other admin router. Mount a router below that line and it is
protected — there is no per-route guard to forget.

**Client: TanStack Query's cache is the app's state.** The homepage and the editor both read the
`["content", "home"]` cache entry. When the editor saves, it invalidates that entry and every
reader updates. No Redux, no context, no prop drilling.

## Repo layout

A pnpm workspace with two packages (`pnpm-workspace.yaml`).

```
umsa/
├── client/          Vite + React 19 + TypeScript + Tailwind 4
├── server/          Express 5 + Mongoose 9 + TypeScript (ESM)
├── docs/            you are here
├── Dockerfile       one image: nginx + node, built by Fly
├── nginx.conf       /api/ → localhost:5050, everything else → the SPA
├── fly.toml         app umsa-prod, region syd
└── .github/workflows/fly-deploy.yml   deploys on push to main
```

## How `/api` resolves

The client's axios instance uses a **relative** base URL, `"/api"` — never an absolute host,
never an env var. Something else forwards it in each environment:

| Environment | Browser hits | Forwarded by | To |
|---|---|---|---|
| Dev | `localhost:5173/api/...` | Vite proxy (`client/vite.config.ts`) | `localhost:5050` |
| Prod | `umsa-prod.fly.dev/api/...` | nginx (`nginx.conf`) | `localhost:5050` in the same container |

This is why there is no CORS handling in the browser path and no absolute-URL config to keep in
sync: **the API is same-origin from the browser's point of view in both environments**. It also
means the session cookie is first-party, which is what makes `sameSite: "lax"` viable.

(The server still configures `cors()` with `credentials: true` for anything calling it directly —
curl, Postman, a future mobile app.)

## Request lifecycle

Follow a single admin save from click to database. Every step is a real file you can open.

1. **Form submit.** `client/src/pages/admin/HomeContentEditor.tsx` — react-hook-form validates
   against the zod schema in `client/src/schemas/content.ts`. Invalid input never leaves the
   browser.
2. **Mutation.** `useSaveHomeContent()` in `client/src/hooks/useHomeContent.ts` calls
   `api.put("/admin/content/home", values)`.
3. **Transport.** The axios instance (`client/src/lib/api.ts`) has `withCredentials: true`, so
   the browser attaches the `umsa_admin` cookie. The JavaScript never sees the token — it's
   `httpOnly`.
4. **Proxy.** Vite (dev) or nginx (prod) forwards to Express on 5050.
5. **Middleware stack**, in the order declared in `server/src/app.ts`:

   | Order | Middleware | Why it's there |
   |---|---|---|
   | 1 | `app.set("trust proxy", 1)` | One hop (nginx / Fly edge). Without it, `req.ip` is the proxy's IP and every visitor shares one rate-limit bucket. |
   | 2 | `helmet()` | Security response headers. |
   | 3 | `cors({ origin, credentials: true })` | `credentials: true` is required for cookie auth. |
   | 4 | `express.json({ limit })` | The **only** body parser. No urlencoded, no multipart — the API cannot accept a file upload today. |
   | 5 | `cookieParser()` | Populates `req.cookies`, which `requireAdmin` reads. Must run before any guard. |
   | 6 | `apiRateLimit` on `/api` | 300 requests / 15 min / IP. A brute-force backstop. |
   | 7 | routers | Public first, then `/api/admin/auth`, then the guard, then protected routers. |
   | 8 | `notFound` | Anything unmatched → 404. |
   | 9 | `errorHandler` | Anything thrown → 500. |

6. **Guard.** `requireAdmin` verifies the JWT and re-checks the user still exists in the
   database. On success it writes `res.locals.admin`. See [04-auth.md](04-auth.md).
7. **Validation.** `validate(homeContentSchema)` parses the body, replaces `req.body` with the
   parsed result, or 400s.
8. **Handler.** `server/src/routes/admin/content.ts` calls Mongoose directly — there is no
   service or controller layer.
9. **Response.** Success is a plain JSON body. Every error is the same envelope:
   `{ error: { code, message } }`.
10. **Cache invalidation.** Back on the client, `onSuccess` invalidates `["content", "home"]`,
    so the public homepage refetches and re-renders with the new text.

## The five layers of a feature

Every CMS feature is the same five files. This table *is* the recipe — [07-adding-a-feature.md](07-adding-a-feature.md)
just expands it.

| Layer | Reference file | What it does |
|---|---|---|
| Model | `server/src/models/HomeContent.ts` | Mongoose schema — the shape in the database. |
| Schema | `server/src/schemas/content.ts` | zod schema — the shape of a *valid request body*: required, trimmed, max length. |
| Validation | `server/src/middleware/validate.ts` | Reusable. `validate(schema)` rejects bad bodies with a 400 before your handler runs, and replaces `req.body` with the parsed result — trimmed strings, unknown keys stripped, which is free mass-assignment protection. |
| Public route | `server/src/routes/content.ts` | The read endpoint. Falls back to `HOME_DEFAULTS` when nothing was ever saved, so the site works against an empty database. |
| Admin route | `server/src/routes/admin/content.ts` | The write endpoint, mounted below the guard. |

**Singleton vs list.** `HomeContent` is a *singleton* — there is only ever one document, queried
with `findOne()` (no filter) and written with `findOneAndUpdate({}, …, { upsert: true })`. Theme
settings and site branding are singletons too.

Events, team members and gallery images are *lists*: many documents, each with its own `_id`,
using `find()`, `findById()`, `new Model().save()`, `findByIdAndUpdate()`, `findByIdAndDelete()` —
see the worked example in [07-adding-a-feature.md](07-adding-a-feature.md).

Picking the wrong one is the most common early mistake. Ask: *would an admin ever want two of
these at once?* If yes, it's a list.
