# Ying Jin portfolio — frozen initial audit

This folder preserves the local arc v10.5 portfolio audit from **2026-11-24, America/New_York**. It is a frozen record of the local preview and its findings, rather than an audit of the older public website. It includes **8 review steps and 8 prioritized findings**.

## Contents

- [report.html](report.html): the illustrated Chinese audit report, with 11 referenced screenshots.
- All 23 files copied from `prototype/qa/audit-2026-11-24/`, including 20 JPEG captures, the report and two layout-bounds JSON files. Additional captures remain available even when they are not embedded in the report.
- [audit.json](audit.json): a byte-identical copy of `docs/audits/2026-11-24-design-audit.json`, preserving structured findings, evidence, checks and limits.
- [tokens.css](tokens.css): the frozen design tokens used by the report. Its self-hosted Montserrat WOFF2 and [OFL license](assets/fonts/Montserrat-OFL.txt) are bundled under `assets/fonts/`.
- [manifest.sha256.json](manifest.sha256.json): SHA-256 hashes and byte sizes for every archive file except the manifest itself.

The copied report changes only its stylesheet reference from `../../tokens.css` to `tokens.css`, so future site token changes do not alter this archive. The original QA files and report remain unchanged. Images, stylesheet and font resolve within this folder; opening the report does not depend on a live portfolio server.

## Open or download

Open `report.html` in a browser from this folder. To serve it over local HTTP from the repository root:

```sh
python3 -m http.server 4176 --bind 127.0.0.1 --directory docs/audits/2026-11-24
```

Then open [the local archived report](http://127.0.0.1:4176/report.html).

When this archive is available on GitHub, download the repository ZIP (Code → Download ZIP) or check out the verified baseline tag, then open this folder's `report.html`. Keep the whole folder together; downloading the HTML alone omits its screenshots, tokens and font. Full-size screenshots are linked from their figures. The structured findings can also be downloaded separately as `audit.json`.

## Baseline references

- Snapshot branch: `codex/baseline-v1-2026-11-24`
- Frozen tag: `v1-baseline-2026-11-24`

These references identify the website checkpoint associated with this archive; the exact commit is resolved from Git. See [the baseline guide](../../../BASELINE.md) before starting later optimization. Saving this checkpoint is separate from publication or deployment of the site.

## Audit limits

- Captures and interactions cover local browser viewport simulation: 1440 × 900 dark/English, 390 × 844 dark/English, and a 1024 × 768 light/Chinese spot check.
- Browser simulation is not physical-phone, MacBook or Safari verification.
- No cold-cache network, LCP, CLS or Lighthouse audit was measured, and no screen-reader verification was completed. Static token contrast calculations do not establish whole-site WCAG compliance.
- Work metrics, current employment and travel facts were not independently verified; content recommendations use Ying's supplied material. Timing estimates derive from code configuration, rather than performance recordings.
- Findings distinguish observed interaction behavior from source-review risks that still need focused reproduction. Absence from a screenshot does not prove a feature or resource is missing.

This folder records the initial state and recommended next steps; it does not claim that the eight findings have been fixed.
