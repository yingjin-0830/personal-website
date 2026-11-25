"""Encode approved cover scenes and matching cutouts without resizing artwork."""
from pathlib import Path
import argparse
import hashlib
import json

from PIL import Image, ImageChops


ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / "prototype/assets/illustrations"
APPROVED = ART / "published-style-review/approved"
ALTERNATIVES = ART / "published-style-review/alternatives"
OUTPUT = ART / "cover-approved"
COVER_ORDER = (
    "real-estate", "sales-marketing", "data-analytics", "education",
    "coffee", "cooking", "photography", "travel",
)
# Homepage selections only; the original approved gallery remains immutable.
SELECTED_ALTERNATIVES = {
    "sales-marketing": {"id": "sales-marketing-side-presentation-v1", "asset_name": "sales-marketing-presentation"},
    "photography": {"id": "photography-seated-steps-v2", "asset_name": "photography-seated"},
}


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def prepare(allow_missing_cuts=False):
    approved = json.loads((APPROVED / "manifest.json").read_text())
    assert len(approved["artworks"]) == 8
    originals = {Path(item["filename"]).stem: item for item in approved["artworks"]}
    alternatives = json.loads((ALTERNATIVES / "manifest.json").read_text())
    alternatives_by_id = {item["id"]: item for item in alternatives["items"]}
    OUTPUT.mkdir(exist_ok=True)
    tiles = []
    for name in COVER_ORDER:
        item = originals[name]
        source = APPROVED / item["filename"]
        asset_name = name
        source_manifest = APPROVED / "manifest.json"
        source_revision = item["source_revision"]
        if name in SELECTED_ALTERNATIVES:
            selection = SELECTED_ALTERNATIVES[name]
            alternative = alternatives_by_id[selection["id"]]
            source = ALTERNATIVES / alternative["file"]
            asset_name = selection["asset_name"]
            source_manifest = ALTERNATIVES / "manifest.json"
            source_revision = alternative["file"]
            item = {**alternative, "title": originals[name]["title"]}
        assert item["approved"] and digest(source) == item["sha256"], name
        with Image.open(source) as image:
            assert image.size == (1024, 1536), (name, image.size)
            full = OUTPUT / f"{asset_name}_full.webp"
            image.convert("RGB").save(full, "WEBP", quality=92, method=6)
        tile = {
            "name": name,
            "asset_name": asset_name,
            "title": item["title"],
            "dimensions": [1024, 1536],
            "full": {
                "file": full.name,
                "bytes": full.stat().st_size,
                "sha256": digest(full),
                "approved_source": f"../{source.relative_to(ART).as_posix()}",
                "source_manifest": f"../{source_manifest.relative_to(ART).as_posix()}",
                "source_revision": source_revision,
                "source_sha256": item["sha256"],
                "processing": "WebP quality 92; original resolution; no crop or resampling",
            },
        }
        cut = OUTPUT / f"{asset_name}_cut.png"
        if not cut.exists():
            if not allow_missing_cuts:
                raise FileNotFoundError(cut)
            tile["cut"] = {"status": "extraction in progress"}
        else:
            with Image.open(cut) as image:
                assert image.size == (1024, 1536), (cut.name, image.size)
                rgba = image.convert("RGBA")
                alpha = rgba.getchannel("A")
                low, high = alpha.getextrema()
                assert low == 0 and high >= 250, (cut.name, "missing transparent/opaque regions")
                # Generated alpha can peak at 254 and retain invisible 1/255 remnants.
                bbox = alpha.point(lambda value: 255 if value >= 20 else 0).getbbox()
                assert bbox is not None and bbox != (0, 0, 1024, 1536), cut.name
                served_cut = OUTPUT / f"{asset_name}_cut.webp"
                # Drop only hidden RGB beneath alpha=0; preserve all visible pixels.
                rgba.save(served_cut, "WEBP", lossless=True, exact=False, method=6)
                with Image.open(served_cut) as encoded:
                    decoded = encoded.convert("RGBA")
                    assert decoded.getchannel("A").tobytes() == alpha.tobytes(), cut.name
                    visible = alpha.point(lambda value: 255 if value else 0).convert("RGB")
                    difference = ImageChops.difference(decoded.convert("RGB"), rgba.convert("RGB"))
                    assert ImageChops.multiply(difference, visible).getbbox() is None, cut.name
            tile["cut"] = {
                "file": served_cut.name,
                "source_png": cut.name,
                "source_sha256": digest(cut),
                "sha256": digest(served_cut),
                "bytes": served_cut.stat().st_size,
                "alpha_bbox": list(bbox),
                "alpha_bbox_threshold": 20,
                "alpha_range": [low, high],
                "processing": "Lossless WebP; exact alpha and RGB where alpha>0 verified; hidden alpha=0 RGB discarded; no resizing/repositioning",
            }
        tiles.append(tile)
    manifest = {
        "purpose": "Homepage-only approved artwork replacement",
        "source_set": "../published-style-review/approved/manifest.json",
        "alternative_source_set": "../published-style-review/alternatives/manifest.json",
        "selected_alternatives": {name: choice["id"] for name, choice in SELECTED_ALTERNATIVES.items()},
        "canvas_dimensions": [1024, 1536],
        "aspect_ratio": "2:3",
        "full_and_cut_share_svg_transform": True,
        "seated_alternatives_selected": bool(SELECTED_ALTERNATIVES),
        "publication_authorized": False,
        "tiles": tiles,
    }
    (OUTPUT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps({
        "backgrounds": len(tiles),
        "cutouts": sum("file" in tile["cut"] for tile in tiles),
        "background_bytes": sum(tile["full"]["bytes"] for tile in tiles),
        "cutout_bytes": sum(tile["cut"].get("bytes", 0) for tile in tiles),
    }))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--allow-missing-cuts", action="store_true")
    prepare(parser.parse_args().allow_missing_cuts)
