# Ying Jin — living editorial edition

Source: Ying’s redesign brief and four references, followed by confirmation of vertical chapter navigation / horizontal story motion and six Personal themes with music replacing social media.

## Intent

Keep the portfolio useful for recruiting while making it feel more refined, expressive and dimensional. Preserve the approved adult illustrated identity, résumé content, bilingual support, shareable links and GitHub Pages maintenance workflow.

## Agreed experience

- Home: brown checked blazer, chocolate knit over a blue collared shirt, wide-leg blue jeans, loafers and delicate jewelry; no hat or bag. Keep Ying’s existing face and brown wavy hair. The name uses Merriweather with translucent glass-like highlights, fine depth/shadow and the figure overlapping it. Letters enter individually in a short, finite sequence.
- Type: Merriweather for English display text; Source Han Sans SC Bold for Chinese display text. Chinese body text requests Microsoft YaHei, with a locally available system sans fallback on devices without that font. Do not redistribute the proprietary YaHei font. Load licensed open fonts locally for consistent headings.
- Professional: Work / Projects / Education move to a vertical chapter rail. At each chapter, the stage stays pinned and continued vertical scrolling drives seamless horizontal movement through that chapter’s stories. Only the current chapter is visible; after its last story, the chapter rail rolls to the next label. Reverse scrolling follows the same path. Each story has a centered reading interval, remains clickable, and retains its details, company logo, résumé / LinkedIn / Contact resources and character interactions. Preserve deep links, keyboard navigation, resize and language stability.
- Personal: six themes — coffee, wellness, cooking, music, travel, photography. An angled, dimensional book opens on entering the page; theme objects emerge with staggered motion and gently float around it. Elements enlarge on hover/focus and open their story with a zoom transition. Mobile uses a compact, legible arrangement with native touch scrolling and large tap targets.
- Theme symbols: ceramic coffee mug; fit woman in a cap and workout clothes; kitchen/utensils; musical notes; map; camera. Each themed detail also contains the approved character dressed for that interest, with two calm animated poses and a related prop.
- Coffee: experimenting, tasting, and the possibility of a neighborhood coffee shop one day. Wellness: nutrition, movement, investing in health and learning toward nutrition knowledge (an aspiration, not a professional credential). Cooking: kitchen experiments as a way to unwind; Chinese food and lighter meals. Travel: “读万卷书，行万里路” and unlocking the world map. Music and photography use restrained interest copy until Ying supplies more specifics.
- Travel first opens the themed story with an explicit action leading to the existing eleven-place magnet collection and exploring state. Preserve the collection and its navigation. Reserve a clearly labeled photo area for real photographs; do not invent personal albums.

## Approach

Use the existing buildless HTML/CSS/JavaScript site. CSS perspective, transforms, shadows and generated transparent artwork provide the dimensional book and elements. A pure scroll-position model drives the Professional track and can be tested independently of the browser. This keeps deployment and future content updates simple. A canvas/WebGL rebuild would add unnecessary runtime and content-maintenance complexity for these interactions.

## Constraints and completion evidence

- Existing isolated `editorial-flat` worktree; `main` remains the earlier edition.
- New assets are versioned siblings; preserve the current approved artwork in Git history and on disk.
- No continuous jumping, walking exits, motion toggle, invented credentials, personal photos or social accounts.
- Navigation and content work with mouse, trackpad, touch and keyboard. Animations must not block opening or closing content. Respect system reduced-motion through shorter motion while keeping state changes visible.
- Verify all ten Professional stories in both scroll directions, chapter boundaries, detail return, responsive layouts, both languages, all six interests, Travel collection and modal focus. Run the full existing test suite plus meaningful scroll/content tests, JavaScript syntax and local-resource checks. Publish only a verified complete version through the existing Pages workflow.
