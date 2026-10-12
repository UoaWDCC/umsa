# Blueprint 06 — Admin accounts and hardening

The only blueprint where most of the work is already done. Login, sessions, the guard and logout
all work — read [../04-auth.md](../04-auth.md) before this page, because this one only describes
the gaps.

Independent of every other blueprint. Do it whenever.

## What works today

| Capability | State |
|---|---|
| Log in with email and password | Works. bcrypt cost 12, JWT in an httpOnly cookie. |
| Stay logged in for 7 days | Works. |
| Log out | Works. |
| Every `/api/admin/*` route protected | Works, structurally — `app.use("/api/admin", requireAdmin)`. |
| Revoking access instantly | Works. Delete the `AdminUser` document; `requireAdmin` re-checks on every request. |
| Creating the admin account | Works, but only via `pnpm --filter server seed:admin` on a developer's machine. |

## What the admin should be able to do

- Add a second admin without a developer running a script.
- See who has admin access.
- Remove an admin — but never the last one.
- Change their own password from inside the panel.
- Reset a forgotten password without asking a developer.

## Decisions already made for you

### Deliberately out of scope: roles and permissions

Every admin can do everything. A university club has a handful of trusted committee members, and
a role system would add a `role` field, permission checks on every route, a UI for managing them,
and a class of bug where someone can't do their job.

If that ever changes, the hook already exists: `requireAdmin` writes `res.locals.admin`, so a
`requireRole("owner")` middleware would layer on top without touching any handler.

### Endpoints

| Method | Path | Auth | Notes |
|---|---|---|---|
| `GET` | `/api/admin/settings/admins` | admin | List admins. **Project fields explicitly** — never return the document verbatim. |
| `POST` | `/api/admin/settings/admins` | admin | Create with email + initial password. `409` on duplicate email. |
| `DELETE` | `/api/admin/settings/admins/:id` | admin | **Refuse if it's the last admin.** |
| `PUT` | `/api/admin/auth/password` | admin | Change own password. Requires the current password. |
| `POST` | `/api/admin/auth/forgot-password` | **public** | Always `200`, regardless of whether the email exists. |
| `POST` | `/api/admin/auth/reset-password` | **public** | Token + new password. |

The last two are public and must therefore be mounted **above** the `requireAdmin` line, in
`server/src/routes/admin/auth.ts` alongside login. A forgotten password is by definition a
logged-out state.

> Note the path collision with [05-logos-and-branding.md](05-logos-and-branding.md), which also
> wants `/api/admin/settings`. Agree with that blueprint's owner before either of you starts —
> either mount this at `/api/admin/settings/admins` specifically, or rename theirs to
> `/api/admin/site-settings`.

### Password reset needs a token model

```ts
// server/src/models/PasswordResetToken.ts
{
  tokenHash: { type: String, required: true },   // hash of the token, never the token
  adminUser: { type: Schema.Types.ObjectId, ref: "AdminUser", required: true },
  expiresAt: { type: Date, required: true },
}
// { timestamps: true }
// Index: { expiresAt: 1 } with expireAfterSeconds: 0  — Mongo TTL, deletes expired docs for you
```

Two things worth understanding:

- **Store a hash of the token, not the token.** Same reasoning as passwords: a leaked database
  shouldn't hand out account access. The plaintext token exists only in the emailed link.
- **The TTL index is the cleanup.** `expireAfterSeconds: 0` on `expiresAt` makes MongoDB delete
  the document once that time passes. No cron job. This would be the codebase's first non-unique
  index — see `server/src/models/AdminUser.ts` for how `unique` is declared, and add
  `PasswordResetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })`.

Reset links need email delivery. **Resend** is the cheap, low-friction choice
(`pnpm --filter server add resend`, one `RESEND_API_KEY`, a generous free tier). In dev, fall back
to logging the link to the console rather than requiring every developer to hold an API key.

There's prior art for this in `server/dist/src/lib/email.js` and
`server/dist/src/models/PasswordResetToken.js` — compiled leftovers with no TypeScript source.
Read for reference, never import. See [../08-gotchas.md](../08-gotchas.md).

## Server work

