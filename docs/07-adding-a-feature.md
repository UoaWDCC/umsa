# 7. Adding a feature

The recipe. Worked example: **Events**. Every step names the file to copy, because copying a
working file beats writing one from scratch.

Do this once by hand before you start your assigned blueprint — even if your blueprint is a
different feature, the twelve steps are the same.

## Before you start: singleton or list?

Ask *would an admin ever want two of these at once?*

- **No** → singleton. One document, `findOne()` and `findOneAndUpdate({}, …, { upsert: true })`.
  Copy `HomeContent`. Theme settings and site branding are singletons.
- **Yes** → list. Many documents each with an `_id`, full CRUD, like the Event model below. Events,
  team members and gallery images are lists.

Getting this wrong is the most common early mistake and it's expensive to undo, because the API
shape changes.

## Server

**1. Model** — create `server/src/models/Event.ts`:

```ts
const EventSchema = new Schema<IEventDocument>(
  {
    title: { type: String, required: true },
    startsAt: { type: Date, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);
```

Singleton features copy `server/src/models/HomeContent.ts` instead.

**2. Schema** — copy `server/src/schemas/content.ts` → `server/src/schemas/event.ts`. Describe the
*request body*, not the document: required, trimmed, sensible max lengths, user-facing messages.
Export the `z.infer` type next to it.

**3. Public route** — copy `server/src/routes/content.ts` → `server/src/routes/events.ts`.

```ts
router.get("/", async (_req, res) => {
  try {
    res.json(await Event.find().sort({ startsAt: 1 }));
  } catch {
    sendError(res, 500, "INTERNAL_ERROR", "Unable to fetch events");
  }
});
```

Every document in that response carries its `_id` — that's what the admin UI uses to update and
delete specific events.

**4. Admin route** — copy `server/src/routes/admin/content.ts` → `server/src/routes/admin/events.ts`.
For a list feature you need three handlers:

- `POST /` — `validate(eventSchema)`, `new Event(req.body).save()`, respond `201`.
- `PUT /:id` — `validate(eventSchema)`, `findByIdAndUpdate(id, req.body, { new: true })`,
  `404` if it returns null.
- `DELETE /:id` — **no `validate`**. A delete has no body, so validating would 400 every delete.

Check the id before touching the database:

```ts
if (!mongoose.isValidObjectId(req.params.id)) {
  return sendError(res, 400, "BAD_REQUEST", "Invalid id");
}
```

**5. Mount both** in `server/src/app.ts` — the admin one **below the `requireAdmin` line**, which
protects it automatically:

```ts
app.use("/api/events", eventRoutes);
// …below the requireAdmin guard line:
app.use("/api/admin/events", adminEventRoutes);
```

At this point stop and test the server on its own, before writing any React:

```bash
curl localhost:5050/api/events
curl -X POST localhost:5050/api/admin/events -H 'Content-Type: application/json' -d '{}'
# expect 401 — you're not logged in
```

## Client

**6. Schema** — copy `client/src/schemas/content.ts` → `client/src/schemas/event.ts`. It's a
duplicate of the server schema; keep them in sync by hand.

**7. Hooks** — copy `client/src/hooks/useHomeContent.ts` → `client/src/hooks/useEvents.ts`. Key
`["events"]`, a `useEvents()` query, and `useCreateEvent()` / `useUpdateEvent()` /
`useDeleteEvent()` mutations, each invalidating `["events"]` on success and each carrying the
401 `onError` handler. Update and delete take the `_id` from the fetched list:

```ts
api.put(`/admin/events/${id}`, values)
```

**8. Admin page** — copy `client/src/pages/admin/HomeContentEditor.tsx` →
`client/src/pages/admin/EventsEditor.tsx`. A list plus a form, rather than a single form: render
each event with edit and delete buttons, and a form that creates a new one.

**9. Menu** — add `{ to: "/admin/events", label: "Events" }` to `MENU` in
`client/src/layouts/AdminLayout.tsx`.

**10. Route** — add `{ path: "events", element: <EventsEditor /> }` under the `/admin` route in
`client/src/main.tsx`.

**11. Public page** — replace the hardcoded data in `client/src/pages/Events.tsx` with
`useEvents()`. Keep a fallback for the loading and error states (`data ?? []` at minimum), and
keep whatever presentation logic already exists — the tag filter and pagination on that page
work fine and don't need rewriting.

**12. Verify** — the public page renders, the admin flow works, a bad submit shows the validation
message, a save updates the public page without a refresh, and a delete removes it.

That's the whole pattern. Nothing else in the codebase needs to change.

## Checklist before you open the PR

- [ ] New env variable? Added to `server/.env.example` too.
- [ ] Admin router mounted **below** `app.use("/api/admin", requireAdmin)`.
- [ ] Every write endpoint has `validate(...)`; the delete deliberately doesn't.
- [ ] `mongoose.isValidObjectId` guard on every `:id` route.
- [ ] Handlers use `try { … } catch { sendError(...) }` with a specific message.
- [ ] Client and server zod schemas match.
- [ ] Mutations invalidate the right query key, and carry the 401 `onError`.
- [ ] Public page still renders with the API stopped.
- [ ] `pnpm lint` passes.
- [ ] Endpoints added to [05-api-reference.md](05-api-reference.md).

That last one is not optional. A feature nobody can find the URL for is half-built.

## Then read your blueprint

The twelve steps above are the *mechanics*. The [blueprints/](blueprints/) folder has the
*decisions* — exact schema, exact URLs, and the gotchas specific to each of the six capabilities,
so you don't have to design as well as build.
