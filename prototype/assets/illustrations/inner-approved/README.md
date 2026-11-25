# Additional Life artwork

Individually confirmed 1024 × 1536 Wellness/Music scenes originate in `../published-style-review/additional/`. The source register records each approval, revision and current selection; unapproved drafts must not be encoded or used on the site. Source PNGs and exact generation prompts remain unchanged.

`scripts/prepare-inner-art.py` reads only records where `approved` and `selected_for_site` are both true, checks the source hash and native dimensions, then creates `<topic>_full.webp` at quality 92 and a lossless `<topic>_cut.webp`. The cut’s alpha and every visible RGB pixel are verified against the generated transparent PNG. Only RGB hidden under alpha=0 is discarded. PNG cuts and sibling prompts/provenance are retained here. Extraction can introduce small hair/texture differences; these are generated derivatives, not pixel-identical source masks.

Regenerate from the repository root with Python and Pillow:

```sh
python scripts/prepare-inner-art.py
```

Life’s full-scene image reserves the pair’s intrinsic ratio; the transparent figure uses the same complete canvas above it. Do not crop or independently position either layer. Other Life topics and Work’s Education reuse pairs in `../cover-approved/`. Travel’s wooden frame and independent magnets are preserved.

This directory supports local previews only. Publication requires Ying’s approval of the current preview.
