# Ying Jin — Arc edition v10

This edition reimplements Ying’s supplied `home-reference.html` in the existing static HTML/CSS/JavaScript project. It replaces the old cover, pinned Professional stage and Personal book with an SVG arc homepage and coherent Work/Life pages. No framework or heavy library is added. See [the design system](../DESIGN_SYSTEM.md) for the maintenance contract.

## Run locally

From the repository root:

```sh
python3 -m http.server 4174 --bind 127.0.0.1 --directory prototype
```

Open [http://127.0.0.1:4174/](http://127.0.0.1:4174/). Retain the server while reviewing. The project is a local preview; publication needs Ying’s explicit approval of the current visual result.

## Runtime map

`index.html` restores `yj-mode` through the synchronous `components/mode.js` script before stylesheet paint, preloads Montserrat and loads `editorial.js` as an ES module. Storage reads/writes are guarded. `editorial.css` imports `tokens.css`, `base.css`, and the Chrome/Home/Work/Life/Magnets/Dialog component stylesheets.

`editorial.js` imports the retained global content/localization/magnet files and composes the page modules. `components/routes.mjs` parses fragment routes; `components/site-chrome.js` renders the small wordmark, mode/language controls and one contact footer. Work/Life enter with the shared fade/upward-slide motion. Resume, project and destination details use the shared semantic dialog with focus return. Contact is direct email in the footer; the old Contact popup is removed.

The active routes are `#home`, `#work/<section>`, `#life/<hobby>` and `#life/travel/collection`. Examples: `#work/real-estate`, `#work/projects`, `#work/skills`, `#work/education`, `#life/reading`, `#life/wellness`. Legacy `professional` and `personal` fragments are accepted as aliases. Native browser back/forward and deep links remain part of verification.

## Homepage

`home.js` builds one fixed-viewBox SVG. `components/arc-model.mjs` provides the eight touching annular sectors, their scene rectangles/centers, and the distance-based Dock formula. Clipped scene backgrounds and unclipped matching figure cutouts use the same coordinate transforms. Left-half tiles represent Real Estate, Sales & Marketing, Data & Analytics and Education; right-half tiles represent Coffee, Cooking, Photography and Travel. Sales & Marketing uses the approved side-facing dashboard presentation, and Photography uses the seated-on-steps alternative. Figures paint from the outer edge toward the center on both sides; interaction temporarily promotes the closest figure and restores this resting order afterward without moving the keyboard-focused link.

Pointer/focus interactions activate a half, dim the opposite half and show a compact tooltip. Empty-space activation locks a half for touch use. Keyboard-focusable tiles navigate to the corresponding content. `components/typewriter.js` animates the homepage greeting and Work/Life accent lines, cancels stale timers on route replacement, and immediately shows final text for reduced motion.

## Work and Life

`components/work.js` presents four sourced roles with concise result-focused bullets, four academic projects, three skill groups and both degrees. Dates/metrics come from the existing résumé/LinkedIn content. Keep Deloitte’s retention result qualified as estimated and distinguish Kuaishou’s two GMV-growth contexts.

`components/life.js` presents six blocks: Wellness, Cooking, Travel, Coffee, Music and Photography. Reading has been removed from navigation, content and allowed anchors; old Reading links open Life without an anchor. The existing six narratives are retained. Scene/cut pairs preserve a consistent fashion-illustration identity. No personal photographs, listening records, recipes, fitness results or credentials should be invented.

Travel still opens the approved walnut frame with eleven individual destination magnets and one exploring state. `magnet-art.js` retains the original artwork; the surrounding collection UI and destination dialogs adopt the global typography/palette. The footer preserves `ying.jin0830@gmail.com`, Resume, GitHub and LinkedIn. Resume opens the rendered preview of the exact supplied PDF, with a top-right download; regenerate the preview if the source PDF changes.

## Fonts and illustrations

All interface type uses the Montserrat stack defined once in `tokens.css`. The self-hosted Latin variable WOFF2 is about 35 KB, comes from the official Google Fonts distribution and retains its OFL license. It is preloaded and uses `font-display: swap`. Do not request the old serif/Chinese display assets as independent site families.

The homepage uses paired `_full.webp` and `_cut.webp` files under `assets/illustrations/cover-approved/`, registered on identical 1024 × 1536 canvases. Six source PNGs come from the unchanged `published-style-review/approved/` set. Sales & Marketing selects the approved `sales-marketing-side-presentation-v1.png` and serves the `sales-marketing-presentation` full/cut pair. Photography selects `photography-seated-steps-v2.png` and serves the `photography-seated` pair. Both selected alternatives live under `published-style-review/alternatives/`. Data & Analytics keeps its original standing artwork. The original eight-scene gallery, front-facing Sales & Marketing assets, standing Photography assets and seated Data alternative remain unchanged and available.

Backgrounds use quality-92 WebP without resizing; cutouts use lossless WebP, with exact alpha and visible RGB verified against the generated PNG derivatives. The generated extraction can differ slightly in hair/texture from the scene. See the cover directory’s README and manifest for selected-source provenance and regeneration.

Work’s Education and Life’s Coffee, Cooking, seated Photography and Travel share the corresponding approved 1024 × 1536 WebP pairs. Their dimensions reserve layout space and keep the full/cut layers registered; Life uses the image’s intrinsic aspect ratio. Wellness and Music use individually confirmed additional scenes from `published-style-review/additional/`, encoded to `inner-approved/` by `scripts/prepare-inner-art.py`. The encoder validates approval flags, source hashes, dimensions and visible RGBA. Wellness uses the approved standing stretch scene, and Music uses the approved cross-legged rug scene; unapproved drafts remain outside the runtime. Old reference files and Travel’s wooden frame/magnets remain intact.

Interface colors, type, spacing and general motion durations belong only in `tokens.css`. Component styles reference custom properties. Preserved illustration/magnet pigments are artwork rather than separate UI themes. No inline base64 images or rounded/shadowed interface cards.

## Validation and publication

```sh
node --test prototype/tests/*.test.cjs
```

Keep existing content/localization tests and the new arc geometry/routing tests. Browser QA must include 1440, 1024 and 390 px widths, dark/light modes, no horizontal overflow, name readability, hover/focus/touch activation, keyboard routing, mode persistence, reduced motion, bilingual content and Travel. Reserve image dimensions and the SVG viewBox; verify layout shift after font loading.

WCAG AA contrast in both modes and Lighthouse accessibility ≥95 are requirements to measure. Do not state a Lighthouse score without running the audit, and do not equate viewport simulation with real-phone or Safari testing. Store local screenshots/harnesses under ignored `qa/`; the pre-arc snapshot is `qa/archives/editorial-before-arc/` and is not loaded by the site.

Do not push to the auto-deploying branch or publish until Ying approves the local effect. The existing GitHub Actions workflow deploys `prototype/` from `editorial-flat` only after its checks pass.
