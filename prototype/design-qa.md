# Concept 01 — visual and interaction check

Date: 2026-11-07

Scope: a disposable, clickable brainstorming sketch authorized by the user. This is not the final visual design or a production implementation. The supplied images are structural inspirations; no one-to-one recreation or final-animation fidelity is claimed.

## Evidence

- Card reference: `qa/reference-cards.png`, copied from the user's first attachment.
- Personal reference: `assets/magnet-board.jpeg`, the user's original photograph, unchanged.
- Browser-rendered desktop evidence: `qa/home-desktop.png`, `qa/projects.png`, `qa/personal.png`.
- Browser-rendered mobile evidence: `qa/home-mobile.png`, `qa/education-mobile.png`, `qa/detail-mobile.png`, `qa/personal-mobile.png`.
- Tested CSS viewports: 1280 × 720 and 390 × 844; the visible user preview was also inspected at approximately 781 × 765.
- Desktop screenshots are 1280 × 720; mobile screenshots are 390 × 844. No density normalization or pixel equivalence with the inspiration images is asserted.
- Both original references and their corresponding implementation screenshots were opened together in one comparison tool result. The comparison covers large inset card covers, white rounded card frames, serif hierarchy, the original photo, and hotspot placement. The projects screenshot shows the beginning of a scrollable chapter, so the card captions continue below its viewport.
- Focused mobile screenshots inspect the education card, guide, and detail dialog; they are sufficient to read the relevant text and controls.

## Required visual surfaces

- Typography: Instrument Serif display headings and DM Sans controls render successfully. Project titles use editable typography instead of fabricating screenshots of unverified work. Local fallbacks are provided.
- Spacing: two-column desktop cards; one-column mobile cards; chapter-local scrolling. The desktop hero fits 1280 × 720 with document height 720, scrollY 0, and no horizontal overflow. The mobile home fits 390 × 844 with document width 390 and scrollY 0.
- Color: consistent paper, charcoal, rust and sage tokens; inset cover colors vary by topic. Final branding remains open for discussion.
- Assets: generated provisional avatar is copied into the project with real transparency and four outfits. Personal board uses the exact supplied photo; the six labels correspond to identifiable magnets. Travel detail imagery is explicitly labeled as the original collection photo, pending real albums.
- Copy: employer, education and projects are identified as unverified LinkedIn-index drafts. No project outcome metrics, fabricated résumé claims, or invented travel stories are published as verified facts. English navigation with Chinese drafting notes is intentional for this review version.

## Primary interactions exercised

- Welcome → Professional and Welcome / Professional → Personal.
- Work → Projects → Education navigation and chapter scrolling.
- Education direct link `#professional/education`: observed graduation outfit and education/scroller top alignment within one pixel after settling.
- Work and project cards: character flight, correct modal title and content.
- Education detail on mobile: readable single-column content and visible close button.
- Escape and close button: dismiss the modal and restore focus to the triggering card. The Work test restored the `sunlight` card focus.
- Boston photo hotspot on desktop and mobile: opens the matching travel detail and closes with Escape.
- The Concept 01 control opens the discussion and content checklist.
- Browser warning/error logs were checked after exercising these flows: zero reported entries.
- Reduced-motion handling was reviewed in CSS and application logic; OS-level preference emulation was not exercised.

## Findings corrected during review

1. [P2] At shorter desktop heights, hero minimum height plus an initial `#home` anchor could scroll and clip the header. Reduced the desktop minimum height, adjusted avatar sizing, restored top position on pageshow, and captured the final 1280 × 720 hero with full header and no vertical overflow.
2. [P2] The mobile guide's speech overlapped card text. Added a dedicated 86 px dock and reserved that space in the mobile chapter viewport. Post-fix evidence: `qa/education-mobile.png` shows the guide and speech beneath the content viewport.
3. [P2] Hidden line breaks joined sentences in the mobile intro and collection heading. Preserved those line breaks; the post-fix education and personal states render distinct lines.
4. [P2] CSS smooth scrolling could temporarily overwrite direct chapter links on entry, and late scroll callbacks could change outfits after leaving Professional. Entry now scrolls instantly to its requested chapter; chapter tracking only runs within Professional. Post-fix direct-link check observed `#professional/education`, graduation outfit and aligned section top.

## Remaining design decisions

- Character appearance, screen coverage, medium, motion pacing and sitting poses.
- Full tunnel, curtain and page-turn animation; the current two-frame wave and transforms are deliberately preliminary.
- Whether final magnets should be separate transparent objects on a designed board.
- Verified résumé, target roles, projects, albums, contact information and language choice.
- Final GitHub repository and public deployment.

Final result: passed

This result applies only to the reviewed interaction sketch. Production accessibility, performance, complete browser coverage, final asset fidelity, and public deployment remain future work.

## Avatar revision — user-selected identity

