# Candidate 124 — Stage 3 osu!stable Geometry / Interaction Report

Reference `image.png`: 2555×1438, SHA-256 `f0fd3ab5ec11e87632d95aac0ab7b9df3595c96e20bb03c5201d012d613b99a4`. Reference and candidate normalized to 1648×928, device scale factor 1, scroll 0,0. Candidate HTML SHA-256 `3dedd925ba75fbaa71ed180ef34d3f6cb9024e205c9da5f6b0a720896c0693a9`.

## Geometry
| Measurement | Candidate 124 | Reference estimate | Result |
|---|---:|---:|---|
| Catalog left edge | x=650.95 | x≈650 | PASS |
| First row top | y=63 | y≈60–63 | PASS |
| Card height | 60px | 59–62px | PASS |
| Row pitch | 63px | 60–70px | PASS |
| Left rail origin | x=7, y=91 | x≈0–8, y≈88–96 | PASS |
| Left rail width | 296.64px | 270–300px | PASS |
| Catalog bottom | y=820 | y≈815–825 | PASS |
| Footer controls top | y=828 | y≈820–835 | PASS |

## Pixel comparison
| Region | SSIM | MAE / 255 | RMSE / 255 | RGB delta ≤20 |
|---|---:|---:|---:|---:|
| Full frame | 0.29483 | 67.495 | 89.379 | 10.696% |
| Header | 0.05664 | 67.525 | 97.638 | 6.066% |
| Left column | 0.25249 | 67.684 | 85.733 | 13.578% |
| Catalog | 0.37598 | 68.997 | 89.863 | 4.436% |
| Bottom controls | 0.16602 | 62.812 | 98.517 | 29.819% |
| Center | 0.38745 | 58.986 | 80.218 | 13.815% |

**Pixel acceptance: FAIL.** Geometry aligns closely, but the scene/background, osu!stable ranking/player panels, artwork-led overlapping rows and header content still differ structurally.

## Tests
- Fixed viewport/default Song Select: PASS.
- Hover third card: PASS; shifts left 7px without duplicates or page errors.
- Click third card: PASS; metadata updates, route remains Song Select, no uncaught errors.
- Inline JS syntax: 62 scripts, 0 syntax errors; CSS: 90 style blocks, 2,572 rules, 0 parse errors.
- Stage 2 navigation regression: 17 PASS / 0 FAIL.

## Root-cause fixes
1. Moved/narrowed left workspace rail to reference-aligned geometry.
2. Reduced canonical toolbar/mode row heights and hid redundant heading; first row moved from y=94 to y=63.
3. Changed canonical card min-height owner from 64px to 60px.
4. Changed desktop catalog mount height from `calc(100% - 91px)` to `calc(100% - 16px)`, aligning list bottom at y=820 and closing the gap before footer. Mobile rule unchanged.
5. Corrected the actual JS layout owner rather than stacking CSS overrides.

## Blockers
- Durable reload persistence: BLOCKED by managed Chromium `ERR_BLOCKED_BY_ADMINISTRATOR` for file:// and localhost.
- Live AniList/MAL/VNDB requests: NOT RUN.
- Audio playback: user-confirmed working, not independently tested here.
- Only candidate hover/click states were tested; reference supplies one static state.

**Stage 3 geometry/interaction measurement pass is complete. Visual fidelity acceptance is not passed.** Candidate 124 is a checkpoint, not final release.
