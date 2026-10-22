# Candidate 123 — Stage 3 osu!stable Geometry / Interaction Report

## Scope and reproducibility
- Reference `image.png`: 2555×1438, SHA-256 `f0fd3ab5ec11e87632d95aac0ab7b9df3595c96e20bb03c5201d012d613b99a4`.
- Normalized reference and candidate viewport: 1648×928, device scale factor 1, scroll 0,0.
- Candidate HTML SHA-256: `cf800068783be96805b858a99b79c8a81b63089fc43189f3d40f15894239a53e`.
- Candidate screenshot was rendered with Playwright `page.set_content`; this is not a real file-navigation or durable-storage test.

## Geometry results
| Measurement | Candidate 123 | Reference estimate at 1648×928 | Result |
|---|---:|---:|---|
| Catalog left edge | x=650.95 | x≈650 | PASS, within 1px |
| First song row top | y=63 | y≈60–63 | PASS |
| Song card height | 60px | 59–62px | PASS |
| Song row pitch | 63px | about 60–70px | PASS |
| Left rail origin | x=7, y=91 | x≈0–8, y≈88–96 | PASS |
| Left rail width | 296.64px | about 270–300px | PASS |
| Catalog visible height | 684px | about 460–475px | FAIL |
| Bottom player/profile region | compact 76px dock | about 400px footer region | FAIL, structural mismatch |

## Pixel comparison
| Region | SSIM | MAE / 255 | RMSE / 255 | RGB delta ≤20 |
|---|---:|---:|---:|---:|
| Full frame | 0.29145 | 69.096 | 91.332 | 11.016% |
| Header | 0.05664 | 67.525 | 97.638 | 6.066% |
| Left column | 0.25249 | 67.684 | 85.733 | 13.578% |
| Catalog | 0.37563 | 69.925 | 91.257 | 4.500% |
| Bottom controls | 0.16602 | 62.812 | 98.517 | 29.819% |
| Center | 0.39209 | 58.305 | 79.575 | 15.408% |

**Pixel acceptance: FAIL.** The reference has a large anime background, ranking/player panels, artwork-led overlapping osu!stable rows, and a tall footer. Candidate 123 still has a dark blank scene, AMQ workspace cards, uniform pink rows, and a compact player dock. These are structural/content differences, not merely spacing errors.

## Interaction and regression tests
- Fixed viewport/default Song Select route: PASS.
- Hover third song card: PASS; hovered card shifts left 7px, no duplicate elements or page errors.
- Click third song card: PASS; selected song metadata updates, route remains Song Select, no uncaught page errors.
- Inline JavaScript syntax: 62 scripts parsed, 0 syntax errors (PASS).
- CSS parse: 90 style blocks, 2,572 qualified rules, 0 parse errors (PASS).
- Stage 2 navigation regression: 17 PASS / 0 FAIL.

## Root-cause corrections
1. Moved workspace rail from y≈176 to y≈91 and narrowed it to about 297px.
2. Hid redundant catalog heading and compressed top toolbar/mode row, moving first song row from y=94 to y=63.
3. Corrected the canonical JavaScript layout owner, which set inline `!important` heights that overrode CSS-only attempts.
4. Corrected canonical card min-height owner from 64px to 60px, yielding 63px row pitch.

## Blockers and remaining work
- Durable reload persistence: BLOCKED; managed Chromium denies `file://` and localhost navigation. In-memory storage shim does not prove persistence.
- Live AniList/MAL/VNDB requests: NOT RUN.
- Real audio playback: user-confirmed working, not independently tested in this environment.
- Hover/click interactions were tested, but no equivalent reference hover/selected screenshots were supplied.

## Stage decision
**Stage 3 measurement and initial geometry correction pass is complete. Stage 3 visual acceptance is not passed.** The scene/background and lower player/profile area do not follow the osu!stable composition. Candidate 123 is a checkpoint, not a visually accepted final release.
