# UMSA website

The redesigned React frontend connects to the Express/MongoDB backend from
UoaWDCC/umsa at ef7883ee79d0df7f3ce97943ba26b27f8417e45c (verified 15 October 2026).

## Local setup

Use Node 22.12+ and pnpm. Run `pnpm install`, copy `server/.env.example` to
`server/.env`, fill the server-only values, then run `pnpm dev`.
The Vite frontend proxies `/api` to port 5051 (set `API_PROXY_TARGET` to override). `pnpm build` builds both workspaces.
The development frontend may select the next free port; use the URL in its output.

## Data and access

Public pages load homepage text, team, events, sponsors, gallery and FAQs from MongoDB.
Only authenticated admins can create, edit or delete content, or sign Cloudinary uploads.
Images can be uploaded or specified by HTTPS URL. Content survives reloads and server restarts.
No fictional prototype records are imported. Add approved content in `/admin`.

Admin authentication uses existing MongoDB AdminUser accounts and HTTP-only cookies.
To bootstrap an account, explicitly set ADMIN_EMAIL and a strong ADMIN_PASSWORD, then run
`pnpm --filter server seed:admin`. This updates that account's password; never run it casually.
The prototype password is no longer a built-in login.

Contact and membership forms save submissions to the private `/admin/inbox`.
A membership request does not grant membership or process payment. No confirmation emails
are sent. RESEND_API_KEY is reserved for a separately configured email workflow.

## Hosting

Surge only hosts static files and cannot run this backend. The previous Surge deployment
has not been changed. The Docker/nginx configuration serves the built frontend and `/api`
together on internal port 5050 (set PORT=5050 for Docker). Configure ATLAS_URI, JWT_SECRET and Cloudinary variables on the server;
never prefix secrets with VITE_. Set CLIENT_ORIGIN to the HTTPS website origin.

## Open PR contributions

See `docs/pr-integration.md` for the six incorporated PRs, author credits, reviewed revisions and adaptations.
Committee is editable under Team members; Homepage text includes an optional YouTube embed URL.
