# 1. Setup

## Get it running

- Public site: <http://localhost:5173/>
- Admin: <http://localhost:5173/admin> → credentials `umsa@projects.wdcc.co.nz` / `umsa`
- Raw API: <http://localhost:5050/api/content/home>

Only `ATLAS_URI` is required — everything else has dev-safe defaults. **pnpm is mandatory**
(`npx only-allow pnpm` runs on install and will reject npm or yarn).

`pnpm dev` runs both workspaces at once via `concurrently`, colour-coded: SERVER in blue,
CLIENT in red. If you only want one, `pnpm --filter server dev` or `pnpm --filter client dev`.

## Environment variables

All of these live in `server/.env`, which is gitignored.

| Variable | Required | Default | What it's for |
|---|---|---|---|
| `ATLAS_URI` | **yes** | none — connect fails and the process exits 1 | MongoDB Atlas connection string. |
| `JWT_SECRET` | prod only | `"dev-only-secret-change-me"` | Signs session tokens. The server **refuses to boot** in production without it (`server/server.ts`), so a forgotten secret fails loudly instead of silently using the public default. |
| `CLOUDINARY_CLOUD_NAME` | not yet used | none | Cloudinary account identifier — reserved for an upcoming image upload feature, not yet wired into `src/`. |
| `CLOUDINARY_API_KEY` | not yet used | none | Cloudinary API key — same upcoming feature. |
| `CLOUDINARY_API_SECRET` | not yet used | none | Cloudinary API secret — same upcoming feature. |


## Troubleshooting

> **Login always says "Incorrect email or password."** You probably haven't run `seed:admin`
> against the database your `ATLAS_URI` points at. The error message is deliberately vague
> (see [04-auth.md](04-auth.md)), so it looks identical whether the account is missing or the
> password is wrong.

> **`is the db connected?: no`, then the process exits.** Bad `ATLAS_URI`, or your IP isn't on
> the Atlas cluster's allowlist. Ask the tech lead to add it.

> **The API returns data but the page doesn't update.** Check the Network tab for the request.
> If it's going to `localhost:5173/api/...` and 404ing, the Vite proxy isn't running — you
> started the client without the server.

> **Changes to `server/` don't take effect.** `tsx watch` should restart on save. If you edited
> something under `server/dist/`, that's stale build output and nothing reads it. See
> [08-gotchas.md](08-gotchas.md).

> **`pnpm install` refuses to run.** You used npm. Use pnpm.

## Other scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Server + client together. |
| `pnpm build` | Compiles the server to `server/dist/`, then builds the client to `client/dist/`. |
| `pnpm lint` | ESLint over `client/src` and `server/src`. Runs automatically on every commit via husky. |
| `pnpm --filter server seed:admin` | Create or rotate the admin account. |

There is no `pnpm test` — this project doesn't use automated tests. Verify a change by
running the app (`pnpm dev`) and using the feature yourself.
