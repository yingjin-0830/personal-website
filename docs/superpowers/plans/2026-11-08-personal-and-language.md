# Personal collection and bilingual edition

**Goal:** Replace the reference photo with a separately rendered, clickable six-magnet collection and add a persistent English / Simplified Chinese switch throughout the current editorial prototype.

**Architecture:** Keep the existing static HTML, CSS and JavaScript and the current editorial branch. Code-native SVG artwork and CSS provide the independent magnets and walnut display frame. A separate translation module provides UI messages and recursive content localization; the app re-renders the active story or detail without navigating when language changes.

**Constraints:** Preserve the approved character, photo covers, pinned story sequence and opacity-only page transitions. Do not invent travel dates or personal stories. Do not publish the supplied reference photo as the interactive collection. Keep the brand name Ying Jin and technical product names intact.

- [x] Add locale and content-coverage tests, run them failing, implement translations, and verify.
- [x] Render six original vector magnets with independent accessible buttons, hover/focus feedback and place-specific modal content; keep travel album space ready for supplied photographs.
- [x] Integrate the masthead language button, persistent preference, document language, static labels, dynamic stories, photo credits, modal controls and status announcements.
- [x] Verify all six direct magnet interactions, keyboard/close focus, language persistence, switching inside both detail types, story position, mobile layouts and existing journey tests. Save screenshots.

**Verified:** all six direct magnet opens; keyboard Enter / Escape and focus return; switching language inside both modal types; preference after refresh; Professional scroll position (Kuaishou remained at 837px); layouts at 1470×837, 790×765, 390×844 and 360×740; no browser console warnings/errors.
