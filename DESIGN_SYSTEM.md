# Ying Jin — Arc design system, v10

The current source of truth is Ying’s supplied `home-reference.html` and her accompanying arc-homepage brief. This replaces the previous warm-paper editorial cover, mixed typography, pinned Professional stage and Personal book. Keep the project buildless: HTML, CSS, browser ES modules and the existing content files.

## Files and ownership

- `prototype/tokens.css`: the only source of interface colors, font family/weights/sizes, tracking, spacing and motion tokens. It also owns the single `@font-face` declaration.
- `prototype/base.css`: reset, shared typography, content frame, focus behavior, group dimming, page entry and reduced motion.
- `prototype/editorial.css`: the single stylesheet entry, importing tokens, base and the small stylesheets in `prototype/components/`.
- `prototype/home.js`: homepage SVG rendering and pointer, touch, focus, tooltip and Dock interaction.
- `prototype/components/arc-model.mjs`: pure arc geometry and magnification calculation.
- `prototype/components/typewriter.js`: shared greeting/accent-line animation with cancellation and reduced-motion handling.
- `prototype/components/mode.js`: synchronous mode restoration before first paint; `site-chrome.js` renders shared controls and footer.
- `prototype/components/work.js`, `life.js`: semantic page content and the Travel collection.
- `prototype/components/routes.mjs` and `prototype/editorial.js`: route parsing, page lifecycle, shared chrome, language and dialogs.
- `prototype/editorial-content.js`, `i18n.js`, `magnet-art.js`: retained sourced content, bilingual localization and approved magnet artwork.

Do not introduce another stylesheet override layer, framework or heavy animation library. Component CSS consumes the global tokens; do not add color or font literals there or in UI JavaScript. Structural SVG coordinates and artwork pixels are separate from interface styling. The preserved magnets retain their illustrated palettes; their surrounding UI uses the new tokens.

## Palette and typography

Dark is the default. `:root[data-mode="light"]` replaces the palette tokens. Reference colors are dark blue-gray, warm pale ink and a restrained orange accent; the exact current values live only in `tokens.css`. Muted text has been strengthened from the reference where needed for readable contrast. Use `--bg`, `--ink`, `--muted`, `--accent`, `--dim` and the derived thin `--line`; never invent local hex values.

One family serves the whole site: Montserrat, followed by Helvetica Neue, Arial and sans-serif. The small Latin variable WOFF2 is self-hosted from the official Google Fonts distribution, preloaded and declared with `font-display: swap`; its OFL license is retained in `assets/fonts/`. Missing glyphs use the shared stack’s browser fallback. Do not load the old serif or language-specific display families.

- Display/name/page titles: weight 900, tracking −.035em, uppercase and deliberately large. The homepage name is two lines, `YING` / `JIN.`; page titles are `WORK.` and `LIFE.`. The final period always uses the accent token.
- Section headings: weight 800, tracking −.01em.
- Kickers: weight 500, 12–13 px, uppercase, tracking .3em, muted ink.
- Greetings/accent lines: weight 300 and accent ink.
- Body: weight 400, 16–17 px, line height 1.6, approximately 65 characters per line.

Use shared `--text-*`, `--title-*`, `--weight-*`, `--tracking-*` and `--space-*` tokens. Keep at least 16 px side gutters, generous vertical rhythm and consistent content edges. No rounded or shadowed UI cards. Thin outlined skill pills are an explicit exception for shape, not filled chips. The mode control is circular.

## Homepage composition and interaction

One fixed-viewBox SVG forms one continuous bowl-shaped annular ring, with eight touching sectors from 186° to −6°. Zero degrees points right; positive angles follow SVG coordinates. The two four-tile halves meet at 90° at the bottom. Only a 2.5 px background-colored separator divides adjacent tiles. Do not turn it into detached cards, a carousel or two independent arcs.

Professional is left: Real Estate, Sales & Marketing, Data & Analytics, Education. Personal is right: Coffee, Cooking, Photography, Travel. Sales & Marketing uses the approved side-facing dashboard presentation; Photography uses the seated-on-steps alternative. Data & Analytics keeps the original standing scene. Center the greeting and the two-line name inside the bowl; preserve the corner labels and their hierarchy. Wellness and Music remain available on the Life page; Reading has been removed at Ying’s request.

Each background scene is clipped by its own annular-sector clipPath. Its matching transparent figure is an unclipped sibling in a layer above all backgrounds. Both images use identical 2:3 canvas dimensions, image placement and transforms so they stay registered. At rest, paint figures from outer to inner on both sides so neighboring feet and props do not cover faces. Temporarily promote the closest/focused figure and restore this order when interaction ends; never reparent the focused link. Pop-out figures may extend beyond their tile frames, while the responsive stage contains horizontal overflow.

No hover: all tiles use the shared idle saturation/brightness filter. Active half: full color; opposite half: grayscale at `--dim`, with the opposite corner label at 25%. Dock magnification applies only to the active half: `1.04 + .24 × max(0, 1 − distance / 300)`, measuring distance in SVG coordinates. Bring pairs above 1.12 to the front. Tile and figure must move together. Tooltips use ink background, background-colored text, a strong title and one subtitle.

