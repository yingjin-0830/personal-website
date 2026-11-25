# Arc-reference illustrations

These eight aligned scene/figure pairs come from Ying's supplied `home-reference.html`, the visual source of truth for the new homepage. No scene or character was redrawn.

- `<name>_full.webp` is the background scene; `<name>_cut.png` is its transparent figure layer. Both use the same 900 × 1200 canvas and identical positioning.
- The embedded originals are **450 × 600**. The exported files use 2× Lanczos resampling for the requested delivery dimensions. They are **reference-resolution placeholders**, not newly generated high-detail originals. `source/` preserves the native assets unchanged.
- The original prototype reuses the exact same Personal figure cutout in Reading, Wellness, Cooking and Travel. This is retained faithfully; the manifest marks the repeated source hashes.
- `manifest.json` records provenance, dimensions, transparency bounds and SHA-256 hashes. Do not treat a larger file dimension as a claim of higher native detail.
- `prototype/qa/arc-reference-original.html` is an unchanged copy for visual comparison. `arc-reference.html` uses the original native image files instead of base64, leaving the layout and motion unchanged.

Regenerate with Pillow installed:

```sh
python scripts/prepare-arc-assets.py /absolute/path/to/home-reference.html
```

Replace a pair together when true high-resolution artwork is available: preserve its 3:4 canvas, exact crop and figure position across both layers.
