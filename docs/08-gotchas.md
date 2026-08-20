# 8. Gotchas and conventions

## Read before you're bitten

- **dotenv + ES modules.** Static imports are hoisted, so they're evaluated before any other code
  in the importing file runs. That's why `server/server.ts` and `server/scripts/seed-admin.ts`
  load env with `import "dotenv/config"` **as their first import** — a plain `dotenv.config()`
  call would run *after* every imported module had already been evaluated. Keep that import
  first, and prefer reading `process.env` inside functions (see `server/src/utils/adminSession.ts`)
  so modules stay import-order-proof.

- **`.js` extensions on server imports.** `import AdminUser from "../models/AdminUser.js"` — in a
  `.ts` file. This is correct and required: native ESM with `moduleResolution: "NodeNext"` wants
  the *output* filename. Omit it and the build passes but the process crashes at runtime.

- **react-query v5 names.** It's `isPending` (not v4's `isLoading`) and `gcTime` (not `cacheTime`).
  Old tutorials and LLM answers will happily give you v4 code that doesn't compile.

- **zod v4 idioms.** `z.email()` is top-level, not `z.string().email()`. Error lists live on
  `error.issues`.

- **StrictMode double-mount.** In dev, React mounts components twice. react-query de-duplicates
  the fetches — if you see one request in the Network tab, that's correct, not a bug you fixed.

- **Rate limiting.** Everything under `/api`, including login, shares the 300-requests-per-15-min-
  per-IP limiter (`server/src/middleware/rateLimit.ts`). `app.set("trust proxy", 1)` is what makes
  "per IP" true behind nginx in production (without it every visitor shares one bucket).

- **`server/dist/` is stale build output. Never read it, never import from it.** It's gitignored
  and rebuilt by `pnpm build`. It matters because it contains a *much larger* feature set —
  Cloudinary uploads, developer CRUD, admin settings, password reset tokens — that has **no
  TypeScript source in this branch**. Someone browsing `dist/` will confidently document features
  that do not exist. The blueprints point at it deliberately in a couple of places as a *reference
  for how it was done before*; that's the only legitimate use.

- **Express 5 leaves `req.body` undefined** when no JSON body was sent. `validate` handles it with
  `req.body ?? {}`. If you write a handler that reads `req.body` without `validate`, guard it.

- **`/api/admin/*` returns 401, not 404, for routes that don't exist** when you're logged out. The
  guard runs before routing can miss.


## Conventions

**Pre-commit** — husky runs `pnpm lint` over the whole repo on every commit. It is not
`lint-staged`, so someone else's lint error will block your commit; fix it or tell them.

**Where new code goes** — server route handlers stay inline in the route file; there is no
controller layer and adding one for a single feature would be inconsistent. Shared logic goes in
`server/src/utils/`.

## Production upgrade path

Roughly in order of value. None of these block the CMS work.

1. **Stricter login rate limit** — a second limiter of ~10/15min on `/api/admin/auth/login`.
   Specced in [blueprints/06-admin-accounts.md](blueprints/06-admin-accounts.md).
2. **Shared schemas package** — a `packages/shared` workspace so client and server import the
   same zod schemas instead of keeping hand-copied duplicates in sync.
3. **Secrets management** — set `JWT_SECRET` (long and random) and the admin password via
   `fly secrets set`, never in the repo. The server refuses to boot in production without
   `JWT_SECRET` (`server/server.ts`), so a forgotten secret fails loudly rather than quietly
   signing tokens with the public default.
4. **A 404 route on the client.** `client/src/main.tsx` has no `errorElement` and no catch-all.

## Deployment, briefly

Push to `main` → GitHub Actions (`.github/workflows/fly-deploy.yml`) → `flyctl deploy --remote-only`
→ Fly app `umsa-prod` in Sydney.

One container runs both halves (`Dockerfile`): nginx serves `client/dist` and proxies `/api/` to
`node dist/server.js` on port 5050 (`nginx.conf`). `NODE_ENV=production` is set in the image,
which turns on the `secure` cookie flag and the `JWT_SECRET` boot check.

The machine has `min_machines_running = 0` and auto-stops, so the first request after a quiet
period is slow. That's expected, not a bug — and it's a reason not to store anything on the
container's filesystem, since it doesn't survive.
