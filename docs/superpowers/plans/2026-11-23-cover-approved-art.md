# Approved Cover Artwork Implementation Plan

> **For agentic workers:** Use the existing worktree and execute the authorized local replacement. Steps use checkbox syntax; no publication or git operation is included.

**Goal:** Replace the homepage's eight reference placeholders with Ying's eight approved scenes and matched transparent figure layers.

**Architecture:** Keep one SVG arc and existing interactions. Store new runtime assets separately in `prototype/assets/illustrations/cover-approved/`; preserve originals and old page artwork. Use a 2:3 shared canvas for full/cut layers. Map the right four cover topics to Coffee, Photography, Cooking and Travel.

**Tech Stack:** Existing HTML/CSS/browser ES modules, built-in ImageGen for transparent extraction, Pillow for mechanical WebP encoding and metadata checks, Node test runner.

**Spec:** `DESIGN_SYSTEM.md`, `AGENTS.md`, `prototype/assets/illustrations/published-style-review/approved/manifest.json`, and Ying's instruction to replace the eight cover images. Seated alternatives remain optional assets.

## Global constraints

- Keep changes local; do not push or publish.
- Preserve approved PNGs, eight-image gallery/package and Travel collection.
- Keep one continuous eight-sector ring, matched full/cut transforms, hover magnification, touch/keyboard routing, theme/language and reduced motion.
- Use existing global typography/colors/tokens and no new libraries.
- Verify 1440, 1024 and 390 px browser viewports; distinguish them from actual device/Safari testing.

## Review focus

- New 2:3 artwork must cover the same clips without cropping the full figure.
- Cutouts must preserve source pose/scale/location and alpha; inspect registration visually.
- Coffee/Photography labels and destinations must match their images.
- New cover assets must not replace imagery used by Work/Life pages.
- No image 404s, horizontal overflow or keyboard/theme/reduced-motion regression.

## Tasks

- [x] Inspect worktree and source files; baseline: all 36 Node tests pass.
- [x] Update geometry/route expectations first and observe the expected failures.
- [x] Prepare eight source-derived WebP backgrounds, generated transparent cutouts, metadata and optimized serving files under `cover-approved/`.
- [x] Modify `home.js` and `arc-model.mjs` to use the approved art, correct topics and 2:3 canvases; retain arc geometry/interaction.
- [x] Run the complete Node suite; verify dimensions, alpha, provenance and asset references.
- [x] Inspect desktop/tablet/phone previews, hover/focus/theme/localization and full/cut alignment; make only observed corrections.
- [x] Update design/provenance docs and share the local cover preview with validation limits.

The separate ten-image review package is delegated independently and does not control which cover versions are used.

## Local verification — 2026-11-24

- 37 Node tests pass, including new 2:3, Coffee/Photography routing and symmetric figure-order coverage. Expected pre-implementation failures were observed.
- All eight approved source hashes and sixteen serving-file hashes/dimensions match the manifest. Each lossless WebP cut has exact alpha and exact RGB at every visible pixel relative to its generated PNG. Combined serving payload: 5,512,340 bytes.
- In-app browser viewports: 1440 × 900 dark/English; 1024 × 768 light/Chinese; 390 × 844 dark/English; 1440 × 780 dark/English. No horizontal overflow. Checked cutout alignment and resting face visibility; fixed the outer-to-inner painter order and its restoration after interaction.
- Keyboard focus raises the selected figure without moving the focused link. Coffee and Photography activate their correct Life anchors. Empty-center click locks/unlocks a half while retaining `#home`. Mode/language switching works. Final console warning/error log is empty.
- Screenshots: ignored `prototype/qa/approved-cover-desktop.jpg` and `approved-cover-phone.jpg`. Temporary viewport override reset; dark/English preview left open at `http://127.0.0.1:4174/?preview=10.2-approved#home`.
- This was browser viewport simulation, not physical-device or Safari testing. No new Lighthouse score is claimed. Generated cutout texture can differ slightly from original scenes. Existing Work/Life artwork, Travel magnets and approved source packages remain untouched.
- No commit, push or publication was performed.
