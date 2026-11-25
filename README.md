# Ying Jin — Work & Life, arc edition

A buildless bilingual personal portfolio with one illustrated arc homepage, matching Work/Life pages, dark/light modes, résumé resources and the retained Travel magnet collection. `home-reference.html`, supplied by Ying, is the visual and interaction source. The initial arc edition is preserved on `codex/baseline-v1-2026-11-24` with tag `v1-baseline-2026-11-24`; `main` preserves the earlier illustrated edition. See [BASELINE.md](BASELINE.md) before starting the next optimization.

[Existing public website](https://yingjin-0830.github.io/personal-website/) — it may not match this archived baseline; saving the checkpoint does not deploy it.

The [frozen diagnosis and screenshots](docs/audits/2026-11-24/README.md) are part of the repository. The archive includes a self-contained HTML report, structured findings and a SHA-256 file inventory.

## Local preview

```sh
python3 -m http.server 4174 --bind 127.0.0.1 --directory prototype
```

Open [the local homepage](http://127.0.0.1:4174/). No package installation, framework or build step is required. Work and Life use GitHub Pages-safe fragments such as `#work/education`, `#life/wellness` and `#life/travel/collection`.

## Maintain the site

Read [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) and [AGENTS.md](AGENTS.md) first.

- `prototype/tokens.css`: all interface colors, typography, spacing and motion tokens, including dark/light mode.
- `prototype/base.css` and `prototype/components/*.css`: shared presentation and small page components, consuming those tokens.
- `prototype/editorial.css`: the single stylesheet entry.
- `prototype/editorial.js`: ES-module application shell, route lifecycle, language and dialogs.
- `prototype/home.js`: arc rendering and interaction; pure geometry/routing helpers and page components are in `prototype/components/`.
- `prototype/editorial-content.js`, `i18n.js`: sourced résumé/project data and English/Chinese content.
- `prototype/assets/illustrations/cover-approved/`: eight selected 1024 × 1536 homepage scenes with registered transparent figures and provenance metadata, including the approved side-facing Sales & Marketing and seated Photography alternatives. Matching Work/Life sections reuse these pairs; additional reviewed Life scenes are in `inner-approved/`. Historical reference artwork, the original eight-scene gallery and other pose options remain available.
- `prototype/assets/fonts/`: self-hosted official Google Fonts Montserrat variable WOFF2 and OFL license.
- `prototype/magnet-art.js`: approved independent Travel artwork; retain it.
- `prototype/assets/docs/`: exact supplied résumé PDF and its rendered preview.

See [prototype/README.md](prototype/README.md) for runtime and verification details. Existing asset credits remain in the source manifests. `prototype/qa/archives/editorial-before-arc/` preserves the pre-redesign state locally and is not part of the runtime.

## Checks

```sh
node --test prototype/tests/*.test.cjs
```

Review 1440, 1024 and 390 px viewport widths in both modes, keyboard/touch routes, reduced motion, bilingual copy, pop-out image alignment and Travel. Lighthouse accessibility ≥95 is the requested target; report only an actual measured audit result. Passing tests or viewport checks alone does not establish Lighthouse, Safari or real-device results.

## Publication

The baseline branch is a versioned backup and does not trigger deployment. Publishing remains subject to Ying’s explicit approval. After that approval, the [Pages workflow](.github/workflows/deploy-pages.yml) tests and deploys `prototype/` from `editorial-flat`; it does not merge or deploy `main`. GitHub Pages must use GitHub Actions as its source.