The user subsequently selected their existing ChatGPT cartoon avatar as the character reference. The exact source is saved as `assets/ying-avatar-reference.png`; the selected derived four-outfit sheet is `assets/ying-avatar-outfits.png`. The earlier fictional character is retained as an unused comparison asset.

Opened and inspected the actual reference image before generation, then inspected the generated sheet and the rendered site. New evidence: `qa/home-avatar-update.png` and `qa/education-avatar-update.png` at the visible 781 × 765 viewport. The brown wavy hair, sunglasses, wink, smile and 2D sticker contour remain recognizable. The education guide selects the graduation column at background-position-x 100%; hero and guide both load the new asset with 400% × 200% sprite sizing. No horizontal page overflow or browser warning/error entries were observed in this revision.

The asset change passes the interaction-sketch review. Animation is still a preliminary two-frame wave rather than final rigged motion. The avatar's final screen coverage can be refined with user feedback.

## Character motion revision — wide-leg jeans and scene reactions

The latest user request supersedes the earlier sunglasses and two-frame treatment. The current selected assets are `assets/character-casual.png`, `assets/character-professional.png`, `assets/character-creative.png` and `assets/character-graduate.png`. Each is 1774 × 887 with eight registered poses in a four-by-two layout. All four were inspected visually; none include sunglasses. Casual/project scenes have blue wide-leg jeans. Open-eyed idle, blink, wave poses, opposite walking steps, thinking and celebration are present.

All selected assets have an alpha range of 0–255 and transparent top-left corners. The first project-outfit render had a cloudy semitransparent background; a targeted ImageGen extraction preserved the poses and registration while removing that background. The corrected asset was selected and inspected in the Projects scene.

The current controller selects pose frames and adds breathing, sway and bounce; scene travel uses native browser animations. It respects reduced-motion preferences, provides Pause / Play, and stops requesting frames while the document is hidden. Reduced-motion and background suspension logic were reviewed; OS preference emulation and hidden-tab timing were not exercised directly.

Observed browser checks at desktop 1280 × 720 / visible preview approximately 781 × 765, and mobile 390 × 844:

- Clicking the hero produced happy frame 7 with the celebration CSS animation, thinking frame 6, and a waving state observed on frame 3. Idle uses breathing, with timed blink poses.
- Pause set the sprite's animation state to paused and kept frame 7 unchanged across separate observations; Play resumed the controller. Enter also triggered the hero's happy reaction.
- The guide entered jump frame 7 when a Work card was clicked. The full landing sequence opened the correct Sunlight Development dialog.
- Pausing during a jump still opened the intended detail. Escape closed it and resumed the expected guide state after Play.
- Changing to Personal during a pending jump canceled the old detail; no stale dialog appeared.
- Clicking Boston produced a walk state on frame 5 before opening the correct Boston dialog. The dialog closed with Escape.
- Projects and Education selected the correct image URLs and outfits. The mobile education card's animated interaction opened the correct Duke detail.
- Mobile document width matched the 390 px viewport; all six header controls fit inside it. The mobile hero was moved up 12 px to separate the jeans/shoes from the caption.
- Browser warning/error logs were checked after these interactions and returned zero entries.

Evidence: `qa/character-happy.png`, `qa/character-thinking.png`, `qa/character-projects.png`, `qa/character-education-mobile.png`, `qa/character-mobile-final.png`, and `qa/character-home-final.png`.

No actionable P0/P1/P2 issue remains within this animation-sketch scope. Final articulated sitting, curtain and page-turn actions remain future refinement; the current movement is an eight-pose sprite system rather than a finished skeletal rig.

## Professional pinned stage and card interaction revision

This revision supersedes Professional's stacked scrolling and fixed corner guide. Scope is Professional only; Home and the Personal magnet collection retain their previous character controller.

Work, Projects and Education now occupy one sticky stage, with a scroll-controlled hold and transition between chapters. Inactive chapters are hidden, inert and excluded from the accessibility tree. A separate seated actor sits on card edges; scrolling drives anticipation, a curved jump, outfit change and landing. Projects have a horizontal carousel with Previous / Next controls. Opening a card plays a cover-pulling pose and peels its cover; the same actor moves into the native detail dialog and sits on its top edge. Closing returns it to the selected card.

Three new transparent eight-pose sheets were generated from the approved avatar. Each is 1774 × 887 RGBA, with alpha range 0–255 and transparent top-left corners. A background-removal pass repaired the Work sheet while preserving registration. Prompts and paths are in `professional-pose-prompts.json`.

Observed browser checks at desktop 1280 × 720, the final 781 × 765 preview, and mobile 390 × 844:

