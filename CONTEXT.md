# UMSA local prototype — working context

Read this first if you're picking up mid-build with no memory of the session.

## What this is

A **throwaway local prototype** of the UMSA site, cloned from `UoaWDCC/umsa` and fully
disconnected from git (no `.git`, no remote, no CI, no husky). Built for a demo. Nothing here
is kept — the whole folder gets deleted.

Location: `/Users/alanna/umsa-demo-local`

## Hard constraints

- **Completely local.** No database, no Express server, no network calls at runtime.
- **Git**: this now lives at `git@github.com:alannasantoso/umsawebsite.git` (private,
  `main`). It was originally kept git-free as a throwaway; that no longer applies.
  Pushed over SSH as `alannasantoso` — there is no `gh` CLI and no credential helper
  configured, so HTTPS pushes will prompt.
- Run with the client only: `pnpm --filter client dev` → http://localhost:5173
- Preview launch config lives in `/Users/alanna/.claude/launch.json` as `umsa-client`.

## Architecture decisions already made

**There is no backend.** `client/src/lib/api.ts` swaps axios' adapter for
`client/src/mocks/adapter.ts`, which serves every `/api/*` route from in-memory data seeded
from `client/src/mocks/data.ts`. Toggle `USE_MOCK_API` in api.ts to go back to the real thing.
The Express server in `server/` is untouched and unused.

Mutations (admin edits) persist in module memory for the life of the tab — reload resets them.
That is intentional for a demo.

**Sponsor regions are INVENTED.** The four areas (Central / East Auckland / North Shore /
West Auckland) and every sponsor's assignment to one were made up to demo the Frame 99
grouping — nobody has confirmed where these businesses actually trade. They are editable in
the admin (Sponsors → Area). Fix them before this goes anywhere real.

**Sponsor logos are placeholders.** Only Gong Cha and Nene Chicken are real, extracted from
the embedded bitmaps in the Review Two `Frame 99` export; every sponsor alternates between
those two so the ticket's logo tile has something in it. `logo` is decorative, not a claim.

**Sponsors are REAL.** The 34 entries in `sponsors` are the club's actual 2026 discount
partners, transcribed from UMSA's own sponsor carousel. Names and offers are theirs — do not
swap them for made-up ones. `url`/`instagram` are **optional and deliberately sparse**: only
nine could be verified against an official site or handle (Gong Cha, Tsujiri, Nene Chicken,
Ippondo, Escape Masters, Sambal Station, Game On, OnQ/Skyworld, Metrolanes). Leave the rest
empty rather than guessing — a ticket with no link renders as a plain card instead of an `<a>`,
which is the correct outcome. Guessing a handle points members at the wrong business.

**Names**: every person is a character from *Everything Everywhere All At Once*
(Evelyn Wang, Waymond Wang, Joy Wang, Gong Gong, Deirdre Beaubeirdre, Becky Sregor, Chad,
Jobu Tupaki). Do not invent realistic-sounding fake student names.

**Photos**: locally generated SVG placeholders in `client/src/assets/placeholders/`.
No remote image URLs — it must work offline.

## Design source

Figma: `UMSA Design` — https://www.figma.com/design/eLX4tD87yXcIkL71nBiA4i/UMSA-Design

Accessed via Claude in Chrome (the Figma Dev Mode MCP server would not start — port 3845
never bound; not worth retrying mid-demo).

**The design is LIGHT themed** — white/off-white background, royal blue + red accents,
Malaysian-flag inspired. The original repo code was dark themed; that was wrong and has been
replaced.

Design language:
- Bold display headings, often two-tone (half blue, half red) e.g. "MEET THE **TEAM**"
- Torn/wavy section dividers
- Star and sparkle decorations scattered around
- Blue footer with logo + link columns + social icons
- Navbar + scrolling marquee strip beneath it
- Team page = scattered **polaroid cards** at slight rotations
- Events page = horizontal **banner cards** with starburst, title, READ MORE button, photo right

### Tokens (already correct in `client/src/tokens.css`)

