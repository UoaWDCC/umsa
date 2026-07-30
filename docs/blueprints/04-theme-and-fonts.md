# Blueprint 04 — Theme colours and fonts

The intuition in the original brief was right: *if all the colours and fonts are variables, this
should be doable.* They mostly are — `client/src/tokens.css` already defines semantic tokens on
top of a palette. The catch is that **most components ignore those tokens and hardcode colours**,
so the CMS half of this is easy and the refactor half is the actual work.

Read this whole page before writing anything. It's the one blueprint where the design decision
matters more than the code.

## What the admin can do

- Change the site's accent colours and background/foreground colours from a colour picker.
- Choose a heading font and a body font from a small curated list.
- See changes on the public site immediately, with no rebuild and no redeploy.
- Reset to the UMSA defaults in one click.

## Decisions already made for you

### How Tailwind v4 makes this possible

There is no `tailwind.config.js`. Tailwind v4 is configured in CSS, and `client/src/tokens.css`
opens with:

```css
@theme {
  --color-foreground-primary: var(--color-gray-800);
  --color-background-primary: var(--color-gray-20);
  --color-accent1-primary: var(--color-blue-500);
  --color-accent1-secondary: var(--color-blue-300);
  /* …then the full UMSA palette: --color-gray-900 … --color-blue-50 */
}
```

A `@theme` block does two things: it emits those custom properties onto `:root`, **and** it
generates utility classes that *reference the variable* rather than baking in its value. So
`bg-accent1-primary` compiles to roughly:

```css
.bg-accent1-primary { background-color: var(--color-accent1-primary); }
```

Which means overriding the variable at runtime restyles every element using that utility:

```ts
document.documentElement.style.setProperty("--color-accent1-primary", "hsla(160, 70%, 45%, 1)");
```

No rebuild, no CSS-in-JS, no class swapping. That's the whole mechanism.

> **Do not change `@theme` to `@theme inline`.** The `inline` variant substitutes values at build
> time instead of emitting `var()` references, and runtime theming stops working entirely. If
> theming mysteriously does nothing, check this first.

### Store the semantic tokens only, not the palette

The `@theme` block has two kinds of variable: ten semantic tokens
(`--color-accent1-primary`, `--color-background-primary`, …) and roughly forty palette primitives
(`--color-gray-800`, `--color-blue-500`, …).

**The CMS controls the semantic tokens.** The palette stays in CSS.

Giving an admin forty colour pickers guarantees an unusable site. Giving them six named choices —
"accent", "secondary accent", "page background", "body text" — is a decision they can actually
make, and the palette remains a designer's job in Figma.

### Schema

A singleton. There is only ever one theme.

```ts
// server/src/models/SiteTheme.ts
{
  foregroundPrimary:   { type: String },   // "hsla(250, 15%, 20%, 1)" or "#2b2733"
  foregroundSecondary: { type: String },
  backgroundPrimary:   { type: String },
  backgroundSecondary: { type: String },
  accent1Primary:      { type: String },
  accent1Secondary:    { type: String },
  accent2Primary:      { type: String },
  accent2Secondary:    { type: String },
  headingFont:         { type: String },   // one of the allowlist below
  bodyFont:            { type: String },
}
// { timestamps: true }
```

Every field optional, with `THEME_DEFAULTS` in the route — exactly like `HOME_DEFAULTS` in
`server/src/routes/content.ts`. An empty database returns the defaults and the site looks
correct.

**Colours are stored as CSS colour strings**, not as `{ h, s, l }` objects. The value goes
straight into `setProperty`, and any format a browser accepts works. Validate with a regex for
`#rgb`, `#rrggbb`, `rgb()`, `rgba()`, `hsl()` or `hsla()` — this string ends up in a stylesheet,
so an unvalidated value is a (mild) injection surface. Reject anything that isn't clearly a
colour.

### Fonts are an allowlist, not a text field

```ts
export const FONT_OPTIONS = ["system", "inter", "poppins", "playfair"] as const;
```

A free-text font name is a trap: a browser silently falls back when the font isn't installed, so
the admin sees their choice work on their own machine and nobody else's. An enum of fonts the
repo actually ships cannot fail that way.

Ship them properly rather than hotlinking Google Fonts:

```bash
pnpm --filter client add @fontsource/inter @fontsource/poppins @fontsource/playfair-display
```

Import all of them once in `client/src/index.css`; the runtime switch only changes which
`font-family` the CSS variable points at. Three extra font files is a fair price for a font
picker that works, but keep the list to three or four — each one is real bytes on every page load.

### Endpoints

| Method | Path | Auth | Notes |
|---|---|---|---|
| `GET` | `/api/theme` | public | Returns the theme merged over `THEME_DEFAULTS`. Never 404s. |
| `PUT` | `/api/admin/theme` | admin | `validate(themeSchema)`, `findOneAndUpdate({}, …, { upsert: true })`. |

Identical in shape to `/api/content/home`. Copy that pair of files and change the fields.

## The prerequisite refactor

**This is the part that will surprise you.** Components across the app hardcode raw palette
classes rather than semantic tokens:

```tsx
// client/src/layouts/AdminLayout.tsx
<div className="min-h-screen bg-gray-950 text-white flex">
// client/src/App.tsx
<h1 className="text-4xl mt-7 font-bold text-white">
// client/src/components/EventsElement.tsx
className={`… ${element.eventIsDone ? "bg-gray-700 opacity-50" : "bg-gray-900 hover:bg-gray-800 …"}`}
```

Changing `--color-accent1-primary` does nothing to any of those. `bg-gray-950` isn't even defined
in `tokens.css` — it falls through to Tailwind's stock grey.

