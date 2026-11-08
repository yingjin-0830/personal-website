# Ying Jin — Interactive concept 01

This is a local, disposable interaction sketch, not the production website. It uses native HTML/CSS/JavaScript and has no package dependencies or backend. It can also be opened directly through `index.html` if a preview server is unavailable.

Run from this directory:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173/ in a browser.

## Included

- Full-screen greeting and two routes, with direct navigation.
- The name leads the homepage with a staggered letter entrance and a short underline reveal. The smaller homepage character has no bag or straps.
- Hovering or keyboard-focusing either side turns the character toward it. Selecting a side plays a true profile walk out of the viewport before entering that route; Pause completes the departure safely.
- Animated character based on the user's current ChatGPT cartoon avatar, with four outfits and eight registered poses per outfit.
- Long blue wide-leg jeans for casual and project outfits; no sunglasses in the current scenes.
- Natural idle breathing and blinks, greeting, a walking cycle, thinking and celebration. Click the homepage character to change its reaction.
- A Pause / Play control; keyboard activation and reduced-motion handling.
- Work / Projects / Education share one pinned screen. Scrolling holds each chapter, then scrubs a small translation and a fade into the next chapter; two chapters never share the screen. Direct chapter links remain available.
- A seated character lives on the Professional cards, blinks, reacts to hovering, moves between cards with walking or fade handoffs and changes outfits between chapters. Projects have horizontal browsing controls.
- Professional's activity loop adds standing thought, laptop work, edge walking and different perches. At wide sizes the character can also move beside a card; candidate positions are checked against visible text, and compact layouts use a safe top perch.
- Clicking a Professional card makes the character pull open its cover, fade onto the detail sheet and sit on its edge. Closing returns the character to the selected card. Personal retains its earlier walking interaction.
- Pausing or changing routes safely completes or cancels pending actions.
- Original magnet-board photo with six clickable place hotspots and a place index.
- Native modal keyboard handling, Escape, focus restoration and reduced-motion support.
- Responsive layout and direct hash links such as `#professional/projects`.
- The Concept 01 button opens the list of design decisions and content still needed.

## Scope to discuss

- Refining the selected 2D sticker identity and the smoothness of articulated poses.
- Final portal and articulated curtain / page-turn animation. The current seated, walking and cover-opening sequence is an interaction study using registered sprite poses.
- Target jobs, verified work and education details, metrics, case studies, résumé and contact details.
- English or bilingual content.
- Individual transparent magnet assets versus the current photographic board; travel stories and albums.
- Later public GitHub Pages publication; no repository or deployment is created by this sketch.

## Asset and content provenance

- `assets/magnet-board.jpeg`: original user-supplied photo, copied without editing.
- `assets/ying-avatar-reference.png`: the user's exact current account-avatar image, used at their request as the character reference.
- `assets/character-casual.png`, `assets/character-professional.png`, `assets/character-creative.png`, `assets/character-graduate.png`: the current eight-pose sheets derived from that reference using built-in ImageGen. Preserve the sticker style and brown wavy hair, with multiple expressions, no sunglasses, and wide-leg blue jeans in casual/project scenes.
- `assets/professional-work-poses.png`, `assets/professional-projects-poses.png`, `assets/professional-education-poses.png`: eight registered action poses per chapter, used exclusively on the pinned Professional stage and detail sheets. Projects retain blue wide-leg jeans.
- `assets/hero-directional-poses.png`: eight bag-free front, turn and left-profile walking poses; rightward travel mirrors the profile.
- `assets/professional-work-activities.png`, `assets/professional-projects-activities.png`, `assets/professional-education-activities.png`: thought, standing/seated laptop work, blink, profile walk and pointing poses in each outfit.
- `assets/ying-avatar-outfits.png`: the previous four-outfit sheet, retained for comparison and no longer selected by the UI.
- `assets/ying-outfits.png`: the previous provisional sprite, retained for comparison and no longer selected by the UI.
- Font families: Google Fonts Instrument Serif and DM Sans, with local serif/sans fallbacks.
- Professional source: https://www.linkedin.com/in/yingjin08/ via public search index. Full profile fetch was blocked (HTTP 999). Dates, degrees, titles and project claims require the user's verification. No project metrics are treated as verified.
- Reference 1 informs the large rounded cards, inset covers and editorial serif titles. This sketch is an interpretation of the user's brief, not a reproduction of the other designer's work or projects.

The Home / Personal sheets each use four equal columns and two rows: idle, blink, wave A, wave B, walk A, walk B, thinking and happy. `character-motion.js` plays those poses and `character-motion.css` adds breathing, sway and bounce.

The Professional sheets use the same grid with a separate sequence: seated, seated blink, seated wave, crouch, leap, landing, pulling a cover and seated pointing. `professional-story.js` controls the pinned stage, scroll-driven travel, card perches, carousel, cover opening and detail return. `professional-story.css` scopes these layouts to Professional. One actor is reparented into the native dialog so it can stay above the detail card.

See `professional-pose-prompts.json` and `character-motion-prompts.json` for exact generation prompts, and `avatar-reference-notes.md` for the approved identity source. `avatar-outfits-prompt.txt` and `asset-prompt.txt` preserve earlier versions. All selected image assets live inside this project.

`home-stage.js` / `home-stage.css` manage the homepage typography, directional attention and exit sequence. `animation-v3-prompts.json` records the built-in ImageGen prompts for the current homepage and additional Professional activity sheets.

The latest user-selected transition removes jumping from Professional chapters, activity changes and detail handoffs. It uses short walking movements on the same level, or a subtle fade-out / fade-in at different heights. Homepage walking now takes 1.75–2.6 seconds plus a short page fade. Clicking the homepage character always plays the thoughtful pose from `assets/hero-thinking-poses.png`, recorded in `animation-v4-prompts.json`.
