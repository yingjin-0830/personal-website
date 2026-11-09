# Professional content sources

Reviewed 2026-11-08. The user supplied an updated résumé and asked to combine it with their LinkedIn profile.

- Updated résumé: `Resume_Ying_Jin_Updated.pdf`, supplied by the user. SHA-256: `902dac37f1b3b280b18612ac11c5a65aeb8a55f41c2b3ad1df49e0b544d270cb`.
- LinkedIn: https://www.linkedin.com/in/yingjin08/ . Direct access is restricted; the public search index exposes projects and education. No information from other people named Ying Jin was used.

## Source mapping

- Résumé: Sunlight Development, Kuaishou Technology, Deloitte and Accenture roles, dates, locations, responsibilities and metrics; both degree titles and graduation dates; skills.
- LinkedIn: household income, vegetable recognition, horse-health analysis and Walmart financial-services risk projects. These are labeled academic projects, not employment. No project performance metrics were added to the cards.
- The updated résumé takes precedence over the older generic “Data Analyst” LinkedIn summary: the Sunlight title is Marketing Analyst.
- Kuaishou retains the 20% GMV result and separate 50%+ “618” result as separate contexts. Deloitte’s 15% retention result remains explicitly estimated. No revenue, accuracy, or efficiency claims were invented.

The user subsequently requested a résumé download and email contact. The exact supplied PDF is now copied to `assets/docs/Ying-Jin-Resume.pdf`, and the email extracted from its header (`ying.jin0830@gmail.com`) is displayed in Contact. The phone is not rendered in HTML. Company marks are local original files with source URLs in `assets/logos/sources.json`; the Kuaishou detail includes visible logo-source attribution.

## UI and transitions

- Centered desktop content frame: 1180px maximum, with at least48px outer margins at desktop widths. Mobile uses its existing compact layout.
- Home: large translucent serif name behind the foreground character, preserving the approved HD illustration assets.
- Home / Professional / Personal:420ms opacity-only cross-fade; masthead remains steady. Native View Transitions are used when supported, with a simultaneous two-view cross-fade fallback. Entry clicks no longer trigger turning or walking out of the frame.
- Thinking, blinking and automatic chapter poses remain, with no jumping, Motion toggle or card/entry arrows.

## Continuous Professional sequence

All ten entries share one native vertical scroll track and one pinned stage. A forward scroll progresses through all four Work entries, then all four Projects, then both Education entries. Reverse scrolling follows the same order backward. The case changes with a short fade; section headings stay steady within a chapter. Chapter anchors, keyboard navigation and story-specific fragments use the same sequence. Detail views and viewport resizing preserve the active story. The horizontal previous/next controls were removed.

Home typography keeps translucent background lettering while separating the name around the foreground figure. Navigation, both entry headings and supporting copy have larger desktop and mobile sizes.

The cover name now uses a loaded 700-weight Bodoni Moda face and a darker translucent ink. Professional chapter tabs use the same serif family at 22px desktop / 17px mobile, with smaller supporting numerals, replacing the heavier sans-serif labels.

Verified in the browser: wheel navigation visited all ten entries in order without moving the pinned stage; reverse scrolling crossed Education back into Projects; closing a detail and refreshing retained the selected entry; chapter navigation landed on the first Project and first Education entry; desktop, medium-width and mobile typography stayed within the viewport.

## Photo-cover trial and identity mark

All ten Professional cards now use local photographic covers, retaining organization, role, date and company logos in the caption. Nine stock photos illustrate the subject; they are not images of Ying's project deliverables or workplaces. UIBE uses an illustrative library image. Duke uses Brian Carlson's “Duke Chapel near sunset,” licensed CC BY-SA 2.0, with author, source, license and display-crop credit in its detail. Exact URLs, dimensions and license metadata are in `assets/covers/sources.json`.

The YJ header mark is a locally authored SVG. Landscape Home layouts shift the name and character together 20–48px to the right; portrait/mobile alignment remains unchanged. The browser verified all ten local photos loaded in sequence, the stage stayed pinned, the new mark returned to Home, and desktop (1470×837), medium (790×765) and mobile (390×844) layouts had no horizontal overflow.


## Independent Personal collection and bilingual interface

The Travel display is an original CSS walnut frame with eleven named SVG keepsakes: Seattle, Boston, New York, Shenzhen, Chicago, Florida, Beijing, North Carolina, San Diego, San Francisco and Los Angeles, plus an unknown exploring state. `magnet-art.js` authors each city motif in code; the user's uploaded board photograph is reference only and is no longer embedded in Personal or its detail views. Place descriptions explain the illustrated motifs, not unprovided first-person travel events. Album space is explicitly reserved for Ying's own future photographs and stories.

English / Simplified Chinese switching covers static navigation, Home copy, all ten Professional cards and complete résumé/project details, source labels, Personal pages and dialogs, document titles, accessibility names and status messages. Brand names and technical names may remain in their original form; English lettering on the illustrated physical keepsakes is intentional. Chinese narrative translations retain the source résumé metrics. The chosen language persists in local browser storage; changing it does not navigate away from the current story or close an open detail.

Browser verification: all six magnet buttons opened the matching place; Enter and Escape worked and focus returned to the source magnet. Both modal types retained their content while language changed. Refresh retained Chinese, and toggling at Kuaishou kept the same scene and 837px native scroll position. Desktop, medium-width and two phone sizes were checked for overflow; browser console reported no warnings/errors.


## Six personal chapters and recruiting resources

The user chose a six-card Personal overview, with individual details for coffee, cooking, movement, photography and social media; Travel opens the independent magnet collection. The five new destinations and a discoverable “still exploring” keepsake were explicitly requested. Personal detail copy describes the supplied interests and future content slots, rather than inventing personal photographs, training records, recipes, audience metrics or social accounts. All new artwork is authored in SVG code.

The recruiting resource cluster is right-aligned alongside Work / Projects / Education on desktop, and placed in a separate resource row on phones. The résumé download was exercised through the browser and the downloaded bytes match both the source and site PDF. Contact shows the source résumé email; copying it reports success, and the email action points to the correct mailto address. No email was sent.

Verified: all five non-travel topic details; all five new destination details and the exploration state; language changes within topic and contact dialogs; topic focus return; Travel retaining its area across language switches, refresh and browser back/forward; small-phone resource layout and pinned scrolling. Layouts at 1470×837, 790×765, 390×844 and 360×740 have no horizontal overflow. The full suite includes eleven passing locale, content-coverage and journey checks.

Home annotation update: removed both upper straplines and their rule, moved the supporting three-line biography beside the main statement on wide desktop screens, and loaded a true 700-weight Bodoni Moda face for the name. Verified English / Chinese at 1322×834 and compact layouts at 790×765 and 390×844, with no horizontal overflow.
