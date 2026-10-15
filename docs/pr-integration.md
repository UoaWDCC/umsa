# Open PR integration — 15 October 2026

The alanna/design-backend-integration branch now descends from the original UMSA main history and all six reviewed PR heads. Original contributor commits, authors and dates are preserved. Six local merge commits record their integration; the redesigned frontend and additional API work are recorded as separate integration commits for review.

These changes adapt the following unmerged PRs into the redesigned, API-backed local site.
The original PRs remain open upstream. This draft integration PR does not merge them into main or deploy the site.

| PR | Author | Reviewed head | Work incorporated |
| --- | --- | --- | --- |
| [65](https://github.com/UoaWDCC/umsa/pull/65) | Minahil-S55 | a7ad579bd5dc71ee9810846de06d10d8f75a3aaf | About squiggle, clouds, stars, mascot and Culture/Community composition; footer wave/badge. Fluid desktop canvas, stacked mobile page and shared navigation prevent clipping and duplicate headers/footers. |
| [62](https://github.com/UoaWDCC/umsa/pull/62) | jzchenn | f2e78c6d7594d4e54de9ea36f13be868622dfca0 | Committee grouping/order, offsets, colours, desk artwork and MemberInfo profiles. MongoDB records replace mock roster; stable IDs, optional details, image fallback and touch/keyboard profile controls. Committee editable in admin; older records fall into Other. |
| [61](https://github.com/UoaWDCC/umsa/pull/61) | Twu1738 | ba006fc552f0f844907e5c3391b4a1d5df5d62f0 | Homepage mascots/group photo, event-carousel arrow artwork and bounded three-card carousel. Uses API events and actual links, retaining CMS headings/body and existing responsive navigation/events filters. |
| [56](https://github.com/UoaWDCC/umsa/pull/56) | nryuzl | 9ca3ebec55d44b13c5c67ae910c4ee549893b278 | Reusable rolling marquee, alternating star artwork and duplicated track, with viewport sizing, reduced-motion support and hidden duplicate accessibility content. |
| [55](https://github.com/UoaWDCC/umsa/pull/55) | nryuzl | 758a4c0c63b1fda0a48e2a6c72664bf6c234adc8 | Homepage executive-team CTA and optional introduction-video slot, configured in Homepage text. Existing branding, tagline, about copy and sponsor navigation are retained. |
| [48](https://github.com/UoaWDCC/umsa/pull/48) | Twu1738 | e9d0762d3c491bae10d1742c46e67bd11b60a813 | Gallery scale-in/stagger animation with reduced-motion support, retaining database albums, filtering and lightbox. |

The overlapping older homepage routes were reconciled into the existing `/` route.
Sample rosters, fake event descriptions, repeated gallery test photos, placeholder text,
the prank YouTube video and changes disabling CMS requests were not imported.
The optional video URL must be an HTTPS YouTube embed URL; it is blank until configured.
Existing self-hosted Sekuya avoids adding duplicate external font requests.

Validation: run `pnpm build`, `pnpm --filter server test:integration`, and
`pnpm --filter client test:pr-ui`. Database tests use and remove an isolated test database.
Browser visual QA remains unverified because the in-app browser policy blocked inspection.
