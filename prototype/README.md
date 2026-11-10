# Ying Jin — living editorial edition

The `editorial-flat` edition is a buildless bilingual portfolio, published by the repository’s GitHub Pages workflow. Preview it with `python3 -m http.server 4174 --bind 127.0.0.1 --directory prototype`. See the root README for publication and content maintenance.

## Runtime

`index.html` loads `editorial-content.js`, `i18n.js`, `magnet-art.js`, `topic-art.js`, `personal-renderers.js`, `journey.js`, `motion.js`, `personal-book.js` and `editorial.js`. Styling is layered through `editorial.css`, `editorial-refinements.css`, `personal.css` and `living-edition.css`. The older illustrated files remain as archived reference and are not loaded by the current entry.

## Cover and typography

The cover retains the approved adult character identity, with a checked taupe blazer, chocolate knit, blue shirt, wide-leg jeans and loafers. The new transparent four-pose atlas is `assets/living-edition/hero-fashion.webp`: standing, blinking, greeting and thinking. Its native canvas is 1254 × 1254 (four 627 × 627 cells); no 4K resolution is claimed. Original generated PNGs remain in `source/`. Letter-by-letter entrances preserve complete screen-reader text. The translucent Merriweather name remains behind the figure.

English uses local Merriweather-derived webfonts, internally renamed **Ying Editorial Serif** for the licensed subset. Chinese display text uses a Bold Source Han Sans SC-derived webfont, internally named **Ying Editorial Han**. Chinese body text requests installed Microsoft YaHei, then system Chinese sans fonts; YaHei is not redistributed. Font licenses, upstream URLs and source hashes are in `assets/fonts/`. Optional `scripts/prepare-editorial-fonts.py` regenerates subsets from the ignored original font cache; it is not needed to run or deploy the site. The Chinese subset includes GB2312 and all current source characters, with system fallback for any future character outside that coverage.

## Professional

The ten résumé / LinkedIn stories remain: four Work, four Projects and two Education. A pinned stage uses native vertical scrolling to slide horizontally through stories within a chapter. The side chapter rail rolls into the next chapter after the current chapter’s last story. Only the active card is interactive; its adjacent visual handoff is inert and hidden from assistive technology. Reading intervals hold a card at its center, and chapter boundaries use a short vertical fade. Reverse scrolling, PageUp/PageDown/Home/End and direct `#professional/chapter/entry` links follow the same model in `journey.js`.

The scroll coordinator keeps layout-induced scroll events from changing the selected record during viewport restoration. Language switches retain the current story; detail close returns to its anchor. Work / Projects / Education characters keep the approved 887-pixel-per-pose HD outfit sheets in `assets/editorial-hd/`. Their short slide/fade handoff follows the card transition. There is no jump or walking exit.

Résumé / LinkedIn / Contact remain grouped above the stage. The résumé download is the exact user-supplied PDF at `assets/docs/Ying-Jin-Resume.pdf`; Contact uses the résumé’s `ying.jin0830@gmail.com`, mailto and clipboard actions. Company logos, photo licensing and résumé source mapping are in `content-sources.md`, `assets/logos/sources.json` and `assets/covers/sources.json`. Duke’s cover is an actual campus photograph; other stock images are identified as illustrative.

## Personal

Six themes emerge from a CSS 3D book: coffee, wellness, cooking, music, travel and photography. Music replaces the previous social-media theme at Ying’s request. Each independently clickable object scales on hover/focus and opens a zooming themed story. The book can replay its opening. Touch layouts retain large targets and native page scrolling.

The details contain Ying’s supplied coffee, wellness, cooking and travel views, with English / Chinese counterparts. Music and photography have restrained interest copy rather than invented listening history or photographs. Each theme has two generated character poses, stored in two 3 × 2 atlases (`personal-a.webp` and `personal-b.webp`); the 1536 × 1024 native atlases provide 512 × 512 cells. The object atlas uses the same six-cell format. The source PNGs, dimensions, transparency checks and generation notes are in `assets/living-edition/`.

Travel first opens its story, then an explicit button opens `#personal/travel`: the retained walnut display and twelve original vector magnets (eleven places and one exploring state). Browser back/forward and direct Travel links are preserved. Personal photo areas remain labeled placeholders for Ying’s real photos and notes.

The shared transition runner cancels superseded or closing animations and protects replacement ownership. The modal’s close control stays in a fixed location while the story content zooms. System reduced-motion preferences shorten entrances and remove continuous floating; no extra motion toggle is displayed.

## Verification

Run `node --test` from the repository root (Node.js 24 in CI). Tests cover chapter order, horizontal / vertical boundaries, reversals, resized anchors, scroll restoration scheduling, animation replacement/cancel, bilingual narratives, escaping and Travel’s collection action. Visual QA covers wide, narrow and short windows, six topic details, recruiting resources, translations and modal focus. QA captures and responsive test pages are ignored under `prototype/qa/`.
