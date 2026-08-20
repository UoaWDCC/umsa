# 5. API reference

Every endpoint that exists today. This is a lookup table — for the *why*, read
[03-backend-reference.md](03-backend-reference.md).

Base URL is `/api` in both environments (see [02-architecture.md](02-architecture.md)). Direct
access in dev is `http://localhost:5050`.

All routes are rate limited to 300 requests / 15 min / IP.

## Error shape

Every error, from every endpoint:

```json
{ "error": { "code": "VALIDATION_ERROR", "message": "Heading is required" } }
```

| Code | Status |
|---|---|
| `VALIDATION_ERROR` | 400 — zod rejected the body |
| `BAD_REQUEST` | 400 — malformed input zod didn't cover |
| `UNAUTHORIZED` | 401 — missing, expired or orphaned session |
| `NOT_FOUND` | 404 — no such document, or no such route |
| `INTERNAL_ERROR` | 500 — something threw |

## Public

### `GET /api/health`
No auth. No database access, so it stays 200 even when Mongo is down.

```json
{ "status": "ok", "service": "umsa-api" }
```

### `GET /api/content/home`
No auth. Returns the homepage welcome block. **Falls back to `HOME_DEFAULTS`** when no document
has ever been saved, so the site works against an empty database and needs no seeding.

```json
{ "heading": "Welcome to Project UMSA!", "subtitle": "to get started, …" }
```

## Admin — auth

Mounted **above** `requireAdmin`, because you have to reach login while logged out.

### `POST /api/admin/auth/login`
Body validated by `loginSchema`:

```json
{ "email": "umsa@projects.wdcc.co.nz", "password": "umsa" }
```

`200 { "email": "…" }` and sets the `umsa_admin` cookie. The token is **never** in the response
body.

`401 UNAUTHORIZED "Incorrect email or password"` — identical for unknown email and wrong
password, on purpose.

### `POST /api/admin/auth/logout`
No auth required, no body. Clears the cookie. `200 { "ok": true }`.

### `GET /api/admin/auth/me`
`requireAdmin` applied per-route. `200 { "email": "…" }` or `401`.

The client treats a 401 here as the *logged-out state*, not an error — see
[04-auth.md](04-auth.md).

## Admin — content

Everything below is mounted **under** `app.use("/api/admin", requireAdmin)` and returns `401`
without a valid session.

### `PUT /api/admin/content/home`
Body validated by `homeContentSchema` — `heading` 1–200 chars, `subtitle` 1–500 chars, both
trimmed, unknown keys stripped.

```json
{ "heading": "Selamat datang", "subtitle": "UMSA 2026" }
```

`200` with the saved values. Uses `findOneAndUpdate({}, …, { upsert: true })`, so it creates the
singleton on first save.

## Behaviours that surprise people

- **`/api/admin/*` returns 401, not 404, for routes that don't exist** when you're logged out.
  The guard runs before routing can miss. Log in and you'll get the 404 you expected.
- **`GET /api/content/home` never 404s.** Empty database returns defaults.
- **Sending no body to a validated endpoint gives 400, not 500.** Express 5 leaves `req.body`
  undefined; `validate` handles it with `req.body ?? {}` and reports the missing fields.
- **The health check lies about the database.** It doesn't touch Mongo. A green
  `/api/health` means "Node is up", nothing more.

## Endpoints that do not exist yet

Anything for events, gallery, team members, theme, logos or uploads. Each is designed in
[blueprints/](blueprints/) — including its exact URL — so that when you build one, the URL is
already agreed and the frontend can be written against it in parallel.
