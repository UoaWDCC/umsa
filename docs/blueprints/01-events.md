# Blueprint 01 — Events

The best first feature. It's a plain list with full CRUD, and the page it replaces already has
working filter and pagination logic you get to keep.

Today `client/src/pages/Events.tsx` holds a 15-item hardcoded array. Every entry uses the same
imported image, and each carries a `page: 1` field and an `eventIsDone` boolean maintained by
hand.

## What the admin can do

- See every event in the admin panel, newest first.
- Create an event: name, date, description, tag, an optional external link, an optional image.
- Edit any existing event.
- Delete an event, with a confirmation step.
- Never think about "upcoming" versus "past" — that follows from the date automatically.

## Decisions already made for you

### Upcoming/past is derived, never stored

The current data already demonstrates why. "Jalinan Raya" is dated `2026-05-20` with
`eventIsDone: false`, while an event dated `2026-04-20` has `eventIsDone: true`. Both dates are
in the past. The boolean is wrong because somebody has to remember to flip it, and nobody did.

So: **store `startsAt`, compute the rest.** An event moves from upcoming to past on its own, with
no cron job, no scheduled task, and no admin action.

Same reasoning kills the `page: 1` field. Pagination is a function of how many events exist and
how many fit on a screen; storing a page number means renumbering everything whenever one event
is added.

**Where to compute it:** return all events from one endpoint and split them in the browser.

```ts
const now = Date.now();
const upcoming = events.filter((e) => new Date(e.startsAt).getTime() >= now);
const past     = events.filter((e) => new Date(e.startsAt).getTime() <  now);
```

Not a `?when=upcoming` query parameter. A club runs tens of events, not thousands — one request,
one cache entry, both sections rendered, and no risk of the two views disagreeing. Revisit if
the collection ever passes a few hundred documents.

### Schema

```ts
// server/src/models/Event.ts
{
  name:          { type: String, required: true },
  startsAt:      { type: Date,   required: true },
  description:   { type: String, required: true },
  tag:           { type: String, required: true },   // "Social" | "Competition" | …
  link:          { type: String },                   // optional external link (Instagram post)
  imageUrl:      { type: String },                   // from blueprint 00
  imagePublicId: { type: String },
}
// { timestamps: true }
```

Field-by-field reasoning:

| Field | Why |
|---|---|
| `startsAt` as `Date` | Not a string. Mongo sorts and compares dates correctly; strings sort correctly only by accident. |
| `tag` as a plain string | The current page derives its filter buttons from whatever tags exist. A `z.enum` would mean a code change to add a tag, which defeats the point of a CMS. Validate it as a non-empty trimmed string. |
| `link` optional | Several current events point at an Instagram post; some won't have one. |
| No `isDone` | Derived. |
| No `page` | Derived. |
| No `endsAt` | Nothing displays it today. Add it when something does. |

### Endpoints

| Method | Path | Auth | Notes |
|---|---|---|---|
| `GET` | `/api/events` | public | All events sorted `startsAt: -1`. Returns `[]` when empty, never 404. |
| `POST` | `/api/admin/events` | admin | `validate(eventSchema)`, responds `201`. |
| `PUT` | `/api/admin/events/:id` | admin | `validate(eventSchema)`, `404` if no such id. |
| `DELETE` | `/api/admin/events/:id` | admin | **No `validate`** — a delete has no body. |

## Server work

1. **Model** — create `server/src/models/Event.ts`, fields above (see the worked example in
   [../07-adding-a-feature.md](../07-adding-a-feature.md)).
2. **Schema** — copy `server/src/schemas/content.ts` → `server/src/schemas/event.ts`.
   `startsAt` needs `z.coerce.date()`, because JSON has no date type and the body arrives as an
   ISO string. Give `name` and `description` sensible `max()` lengths with readable messages.
3. **Public route** — copy `server/src/routes/content.ts` → `server/src/routes/events.ts`:
   `GET /` → `Event.find().sort({ startsAt: -1 })`.
