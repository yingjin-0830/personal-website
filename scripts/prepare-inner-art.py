"""Encode individually approved Life scenes and their existing matched cutouts."""
from pathlib import Path
import argparse
import hashlib
import json

from PIL import Image, ImageChops


ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / "prototype/assets/illustrations"
SOURCE = ART / "published-style-review/additional"
OUTPUT = ART / "inner-approved"


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def prepare(allow_missing_cuts=False):
    source_manifest = json.loads((SOURCE / "manifest.json").read_text())
    selected = [item for item in source_manifest["items"]
                if item.get("approved") is True and item.get("selected_for_site") is True]
    assert len({item["topic"] for item in selected}) == len(selected), "Duplicate selected topics"
    OUTPUT.mkdir(exist_ok=True)
    items = []
    for item in selected:
        name = item["topic"]
        source = SOURCE / item["file"]
        assert digest(source) == item["sha256"], (name, "source hash mismatch")
        with Image.open(source) as image:
            assert image.size == (1024, 1536), (name, image.size)
            full = OUTPUT / f"{name}_full.webp"
            image.convert("RGB").save(full, "WEBP", quality=92, method=6)
        entry = {
            "topic": name,
            "source_id": item["id"],
            "dimensions": [1024, 1536],
            "full": {
                "file": full.name,
                "bytes": full.stat().st_size,
                "sha256": digest(full),
                "approved_source": f"../{source.relative_to(ART).as_posix()}",
                "source_manifest": "../published-style-review/additional/manifest.json",
                "source_sha256": item["sha256"],
                "processing": "WebP quality 92; original resolution; no crop or resampling",
            },
        }
        cut = OUTPUT / f"{name}_cut.png"
        if not cut.exists():
            if not allow_missing_cuts:
                raise FileNotFoundError(cut)
            entry["cut"] = {"status": "extraction in progress"}
        else:
            with Image.open(cut) as image:
                assert image.size == (1024, 1536), (cut.name, image.size)
                rgba = image.convert("RGBA")
                alpha = rgba.getchannel("A")
                low, high = alpha.getextrema()
                assert low == 0 and high >= 250, (cut.name, "missing transparent/opaque regions")
                bbox = alpha.point(lambda value: 255 if value >= 20 else 0).getbbox()
                assert bbox is not None and bbox != (0, 0, 1024, 1536), cut.name
                served_cut = OUTPUT / f"{name}_cut.webp"
                # Discard only hidden RGB beneath alpha=0; preserve every visible pixel.
                rgba.save(served_cut, "WEBP", lossless=True, exact=False, method=6)
                with Image.open(served_cut) as encoded:
                    decoded = encoded.convert("RGBA")
                    assert decoded.getchannel("A").tobytes() == alpha.tobytes(), cut.name
                    visible = alpha.point(lambda value: 255 if value else 0).convert("RGB")
                    difference = ImageChops.difference(decoded.convert("RGB"), rgba.convert("RGB"))
                    assert ImageChops.multiply(difference, visible).getbbox() is None, cut.name
            entry["cut"] = {
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
        items.append(entry)
    manifest = {
        "purpose": "Individually approved additional illustrations for Life only",
        "source_set": "../published-style-review/additional/manifest.json",
        "canvas_dimensions": [1024, 1536],
        "aspect_ratio": "2:3",
        "publication_authorized": False,
        "items": items,
    }
    (OUTPUT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps({
        "backgrounds": len(items),
        "cutouts": sum("file" in item["cut"] for item in items),
        "background_bytes": sum(item["full"]["bytes"] for item in items),
        "cutout_bytes": sum(item["cut"].get("bytes", 0) for item in items),
    }))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--allow-missing-cuts", action="store_true")
    prepare(parser.parse_args().allow_missing_cuts)
