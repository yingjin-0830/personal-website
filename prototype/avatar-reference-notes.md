# Avatar reference update

The user requested that the website use the cartoon in their current ChatGPT account avatar, also described as an image from their ChatGPT Library.

## Approved visual source

`assets/ying-avatar-reference.png` — exact image read from the current account-avatar image element in the user's signed-in ChatGPT browser. The file is PNG despite the page's data-URL MIME label. Dimensions: 386 × 397. The image data was saved in full and inspected.

Recognizable features: long wavy chestnut hair, sunglasses on top of the head, one eye winking, cheerful open smile, a white V-neck T-shirt, a brown cross-body bag and a white sticker outline. The preferred visual style is now the user's 2D anime/chibi sticker avatar.

## Derived animation asset

Use built-in ImageGen with the original avatar as the identity and style reference, extending it to full-body casual, professional, project and graduation outfits, with two waving frames per outfit. Preserve the reference face, hair and rendering style. This is a derived 2D illustration asset rather than a real-time 3D model or a fully rigged character.

The generated sheet was inspected and selected as `assets/ying-avatar-outfits.png`; the site now uses it for both the hero and the chapter guide. The previous Concept 01 sprite and its original prompt are retained for comparison. The new prompt is recorded in `avatar-outfits-prompt.txt`.

## Access scope

The source is the specifically requested account avatar. A broad Library Images capture was rejected by automatic review; it was not pursued. A targeted Library search for “头像” found no named matching item. The source was then obtained directly from the profile-avatar element, without collecting unrelated Library images.

## Current refinement

The user requested long blue wide-leg jeans, removal of sunglasses except when appropriate, more expressions and active movement. The current site selects four new eight-pose sheets: `assets/character-casual.png`, `assets/character-professional.png`, `assets/character-creative.png` and `assets/character-graduate.png`. All current scenes omit sunglasses. Casual and project outfits use loose, uncuffed blue wide-leg jeans.

Each sheet includes open-eyed idle, blink, two wave poses, two walk poses, thinking and celebration. The homepage character reacts to click or Enter; the guide changes outfit with chapters, jumps to cards and walks toward magnets. Global pause and reduced-motion preferences are supported. The exact prompts and the creative-sheet transparency repair are recorded in `character-motion-prompts.json`.

## Professional card interaction revision

The user's approved identity now also has three Professional-specific action sheets: `professional-work-poses.png`, `professional-projects-poses.png`, and `professional-education-poses.png`. Each has eight aligned poses: seated, blink, wave, crouch, airborne, landing, pulling a cover and seated pointing. No sunglasses; the project outfit keeps long wide-leg blue jeans. Exact prompts are recorded in `professional-pose-prompts.json`.

The character sits on actual card edges, follows scroll-driven chapter jumps, pulls a cover open, and sits on the detail sheet. Home and Personal retain their previous assets and behavior. These remain sprite-based website animations with curved travel and small pose loops, rather than a skeletal character rig.

## Homepage direction and additional activities

The homepage now uses `assets/hero-directional-poses.png`, derived from the approved casual sheet with the crossbody bag and every strap removed. Its eight frames are front idle, blink, wave, happy, left three-quarter turn, left profile, and two left-profile steps. Rightward movement mirrors the profile. Loose blue wide-leg jeans, the face, hair and sticker rendering are preserved. Personal still uses its prior casual sheet.

The three `professional-*-activities.png` sheets add standing thought, standing and seated laptop work with blinks, profile walking and pointing. They supplement the previous sitting/jumping/pulling sheets. Prompts are in `animation-v3-prompts.json`; all assets were generated with built-in ImageGen and copied into this project.