4. **Admin route** — copy `server/src/routes/admin/content.ts` → `server/src/routes/admin/events.ts`
   with the three handlers. Guard both `:id` routes with `mongoose.isValidObjectId` (see
   [../03-backend-reference.md](../03-backend-reference.md)). If blueprint 00 is done, call
   `destroyAsset` in the delete handler.
5. **Mount** in `server/src/app.ts` — public anywhere, admin **below** the `requireAdmin` line.

Test with curl before writing any React. `GET /api/events` should return `[]` on a fresh
database, and `POST /api/admin/events` should 401 when logged out.

## Client work

6. **Schema** — copy `client/src/schemas/content.ts` → `client/src/schemas/event.ts`. Keep it in
   sync with the server copy.
7. **Hooks** — copy `client/src/hooks/useHomeContent.ts` → `client/src/hooks/useEvents.ts`. Key
   `["events"]`; `useEvents()`, `useCreateEvent()`, `useUpdateEvent()`, `useDeleteEvent()`. Each
   mutation invalidates `["events"]` on success and carries the 401 `onError`.
8. **Admin page** — copy `client/src/pages/admin/HomeContentEditor.tsx` →
   `client/src/pages/admin/EventsEditor.tsx`. A list of existing events with edit and delete
   buttons, plus a create form. Use `<input type="datetime-local">` for `startsAt`.
9. **Menu + route** — `{ to: "/admin/events", label: "Events" }` in `AdminLayout.tsx`, and
   `{ path: "events", element: <EventsEditor /> }` in `client/src/main.tsx`.
10. **Public page** — in `client/src/pages/Events.tsx`, delete the hardcoded array and call
    `useEvents()`. **Keep the tag filter and the pagination** — they work. Derive the tag list
    from the fetched data instead of hardcoding it, and derive `eventIsDone` from `startsAt`
    when passing props to `EventsElement`.

`client/src/components/EventsElement.tsx` needs its prop names updated (`eventName` → `name`,
and so on) or a small mapping at the call site. Either is fine; mapping at the call site is a
smaller diff.

## Gotchas for this feature

- **`z.coerce.date()`, not `z.date()`.** The body arrives as JSON, so `startsAt` is a string. A
  plain `z.date()` rejects every request and the error message won't make it obvious.
- **`<input type="datetime-local">` gives you a local-time string with no timezone.** It becomes
  a UTC `Date` on the server. For a club whose events are all in Auckland this is fine, but be
  aware that an event created at 11pm can display on the next day if you format it carelessly.
  Format with `toLocaleDateString("en-NZ")` and don't chop the ISO string by hand.
- **`EventsElement` types `eventImage` as `string`.** A build-time asset import is a string too,
  so a CMS URL drops in without a type change — but give it a placeholder for events with no
  image, or you'll render a broken `<img>`.
- **Sort direction.** The admin list wants newest first (`-1`). The public "upcoming" section
  reads better soonest-first. Sort once on the server and reverse the upcoming slice in the
  component rather than making two requests.
- **Don't reuse `eventIsDone` as a field name** even though the component prop is called that.
  The whole point is that it isn't stored.

## Definition of done

- [ ] `GET /api/events` returns `[]` against an empty database.
- [ ] An admin can create, edit and delete an event; each change shows on `/events` without a
      manual refresh.
- [ ] An event whose date has passed appears as past **with no admin action**.
- [ ] Submitting an empty form shows the server's validation message.
- [ ] `DELETE` with a malformed id returns `400`, not `500`.
- [ ] `/events` still renders with the server stopped.
- [ ] The tag filter and pagination still work, driven by fetched data.
- [ ] Endpoints added to [../05-api-reference.md](../05-api-reference.md).
- [ ] `pnpm lint` passes.

## Stretch goals

- An `endsAt` field and multi-day events.
- A "featured event" flag surfaced on the homepage.
- Ticket or RSVP links as structured fields rather than one `link`.
- Server-side pagination, if the collection ever gets big enough to need it.
