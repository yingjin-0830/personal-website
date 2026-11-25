# Portfolio working conventions

Read [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) before visual changes. Ying’s latest `home-reference.html` and arc brief supersede the former warm editorial cover, type system and book interaction. The current direction is one continuous illustrated SVG bowl, Montserrat, dark/light tokens and coordinated Work/Life pages.

Keep the existing buildless stack and `prototype/` structure. `prototype/editorial.css` imports `tokens.css`, `base.css` and the small component stylesheets. All interface colors, font decisions, spacing and motion tokens belong in `prototype/tokens.css`; do not add color/font literals or competing override layers elsewhere. Reuse the ES modules in `prototype/components/` and preserve sourced content/localization. No framework or heavy library.

Keep the eight-sector arc continuous, its full/cut image pairs registered and figures unclipped above tile backgrounds. The homepage and corresponding Work/Life sections use Ying’s approved 1024 × 1536 scenes and generated transparent derivatives in `assets/illustrations/cover-approved/`; Wellness/Music use the reviewed pairs in `inner-approved/`. Preserve source hashes, matched canvases and provenance. The original 900 × 1200 pairs are historical reference-resolution placeholders, not the current inner-page art. Do not conflate the sets or embed base64 images.

Treat phone portrait and MacBook-like laptop landscape as equally important. Check 1440, 1024 and 390 px widths, plus relevant short/narrow windows. Preserve readable type, shared edges, natural scrolling, keyboard access and touch targets around 44 px. Essential interactions must work without hover. Reduced motion shows final states without animation. Report browser, real-device, Safari and Lighthouse verification separately; never claim an unmeasured Lighthouse score.

Preserve Travel’s wooden frame, eleven separate destination magnets, exploring state and interactions unless Ying explicitly asks to change them. Illustrated magnet palettes are retained artwork; surrounding UI uses the current tokens. Do not invent résumé results, personal photos, reading history or credentials.

Use `#work/...` and `#life/...` routes suitable for GitHub Pages; preserve old `professional` / `personal` aliases. Shared chrome, mode persistence, English/Chinese switching, the contact footer and Resume preview/download remain available. Do not restore the old Contact dialog.

The user requires visual confirmation before publication. Keep iterations local. Do not push to the auto-deploying `editorial-flat` branch or publish without explicit approval of the current preview. The pre-arc snapshot under `prototype/qa/archives/editorial-before-arc/` is ignored local reference only.

The initial arc baseline and audit are preserved under tag `v1-baseline-2026-11-24` and branch `codex/baseline-v1-2026-11-24`. Read `BASELINE.md` and `docs/audits/2026-11-24/README.md` before future optimization. Work on a new branch from that tag, keep the frozen audit unchanged, and preserve `main` and the deployment branch unless Ying explicitly requests integration/publication.
