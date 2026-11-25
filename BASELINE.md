# Initial arc portfolio baseline — 2026-11-24

This checkpoint preserves the website Ying reviewed as the initial edition, together with its design diagnosis. Later optimization should be compared against this version rather than silently replacing the reference.

## Baseline identifiers

- Repository: [yingjin-0830/personal-website](https://github.com/yingjin-0830/personal-website)
- Snapshot branch: `codex/baseline-v1-2026-11-24`
- Frozen tag: `v1-baseline-2026-11-24`
- Runtime: `prototype/`, buildless HTML/CSS/browser ES modules.
- Design contract: [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) and [AGENTS.md](AGENTS.md).

The Git tag identifies the exact commit; no self-referential commit hash is embedded here. This backup branch does not match the Pages workflow’s `editorial-flat` branch filter. Saving the checkpoint is separate from publishing it. `main` and the existing deployment branch are preserved.

## Included website state

- One continuous eight-sector arc, Montserrat, dark/light mode, English/Chinese switching and shared footer resources.
- Eight individually approved homepage scenes; Sales & Marketing uses the side-facing dashboard presenter and Photography uses the seated camera pose.
- Work: four sourced roles, four academic projects, skill groups and two education records, with the approved high-resolution graduation illustration.
- Life: Wellness, Cooking, Travel, Coffee, Music and Photography. Reading is removed. All six use corresponding native 1024 × 1536 scene/cut pairs; Wellness is the approved stretch pose, Music is the approved relaxed cross-legged rug pose.
- Travel: wooden frame, eleven separate destination magnets and the exploring state, plus existing details.
- Exact supplied résumé and its preview, direct email, GitHub and LinkedIn resources.
- Approved original PNGs, alternatives, rejected draft history, generation prompts, provenance, review galleries, delivery ZIPs and preparation scripts.

## Frozen diagnosis

- [Archive guide](docs/audits/2026-11-24/README.md)
- [Illustrated report](docs/audits/2026-11-24/report.html)
- [Structured findings](docs/audits/2026-11-24/audit.json)
- [Archive checksums](docs/audits/2026-11-24/manifest.sha256.json)

The report contains eight review steps and eight prioritized findings. The archive bundles its screenshots, tokens, font and license so it can be opened after checkout without depending on future site styles. The ignored working QA folder remains local; the durable evidence is in `docs/audits/2026-11-24/`.

The audit findings are intentionally not fixed in this checkpoint. The suggested next order is: entry points and phone composition; professional evidence and personal content; motion, focus, PDF reading and measured performance/accessibility.

## Continue later

Start a fresh optimization branch from the frozen tag, for example:

```sh
git switch -c codex/optimize-v1 v1-baseline-2026-11-24
python3 -m http.server 4174 --bind 127.0.0.1 --directory prototype
```

Run the project checks with:

```sh
node --test prototype/tests/*.test.cjs
```

The baseline was checked with the existing 37-test suite and browser viewport simulation at 1440, 1024 and 390 px. Refer to the audit for exact coverage and limits; this does not establish real-device, Safari, Lighthouse, screen-reader or cold-cache performance results.

Keep the baseline tag and frozen audit unchanged. Record subsequent decisions and verification separately, and obtain Ying’s approval before publishing the next version.
