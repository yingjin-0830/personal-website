# Ying Jin — Editorial flat edition

This is the independent `editorial-flat` design experiment. The warm illustrated version is preserved on `main`.

The edition keeps the Home / Professional / Personal paths and the same draft work, projects, education and travel content. It introduces adult-proportion flat fashion illustration, magazine-scale Bodoni Moda headings, fine rules, ivory paper, oxblood and olive tones, and restrained standing/leaning/laptop poses. There is no jumping.

Run this checkout alongside `main`:

```sh
python3 -m http.server 4174 --bind 127.0.0.1 --directory prototype
```

Open http://127.0.0.1:4174/ . Run `main` on port 4173 for comparison.

The active entry is `prototype/index.html`; `editorial.css`, `editorial.js` and `editorial-content.js` implement this edition. The older illustrated source remains in the branch for reference but is not loaded by the editorial entry.

`prototype/assets/editorial-hero.png`, `editorial-work.png`, `editorial-projects.png` and `editorial-education.png` are the selected eight-pose sprite sheets. Exact built-in ImageGen prompts are in `prototype/editorial-art-prompts.json`. The illustration identity is derived from Ying's approved avatar. Personal uses the original user-supplied magnet board.

All résumé fields remain explicitly labeled drafts, pending verification. The repository upload does not enable GitHub Pages hosting.
