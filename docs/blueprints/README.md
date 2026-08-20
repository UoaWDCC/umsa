# Blueprints

One file per CMS capability. Each is a **complete spec**: what the admin should be able to do,
the schema and URLs already decided, which files to copy, the gotchas specific to that feature,
and a definition of done.

They stop short of code. The point is that you can be handed one of these and build it without
first having a design conversation — and that two people building two features end up with
consistent APIs.

Read [../07-adding-a-feature.md](../07-adding-a-feature.md) first. That's the *mechanics*; these
are the *decisions*.

## Build order

```
        00-image-uploads  ◄── build this first
               │
      ┌────────┼─────────┬──────────────┐
      ▼        ▼         ▼              ▼
  03-gallery  01-events  02-team    05-logos-and-branding
                                          │
                                          ▼
                                  04-theme-and-fonts
                              (independent, but ships with branding)

  06-admin-accounts — independent, do it whenever
```

| # | Blueprint | Depends on | Rough size |
|---|---|---|---|
| [00](00-image-uploads.md) | Image uploads | — | Large. Unblocks three others. |
| [01](01-events.md) | Events, upcoming/past | 00 (for event images) | Medium. Best first feature. |
| [02](02-team-members.md) | Team members, year to year | 00 (for photos) | Medium. |
| [03](03-gallery.md) | Gallery images | 00 | Small once 00 exists. |
| [04](04-theme-and-fonts.md) | Theme colours and fonts | — | Medium, plus a refactor. |
| [05](05-logos-and-branding.md) | Logos and site branding | 00 | Small. |
| [06](06-admin-accounts.md) | Admin accounts and hardening | — | Medium. |

**Image uploads is the foundation.** Gallery, team photos, event images and the logo all need a
way to get a file from an admin's laptop onto the internet. Building that once, first, is the
difference between one upload mechanism and four half-working ones. If you're assigned gallery,
logos, team or events, read [00-image-uploads.md](00-image-uploads.md) even if someone else is
building it — your schema stores its output.

**Events is the best first feature** if uploads aren't ready yet: build it with a plain
`imageUrl` string field, and swap in the upload widget later without touching the model.

## How to read a blueprint

Every one has the same seven sections:

1. **What the admin can do** — acceptance criteria in plain English. This is what you're judged
   against. If the spec and this list disagree, this list wins.
2. **Decisions already made for you** — the schema and the URLs, with reasoning. Don't
   redesign these without talking to the tech lead; other people are building against them.
3. **Server work** — files to create, each as "copy `X` → `Y`".
4. **Client work** — same.
5. **Gotchas for this feature** — the things that will actually cost you an afternoon.
6. **Definition of done** — the checklist for your PR.
7. **Stretch goals** — explicitly out of scope. Don't build these first.

## Shared decisions

These hold across every blueprint, so they're stated once here:

- **Public read routes are unauthenticated** and live at `/api/<thing>`. Admin write routes live
  at `/api/admin/<thing>` and are mounted below the `requireAdmin` line.
- **Public reads never 404 on empty.** Return `[]` for lists and defaults for singletons, so the
  public site works against an empty database.
- **Ordering is explicit, not implicit.** Anything an admin can reorder gets an `order: Number`
  field. Never rely on insertion order.
- **Dates are stored as `Date`, never as pre-computed booleans or strings.** Derive
  "upcoming/past" at read time.
- **Images are stored as `{ url, publicId }` pairs.** The `publicId` is what lets you delete the
  file from the host when the document is deleted.
- **Every list feature's public route returns `_id` on each document**, because that's what the
  admin UI uses to target updates and deletes.
- **New env variables go in `server/.env.example`** in the same PR.
