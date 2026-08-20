# 4. Auth

One admin account, a bcrypt hash in the database, a JWT in an httpOnly cookie. Both halves —
server and client — are here, because you can't understand either alone.

## The lifecycle

1. **`POST /api/admin/auth/login`** (`server/src/routes/admin/auth.ts`) looks up the `AdminUser`
   by lowercased email and compares the password with **bcrypt**. Only the *hash* is stored — if
   the database leaks, the password doesn't. Hashing happens in `server/scripts/seed-admin.ts`
   at cost factor 12.
2. On success the server signs a **JWT** — payload `{ sub: userId, email }`, expiry 7 days — and
   puts it in a cookie. The browser sends that cookie automatically on every subsequent request.
   **The client never touches the token.**
3. **`requireAdmin`** (`server/src/middleware/requireAdmin.ts`) verifies the JWT on every admin
   request *and re-checks the user still exists in the database*.
4. **`POST /api/admin/auth/logout`** clears the cookie. It works when you're already logged out
   too, which keeps the client simple.

## The guard

Read this one in full — it's the security boundary of the entire CMS.

```ts
export const requireAdmin: RequestHandler = async (req, res, next) => {
  const token = req.cookies?.[ADMIN_COOKIE];
  if (!token) {
    return sendError(res, 401, "UNAUTHORIZED", "Not logged in");
  }

  let payload: { sub: string; email: string };
  try {
    payload = jwt.verify(token, jwtSecret()) as { sub: string; email: string };
  } catch {
    return sendError(res, 401, "UNAUTHORIZED", "Session expired - please log in again");
  }

  const user = await AdminUser.findById(payload.sub);
  if (!user) {
    return sendError(res, 401, "UNAUTHORIZED", "Account no longer exists");
  }

  res.locals.admin = { id: user.id, email: user.email };
  next();
};
```

Why the database lookup, when the JWT already proves the token is genuine? Because a JWT is
valid until it expires and **cannot be revoked**. Re-checking means deleting an `AdminUser`
document instantly kills that person's sessions. One extra indexed lookup per admin request, on
an admin panel used by a handful of people — worth it.

Downstream handlers read the identity from **`res.locals.admin`**, not `req.user`. There are no
roles: every admin can do everything.

## Where the guard is applied

Once, in `server/src/app.ts`:

```ts
app.use("/api/admin/auth", adminAuthRoutes);   // above the guard — login must work logged-out
app.use("/api/admin", requireAdmin);
app.use("/api/admin/content", adminContentRoutes);
```

New admin routers go below that line. You cannot forget the guard, because you'd have to
actively mount above it to escape it.

`GET /me` is the exception: its router sits above the line, so it applies `requireAdmin` inline
per-route.

## The cookie

Configured in `server/src/utils/adminSession.ts`.

| Setting | Value | Why |
|---|---|---|
| name | `umsa_admin` | Easy to spot in devtools. |
| `httpOnly` | `true` | JavaScript can never read the token, so XSS can't steal the session. Check it yourself: `document.cookie` in the console won't show it. |
| `sameSite` | `"lax"` | The browser won't attach it to cross-site POSTs — blocks basic CSRF for free. |
| `secure` | prod only | HTTPS-only in production; plain `http://localhost` still works in dev. |
| `maxAge` | 7 days | Matches the JWT's `expiresIn` so the cookie and the token die together. |
| `path` | `/` | Sent on every `/api/...` request. |

Three deliberate choices worth understanding:

- **The login error is vague on purpose.** "Incorrect email or password" for *both* wrong-email
  and wrong-password means an attacker can't probe which emails exist.
- **`cookieOptions()` has no `maxAge`.** `res.clearCookie()` only works when called with the same
  options the cookie was set with, *minus* the expiry — so login spreads `maxAge` in itself and
  logout passes the base options. Keep it that way.
- **`jwtSecret()` is a function, not a constant.** It reads `process.env` at call time, which
  makes the module import-order-proof. Copy that habit for any env-dependent value.

## Client side: react-query *is* your auth context

**There is no `AuthContext`.** `client/src/hooks/useAuth.ts` defines three hooks, and the
`["auth", "me"]` cache entry is the shared auth state:

- `useMe()` — a query for `GET /admin/auth/me` whose `queryFn` returns `null` on a 401 instead of
  throwing. **Being logged out is a normal state, not an error.** That single decision is what
  removes the need for a context.
- `useLogin()` / `useLogout()` — mutations that write that cache entry with `setQueryData` on
  success.

Every component calling `useMe()` reads the same entry, so a hand-rolled context would just
duplicate what react-query already gives you.

## The guard, client side

Declarative, in `client/src/layouts/AdminLayout.tsx`:

```tsx
if (isPending) return <div className="…">Checking login…</div>;
if (!me) return <Navigate to="/admin/login" replace />;
```

Because the guard lives on the **layout route**, every `/admin/*` deep link is covered — including
pages that don't exist yet. `Login.tsx` does the inverse: already logged in → `<Navigate to="/admin" />`.

There is deliberately **no axios interceptor that redirects on 401**. Instead, if a session dies
mid-edit, the save mutation's `onError` sets the auth cache entry to `null`:

```ts
onError: (err) => {
  if (isAxiosError(err) && err.response?.status === 401) {
    queryClient.setQueryData(ME_KEY, null);   // AdminLayout redirects on the next render
  }
}
```

State change in, redirect out. Copy this `onError` into every admin mutation you write.

## Adding an admin page

Two lines, no auth work:

1. An entry in the `MENU` array at the top of `AdminLayout.tsx`:
   ```tsx
   const MENU = [{ to: "/admin/home-content", label: "Homepage text" }];
   ```
2. A route under `/admin` in `client/src/main.tsx`.

Admin routes are **siblings** of the public `RootLayout` route, which is why admin pages don't
inherit the public navbar and footer.