Verified against the Figma variables. Semantic tokens:

| token | maps to |
|---|---|
| foreground primary/secondary/tertiary | gray 800 / 600 / 300 |
| background primary/secondary/tertiary | gray 020 / 050 / 100 |
| accent1 primary/secondary | blue 500 / 300 |
| accent2 primary/secondary | red 300 / 100 |

Key hexes: blue-500 `#2727DC`, blue-300 `#7B7BEA`, red-300 `#FF5252`, red-100 `#FFCCCC`,
gray-800 `#2E2B3B`, gray-020 `#F9F9FB`.

Fonts: `Sekuya` (display/headings — the one with the slashed O), `Inter` (body). Both load
from Google Fonts; verified 200.

**Desktop frames are 1440px wide.** home is 1440×2957, EVENTS is 1440×2910.

### Per-page design notes (measured from the file, not guessed)

**Navbar** — white/near-white bar, NOT blue. Blue Sekuya links, uppercase, wide tracking.
Mascot crest logo left. Red `LOGIN` pill right, sitting on a hard offset shadow.
Top level is HOME / ABOUT / EVENTS / SPONSORS / PHOTOS; **ABOUT opens a dropdown** — a
near-white rounded panel with a soft shadow holding ABOUT US, CONTACT, OUR TEAM. The trigger
is still a real link to /about, and the panel opens on hover or keyboard focus.
Below it a blue marquee strip: white text repeated, separated by chunky red stars.
The **home** frame runs "I ♥ MALAYSIA"; every other frame runs "WELCOME TO UMSA".

**Home** — hero "WELCOME TO" (blue) + "UMSA" (red); small right-aligned tagline; mascot
illustration; then a full-bleed group photo band; then "WHAT IS UMSA?" with body copy, a
second mascot, and a red READ MORE pill; then "OUR EVENTS" (red) as a **coverflow carousel** —
three cards, centre one full size/opacity, neighbours scaled back and dimmed, red ❰ ❱ arrows,
blue SEE MORE EVENTS pill. Red cloud bottom-left, blue cloud bottom-right.

**Events** — 825x301 band with a V notched **down** through the top edge and **up** through
the bottom edge a fifth of the way in, and a **six-tooth sawtooth right edge**. Sparkle left,
display title, READ MORE pill, photo right with a 6px near-white border. Behind it sits a
second card of the same silhouette in the opposite tint. Both cards cast a hard, unblurred
`10px 15px` offset shadow — pink casts red, lavender casts blue — and **those two shadows are
the "red and blue rules" under each card**, not separate zigzags.
"UPCOMING" is RED + "EVENTS" blue; "PAST" is blue + "EVENTS" red. Both centred over a
red / lavender / pink star trio. No tag pills, no date or location on the card face.

**Team** — the cards are **solid coloured cards, not white polaroids**: a near-white photo
well at the top, then a row of three small white social glyphs (heart / comment / send), then
the ROLE over the NAME in white uppercase. The fill changes every two cards, running
periwinkle -> blue-500 -> red-300 -> red-600 -> gray-500 -> gray-700. Loose desk objects:
chunky blue glasses, a red and a blue pen, two erasers stamped with a star, and the grey NOTE
pad. "UMSA 2026 / COMMITTEE" bottom-left, UMSA red and the rest blue.

**Sponsors** — with 34 partners the tickets run **two-up from `lg`** and the list pages at
10 per page, with a name/offer search above it. The card itself is the frame's 829x266
**ticket**: a 49px semicircular notch bitten out of each long
edge at mid height, two dashed perforation lines a tenth in from each end, a salmon SEE ALL
badge at 71.8% across. Body / plate / second-line colours cycle
blue-700+red-600 -> red-600+gray-900 -> gray-900+red-600. Both layers cast a hard
`-8px 15px` periwinkle shadow. "UMSA2026 / SPONSORS" bottom-left with three pale sparkles.

