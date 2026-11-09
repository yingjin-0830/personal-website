# Ying Jin — Editorial flat edition

This is the independent `editorial-flat` design experiment. The warm illustrated version is preserved on `main`.

The edition keeps the Home / Professional / Personal paths and the same draft work, projects, education and travel content. It introduces adult-proportion flat fashion illustration, magazine-scale Bodoni Moda headings, fine rules, ivory paper, oxblood and olive tones, and restrained standing/leaning/laptop poses. There is no jumping.

Run this checkout alongside `main`:

```sh
python3 -m http.server 4174 --bind 127.0.0.1 --directory prototype
```

Open http://127.0.0.1:4174/ . Run `main` on port 4173 for comparison.

The active entry is `prototype/index.html`; `editorial.css`, `editorial-refinements.css`, `editorial.js`, `journey.js` and `editorial-content.js` implement this edition. The older illustrated source remains in the branch for reference but is not loaded by the editorial entry.

The active character assets are the 17 transparent lossless WebP pair sheets in `prototype/assets/editorial-hd/`, covering all 34 poses. Each pose is 887 × 887 px, twice the linear resolution of the original atlases. Native PNG outputs are preserved in `source/`. Exact built-in ImageGen restoration prompts are in `prototype/editorial-hd-prompts.json`; the additional Education book poses are documented in `prototype/editorial-education-books-prompts.json`; asset dimensions and format checks are in `prototype/editorial-hd-assets.json`. The original four eight-pose sheets and `prototype/editorial-art-prompts.json` remain available for comparison. The illustration identity is derived from Ying's approved avatar. Personal uses the original user-supplied magnet board.

Professional content combines the user-supplied updated résumé with the correct LinkedIn profile: four work experiences, four academic projects and two education records. Source mapping and logo provenance are documented in `prototype/content-sources.md` and `prototype/assets/logos/sources.json`. At Ying’s request, the supplied résumé is now available as the exact PDF download in `assets/docs/Ying-Jin-Resume.pdf`. The repository upload does not enable GitHub Pages hosting.

Professional is one pinned, vertical sequence: four Work stories, four Projects and two Education stories. Wheel/trackpad and touch scrolling advance through all ten; chapter tabs scroll to a chapter’s first story. Each story has a shareable `#professional/chapter/entry` anchor, and details return to the current story. No horizontal pager controls are loaded.

Page navigation uses a 420ms opacity-only cross-fade, without a character walk or directional exit. Professional chapter tabs share the heading serif family, and the translucent cover name uses a darker 700-weight face.

The pure journey mapping checks run with the bundled Node.js executable and `node --test` from this checkout. They cover story order, chapter boundaries, reverse navigation, resized scroll anchors and overscroll.

The current visual trial uses ten local photographic card covers. Duke shows Duke Chapel; the other nine are illustrative stock photographs, including a library image for UIBE rather than its campus. Photo provenance and licensing are in `prototype/assets/covers/sources.json`, with source links in each story detail. The header uses a code-native monoline YJ mark in `prototype/assets/brand/ying-jin-mark.svg`. Landscape Home layouts move the name and character together by 20–48px for optical balance; portrait layouts keep their original alignment.


Personal is a six-topic lifestyle overview: coffee, cooking, movement, photography, travel and social media. Travel opens an interactive collection built from a CSS walnut frame and twelve independently rendered, original vector magnets in `magnet-art.js` (eleven named places plus one exploring state). The uploaded collection photo remains a reference asset and is not rendered in the Personal page or its details. Each magnet is a keyboard-accessible button with a place-specific detail and a reserved album area. Personal travel photographs, dates and first-person stories still await Ying's content.

The masthead provides English / Simplified Chinese switching through `i18n.js`. Preference is stored locally under `ying-language`; blocked storage falls back to English. Static UI, accessibility labels, metadata, ten Professional stories and Personal details switch together. A mirrored language button inside the modal allows translating the current detail without closing it. Switching retains the active story and native scroll position.


Professional’s resource group puts Résumé / LinkedIn / Contact on the right of the chapter navigation. On phones it gets a separate row, and the pinned stage uses the resulting navigation height. The exact supplied résumé is downloadable; Contact uses `ying.jin0830@gmail.com`, a mailto action and clipboard copy. Contact is also reachable from the Home and Personal footers.

`personal-renderers.js` builds topic, place and contact bodies; `topic-art.js` contains original editorial still lifes. The six-topic overview lives at `#personal`, with the dedicated magnet collection at `#personal/travel`; its back control and browser back/forward return to the correct view. Topic details retain their current view across language changes. Photographs, personal work and social handles await Ying's input; no social accounts or activity records were invented.
