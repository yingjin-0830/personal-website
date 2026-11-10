"""Prepare licensed local webfonts from the official cached font sources.

Sources and licenses are recorded in prototype/assets/fonts/sources.json.
The subset families are renamed to respect the source fonts' reserved names.
"""
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parents[1] / 'prototype/assets/fonts'
latin = set(range(0x20, 0x250)) | set(range(0x2000, 0x2070))
chinese = set(latin) | set(range(0x3000, 0x3040)) | set(range(0xFF00, 0xFFF0))
for first in range(0xA1, 0xF8):
    for second in range(0xA1, 0xFF):
        try:
            chinese.add(ord(bytes([first, second]).decode('gb2312')))
        except UnicodeDecodeError:
            pass
for path in (root.parents[1]).glob('*.js'):
    chinese.update(map(ord, path.read_text()))

fonts = [
    ('merriweather.ttf', 'ying-merriweather.woff2', 'Ying Editorial Serif', 'Regular', latin),
    ('merriweather-italic.ttf', 'ying-merriweather-italic.woff2', 'Ying Editorial Serif', 'Italic', latin),
    ('source-han-sans-sc-bold.otf', 'ying-han-bold.woff2', 'Ying Editorial Han', 'Bold', chinese),
]
for source, output, family, style, unicodes in fonts:
    font = TTFont(root / 'source' / source)
    options = subset.Options()
    options.name_IDs = ['*']
    options.name_legacy = True
    options.name_languages = ['*']
    worker = subset.Subsetter(options=options)
    worker.populate(unicodes=unicodes)
    worker.subset(font)
    postscript = family.replace(' ', '') + '-' + style
    values = {1: family, 2: style, 3: postscript, 4: family + ' ' + style,
              6: postscript, 16: family, 17: style, 21: family, 22: style}
    for record in font['name'].names:
        if record.nameID in values:
            record.string = values[record.nameID].encode(record.getEncoding())
    if 'CFF ' in font:
        cff = font['CFF '].cff
        cff.fontNames = [postscript]
        cff.topDictIndex[0].FamilyName = family
        cff.topDictIndex[0].FullName = family + ' ' + style
    font.flavor = 'woff2'
    font.save(root / output)
    print(output, (root / output).stat().st_size, 'bytes')