**Part A — admin management** (do this first; it's most of the value)

1. **Schema** — copy `server/src/schemas/auth.ts` → extend with `createAdminSchema` (email +
   password with `min(8)`) and `changePasswordSchema` (`currentPassword`, `newPassword`).
2. **Route** — copy `server/src/routes/admin/content.ts` →
   `server/src/routes/admin/adminUsers.ts`. Three handlers. The delete guard:

   ```ts
   if ((await AdminUser.countDocuments()) <= 1) {
     return sendError(res, 400, "BAD_REQUEST", "Cannot delete the last admin account");
   }
   ```

   Without it, one click locks everybody out permanently and only a developer with database
   access can recover it.

   Reuse the hashing from `server/scripts/seed-admin.ts` — `bcrypt.hash(password, 12)`. Same cost
   factor, no exceptions.

   The list handler must project: `AdminUser.find().select("email createdAt")`.

3. **Change password** — add `PUT /password` to `server/src/routes/admin/auth.ts`, behind an
   inline `requireAdmin` like `GET /me`. Verify the current password before accepting the new
   one, otherwise a hijacked session can lock the real owner out.

**Part B — hardening** (small, high value, do it in the same PR)

4. **A dedicated login limiter.** Copy `server/src/middleware/rateLimit.ts` and add:

   ```ts
   export const loginRateLimit = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });
   ```

   Apply it to the login route only. The global 300/15min limiter allows 300 password guesses a
   quarter-hour, which is a lot.

5. **Timing-safe login.** When the email doesn't exist, `server/src/routes/admin/auth.ts` returns
   immediately; when it exists but the password is wrong, it waits for bcrypt. That timing
   difference reveals which emails are registered, despite the identical message. Fix by always
   running a compare:

   ```ts
   const DUMMY_HASH = "$2b$12$" + "…";   // hash of a random string, generated once
   const ok = user
     ? await bcrypt.compare(password, user.passwordHash)
     : (await bcrypt.compare(password, DUMMY_HASH), false);
   ```

**Part C — password reset** (largest; split into its own PR)

6. Model, schemas, the two public routes, and the email helper as described above.

## Client work

7. **Hooks** — extend `client/src/hooks/useAuth.ts` with `useAdmins()`, `useCreateAdmin()`,
   `useDeleteAdmin()`, `useChangePassword()`. Key `["auth", "admins"]`.
8. **Admin page** — copy `HomeContentEditor.tsx` → `client/src/pages/admin/AdminUsersEditor.tsx`.
   A list with delete buttons, an add form, and a change-your-own-password form. Disable the
   delete button when only one admin remains, *and* keep the server-side guard — client-side
   checks are UX, server-side checks are security.
9. **Menu + route** — `{ to: "/admin/admins", label: "Admin accounts" }` and the matching route.
10. **Reset pages** — `/admin/forgot-password` and `/admin/reset-password`, both **outside**
    `AdminLayout` in `client/src/main.tsx`, next to `/admin/login`. Inside the layout they'd be
    behind the guard, which is exactly backwards.

## Gotchas for this feature

- **Deleting yourself.** Nothing stops an admin deleting their own account. `requireAdmin`
  re-checks the user on every request, so their very next action 401s and the session dies
  mid-click. Either block self-deletion or handle the redirect gracefully — blocking is simpler.
- **The last-admin guard is a race in theory.** Two simultaneous deletes could both see a count
  of 2. With this many users it will never happen; don't build a transaction for it, just know
  it's there.
- **`POST /forgot-password` must always return `200`**, whether or not the email exists.
  Otherwise it becomes an account-enumeration oracle and undoes the work in step 5.
- **Don't email the token hash.** The link carries the plaintext token; the database stores its
  hash. Getting these backwards makes reset links that can never validate.
- **The seed script still works** and is still the bootstrap path for a fresh database. Don't
  remove it. It's also the recovery route if someone does get locked out.
- **Never log a password or a token**, including in a `console.log` you mean to delete.
- **Resend's free tier only sends to verified addresses** until a domain is verified. Fine for a
  committee; check it before assuming reset works for anyone.

## Definition of done

**Part A + B:**
- [ ] An admin can add a second admin who can then log in.
- [ ] The admin list never includes `passwordHash` — check the raw network response.
- [ ] Deleting the last admin returns `400` and does not delete.
- [ ] Changing your own password requires the current one; the new password works on next login.
- [ ] 11 rapid failed logins are rate limited while normal browsing is unaffected.
- [ ] An unknown email and a wrong password take a comparable amount of time.
- [ ] Endpoints added to [../05-api-reference.md](../05-api-reference.md), and the "Known gaps"
      section of [../04-auth.md](../04-auth.md) updated.

**Part C:**
- [ ] A reset link arrives, works once, and is rejected after expiry.
- [ ] `POST /forgot-password` returns `200` for an unknown email.
- [ ] `RESEND_API_KEY` documented in `server/.env.example`, with the dev console fallback working
      when it's unset.
- [ ] `pnpm lint` passes.

## Stretch goals

- Invite-by-email instead of setting an initial password by hand.
- An audit log of admin actions.
- Two-factor authentication (TOTP).
- Roles — but read the note at the top first.
- Session listing and "log out everywhere". Needs a token version field on `AdminUser`.
