# Visual audit — osu!stable Song Select reference (2026-10-23)

## Fixed inputs
- Reference: `image.png`, source 2555×1438, SHA-256 `f0fd3ab5ec11e87632d95aac0ab7b9df3595c96e20bb03c5201d012d613b99a4`.
- Candidate screenshot: Candidate 142, 1648×928.
- Comparison normalizes the reference to 1648×928 with Lanczos. This is useful for diagnosis, not proof of exact pixel alignment.
- Candidate HTML SHA-256: `6eb84e1339a2d2d7efd7cb6961b3031ceb3690195de22539de5850b0fe78af0a`.

## Candidate 142 observed geometry (Playwright DOM measurements)
| Region | x | y | width | height | Status |
|---|---:|---:|---:|---:|---|
| Song metadata `.p32-info` | 8 | 7 | 850 | 51.8 | Top-left, but too compact / hierarchy differs |
| Left rail `#c99LeftRail` | 7 | 90.9 | 450 | 575.7 | Width resembles reference left column; contents are import/workspace cards, not ranking rows |
| Catalog `.p32-catalog` | 881.7 | 44 | 762 | 776 | 7.5-row rule passes; row content/card art differs |
| Player dock `#audioDock` | 115.4 | 852 | 1414 | 76 | Within viewport; control composition differs |
| Mode wrap `#c99ModeWrap` | 1383.4 | 865.5 | 135 | 50 | Compact, but hierarchy differs |

## Reference image approximate visual regions
These are manually estimated from the provided 1648×928 display, not DOM measurements from the original osu! client.
- Song title / metadata: x≈0–1648, y≈0–94.
- Category / sort controls: x≈988–1632, y≈30–94.
- Left ranking list: x≈7–464, y≈141–820.
- Selected song row: x≈909–1648, y≈375–480.
- Other song rows: primarily x≈1012–1648, y≈90–820.
- Central background: x≈450–1648, y≈94–820; real character artwork dominates this region.
- Bottom controls: y≈820–928.

## Pixel comparison (diagnostic only)
| Region | SSIM | MAE | RMSE |
|---|---:|---:|---:|
| Full frame | 0.297241 | 57.5168 | 80.3344 |
| Left player / rail | 0.176917 | 84.1830 | 95.1141 |
| Top song info | 0.041317 | 54.6661 | 84.9349 |
| Central background | 0.423272 | 51.3985 | 70.2650 |
| Right song list | 0.362474 | 49.5895 | 71.3497 |
| Bottom controls | 0.166206 | 62.9595 | 98.5621 |

Metrics are not a percentage similarity and are sensitive to differing content, unavailable artwork, and image resizing.

## Root-cause gaps (priority order)
1. Central visual layer: the reference is dominated by real anime/beatmap artwork; Candidate 142 has a dark gradient because no saved scene image was available in the test context. Do not substitute the reference screenshot or fabricate cover art. Test using a real user-selected scene image or verified public asset.
2. Left rail content mismatch: reference contains actual osu ranking/score rows. Candidate contains AMQ profile, AniList/VNDB import, custom-list and learning tools. These are valid AMQ features but cannot be styled as osu leaderboard data without inventing data. Preserve feature entry points.
3. Top metadata hierarchy: candidate uses a compact title block; reference uses a wide multi-line area with mapper and beatmap stats. Use only AMQ fields that actually exist.
4. Bottom control composition: dock height is 76px and geometry is stable, but control arrangement differs. Compare individual child rectangles before changing it.
5. Song rows: 7.5 rows and selected/hover behavior pass automated assertions, but placeholder music-note tiles differ from real covers, typography and rank/star details. The current data has no verified cover URL or osu-specific rank/PP fields.

## Test and acceptance status
- Playwright interaction/layout checks: 21 PASS, 0 FAIL in simulated `page.set_content` context.
- JS syntax: 63 executable inline scripts, 0 errors; 2 non-JS blocks skipped.
- CSS parse: 91 style blocks, 0 errors.
- Direct `file://` and localhost navigation: BLOCKED_BY_ADMINISTRATOR.
- Durable storage, live APIs, real audio, full custom-list CRUD and cross-workspace regression: NOT RUN.
- Overall visual acceptance: NOT ACCEPTED.

## Next measured implementation steps
1. Keep Candidates 141 and 142 immutable; build a unique new candidate only after a region-level plan.
2. Test the scene-background manager with a real stored user image and no-image fallback. Do not use fake art.
3. Measure bottom-dock child rectangles, then change only controls with demonstrated mismatch.
4. Review whether import/list/learning entries can be presented more compactly without removing or hiding functionality.
5. Re-run identical viewport/state screenshots and regional metrics; retain a change only if the target region improves without regression.