**About** — a fixed 1440x1922 composition. A red S-curve with an arrowhead sweeps from the
crest down to the bottom right, echoed by a **pink dashed line** (`stroke-dasharray 20 40 60
80`). CULTURE sits left of the curve near the top, COMMUNITY right of it in the middle, both
in tiny justified uppercase Sekuya. Big blue sparkles pin the curve's inflections; red clouds
top-right, a periwinkle one mid-left. "A HOME AWAY FROM HOME." centred at the bottom.

**Photos** — two clusters of 550x373 polaroids (photo inset 35px sides, 43.5 top, 114.5
bottom; hard `6px 10px` black-25% shadow) at scattered rotations, with handwritten blue
captions. A big camera illustration hangs off the left edge, rotated -17.7 degrees.

**Contact** — an 800x404 white card, radius 40, holding four rows on a 77px pitch: a 48px
round icon badge (red on the first row, blue after), a small uppercase label, then the value
in Sekuya. Three red **outline** stars run down the left margin. "REACH OUT!" right-aligned
below, with the star trio to its left.

### Decoration primitives

`client/src/components/ui/Decor.tsx` — `Sparkle` (long thin 4-point, blue), `Star` (chunky
organic, red), `Starburst` (dense many-point), `Cloud`, `Zigzag`. None of them position
themselves — pass `absolute` in `className` at the call site.

## Assets — downloads now WORKING

Chrome's multi-download block is resolved (the allow-rule had been saved to the wrong Chrome
profile — there are 8; it must be set in the *same window* as the Figma tab).

**How to pull assets:** select ONE page frame in Figma → Inspect panel → Assets → Images →
`...` → "Download all images". A whole-section selection fails with "too many source images".
Chrome delivers a zip to `~/Downloads/UMSA Design_img.zip`; unzip and copy in. The `source/`
folder inside the zip holds the full-resolution originals.

### Already imported

- `client/src/assets/brand/mascot-sit.png` — blue cat, sitting (home hero)
- `client/src/assets/brand/mascot-cap.png` — cat in a cap ("WHAT IS UMSA?")
- `client/src/assets/brand/umsa-logo.png` — full-res 2048 crest (replaced the 75px one)
- `client/src/assets/brand/mascot-guitar.png` — cat with a guitar (Team page NOTE pad)
- `client/src/assets/photos/home-hero.png` — the lawn group photo
- `client/src/assets/photos/event-1..3.png`, `event-4.jpg` — event card photos

### Decoration vectors — now REAL

`Download all icons` on the Icons panel (separate `...` from Images) yields the true vector
set. Raw SVGs kept in `client/src/assets/decor/`. The path data is inlined verbatim into
`components/ui/Decor.tsx` so the fill stays themeable:

- `Vector 90` → `Sparkle` (tall 8-point, 119×167)
- `Vector 38` → `Star` (chunky organic; viewBox widened to `0 -15 79 100`, the art overflows
  its own frame and clips otherwise)
- `Vector 43` → `Starburst` (dense 24-point, 28×28)
- `Group 17/18` (236×66) = the pink star trio under headings — not yet used directly
- `Cloud` and `Zigzag` are still hand-drawn; no Figma equivalent was in the icon export

### ⚠️ THE BIG MISS — use frame SVG exports, stop redrawing

Repeated feedback: shapes were being hand-approximated instead of taken from Figma. Three
export menus exist and all three are needed:

1. **Images** `...` → photos/mascots (PNG zip)
2. **Icons** `...` → the star/sparkle/starburst vectors (SVG zip) — found late
3. **Export panel** (bottom of Inspect) with format switched **PNG → SVG** → exports the
   WHOLE FRAME as vectors. This is the one that yields the ticket cards, the glasses, the
   notebook, the pen — everything that is neither a photo nor a registered icon.

`client/src/assets/frames/` now holds EVENTS, SPONSORS, PHOTOS, CONTACT and ABOUT as frame
SVGs. Embedded photos are base64 inside them.