Tiles are focusable links with accessible names and an accent focus outline. Keyboard activation navigates to the same content as pointer activation. Empty-space clicks toggle the active-half lock for touch users. Essential navigation must not require hover. Below 700 px, shrink the same continuous ring and adjust type tokens without making the name illegible.

## Shared pages and chrome

Work and Life use a light header: a small `YING JIN.` wordmark linking home and the same mode toggle in the top-right position. No heavy navbar. English/Chinese switching and the single shared footer remain available. The footer contains direct email, Resume preview/download, GitHub and LinkedIn. Do not restore the old Contact popup or duplicate per-page resource strips.

Work contains the four-role result-focused timeline, four academic projects, grouped outlined skill tags and two education records. Retain sourced dates, results and their qualifiers. Life contains six blocks: Wellness, Cooking, Travel, Coffee, Music and Photography. Reading is removed from navigation and content; old Reading links open Life without an anchor. Do not invent personal photos, credentials or project outcomes.

Life illustrations use the same full-scene / transparent-cut layering as the homepage, allowing the figure to extend beyond a thin frame. Item groups reuse restrained sibling dimming on hover/focus. Body copy and optional photographs stay in the shared page frame.

Travel is the approved wooden frame with eleven independently clickable destination magnets and one exploring state. Preserve the frame, individual artwork and existing destination interactions. Its new route is `#life/travel/collection`; the surrounding heading, text, controls and dialog adopt this design system.

GitHub Pages-safe routes use fragments: `#home`, `#work/real-estate`, `#work/projects`, `#work/skills`, `#work/education`, `#life/wellness`, `#life/travel`, and `#life/travel/collection`. `professional` and `personal` fragments remain legacy aliases. Back/forward, deep links and language changes must retain a coherent location.

## Motion

Use one easing: `cubic-bezier(.2,.8,.2,1)`. General durations are 200, 350 and 600 ms, defined in the token file. Page entry combines a fade with a 12 px upward slide over 350 ms.

The explicitly specified typewriter cadence is the timing exception: 700 ms initial delay, approximately 150 ms between letters, each fading over 500 ms; remove the blinking accent caret 2 seconds after the last letter. Use this same helper for Work/Life accent lines. Cancel timers and listeners when a route is replaced.

`prefers-reduced-motion: reduce` shows the final state immediately, without animated magnification, typewriter, blinking, page slides or continuous effects. Do not add a separate motion switch.

## Image provenance

The homepage uses eight approved scenes under `prototype/assets/illustrations/cover-approved/`: paired `_full.webp` and `_cut.webp` files, both 1024 × 1536. Six sources come from the unchanged `published-style-review/approved/` set. Two approved alternatives are selected: `sales-marketing-side-presentation-v1.png` → `sales-marketing-presentation` and `photography-seated-steps-v2.png` → `photography-seated`, both under `published-style-review/alternatives/`. The original eight-scene gallery, front-facing Sales & Marketing pair, standing Photography pair and seated Data alternative remain available. Homepage selection is explicit in `scripts/prepare-approved-cover.py` and the cover manifest; source PNGs and packaged galleries remain immutable while the alternatives register tracks later approvals and selections.

The matched-canvas transparent PNG derivatives and their prompts/provenance are retained beside the serving files. These are generated extractions, with possible small hair/texture differences, rather than exact pixel masks. The manifest records selected source hashes, alpha bounds and encoding; lossless cutout encoding verifies exact alpha and RGB at all visible pixels. Only hidden RGB under fully transparent pixels is discarded.

Work’s Education and Life’s Coffee, Cooking, seated Photography and Travel reuse the corresponding approved 1024 × 1536 full/cut WebP pairs. Keep identical intrinsic canvases for each pair; Life’s scene image reserves its own ratio in normal flow, with its cutout layered above it. Education uses a matched 2:3 canvas. Wellness and Music receive individually reviewed native-resolution scenes under `published-style-review/additional/`; serve approved pairs from `inner-approved/` using `scripts/prepare-inner-art.py`. Never encode an unapproved draft. Wellness selects the approved standing stretch scene; Music selects the approved relaxed cross-legged rug scene. Old reference files remain as historical assets. Preserve provenance and do not reintroduce inline base64 assets.

## Verification and publication

The primary requested viewport widths are 1440, 1024 and 390 px. Also check a short MacBook-like content window and narrow phones when changes affect fit. Confirm no horizontal scroll, readable names/titles, separate touch targets, keyboard routing, mode persistence, reduced motion, pop-out alignment, dialogs, bilingual content and the unchanged Travel collection.

Reserve image dimensions and the SVG viewBox; preload the single font and verify actual layout shift rather than assuming it is zero. Verify WCAG AA contrast in both modes. Lighthouse accessibility ≥95 is a target: only report a score after an actual audit, including the tested route/mode/viewport and any limitations. Browser viewport simulation is not physical-device or Safari testing.

Run `node --test prototype/tests/*.test.cjs`; retain existing content checks and add focused geometry, routing and interaction checks for the new implementation. Keep local screenshots/test harnesses under ignored `prototype/qa/`. The pre-arc snapshot is `prototype/qa/archives/editorial-before-arc/`, a local-only rollback reference, not a runtime dependency.

All work remains a **local preview awaiting Ying’s visual approval**. Do not push to the auto-deploying branch, retry a deployment or publish without her explicit approval of the current effect.
