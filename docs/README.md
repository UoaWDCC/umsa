# UMSA docs

The repo has a **working baseline CMS slice**: an admin logs in at `/admin`, edits the homepage
welcome text in a form, and the public homepage updates — no code changes, no redeploy.

That slice is deliberately tiny. It exists so you can copy it. Everything else the CMS needs to
do — events, gallery, team members, theme colours, logos — is still hardcoded in `.tsx` files,
and building it is the work ahead.

These docs are split so you only read what you need.

## The map

| Doc | Read it when |
|---|---|
| [01-setup.md](01-setup.md) | First day. Get the thing running on your machine. |
| [02-architecture.md](02-architecture.md) | You want the mental model — what talks to what, and what happens between a click and a database write. |
| [03-backend-reference.md](03-backend-reference.md) | You're in `server/` and want to know what each file is for. |
| [04-auth.md](04-auth.md) | You're touching anything behind a login, or wondering why there's no `AuthContext`. |
| [05-api-reference.md](05-api-reference.md) | You need the exact shape of a request or response. Lookup, not reading. |
| [06-client-contract.md](06-client-contract.md) | You're wiring a React page to an endpoint you just built. |
| [07-adding-a-feature.md](07-adding-a-feature.md) | You're about to write your first CMS feature. This is the recipe. |
| [08-gotchas.md](08-gotchas.md) | Something is behaving strangely, or you're about to open a PR. |
| [blueprints/](blueprints/) | You've been assigned one of the six CMS capabilities. One file per capability, each a complete spec. |

## Reading paths

**New to the repo** — 01 → 02 → 04 → 07. About 30 minutes. Skim 03 and 05; you'll come back to
them constantly, so there's no point memorising them now.

**Assigned a feature** — 07 (the pattern) → your blueprint in `blueprints/` (the spec) →
06 (the client side). Keep 05 open in a tab. If your feature involves images, read
[blueprints/00-image-uploads.md](blueprints/00-image-uploads.md) first regardless of which
feature you were given, because it's the piece everything visual depends on.

**Reviewing someone's PR** — 08, then 05 to check the endpoint contract matches what they wrote.

## What's already built vs what isn't

| Area | State |
|---|---|
| Admin login, session, logout | Done. One admin account, created by a seed script. |
| Homepage heading + subtitle | Done, end to end. This is the reference implementation. |
| Events, gallery, team, sponsors, FAQ, about copy | Hardcoded in `client/src/pages/*.tsx`. Not in the database. |
| Image uploads | Does not exist. No upload endpoint, no storage. See the blueprint. |
| Theme colours, fonts, logo | Static CSS in `client/src/tokens.css` and imported assets. Not editable. |
| Tests | No automated suite — small team, small app, not the point of this project. Run the app and click through the change before merging to `main`, since `main` deploys straight to Fly. |

## A note on how these docs are written

Every file path in here is repo-relative and clickable-ish — `server/src/app.ts` means
`server/src/app.ts` from the repo root. If a doc tells you to copy a file, that file exists;
if you can't find it, the doc is wrong and that's a bug worth fixing in the same PR.