The geometry that mattered has been pulled out of these and inlined as **objectBoundingBox
clip-paths** (`SponsorTicket.tsx`, `EventBanner.tsx`) or verbatim markup
(`components/AboutDecor.tsx`, `components/Camera.tsx`) so it scales to any width.

**Geometry located in EVENTS.svg** (index = order of long `<path>` elements):

| idx | fill | what |
|---|---|---|
| 31, 44, 49, 30 | `#E9E9FB` | lavender event-card bodies |
| 32, 42, 43, 37 | `#FFE6E6` | pink event-card bodies |
| 33, 38, 45, 52 | `#FF5252` / `#2727DC` | card starbursts |
| 20, 26, 34, 39 | `#FF5252` | red display type outlines |
| 13 | `#2727DC` | the torn-edge footer band |

The card bodies are ~6-point polygons with a notch — that is the real "ticket" silhouette.
Extract the `d` attribute and apply it as a `clip-path` on the card, rather than approximating
with `border-radius` + mask gradients (a mask approximation was tried and rejected).

**Still to export as frame SVG:** MEET THE TEAM (glasses, pens, NOTE pad, erasers) and home.
Both are currently hand-built from close reading of the frame at high zoom.

### Still to pull, page by page

- ~~ABOUT, MEET THE TEAM, PHOTOS, CONTACT, SPONSORS~~ — all pulled.
- Only the **home** frame has not been exported as SVG.

`client/src/assets/placeholders/avatar-*.svg` are now deliberately neutral (near-white well,
pale grey figure) because the design's photo wells are empty. Do not re-colour them.

## Animation intent (Figma page "Review Two")

The `animations` section of that page is the source for motion, and it changes what the
back-plate *is*:

- **Event cards** (Section 1, Frames 73/76/78): on hover the card behind **slides down** to
  reveal LOCATION, a dashed rule, then DATE and TIME side by side. The plate is an
  information card, not decoration.
- **Sponsor tickets** (Frame 99): the same idiom — the ticket's plate slides out to show what
  the sponsor is offering. The board shows a rotating stack of offers per region; the
  prototype has no offer list, so it reveals `sponsor.blurb` instead.

Both are implemented with a spring (`stiffness 220, damping 30`), the content cross-fading in
behind a 0.12s delay, and the hovered card raised to `z-20` so it clears the next one.

Review notes on the same page (not yet actioned): UMSA prefers version 2; they want a video
trailer section (video due end of July); some spacing/alignment fixes; palette approved.

## Build log

- [x] Clone + git disconnection + deps installed
- [x] Mock API adapter replacing Mongo, persisted to sessionStorage
- [x] Full CRUD for members / events / sponsors / gallery / faqs
- [x] Figma design extracted (tokens, per-page layouts, decoration shapes)
- [x] **Exact Figma hexes** in tokens.css (was hsla approximations — blues were 1 off);
      verified rendered: nav #F9F9FB, links/headings #2727DC, LOGIN pill #FF5252
- [x] Navbar (white bar, blue links, red LOGIN pill) + blue marquee
- [x] Event cards with the blue-over-red zigzag rule; sponsor tickets with notched edges
- [x] Home events as a coverflow carousel
- [x] **Home page rebuilt with real artwork** — mascot beside the heading, tagline top-right,
      full-bleed lawn photo, cap mascot in the WHAT IS UMSA band
- [x] **About page rebuilt** — two-tone "ABOUT US…", crest, animated red winding arrow with
      arrowhead, CULTURE (red star) / COMMUNITY (blue sparkle) with uppercase Sekuya body copy,
      clouds pushed to -z-10 so they never sit over the text.
      NOTE: the ABOUT frame has **no unique photo assets** — its character is all vector, so
      nothing needed importing beyond the crest already in place.
- [x] **Team page rebuilt** — one scattered polaroid wall (the design does NOT group by
      section, so the old section headings were removed), inline SVG desk objects (glasses,
      pen), a grey NOTE pad carrying the guitar mascot, and a left-aligned red
      "UMSA 2026 Committee".
      NOTE: the Figma polaroids are **empty placeholder frames** — there are no real member
      photos in the file, so the generated avatar SVGs stay.
