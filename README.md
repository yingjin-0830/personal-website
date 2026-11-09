# Ying Jin — Editorial edition

A bilingual personal portfolio with Professional stories, six Personal interest chapters, an interactive travel magnet collection, résumé download and contact details. The `editorial-flat` branch contains the magazine edition; `main` preserves the earlier illustrated edition.

Website: https://yingjin-0830.github.io/personal-website/

## Preview locally

```sh
python3 -m http.server 4174 --bind 127.0.0.1 --directory prototype
```

Open http://127.0.0.1:4174/ . The site uses plain HTML, CSS and JavaScript; no package installation or build is required.

## Update and publish

Edit files on `editorial-flat`, preview locally, then commit and push to that branch. The [Pages workflow](.github/workflows/deploy-pages.yml) runs the content/navigation tests and deploys `prototype/` automatically. Follow deployment progress in the repository’s Actions tab. A failed check stops publication.

GitHub repository Settings → Pages must use **GitHub Actions** as its source. The workflow only publishes `editorial-flat`; it does not merge or deploy `main`.

## Maintain content

- `prototype/editorial-content.js`: Professional experiences, projects, education and Personal topics/places.
- `prototype/i18n.js`: English and Simplified Chinese UI/content translations.
- `prototype/editorial.css`, `editorial-refinements.css`, `personal.css`: layout and visual styling.
- `prototype/assets/`: character artwork, photographs, logos and the downloadable résumé.
- `prototype/content-sources.md`: résumé/LinkedIn source mapping and asset credits.

Run the existing checks with Node.js 24:

```sh
node --test prototype/tests/*.test.cjs
```

See [prototype/README.md](prototype/README.md) for interaction and asset details. Personal photographs, stories and social links can be added as Ying supplies them.
