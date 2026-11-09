# Editorial character — HD restoration

The approved editorial character has four outfits and 34 poses: the original 32 poses plus two Education book poses. Generated with the built-in ImageGen tool using only the approved sheets as edit targets. Exact prompts: [editorial-hd-prompts.json](../../editorial-hd-prompts.json).

## Resolution and rendering

- Original atlas: 1774 × 887, four columns × two rows; each pose approximately 443.5 × 443.5 px.
- HD pair atlas: 1774 × 887, two columns × one row; each pose 887 × 887 px.
- This doubles each pose's linear resolution, for four times the pixels. The outputs are not 4K.
- `source/` preserves the native transparent PNG outputs. The adjacent WebP files are lossless runtime copies; decoded RGBA pixels were compared byte for byte.
- Runtime uses `200% 100%` background sizing and chooses one of four pairs for the current outfit. Pose indices and motion timing are unchanged.
- Removed the continuous idle scale animation to avoid repeated raster resampling. Blink, thought and chapter/detail transitions remain. Turning and walking poses stay in the archived sheets but are no longer used by navigation; route changes use a simple cross-fade.
- Hero pair 0 is preloaded with high priority. All 17 pair sheets are warmed before pose changes.

## Pose order

Hero: stand, blink, wave, think, turn, profile, walk A, walk B.

Work / Projects / Education original poses: stand, lean, laptop, blink, walk A, walk B, profile, think.

Education pair 4 adds standing with books (frame 8) and sitting cross-legged on the floor reading (frame 9), at the same anatomical scale and floor baseline. Exact built-in ImageGen prompt: [editorial-education-books-prompts.json](../../editorial-education-books-prompts.json). Education cycles through books, reading, leaning, laptop and thinking; detail view opens with books.

The original atlas assets remain available for comparison. `prototype/concepts/` contains a rejected character study and is not used by this site.
