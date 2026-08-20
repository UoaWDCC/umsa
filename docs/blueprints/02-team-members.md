# Blueprint 02 — Team members

The exec team changes every year. The requirement is that next year's committee can update the
team page themselves, and that previous years don't vanish.

Today `client/src/pages/Team.tsx` hardcodes `<MemberInfo>` components with placeholder names and
stock photo URLs, in two sections: "Executive Section" and "Member Section".

## What the admin can do

- Add a team member: name, role, section, photo, LinkedIn and Instagram links.
- Reorder members within a section, so the President appears before the Treasurer.
- Mark a member inactive rather than deleting them.
- Roll over to a new year without touching last year's entries.
- Optionally, let the public browse past years.

## Decisions already made for you

### `year` is a field on each member, not a separate collection

A handover is then: the new committee adds documents with `year: 2027`. Last year's documents
stay exactly as they are and become an archive for free.

The alternative — editing existing documents in place each year — destroys history the first
time it's used, and there's no undo.

```ts
// server/src/models/TeamMember.ts
{
  name:          { type: String, required: true },
  role:          { type: String, required: true },   // "President", "Events Officer", …
  section:       { type: String, required: true },   // "executive" | "member"
  year:          { type: Number, required: true },
  order:         { type: Number, default: 0 },
  active:        { type: Boolean, default: true },
  photoUrl:      { type: String },                   // from blueprint 00
  photoPublicId: { type: String },
  linkedin:      { type: String },
  instagram:     { type: String },
}
// { timestamps: true }
```

| Field | Why |
|---|---|
| `year` as `Number` | `2026`, not `"2026/27"`. Sorts and compares without parsing. Display it however you like. |
| `section` | Mirrors the two headings the page already has. A string, not an enum, so a third section doesn't need a code change — validate it as non-empty. |
| `order` | Committee order is meaningful and is not alphabetical. Without this you cannot put the President first. Default `0`, tie-break by `name`. |
| `active` | Someone stepping down mid-year should disappear from the site without losing the record. |
| `linkedin` / `instagram` optional | `MemberInfo` renders both icons unconditionally today; make them conditional. |

### Endpoints

| Method | Path | Auth | Notes |
|---|---|---|---|
| `GET` | `/api/team` | public | Active members for the **newest year present**, sorted `section`, then `order`, then `name`. |
| `GET` | `/api/team?year=2025` | public | Active members for that year. |
| `GET` | `/api/team/years` | public | Distinct years, descending. Lets the public page build a year switcher without fetching everything. |
| `GET` | `/api/admin/team` | admin | **All** members including inactive ones, all years. The admin list must show what the public one hides. |
| `POST` | `/api/admin/team` | admin | `validate(teamMemberSchema)`, `201`. |
| `PUT` | `/api/admin/team/:id` | admin | `validate(teamMemberSchema)`. |
| `DELETE` | `/api/admin/team/:id` | admin | No `validate`. |

**Defaulting to the newest year matters.** If the public route required a `year`, the site would
break on 1 January until someone remembered to update a constant. Instead:

```ts
const year = req.query.year
  ? Number(req.query.year)
  : (await TeamMember.findOne().sort({ year: -1 }))?.year;
```

Note this is the first route in the codebase to read a query parameter. **Validate it** — a
`z.coerce.number().int()` check, or an explicit `Number.isInteger` guard, and `400 BAD_REQUEST`
otherwise. Passing `req.query.year` straight into a Mongo filter is how injection bugs start.

## Server work

1. **Model** — create `server/src/models/TeamMember.ts`, following the list-shaped pattern in
   [../07-adding-a-feature.md](../07-adding-a-feature.md).
2. **Schema** — copy `server/src/schemas/content.ts` → `server/src/schemas/teamMember.ts`.
   `year` as `z.coerce.number().int().min(2000).max(2100)`, `order` as
   `z.coerce.number().int().default(0)`, the URL fields as `z.url().optional().or(z.literal(""))`
   so an empty form field doesn't fail validation.
3. **Public route** — copy `server/src/routes/content.ts` → `server/src/routes/team.ts`, with the
   two `GET`s. Filter `{ active: true }` on the public list.
4. **Admin route** — copy `server/src/routes/admin/content.ts` → `server/src/routes/admin/team.ts`
   with list, create, update, delete. `mongoose.isValidObjectId` on `:id` routes. Call
   `destroyAsset(photoPublicId)` on delete, and when an update replaces the photo.
5. **Mount** in `server/src/app.ts` — admin **below** the `requireAdmin` line.

## Client work

6. **Schema** — copy to `client/src/schemas/teamMember.ts`.
7. **Hooks** — copy `client/src/hooks/useHomeContent.ts` → `client/src/hooks/useTeam.ts`.
   Careful with keys: the public list is year-dependent, so `["team", year]`, while the admin
   list is `["team", "admin"]`. Mutations must invalidate **both** — `invalidateQueries({ queryKey: ["team"] })`
   matches every key with that prefix, which is exactly what you want.
8. **Admin page** — copy `HomeContentEditor.tsx` → `client/src/pages/admin/TeamEditor.tsx`.
   Group the list by year, then by section. Include the `ImageUploadField` from blueprint 00.
   For `order`, a plain number input is fine and shippable — drag-and-drop is a stretch goal.
9. **Menu + route** — `{ to: "/admin/team", label: "Team" }` and the matching route.
10. **Public page** — `client/src/pages/Team.tsx` calls `useTeam()`, groups by `section`, and maps
    over the result into the existing `MemberInfo` component. Keep the two headings.

`client/src/components/MemberInfo.tsx` needs small changes: render the social icons only when the
link exists, and fall back to a placeholder when `photoUrl` is empty.

## Gotchas for this feature

- **A member with no photo will render a broken image.** `MemberInfo` has no fallback today.
  Add one before you wire real data in, or your first empty entry looks like a bug.
- **`order` ties.** Two members with `order: 0` come back in whatever order Mongo feels like.
  Always add a secondary sort on `name`.
- **The admin list must include inactive members** or nobody can reactivate one. That's why
  there's a separate `GET /api/admin/team`.
- **Deleting versus deactivating.** The UI should push `active: false` and make delete the
  deliberate, confirmed action — a delete also destroys the photo.
- **Query-parameter validation.** See above. This is the first place in the codebase that reads
  one, so there's no existing pattern to copy — set a good one.
- **The stock photo URLs currently in `Team.tsx` are remote hotlinks.** Don't migrate them into
  the database; they'll rot. Upload real photos or leave the field empty.

## Definition of done

- [ ] `GET /api/team` returns the newest year's active members with no query parameter.
- [ ] `GET /api/team?year=2025` returns that year's; a garbage `year` returns `400`, not `500`.
- [ ] An admin can add, edit, reorder, deactivate and delete members.
- [ ] Deactivating removes someone from the public page but keeps them in the admin list.
- [ ] Members appear in `order`, with the President first — verify by reordering.
- [ ] `/team` still renders with the server stopped.
- [ ] Deleting a member removes their photo from Cloudinary.
- [ ] Endpoints added to [../05-api-reference.md](../05-api-reference.md).
- [ ] `pnpm lint` passes.

## Stretch goals

- Drag-and-drop reordering.
- A year switcher on the public page, backed by `GET /api/team/years`.
- A "clone last year's team" button to bootstrap a new committee.
- Per-member bio text and a detail page.