- [x] **Events page rebuilt** — real photos (`event-5/6.png` from Frame 17/18). Key
      correction: card tints alternate warm/cool **by position**, NOT by upcoming-vs-past as
      first built, and cards step alternately left/right down the page. "UPCOMING EVENTS" is
      all blue; "PAST EVENTS" is blue + red; both sit above a red/blue/pink star trio
      (`StarRow` in Events.tsx). Zigzag rule under each card is tinted to match.
- [x] **Sponsors rebuilt** — real ticket silhouette as a clip-path, twin plate, perforation
      lines, SEE ALL badge, "UMSA2026 SPONSORS" sign-off
- [x] **Photos rebuilt** — polaroid pile at the frame's rotations with script captions
      (Caveat, added to the Google Fonts link), camera illustration copied verbatim
- [x] **Contact rebuilt** — GET IN TOUCH + star trio, the white detail card with icon badges,
      outline stars down the left margin, REACH OUT! right-aligned. The message form is NOT
      in the design; it is kept under "REACH OUT!" because it is the only interactive piece
      on the page
- [x] **Events corrected** — was badly off. Real notched/sawtooth silhouette, twin plates
      whose hard shadows form the red and blue rules, UPCOMING red + EVENTS blue,
      PAST blue + EVENTS red
- [x] **About rebuilt as a fixed stage** — the frame is a fixed composition, so above `md`
      the page is a `1440/1922` box with everything placed in per-cent and type in `cqw`;
      below `md` the same copy stacks. This is what stopped the arrow running over the text
- [x] **Team rebuilt** — solid coloured cards (not white polaroids), glyph row, role over
      name, desk objects, two-tone sign-off
- [x] **Footer rebuilt** — right-aligned link column, centred crest, left-aligned column with
      three white social circles. No wordmark, tagline or rule; the frames have none
- [x] **Hover reveals** from the Review Two board on both event cards and sponsor tickets
- [x] **Sponsors regrouped by area** per Review Two `Frame 99`: a region ticket per area with
      a SEE ALL badge that expands its stack in place; searching cuts across areas and drops
      the accordion. Ticket badges became the frame's white logo tile
- [x] **Team rebuilt as the frame's composition** — a fixed 1440 x 3183 stage with every card
      at its real frame coordinate, not a flex-wrap. The desk objects (glasses, pens, erasers,
      NOTE pad + its three doodle bitmaps) are extracted verbatim from `TEAM.svg`
- [x] **Real 2026 committee** — 15 members with degree / ethnicity / MBTI / artist / bio /
      handle, revealed on hover
- [x] **Footer torn edge** is the frame's actual polyline, not a hand-written approximation
- [x] **home hero corrected** — one full-width line, mascot centred beneath, the two pale
      pink lines right and bottom-left, "I ♥ MALAYSIA" marquee
- [x] **Navbar** — ABOUT dropdown (see above), burger menu carries every page
- [x] **Admin overhauled** — icon sidebar with the crest and the signed-in address, collapsing
      behind a bar below `lg`; entry counts; skeletons while loading; card rows with hover
      lift; a proper header/body/footer modal; branded focus rings on every field
- [x] **Responsive + first-paint pass** (see below)
- [ ] Old assignment pages under `pages/project-team/` untouched and still dark-themed

## Deployment

Live at **https://umsa-demo-2026.surge.sh** (Surge, free tier, account
alannasantoso22@gmail.com — unverified, so `surge verify` is still worth running).
Surge deployments do not expire; redeploying overwrites the same URL.

```
npx vite build && cp dist/index.html dist/200.html && npx surge ./dist umsa-demo-2026.surge.sh
```

`dist/200.html` is the SPA fallback and must be re-copied after every build —
only `public/_redirects` is copied automatically. Without it, deep links 404.

## Responsive and first-paint notes

Things that were wrong and are easy to reintroduce:

