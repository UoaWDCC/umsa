# Blueprint 03 — Gallery

The smallest of the six, *provided* [00-image-uploads.md](00-image-uploads.md) is done first.
Without it there is no feature here at all — a gallery is nothing but uploaded images.

Today `client/src/pages/Gallery.tsx` renders two placeholder PNGs repeated ten times.

## What the admin can do

- Upload a photo to the gallery with an optional caption.
- Reorder photos so the best ones lead.
- Delete a photo, which removes it from storage too.
- Do all of this without an event existing — gallery photos are standalone.

## Decisions already made for you

### The gallery is deliberately not linked to events

This was specified: gallery images are *not* event-specific. So there is no `eventId`, no `ref`,
no population.

That's also the right call independently. Club photos are often "a bunch of us at the beach" with
no event behind them, and requiring one would mean inventing fake events to hold photos.

If you later want event galleries, add an **optional** `eventId` — an optional link is easy to add
and a required one is painful to remove.

### Schema

```ts
// server/src/models/GalleryImage.ts
{
  url:      { type: String, required: true },   // Cloudinary secure_url
  publicId: { type: String, required: true },   // Cloudinary public_id
  caption:  { type: String },                   // optional, also used as alt text
  order:    { type: Number, default: 0 },
}
// { timestamps: true }
```

Both image fields are **required** here, unlike in events and team members. A gallery image
without an image is not a thing.

| Field | Why |
|---|---|
| `caption` optional | Most photos won't have one. Falls back to a generic alt string. |
| `order` | Explicit control. Default sort is `order` ascending, then `createdAt` descending so new uploads land predictably. |
| No `album` or `tags` | Not asked for. One flat gallery. Adding grouping later is a field and a filter; getting it wrong now is a migration. |

### Endpoints

| Method | Path | Auth | Notes |
|---|---|---|---|
| `GET` | `/api/gallery` | public | Sorted `order: 1, createdAt: -1`. `[]` when empty. |
| `POST` | `/api/admin/gallery` | admin | `validate(galleryImageSchema)`, `201`. |
| `PUT` | `/api/admin/gallery/:id` | admin | Caption and order. Replacing the image is allowed but rare. |
| `DELETE` | `/api/admin/gallery/:id` | admin | No `validate`. **Must destroy the Cloudinary asset.** |

No separate admin list endpoint — unlike team members there's nothing hidden, so the admin page
reuses `GET /api/gallery`. The homepage editor does the same thing with
`GET /api/content/home`; reusing a public read endpoint in the admin UI is normal.

## Server work

1. **Model** — create `server/src/models/GalleryImage.ts`, following the list-shaped pattern in
   [../07-adding-a-feature.md](../07-adding-a-feature.md).
2. **Schema** — copy `server/src/schemas/content.ts` → `server/src/schemas/gallery.ts`.
   `url` as `z.url()`, `publicId` as a non-empty trimmed string, `caption` optional with a
   `max(200)`, `order` as `z.coerce.number().int().default(0)`.
3. **Public route** — copy `server/src/routes/content.ts` → `server/src/routes/gallery.ts`.
4. **Admin route** — copy `server/src/routes/admin/content.ts` →
   `server/src/routes/admin/gallery.ts`. The delete handler is the interesting one:

   ```ts
   const doc = await GalleryImage.findById(req.params.id);
   if (!doc) return sendError(res, 404, "NOT_FOUND", "Image not found");
   try { await destroyAsset(doc.publicId); } catch { /* orphaned file beats an undeletable row */ }
   await doc.deleteOne();
   res.status(204).end();
   ```

   Note the deliberate empty catch, and the comment explaining it. A Cloudinary outage must not
   stop an admin removing a photo from the site.

5. **Mount** in `server/src/app.ts` — admin **below** the `requireAdmin` line.

## Client work

6. **Schema** — copy to `client/src/schemas/gallery.ts`.
7. **Hooks** — copy `useHomeContent.ts` → `client/src/hooks/useGallery.ts`. Key `["gallery"]`.
8. **Admin page** — copy `HomeContentEditor.tsx` → `client/src/pages/admin/GalleryEditor.tsx`.
   A thumbnail grid, each tile with a caption field, an order field and a delete button, plus
   the `ImageUploadField` for adding new ones. Confirm before deleting — it's irreversible.
9. **Menu + route** — `{ to: "/admin/gallery", label: "Gallery" }` and the matching route.
10. **Public page** — `client/src/pages/Gallery.tsx` calls `useGallery()`, maps over
    `data ?? []`, and uses `caption` as the `alt`. Keep the existing grid classes; the layout is
    fine, only the data source changes.

## Gotchas for this feature

- **An empty gallery is a real state.** With no images, `data ?? []` renders nothing at all and
  the page looks broken. Show a short "Photos coming soon" message instead.
- **Upload then save is two steps.** The image reaches Cloudinary before the document exists. If
  the admin closes the tab in between, the file is orphaned. Acceptable; noted in blueprint 00.
- **Full-resolution images will make this page enormous.** Ten phone photos is easily 40 MB. The
  quick fix is Cloudinary transformation parameters in the URL (`w_400,c_fill,q_auto,f_auto`) for
  the thumbnails — a stretch goal, but the one that matters most here.
- **`alt` text.** Use the caption when there is one, and a sensible generic string when there
  isn't. Never leave `alt` empty on a content image.
- **The delete is genuinely irreversible** — the document and the file both go. Confirm first.

## Definition of done

- [ ] `GET /api/gallery` returns `[]` against an empty database, and the page shows an empty
      state rather than a blank strip.
- [ ] An admin can upload a photo and see it on `/gallery` without a refresh.
- [ ] Changing `order` visibly reorders the public grid.
- [ ] Deleting removes the document **and** the Cloudinary asset.
- [ ] Every image has meaningful `alt` text.
- [ ] `/gallery` still renders with the server stopped.
- [ ] Endpoints added to [../05-api-reference.md](../05-api-reference.md).
- [ ] `pnpm lint` passes.

## Stretch goals

- Cloudinary transformations for thumbnails and a responsive `srcset`.
- A lightbox on click.
- Drag-and-drop reordering and multi-file upload.
- Albums, or an optional link to an event.
