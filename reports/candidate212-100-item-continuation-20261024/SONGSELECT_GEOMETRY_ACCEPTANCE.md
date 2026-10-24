# Candidate212 Song Select Geometry / Interaction Acceptance

Date: 2026-10-24
Candidate source: Candidate212 readable Library text export (not byte-identical; see `STATIC_AUDIT.md`).
Browser viewport: 1920×1080 CSS pixels, device scale factor 1.
Reference: Library `image.png`, 2555×1438 pixels; `image4.png` is the 2559×112 bottom-player crop.

## Measured geometry

| Measurement | Candidate212 browser result | Target / interpretation | Result |
|---|---:|---|---|
| Main Song Select stage | x=0, y=0, 1920×1080 | Full viewport | PASS |
| Tracklist viewport | x=1180.8, y=110.0, width=734.2, height=830.1 | Right-side list occupies about 38% width and begins below top filters | Geometry broadly aligned |
| Loaded song rows | 180 | Long scrollable list | PASS |
| Tracklist scrollability | scrollHeight 23,430 px vs clientHeight 830 px | Must support vertical scrolling | PASS |
| Row height | 130 px | Reference cards are about 110–130 px after normalized viewport scaling | PASS / geometry still needs visual tuning |
| Average row pitch for first 7 rows | about 126.2 px | 7.5 visible cards require approximately 110–113 px pitch across an ~830–847 px viewport | FAIL |
| Rows intersecting viewport | 7 rows; last row visible from y≈897 to y=940 | Reference shows about 7.5 cards, including a half-visible bottom card | FAIL |
| Last card visible fraction | 43 / 130 px ≈ 33% | Target is about 50% to signal more content below | FAIL |
| Initial visible selected row | row 4, x≈1177.8 | Selected row should be visually distinct | PASS |

The reference image was resized to the same 1920×1080 aspect ratio for geometric interpretation. At the right-side list column, its visible row boundaries indicate about eight intersecting cards, with roughly seven full rows and a partially visible bottom row around half height. The candidate's current list spacing shows only seven intersecting rows and about one-third of the last row. This is a measured geometry mismatch, not a subjective similarity score.

## Hover / selected interaction

A real Chromium pointer interaction measured the same row before hover, during hover, and after selection:

- Normal row x: 1184.8 px.
- Hover row x: 1181.8 px, a 3 px left shift.
- Selected row x: 1177.8 px, a 7 px left shift.
- PASS: hover shift is smaller than selected shift, as requested.
- PASS: clicking a song row updates the selected row class to `proto26-song-selected` and updates `#p32SongTitle` to the clicked song (`Chameko no Ichinichi`).

## Visual evidence

- Candidate screenshot: `candidate212_songselect_geometry.png` (1920×1080).
- osu!stable reference: `osu_reference_image.png` (2555×1438).
- Bottom player reference crop: `osu_reference_image4.png` (2559×112).

The two full screenshots have different song content and scene imagery, so a raw whole-image pixel-difference score would not be meaningful without masking and alignment. No pixel-similarity percentage is claimed. Exact screenshot-region registration/masked pixel comparison remains NOT RUN.

## Recommended minimal correction after raw-source recovery

1. Keep the current tracklist width and overall stage layout; the measured right-column proportions are close to the reference.
2. Reduce average vertical pitch from ~126 px toward ~111–113 px, while preserving the 130 px selected-card visual height if possible. The current rows overlap irregularly due to per-row relative `top` offsets; inspect the geometry owner before changing CSS.
3. Adjust the vertical arc/offset curve so the first card begins closer to the tracklist viewport top and the bottom card is about half visible, not one-third.
4. Re-test at the same 1920×1080 viewport and several adjacent viewport sizes; ensure scrolling, hover shift, selected shift, and right-panel song data remain correct.
5. Do not patch CSS in the current session: the available text export is 26 bytes shorter than the recorded original and cannot serve as a byte-identical release source.

## Test status

- PASS: actual Chromium DOM measurement, hover and row-selection interaction on the readable text export.
- FAIL: current candidate does not meet the 7.5-card viewport / half-card bottom target.
- NOT RUN: fixed-region masked pixel comparison against the osu!stable screenshot.
- BLOCKED: native file launch and persistent-origin browser testing (`ERR_BLOCKED_BY_ADMINISTRATOR`).

## Follow-up CSS-only 7.5-card prototype (2026-10-24)

The measured owner is the final Candidate210 Song Select rule. Its clamp(130px,10.5vh,160px) is applied to flex-basis, height, min-height and max-height; at a 1080 px viewport it resolves to 130 px because of the minimum.

A disposable fixture changed only that final row-size token to clamp(100px,10.2vh,130px) in those four declarations. No candidate HTML was modified.

- Baseline: tracklist x=1180.80, y=109.97, width=734.19, height=830.13 px; 7 rows intersect the viewport and the bottom row is about 33% visible.
- PASS (prototype): row height 110.156 px; 8 rows intersect the viewport, with about 54.6% of the bottom row visible, or approximately 7.55 cards.
- PASS (prototype): hover movement remains 3 px left and selected movement remains 7 px left; clicking still updates the selected-song class and side information.
- PASS (prototype): no page errors in the geometry and interaction fixtures.
- NOT RUN: full-screen fixed-reference pixel comparison. The currently available image.png is a results/leaderboard screen and osu_reference_image4.png is only a 1648×53 toolbar crop, not a Song Select reference. The pinned official osu!stable Song Select image has not yet been retrieved as a local binary.
- Integrity limit: the readable reconstruction is 26 bytes shorter than recorded Candidate212. Do not apply the CSS change to a release until byte-preserving source access is restored.
