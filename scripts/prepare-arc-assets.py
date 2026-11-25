#!/usr/bin/env python3
"""Extract the approved arc reference; encode aligned, named 3:4 image pairs.

This is an asset packaging step, not an AI upscaler. Original pixels and source
dimensions remain in source/ and manifest.json so reference previews are honest.
"""

from __future__ import annotations

import argparse
import base64
import hashlib
import io
import json
from pathlib import Path
import re

from PIL import Image


NAMES = (
    "real-estate", "sales-marketing", "data-analytics", "education",
    "reading", "wellness", "cooking", "travel",
)
TARGET = (900, 1200)


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def prepare(reference: Path, repo: Path) -> dict:
    source_html = reference.read_text()
    match = re.search(r"const TILES\s*=\s*(\[.*?\]);", source_html, re.S)
    if match is None:
        raise ValueError("Reference has no const TILES JSON array")
    tiles = json.loads(match.group(1))
    if len(tiles) != len(NAMES):
        raise ValueError("Expected eight reference tiles")

    output = repo / "prototype/assets/illustrations"
    native_dir = output / "source"
    native_dir.mkdir(parents=True, exist_ok=True)
    qa = repo / "prototype/qa"
    qa.mkdir(parents=True, exist_ok=True)
    (qa / "arc-reference-original.html").write_text(source_html)
    compact_html = source_html
    records = []
    seen_cutouts: dict[str, str] = {}

    for name, tile in zip(NAMES, tiles):
        item = {"name": name, "title": tile["t"], "side": tile["side"], "assets": {}}
        pair_size = None
        for kind in ("full", "cut"):
            uri = tile[kind]
            data = base64.b64decode(uri.split(",", 1)[1], validate=True)
            image = Image.open(io.BytesIO(data))
            image.load()
            if image.width * 4 != image.height * 3:
                raise ValueError(f"{name}/{kind}: expected 3:4 native source")
            if pair_size is not None and image.size != pair_size:
                raise ValueError(f"{name}: image and figure positions cannot align")
            pair_size = image.size
            native_extension = "jpg" if kind == "full" else "png"
            native_name = f"{name}_{kind}.{native_extension}"
            (native_dir / native_name).write_bytes(data)
            # Mechanical URI replacement preserves the original reference layout.
            compact_html = compact_html.replace(
                uri, f"../assets/illustrations/source/{native_name}", 1
            )

            extension = "webp" if kind == "full" else "png"
            filename = f"{name}_{kind}.{extension}"
            image = image.convert("RGB" if kind == "full" else "RGBA")
            encoded = image.resize(TARGET, Image.Resampling.LANCZOS)
            destination = output / filename
            if kind == "full":
                encoded.save(destination, "WEBP", lossless=True, method=6)
            else:
                encoded.save(destination, "PNG", optimize=True)

            record = {
                "file": filename,
                "native_file": f"source/{native_name}",
                "native_dimensions": list(image.size),
                "output_dimensions": list(encoded.size),
                "source_sha256": digest(data),
                "output_sha256": digest(destination.read_bytes()),
                "status": "reference-resolution-placeholder",
                "processing": "2x Lanczos resampling; no new visual detail generated",
            }
            if kind == "cut":
                alpha = image.getchannel("A")
                record["native_alpha_bbox"] = list(alpha.getbbox() or ())
                record["has_transparency"] = alpha.getextrema()[0] == 0
                duplicate = seen_cutouts.get(record["source_sha256"])
                record["duplicate_source_of"] = duplicate
                seen_cutouts.setdefault(record["source_sha256"], filename)
            item["assets"][kind] = record
        records.append(item)

    (qa / "arc-reference.html").write_text(compact_html)
    manifest = {
        "source": "User-supplied home-reference.html",
        "source_sha256": digest(reference.read_bytes()),
        "target_dimensions": list(TARGET),
        "note": (
            "Native assets are 450x600. The 900x1200 files preserve the supplied "
            "reference composition but do not contain newly generated high-resolution detail. "
            "The source reuses the Reading cutout for Wellness, Cooking and Travel."
        ),
        "tiles": records,
    }
    (output / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    return manifest


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("reference", type=Path)
    parser.add_argument("--repo", type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args()
    result = prepare(args.reference, args.repo)
    print(f"Prepared {len(result['tiles'])} aligned full/cut pairs at {TARGET[0]}x{TARGET[1]}.")