- Work, Projects and Education fit the viewport with the character seated on a card. Mobile document width is 390 px, with no horizontal page overflow.
- Forward scroll pauses on each chapter and scrubs the jump. A mid-transition observation showed exactly one visible chapter and the airborne pose; the character remained below the chapter navigation. Reverse scrolling returned from Education to Projects, still with exactly one visible chapter.
- Project controls moved to the next card, updated the counter to 02 / 03, and left the character seated on that card.
- Clicking a project visibly created the peeling cover and pulling pose before opening the correct detail. The actor then lived inside the dialog and sat above the detail sheet.
- Escape closed the detail, removed the temporary sheet wrapper, restored focus, and returned the actor to the selected card. The measured hip anchor was approximately 2 px below the card edge.
- Pausing during mobile card opening still opened the intended Sunlight detail. Leaving Professional during opening canceled the pending dialog and removed the cover clone.
- Entering Personal restored its original corner guide; the dialog had no Professional class or sheet wrapper remaining.
- Final browser warning/error logs returned zero entries. Reduced-motion logic is present and reviewed; OS preference emulation was not performed.

Findings corrected during this pass:

1. The stage's `data-chapter` attribute collided with a broad document click handler, intercepting card clicks. Chapter navigation now matches only `button[data-chapter]`.
2. A high jump arc clipped the character behind the chapter navigation. The arc is constrained by available headroom.
3. Clicking a different project did not update the carousel count. The selected perch and counter now update together.
4. Project browsing initially allowed the actor to reposition during carousel movement. A preparation phase now holds its position before the jump.

Evidence: `qa/professional-stage-final.png`, `qa/professional-detail-final.png`, `qa/professional-mobile-work.png`, and `qa/professional-mobile-detail.png`.

Passed for this local interaction sketch. Pose changes and travel are sprite-based, and the cover-opening effect is a prototype for a later articulated curtain or page-turn animation. Professional content remains an explicitly unverified draft; no deployment was performed.

## Directional homepage and gentle handoff revision — 2026-11-08

The latest accepted direction replaces jumping with small translations and fades. This supersedes the previous jump-oriented QA notes. The user's additional requests for a bag-free smaller homepage avatar, stronger name hierarchy, typography motion, directional attention and richer card activities are included in this revision.

The homepage now uses `assets/hero-thinking-poses.png`: idle, blink, wave, thought, three-quarter turn, full profile and two walking poses. No bag, strap or sunglasses. Clicking the character always selects the thoughtful pose; it no longer triggers a celebration or jump. Left/right entry attention uses a three-quarter turn and mirrored profile. The side walk takes 1.75–2.6 seconds, followed by a 180 ms page fade. The name has a staggered entrance and a short underline reveal.

Professional supplements its existing art with three `professional-*-activities.png` sheets: standing thought, standing/seated laptop work, blinks, profile walking and pointing. Same-level movement uses walking poses; different-height destinations use fade handoffs without an airborne path. Candidate rest positions avoid visible text; wide layouts can use a card-side position, while compact layouts fall back to a top perch. Chapter transitions show one chapter and use a small translation plus fading; detail opening/return and carousel follow also use the new travel behavior. The cover-pulling interaction remains.

Verified in the browser at 1280 × 720, 390 × 844 and a shorter 390 × 700 layout:

- Homepage name/character proportions and bag removal were visually inspected. Mobile document dimensions matched the viewport; on the short screen the caption ended at y502 and entry buttons began around y537, with no overlap.
- Keyboard focus on each entry selected turn frame 4 and the correct left/right orientation. A click selected profile walking frames before the destination appeared. Hover shares the same attention handler; a standalone native hover capture was not available in the browser tool.
- Clicking the hero selected `thinking`, frame 3, from the new sheet. No celebration invocation remains in the homepage handler.
- Standing thought, laptop work, walking, seated work and graduation outfits were visually observed. A same-level Work activity used walk frame B.
- A mid-scroll sample at progress 0.751 selected only Work, kept a seated laptop pose with opacity approximately 0.049, and had no leap pose or arc. Old cached JavaScript initially displayed the prior jump; versioned CSS/JS URLs were added and the new behavior was rechecked.
- Clicking the second project opened the correct “A fresh perspective” detail, placed the actor inside the dialog, and Escape returned it to the stage with no temporary detail wrapper remaining.
- Mobile horizontal native scrolling moved the carousel to scrollLeft358, counter02/03, and the actor followed onto the second card. Explicit project controls were also exercised.
- Pausing during mobile detail opening still opened the intended detail; Escape, resume and Professional → Personal navigation completed correctly.
- Personal's content and original guide behavior remain intact. Global route transitions now use a small fade/translation instead of the old portal overlay.
- Browser error/warning logs were empty after these checks. Reduced-motion behavior is present and source-reviewed; OS preference emulation was not performed.

New sheets are 1774 × 887 RGBA with alpha 0–255 and transparent corners. Exact built-in ImageGen prompts and project asset paths are saved in `animation-v3-prompts.json` and `animation-v4-prompts.json`. Evidence includes `qa/animation-v4-home-thinking.png`, `qa/animation-v3-home-mobile.png`, and `qa/animation-v3-professional-mobile.png`.

Passed for the current local prototype. No public deployment was performed.
