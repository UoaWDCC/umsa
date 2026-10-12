# Blueprint 05 — Logos and branding

Small, and a good second feature once [00-image-uploads.md](00-image-uploads.md) exists.

The brief asked whether the logo needs to be "a variable throughout" — yes, and it currently
isn't one at all. There is **no logo asset in the repo**. `client/src/components/Navbar.tsx`
renders the literal text "UMSA", and `client/index.html` links a `/favicon.svg` that doesn't
exist (there's no `client/public/` directory either).

So this blueprint introduces the logo as a concept, not just a CMS field for one.

## What the admin can do

- Upload a logo and see it in the navbar and footer.
- Upload a favicon.
- Edit the site name used in page titles and as the logo's alt text.
- Update the Instagram and Facebook links without a code change.

## Decisions already made for you

### One `SiteSettings` singleton for all site-wide chrome

Not a separate model per item. These are all "things that appear on every page and change once a
year", they're always fetched together, and one document means one request.

```ts
// server/src/models/SiteSettings.ts
{
  siteName:         { type: String },   // "UMSA" — alt text and page titles
  logoUrl:          { type: String },
  logoPublicId:     { type: String },
  faviconUrl:       { type: String },
  faviconPublicId:  { type: String },
  instagramUrl:     { type: String },
  facebookUrl:      { type: String },
}
// { timestamps: true }
```

Every field optional with `SETTINGS_DEFAULTS` in the route, same as `HOME_DEFAULTS` in
`server/src/routes/content.ts`. The defaults are the values hardcoded in `Navbar.tsx` and
`Footer.tsx` today, so an empty database reproduces the current site exactly.

**Keep this separate from `SiteTheme`** (blueprint 04) even though both are singletons an admin
edits under "site settings". They have different shapes, different validation and different
consumers, and a combined model means every colour tweak rewrites the logo fields. Two small
singletons, two small editors.

### Endpoints

| Method | Path | Auth | Notes |
|---|---|---|---|
| `GET` | `/api/settings` | public | Merged over `SETTINGS_DEFAULTS`. Never 404s. |
| `PUT` | `/api/admin/settings` | admin | `validate(settingsSchema)`, upsert. |

**Careful:** `/api/admin/settings` in this blueprint is *site* settings. Blueprint 06 uses
`/api/admin/settings/admins` for admin accounts. Those two coexist fine, but if you're building
both, mount the routers so one doesn't swallow the other's paths — or rename this one to
`/api/admin/site-settings`. Agree it with whoever has blueprint 06 before either of you starts.

## Server work

1. **Model** — copy `server/src/models/HomeContent.ts` → `server/src/models/SiteSettings.ts`.
2. **Schema** — copy `server/src/schemas/content.ts` → `server/src/schemas/settings.ts`. URLs as
   `z.url().optional().or(z.literal(""))` so a cleared form field validates. `siteName` trimmed,
   1–60 characters.
3. **Public route** — copy `server/src/routes/content.ts` → `server/src/routes/settings.ts`, with
   `SETTINGS_DEFAULTS`.
4. **Admin route** — copy `server/src/routes/admin/content.ts` →
   `server/src/routes/admin/settings.ts`. When an update replaces `logoPublicId`, destroy the old
   asset.
5. **Mount** in `server/src/app.ts` — admin **below** the `requireAdmin` line.

## Client work

6. **Schema** — copy to `client/src/schemas/settings.ts`.
7. **Hooks** — copy `useHomeContent.ts` → `client/src/hooks/useSettings.ts`, key `["settings"]`.
8. **Navbar** — in `client/src/components/Navbar.tsx`, replace the hardcoded "UMSA" text:

   ```tsx
   const { data } = useSettings();
   // …
   {data?.logoUrl
     ? <img src={data.logoUrl} alt={data.siteName ?? "UMSA"} className="h-10 w-auto" />
     : <span className="font-bold text-xl">{data?.siteName ?? "UMSA"}</span>}
   ```

   **Always keep the text fallback.** With no logo uploaded, or the API down, the navbar must
   still say something.

9. **Footer** — `client/src/components/Footer.tsx` currently hardcodes the Instagram and Facebook
   hrefs. Point them at `data?.instagramUrl ?? <current hardcoded value>`.
10. **Favicon** — the one genuinely fiddly bit. `client/index.html` is static, so a CMS favicon
    has to be swapped at runtime:

    ```ts
    useEffect(() => {
      if (!data?.faviconUrl) return;
      let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
      if (!link) { link = document.createElement("link"); link.rel = "icon"; document.head.appendChild(link); }
      link.href = data.faviconUrl;
    }, [data?.faviconUrl]);
    ```

    Put this in the same hook as the navbar's data fetch, or in `RootLayout`.

11. **Admin page** — copy `HomeContentEditor.tsx` → `client/src/pages/admin/SettingsEditor.tsx`.
    Two `ImageUploadField`s, a site-name input, two URL inputs. Preview the logo against both a
    light and a dark background — logos are usually designed for one and break on the other.
12. **Menu + route** — `{ to: "/admin/settings", label: "Site settings" }` and the matching route.

## Gotchas for this feature

- **`client/index.html` still says `<title>client</title>`** and links a non-existent
  `/favicon.svg`. Fix the title while you're here; it's the browser tab of the live site.
- **Page titles are set imperatively** — several pages do `useEffect(() => { document.title = … })`
  with a hardcoded `"| UMSA"` suffix. If `siteName` becomes editable, those suffixes should read
  from settings, or they'll contradict it. A small shared `usePageTitle(name)` hook is the tidy
  fix.
- **Logo aspect ratio.** Constrain with `h-10 w-auto` and never a fixed width — an admin will
  upload something square and something very wide, and both must look acceptable.
- **Don't delete `client/src/assets/`.** Those imports are build-time assets used by About,
  Sponsors and the project-team pages, and they are not part of this feature.
- **A favicon is not a logo.** It renders at 32px. Keep them as separate fields, and say so in
  the form's help text, or someone will upload a wide wordmark and get an unreadable smudge.
- **Settings load on every public page**, so keep the query's `staleTime` generous (five minutes
  or more) — this data changes about once a year.

## Definition of done

- [ ] `GET /api/settings` returns the current hardcoded values as defaults against an empty
      database — the site looks identical before anyone touches the CMS.
- [ ] Uploading a logo changes the navbar without a rebuild.
- [ ] With no logo, the navbar falls back to the site name as text.
- [ ] Uploading a favicon changes the browser tab icon.
- [ ] Social links in the footer come from settings.
- [ ] Replacing the logo destroys the old Cloudinary asset.
- [ ] Every public page still renders with the server stopped.
- [ ] The `/api/admin/settings` path collision with blueprint 06 has been agreed.
- [ ] Endpoints added to [../05-api-reference.md](../05-api-reference.md).
- [ ] `pnpm lint` passes.

## Stretch goals

- Separate light and dark logo variants.
- Open Graph image and description for link previews.
- More social platforms, as an array rather than fixed fields.
- A contact email and address surfaced in the footer.
