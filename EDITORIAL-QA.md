# Editorial flat prototype review

The isolated `editorial-flat` checkout preserves `main`. New active source uses editorial CSS/JS and four adult-proportion illustration sheets. Work, projects and education content is reused from the illustrated prototype without adding résumé claims.

Inspected desktop at 1280 × 720, the visible preview around 872 × 765, and mobile at 390 × 844. Observed Home → Professional departure, chapter changes, project next/previous controls, the correct Vision detail and Escape return, and Education's graduation outfit. Character poses include leaning on the card edge, standing with a laptop, and thought. Modal placement keeps the figure beside the paper on desktop and above it on mobile. No sitting or jumping is selected by this edition.

The initial script had duplicate top-level `experiences`/`places` bindings across classic scripts. The content file is now scoped in an IIFE; a fresh browser tab returned no warning/error entries after the fix. The Education image initially had a pale backdrop; ImageGen background extraction preserved registration and removed it. A one-pixel mobile document overflow from the live-region box was corrected with the standard negative-margin visually-hidden pattern.

Source, selected asset alpha, keyboard focus/close behavior and reduced-motion logic were inspected. OS preference emulation and full production browser coverage are outside this prototype check.

The corrected mobile cover measured document width390 and height844 at a 390×844 viewport. Focusing the Professional entry selected the left-turn pose. Pausing during cover departure still completed navigation. Mobile Sunlight detail opened and closed with Escape; the Boston collection entry opened the matching travel detail. Leaving Professional during card opening left Personal visible, `dialog.open=false`, and the figure back in its stage slot. Fresh browser warning/error logs were empty after these checks.

The two variants remain separate branches and checkouts. Publishing source to GitHub is distinct from deploying a live website.
