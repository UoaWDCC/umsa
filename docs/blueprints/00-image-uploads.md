# Blueprint 00 — Image uploads

**Build this first.** Gallery, team photos, event images and the logo all need it. Building it
once means one upload widget and one mental model; skipping it means four people each inventing
a different half-solution.

Nothing in the backend can accept a file today. `server/src/app.ts` mounts `express.json()` and
nothing else — no multer, no multipart parser, no `express.static`. This blueprint adds the
whole capability.

## What the admin can do

- Pick an image file in an admin form and see it upload with a progress or "uploading…" state.
- See a preview of the uploaded image before saving the surrounding form.
- Save the form; the image URL is stored on the document.
- Delete the document; the image file is removed from storage too, not orphaned.
- Get a clear error for a file that's too large or the wrong type, before anything uploads.

## Decisions already made for you

### Use Cloudinary with signed direct upload

The browser uploads the file **straight to Cloudinary**. Express never sees the bytes — it only
signs a short-lived permission slip.

```
 Browser                      Express                     Cloudinary
    │                            │                             │
    │  POST /api/admin/uploads/signature                       │
    ├───────────────────────────►│  (requireAdmin)             │
    │                            │  sign(timestamp, folder)    │
    │◄───────────────────────────┤  with CLOUDINARY_API_SECRET │
    │  { signature, timestamp, apiKey, cloudName, folder }     │
    │                                                          │
    │  POST the actual file, with the signature                │
    ├─────────────────────────────────────────────────────────►│
    │◄─────────────────────────────────────────────────────────┤
    │  { secure_url, public_id }                               │
    │                            │                             │
    │  POST /api/admin/gallery { url, publicId }               │
    ├───────────────────────────►│  saves the strings only     │
```

Why this shape and not the obvious one:

| Approach | Verdict |
|---|---|
| **Cloudinary signed direct upload** | **Chosen.** Express stays a JSON API. No large request bodies, no memory pressure on a 256 MB Fly VM, and free CDN delivery and on-the-fly resizing. |
| Base64 the image into a JSON body | No. `JSON_BODY_LIMIT` is 1 MB and base64 inflates by ~33%. A phone photo blows straight past it. |
| multer → the container's filesystem | No. Fly's filesystem is ephemeral and `fly.toml` has `min_machines_running = 0`, so the machine stops and every upload disappears. |
| multer → stream through Express → Cloudinary | Works, but puts every byte through our one small VM for no benefit. Only worth it if you need to inspect files server-side. |

**The credentials already exist.** `server/.env` holds `CLOUDINARY_CLOUD_NAME`,
`CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` from an earlier iteration — no source file reads
them today. Ask the tech lead to confirm the account is still live, and add all three to
`server/.env.example`.

**There is prior art in `server/dist/`.** `dist/src/lib/cloudinary.js` and
`dist/src/routes/admin/uploads.js` are a compiled version of roughly this design, with no
TypeScript source. Read them for reference if you're stuck. **Do not import from `dist/` and do
not copy it blindly** — it's stale, and its cookie module in particular is wrong for the current
code (see [../08-gotchas.md](../08-gotchas.md)).

### The storage shape

Every model that owns an image stores **two** strings, never one:

```ts
imageUrl:      { type: String },   // Cloudinary secure_url — what the <img> renders
imagePublicId: { type: String },   // Cloudinary public_id — what a delete needs
```

Without `publicId` you cannot delete the file, and the Cloudinary account fills with orphans
nobody can identify. For a gallery of dozens of images that matters within one year.

Both are optional at the schema level so a document can exist before its image does.

### Endpoints

| Method | Path | Auth | Body | Returns |
|---|---|---|---|---|
| `POST` | `/api/admin/uploads/signature` | admin | `{ folder }` — one of a fixed allowlist | `{ signature, timestamp, apiKey, cloudName, folder }` |

One endpoint. It does not accept a file and it does not return a URL — it returns permission to
upload.

**`folder` must be validated against a `z.enum`**, not passed through. Allowed values:
`"umsa/gallery"`, `"umsa/team"`, `"umsa/events"`, `"umsa/branding"`. An admin account is trusted,
but a fixed enum keeps the Cloudinary account tidy and means a bug can't scatter files.

The signature is short-lived by construction: Cloudinary rejects a signed upload whose
`timestamp` is more than an hour old.

## Server work

1. **Dependency** — `pnpm --filter server add cloudinary`.

2. **Config helper** — new file `server/src/utils/cloudinary.ts`. Read env inside functions, the
   way `server/src/utils/adminSession.ts` does, so the module stays import-order-proof:

   ```ts
   export const cloudinaryConfig = () => ({
     cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
     apiKey: process.env.CLOUDINARY_API_KEY || "",
     apiSecret: process.env.CLOUDINARY_API_SECRET || "",
   });
   ```

   Export two functions: `signUpload(folder)` returning `{ signature, timestamp }`, and
   `destroyAsset(publicId)` for deletes. Both are thin wrappers over the `cloudinary` SDK.

