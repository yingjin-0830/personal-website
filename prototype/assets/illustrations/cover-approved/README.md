# Approved homepage artwork

The cover uses Real Estate (Marketing Analyst), side-facing Sales & Marketing presentation, standing Data & Analytics, Education, Coffee, Cooking, seated Photography and Travel, in arc order. Sales & Marketing selects `../published-style-review/alternatives/sales-marketing-side-presentation-v1.png` and serves the `sales-marketing-presentation` full/cut pair. Photography selects `photography-seated-steps-v2.png` from the same alternatives directory and serves the `photography-seated` pair. The original front-facing Sales & Marketing and standing Photography pairs remain available; the seated Data alternative is not selected.

Six source PNGs, approvals and hashes come from `../published-style-review/approved/manifest.json`; side-facing Sales & Marketing and seated Photography are validated against `../published-style-review/alternatives/manifest.json`. Original source PNGs and packaged galleries remain unchanged. The alternatives register tracks subsequent approvals/selections; this directory’s manifest records the current homepage selection and encoded files. Each source and its transparent figure use the same 1024 × 1536 canvas and figure placement. The `_cut.png` files are ImageGen derivatives; sibling prompt and JSON files record extraction provenance. Small generated differences in hair/texture can remain, so these are not claimed to be pixel-identical masks of the source scenes. Very low-alpha remnants are included in the retained PNGs; manifest bounds use alpha ≥20 to describe the visible figure.

The website serves `_full.webp` backgrounds (quality 92, no resizing) and `_cut.webp` figures (lossless). The encoder verifies byte-identical alpha and RGB at every pixel with alpha >0 against each generated PNG. It discards only hidden RGB at alpha=0, reducing transfer without changing the rendered figure. `manifest.json` records source/output hashes, dimensions, alpha bounds, byte sizes and processing.

To regenerate serving assets from the repository root, use Python with Pillow:

```sh
python scripts/prepare-approved-cover.py
```

The script’s `COVER_ORDER` and `SELECTED_ALTERNATIVES` mapping define the homepage selection. Every source must match an approved entry and SHA-256 hash in its source manifest. Regeneration preserves unselected serving assets, including the original `photography_full.webp` / `photography_cut.webp` pair.

The SVG gives full/cut layers identical 2:3 rectangles and transforms. Resting figure order runs from outer to inner on both sides; magnification temporarily promotes the nearest figure and restores that order afterward. Matching Work/Life sections reuse approved pairs from this directory. Additional Wellness/Music pairs live in `../inner-approved/`; historical reference assets and Travel’s wooden frame/magnets remain available.

Integration is local only. Publication still requires Ying’s approval of the current preview.
