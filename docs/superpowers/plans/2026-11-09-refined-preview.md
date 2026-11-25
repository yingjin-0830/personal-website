# Refined Preview Implementation Plan

> Implement within the existing worktree. Keep all changes local for Ying's visual approval.

**Goal:** Apply Ying's nine visual and motion comments, then verify the local preview.

**Architecture:** Retain the static HTML/CSS/JavaScript app, add pure cyclic-rail and wheel-smoothing helpers to journey.js, and reuse the shared detail dialog for the résumé.

**Spec:** ../specs/2026-11-09-refined-preview-design.md

## Constraints

- No publication before explicit approval; do not push the branch.
- Preserve bilingual controls, accessible names, keyboard navigation and the existing PDF/content.
- Preserve the approved character identity and wardrobe; edit posture only.

## Tasks

- [x] Add failing behavior tests for cyclic chapter positions and wheel easing, including reversal, burst input and cancellation.
- [x] Implement and integrate rail looping, frame easing and cancellation with navigation/resize/dialogs.
- [x] Simplify visible copy; refine neutral glass type, font sizes, alignment and monochrome LinkedIn.
- [x] Add résumé preview with top-right download and language-aware labels.
- [x] Integrate the generated upright character atlas and document its provenance.
- [x] Stage closed book → slow opening → compact floating elements, with replay/re-entry cleanup.
- [x] Run the full tests and browser checks: both languages, loop in both directions, card scrolling, résumé preview/download, topic details, narrow layout and quick route changes.
- [x] Save screenshots and present the local preview for approval. Do not deploy.

Verification: 27 Node tests passed. Browser QA confirmed chapter cycling in both directions, card-area scrolling, bilingual résumé preview and a downloaded PDF with the original SHA-256, Coffee/Travel details and keyboard book replay. At 390 × 844 Home/Personal and 844 × 390 Professional there is zero horizontal overflow; the short-screen card caption remains within its card area. Console check reported no warnings or errors. Screenshots: ignored `prototype/qa/refined-cover.png` and `prototype/qa/refined-book.png`.