3. **Schema** — copy `server/src/schemas/content.ts` → `server/src/schemas/upload.ts`:

   ```ts
   export const uploadSignatureSchema = z.object({
     folder: z.enum(["umsa/gallery", "umsa/team", "umsa/events", "umsa/branding"]),
   });
   ```

4. **Route** — copy `server/src/routes/admin/content.ts` → `server/src/routes/admin/uploads.ts`,
   with `POST /signature` behind `validate(uploadSignatureSchema)`. Return 500 with a clear
   message if the Cloudinary env vars are missing — a silent empty signature is a miserable
   debug.

5. **Mount** in `server/src/app.ts`, **below** the `requireAdmin` line:
   ```ts
   app.use("/api/admin/uploads", adminUploadRoutes);
   ```

6. **Document the env vars** in `server/.env.example`.

7. **Delete cleanup.** Whichever feature owns the image calls `destroyAsset(doc.imagePublicId)`
   in its `DELETE /:id` handler before removing the document. Wrap it so a Cloudinary failure
   doesn't block the database delete — an orphaned file is annoying, an undeletable event is
   worse.

## Client work

8. **Hook** — new file `client/src/hooks/useImageUpload.ts`. Not a react-query *query* — it's a
   two-step mutation:

   ```
   mutationFn: async (file: File) => {
     const { data: sig } = await api.post("/admin/uploads/signature", { folder });
     const form = new FormData();
     form.append("file", file);
     form.append("api_key", sig.apiKey);
     form.append("timestamp", sig.timestamp);
     form.append("signature", sig.signature);
     form.append("folder", sig.folder);
     // NOTE: plain axios/fetch here, NOT our `api` instance — different host
     const res = await axios.post(`https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`, form);
     return { url: res.data.secure_url, publicId: res.data.public_id };
   }
   ```

   Carry the same 401 `onError` handler every other admin mutation has (see
   [../06-client-contract.md](../06-client-contract.md)).

9. **Component** — new file `client/src/components/admin/ImageUploadField.tsx`. A file input, a
   preview `<img>`, an uploading state, and an error message. It takes `value` / `onChange` so it
   drops into react-hook-form via `Controller`. Every feature reuses this; nobody writes a second
   one.

   Validate client-side before uploading: max ~5 MB, and `image/jpeg | image/png | image/webp`.
   That's UX — the real limit is whatever Cloudinary enforces.

## Gotchas for this feature

- **The Cloudinary upload does not go through our axios instance.** `client/src/lib/api.ts` has
  `baseURL: "/api"` and `withCredentials: true`; sending our session cookie to a third party
  would be wrong and the base URL is wrong anyway. Use a bare `axios.post` with the full URL.
- **`CLOUDINARY_API_SECRET` must never reach the browser.** The signature endpoint returns the
  *api key* (public) and a *signature* (derived), never the secret. If you find yourself putting
  a secret in a Vite env var, stop.
- **Upload and save are two steps, and the user can abandon between them.** If someone uploads an
  image then closes the tab, the file exists in Cloudinary with no document pointing at it. Accept
  this for now; a periodic orphan sweep is a stretch goal.
- **Replacing an image leaves the old one behind.** When an update changes `imagePublicId`, destroy
  the previous asset in the same handler.
- **CORS.** The upload goes browser → Cloudinary directly. Cloudinary permits this; our own CORS
  config is irrelevant to that request.
- **Don't put uploaded images in `client/src/assets/`.** Those are ES imports resolved at build
  time. A CMS image is a runtime URL string — the two mechanisms don't mix, and there is no
  `client/public/` directory either.

## Definition of done

- [ ] `POST /api/admin/uploads/signature` returns a signature for a valid folder, `401` when
      logged out, `400 VALIDATION_ERROR` for a folder outside the enum.
- [ ] An admin can pick a file in `ImageUploadField` and see a preview of the hosted image.
- [ ] The resulting `{ url, publicId }` round-trips into a document and back out.
- [ ] Deleting that document removes the Cloudinary asset.
- [ ] Replacing an image destroys the old asset.
- [ ] All three `CLOUDINARY_*` vars are in `server/.env.example`.
- [ ] The endpoint is added to [../05-api-reference.md](../05-api-reference.md).
- [ ] `pnpm lint` passes.

## Stretch goals

Out of scope. Do not build these first.

- Cloudinary transformation URLs for responsive `srcset` (a real win for the gallery later).
- Drag-and-drop and multi-file upload.
- A scheduled sweep for orphaned assets.
- Client-side image compression before upload.