So a theme feature that stops at the API is a theme feature that visibly does nothing. Before or
alongside the CMS work, migrate public components to semantic tokens:

| Hardcoded | Becomes |
|---|---|
| `bg-gray-950`, `bg-gray-900` | `bg-background-primary`, `bg-background-secondary` |
| `text-white`, `text-gray-400` | `text-foreground-primary`, `text-foreground-secondary` |
| `bg-blue-300`, `focus:border-blue-300` | `bg-accent1-secondary`, `focus:border-accent1-secondary` |

Two notes on scope. The current semantic tokens describe a **light** theme
(`--color-background-primary` is `gray-20`, nearly white) while the site renders dark. Agree the
intended direction with whoever owns the design before mass-renaming classes — the tokens may
need their default values flipped, and that's a design decision, not a code one.

And leave the admin panel hardcoded. An admin who picks an unreadable colour scheme must still be
able to reach the form to fix it. **The CMS must not be able to break itself.**

## Server work

1. **Model** — copy `server/src/models/HomeContent.ts` → `server/src/models/SiteTheme.ts`.
2. **Schema** — copy `server/src/schemas/content.ts` → `server/src/schemas/theme.ts`. A shared
   `cssColor` helper (`z.string().trim().regex(...)`) reused for each colour field, plus
   `z.enum(FONT_OPTIONS)` for the two font fields. All `.optional()`.
3. **Public route** — copy `server/src/routes/content.ts` → `server/src/routes/theme.ts`, with a
   `THEME_DEFAULTS` object mirroring the current values in `tokens.css`, and
   `{ ...THEME_DEFAULTS, ...doc }` on the way out.
4. **Admin route** — copy `server/src/routes/admin/content.ts` → `server/src/routes/admin/theme.ts`.
5. **Mount** in `server/src/app.ts` — admin **below** the `requireAdmin` line.

## Client work

6. **Schema** — copy to `client/src/schemas/theme.ts`, exporting `FONT_OPTIONS` for the picker.
7. **Hooks** — copy `useHomeContent.ts` → `client/src/hooks/useTheme.ts`, key `["theme"]`.
8. **Apply the theme** — a small `useApplyTheme()` hook called once in
   `client/src/layouts/RootLayout.tsx`:

   ```ts
   const { data } = useSiteTheme();
   useLayoutEffect(() => {
     if (!data) return;
     const root = document.documentElement;
     root.style.setProperty("--color-accent1-primary", data.accent1Primary);
     // …one line per token, or drive it from a token→CSS-variable map
     root.style.setProperty("--font-sans", FONT_STACKS[data.bodyFont]);
   }, [data]);
   ```

   `useLayoutEffect`, not `useEffect`, so the properties are set before the browser paints.

   Call it in `RootLayout` only — **not** in `AdminLayout`. See above.

9. **Admin page** — copy `HomeContentEditor.tsx` → `client/src/pages/admin/ThemeEditor.tsx`.
   `<input type="color">` for each colour, `<select>` for the two fonts, a live preview swatch
   row, and a "Reset to defaults" button that submits `THEME_DEFAULTS`.
10. **Menu + route** — `{ to: "/admin/theme", label: "Theme" }` and the matching route.

## Gotchas for this feature

- **`@theme` vs `@theme inline`** — covered above, and it is the single most likely way to lose
  an afternoon.
- **`<input type="color">` only speaks `#rrggbb`.** The tokens are all `hsla()`. Either convert
  on the way in and out, or accept that saving through the picker converts everything to hex.
  Converting is nicer; accepting hex is fine and much less code. Decide once and write it down.
- **Alpha is lost** through a native colour input. If any token needs transparency, that field
  needs a text input rather than the picker.
- **Flash of default theme on first paint.** The theme arrives from an API call, so the page
  paints with `tokens.css` values first. Keep `THEME_DEFAULTS` on the server **identical** to the
  values in `tokens.css` and the flash is invisible until someone actually customises. Don't try
  to fix it with a blocking request — a brief flash is much better than a white screen.
- **`client/src/index.css` has a second, unrelated `:root` block** with `--text`, `--bg`,
  `--accent` and a `prefers-color-scheme: dark` override. Those are leftovers from the Vite
  template, they are not Tailwind tokens, and almost nothing uses them. Don't wire the CMS to
  them. Deleting them is a reasonable side quest, in its own commit.
- **Contrast.** An admin can pick white text on a white background. A minimum-contrast check in
  the editor is a stretch goal, but a "Reset to defaults" button is the cheap safety net and it's
  in the required scope for that reason.

## Definition of done

- [ ] `GET /api/theme` returns sensible defaults against an empty database.
- [ ] Changing an accent colour in the admin panel visibly changes the public site after a save,
      with no rebuild.
- [ ] Changing the heading font visibly changes headings.
- [ ] A garbage colour value (`"; background: url(...)"`) is rejected with `400`.
- [ ] "Reset to defaults" restores the original look.
- [ ] The admin panel remains readable and usable no matter what theme is saved.
- [ ] Public components use semantic tokens, not raw palette classes.
- [ ] The public site still renders correctly with the server stopped.
- [ ] Endpoints added to [../05-api-reference.md](../05-api-reference.md).
- [ ] `pnpm lint` passes.

## Stretch goals

- A contrast checker warning in the editor.
- Saved theme presets to switch between.
- Light/dark variants of the palette.
- Spacing and border-radius tokens (`@theme` supports far more than colour).
- Uploading a custom webfont — genuinely hard; don't.
