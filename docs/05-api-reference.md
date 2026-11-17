# 5. API reference

Every endpoint that exists today. This is a lookup table — for the *why*, read
[03-backend-reference.md](03-backend-reference.md).

Base URL is `/api` in both environments (see [02-architecture.md](02-architecture.md)). Direct
access in dev is `http://localhost:5050`.

All routes are rate limited to 300 requests / 15 min / IP. Login has a stricter limit on top —
see [`POST /api/admin/auth/login`](#post-apiadminauthlogin).

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
| `CONFLICT` | 409 — the request clashes with existing data |
| `TOO_MANY_REQUESTS` | 429 — rate limit hit |
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
password, on purpose. The response *time* is identical too: an unknown email is still checked
against a dummy bcrypt hash, so timing can't reveal which emails are admins.

`429 TOO_MANY_REQUESTS` after 10 failed attempts in 15 min from one IP. Successful logins don't
count towards the limit.

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

## Admin — accounts

Also under `requireAdmin`.

### `GET /api/admin/admin-list`
Returns every admin. `passwordHash` is never included — the model hides it with
`select: false`.

```json
[{ "_id": "…", "email": "umsa@projects.wdcc.co.nz", "createdAt": "…", "updatedAt": "…" }]
```

### `DELETE /api/admin/admin-list/delete`
Deletes an admin by email. Any admin can delete any admin, including themselves.

```json
{ "email": "someone@example.com" }
```

`200 { "message": "Successfully deleted …" }`.

- `400 BAD_REQUEST` — no email in the body, or it's the last remaining admin (nothing is
  deleted).
- `404 NOT_FOUND` — no admin with that email.

### `PUT /api/admin/change/password`
Changes the **logged-in** admin's password. Who that is comes from the session cookie, never
from the body.

```json
{ "currentPassword": "…", "newPassword": "…" }
```

`200 { "message": "Successfully changed Password!" }`.

- `401 UNAUTHORIZED "Incorrect current password…"` — `currentPassword` didn't match.
- `401 UNAUTHORIZED "Account no longer exists."` — the session's account was deleted.

The password format rule (10+ chars, a letter, a digit, a special character) is only checked
on the client.

### `POST /api/admin/email/send`
Sends an invite email via Resend. The email links to `/create-admin-account` with a one-time
token.

```json
{ "to": "new-admin@example.com", "subject": "You've been invited to UMSA" }
```

`200 { "data": … }` — Resend's response, passed straight through.

`500 INTERNAL_ERROR "Unable to send invite email"` — Resend failed.

The link's host is hard-coded to `http://localhost:5174`.

## Invites

Public — the person accepting an invite isn't an admin yet.

### `GET /api/verify-invite/token?token=…`
Checks that an invite token exists, hasn't expired, and hasn't been used. The client calls it
before showing the sign-up page.

`200 { "validToken": true }` or `401 UNAUTHORIZED "Token doesn't Exist or is Expired"`.

### `POST /api/invite/accept`
Creates the admin account and revokes the token, so the link only works once.

```json
{ "rawToken": "…", "password": "…" }
```

`201 { "message": "Admin user registered successfully" }`.

- `400 BAD_REQUEST "Missing Fields"` — `rawToken` or `password` missing.
- `409 CONFLICT` — that email is already an admin.
- `401 UNAUTHORIZED "Token Expired"` — returned for *any* token failure (missing, expired or
  revoked).

As with change-password, the password format rule is only checked on the client.

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
