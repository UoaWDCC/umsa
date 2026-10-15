# Local setup

Use Node 22 and pnpm. Run `pnpm install`, copy `server/.env.example` to `server/.env`
and fill in your own server credentials. Never commit the actual environment file.
Run `pnpm dev`; use the frontend URL printed by Vite (normally port 5173, or the next free port).
The example API port is 5051. Set PORT=5050 inside Docker, as nginx proxies to 5050.
Set API_PROXY_TARGET when using a different local backend port.

Admin login uses an existing MongoDB account; there is no built-in demo password.
An account can be deliberately bootstrapped with ADMIN_EMAIL and ADMIN_PASSWORD
(at least 12 characters), then `pnpm --filter server seed:admin`. This updates
that account's password and should not be run as an ordinary startup step.

Cloudinary's three environment variables are needed for image uploads.
Contact opens an email draft addressed to umsa@projects.wdcc.co.nz; membership uses
the official Google Form. There is no admin inbox, local membership database or automatic
email sending. RESEND_API_KEY is currently unused.

Checks: `pnpm build`, `pnpm --filter client test:pr-ui`, and
`pnpm --filter server test:integration`. Integration tests create and remove only a
uniquely named test database; they do not seed or change production content.
