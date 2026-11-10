# Living editorial edition — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Implement Ying’s confirmed fashion cover, scroll-driven Professional chapters and interactive Personal book.

**Architecture:** Preserve the current static app, content model and modal. Add a focused motion/style layer and a pure chapter-progress model; use transparent generated artwork for costume and themed characters. Keep the travel collection as a second Personal area.

**Tech Stack:** HTML, CSS 3D transforms, browser Web Animations API, plain JavaScript, Node built-in tests, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-11-09-living-edition-design.md`

## Global Constraints

- Buildless static site in `prototype/`; work on the existing `editorial-flat` branch.
- Six interests, with music replacing social media. Keep existing travel magnets and all ten résumé stories.
- Keep the approved adult identity; no Home hat, bag, jumping or walking exit.
- Merriweather English headings; Source Han Sans SC Bold Chinese headings; YaHei first for Chinese body with system fallback.
- Local generated assets and licensed heading fonts; no fabricated personal photos or qualifications.

## Review Focus

- Large wheel deltas and reverse scrolling must cross chapters without leaving stale interactive cards.
- Language/viewport changes and closing details must retain the active Professional story and scroll progress.
- Enter/Space/Escape and focus restoration must work on floating Personal elements, even during animation.
- Narrow screens and short windows must keep all six objects and recruiting resources reachable without horizontal overflow.
- Direct Travel and Professional links and browser history must resolve to the intended content after reload.

### Task 1: Artwork and typography

**Files:** new `prototype/assets/living-edition/`, new `prototype/living-edition.css`, modified `prototype/index.html`, `prototype/editorial.js`.

**Interfaces:** Generated hero atlas has four cells (2 × 2); Personal character atlases have six cells (3 × 2), with CSS choosing the cell. Fonts and alpha assets live locally. Existing Professional outfit sheets remain in use.

- [x] Generate and visually inspect the new hero, six themed character poses/variants and floating objects; preserve sources and prompts.
- [x] Install licensed local Merriweather and Source Han Sans Bold font files with license/source records; use YaHei/system body fallback.
- [x] Implement glass-like Home lettering and finite staggered letter entrance, with readable text during loading and language changes.
- [x] Check desktop/mobile Home appearance and alpha/asset dimensions; no implementation-mirroring unit tests for styling.

### Task 2: Professional chapter rail and horizontal story progression

**Files:** modify `prototype/journey.js`, `prototype/editorial.js`, `prototype/index.html`; add styles in `prototype/living-edition.css`; extend `prototype/tests/journey.test.cjs`.

**Interfaces:** `chapterProgress(top, range, chapters)` returns `{chapter, chapterIndex, itemIndex, sceneIndex, offset, chapterOffset}` for a chapter timeline with story-reading intervals. `topForChapterScene(sceneIndex, range, chapters)` provides exact stable anchors. The DOM retains `#case-card` as the active interactive card, with an adjacent visual card for continuous handoff.

- [x] First write failing behavioral tests for chapter-local horizontal offsets, centered story intervals, forward/reverse boundaries, large deltas, anchors and zero-height ranges.
- [x] Implement the pure model and pass the full suite.
- [x] Build the left chapter rail and scroll-linked card handoff; update routing, keyboard/resize/language/detail return to the new anchors.
- [x] Browser-check all stories, reversals, direct links and modal restoration. Preserve the resource group and active-only keyboard focus.

### Task 3: Personal book, themed stories and navigation

**Files:** modify `prototype/editorial-content.js`, `prototype/i18n.js`, `prototype/personal-renderers.js`, `prototype/editorial.js`, `prototype/index.html`; new `prototype/personal-book.js` and styles in `prototype/living-edition.css`; update content tests.

**Interfaces:** `YingPersonalView.topicCards(language)` renders six interactive floating elements. `topicBody(id,language)` renders first-person narrative, themed character and photo slots; Travel includes `[data-travel-collection]`. `YingBook.open(container)` replays finite book/object entrance without blocking interaction. Existing `#personal/travel` route remains valid.

- [x] Update tests to require complete bilingual narratives for the six requested interests, Travel’s collection action and safe output for details.
- [x] Replace social media with music, add the supplied first-person narratives and honest music/photography copy with matching Chinese/English.
- [x] Implement the dimensional book, six floating symbols, hover/focus scale and origin-based detail zoom, themed character pose changes and accessible close/focus return.
- [x] Preserve the magnet collection as a nested Travel view, and adapt history/translation behavior.
- [x] Verify keyboard, mobile reachability, all six details and photo placeholders; run the full suite.

### Task 4: Integration, review and publication

**Files:** documentation/asset provenance, cache-version references and deployment source commit.

- [x] Run Node tests, syntax/resource checks and desktop/mobile browser QA; save representative screenshots.
- [x] Request one fresh review of the full diff against the spec; fix material findings with a reproducing check.
- [ ] Update maintenance/source documentation, commit the complete edition, upload with verified Git tree equivalence, confirm the existing Pages workflow succeeds and smoke-check the public URL.