- **Fonts are self-hosted in `public/fonts/`, latin subset only** (`src/fonts.css`).
  They used to come from Google, and that was the single biggest first-paint cost:
  the boot screen was held for **1619ms** while DOM was ready at 51ms, because
  `document.fonts.ready` was waiting on a CSS round trip to fonts.googleapis.com
  and then files from fonts.gstatic.com. Self-hosted, the same measurement is
  **134ms**. Do not put the Google `<link>` back.
  Note Google only publishes **Sekuya at weight 400** — the 300/500/600/700 that
  were being requested never existed, and bold headings are synthesised.
- **The boot screen waits for fonts *and* first-viewport images, both capped**
  (900ms / 1200ms). It exists to make the first paint deterministic, not to hide
  a slow site; if a cap is ever being hit regularly, fix the payload instead of
  raising the cap.
- **Root font was 17px.** That is why everything read as "zoomed in". It is 16px now; don't
  put it back.
- **The marquee track must be wider than the viewport**, or the `-50%` loop shows a gap. A
  zoomed-out browser makes the viewport far wider than any fixed number of copies covers, so
  `Marquee` measures one copy and derives the count from the strip width. Verified seamless at
  1440 / 1920 / 2560.
- **Size display type against its container, not the viewport.** The home hero was
  `clamp(…, 6.4vw, …)` inside a `max-w-7xl` box, so on a wide screen it outgrew the box it
  sits in. It is `min(7.4cqw, 5.5rem)` with `container-type: inline-size` on the wrapper.
- **The page-level `AnimatePresence mode="wait"` is gone, and must stay gone.**
  The router renders the incoming route immediately, `mode="wait"` discarded it
  while the outgoing page finished its exit, then mounted it a second time — so
  every entrance animation ran, vanished and ran again. Measured: cards mounting
  at +38ms and again at +327ms (the 280ms exit). Each page brings its own
  entrance, so the wrapper bought nothing.
- **Never wrap an absolutely-positioned element in `Reveal`.** The wrapper is a
  static, zero-height box; its slide drags the positioned child around before it
  settles. This bit both the About stage and the Team heading. Put the
  positioning on the animated element itself.
- **`pathLength` and `strokeDasharray` are mutually exclusive.** Motion
  implements draw-on by rewriting the dash array, so animating `pathLength` on
  the events trail silently flattened the frame's 40/80/120/160 dashes into a
  1px hairline.
- **Ticket and event silhouettes are CSS `polygon()` utilities**, not SVG
  `clip-path: url()`. Sixteen SVG clip references on a page each force their own
  clipping pass; the polygons composite far more cheaply.
- **Photos come from the `source/` folder of the Figma image export.** The
  versions pulled out of the frame render are only 213x273 — display resolution —
  and turn to mush the moment anything shows them larger.
- **`Reveal` fires at `amount: 0`.** Waiting for a quarter of the element left content that
  was already on screen at load sitting blank — that was most of the "load glitch".
- **Fixed-composition stages animate on mount, not on scroll.** This bit About *and* Team:
  the scroll observer measures an aspect-ratio-sized stage before it has settled, and every
  child stays at opacity 0. `PolaroidCard` takes a `fluid` prop for exactly this — on the
  stage it animates from mount, in the wrapped mobile fallback it still animates on scroll.
- **Watch rotated SVG viewBoxes.** The NOTE pad is a 475 x 658 rect rotated 11.5 degrees about
  its top-left corner, which throws its real bounds out to x -9..588 / y 1404..2144. A viewBox
  sized to the unrotated rect clips it into a wedge.
- **The original About stage note:** It used `Reveal` wrappers around
  absolutely-positioned children: the wrapper was a static, zero-height box, so the observer
  fired against the wrong geometry and pieces arrived late or not at all. Absolute positioning
  now lives on the animated element itself and the whole stage runs off `initial`/`animate`.
- No horizontal overflow on any route at 390px; team cards go two-up on phones; the About
  pillar copy is only justified in the wide stage.
