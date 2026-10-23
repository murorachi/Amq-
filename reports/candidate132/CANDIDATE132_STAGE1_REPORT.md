# Candidate 132 — Song Select 7.5-card viewport and focus-distance pass

## Status
Candidate 132 is an intermediate candidate, **not an accepted final release**. This pass implements the requested 7.5-card viewport, selected-song distance hierarchy, a small selected-row gap, and a restrained osu!-inspired fallback background when no custom background is configured. It does not complete the broader osu!stable reconstruction or the Stage 2/3 regression plan.

## Baseline and artifact identity
- Immutable parent / rollback: Candidate 130, `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_130.html`
- Parent size: 9,237,889 bytes
- Parent SHA-256: `9085754d5b6d8b1463709c25a97402a217e8ddb07afb9e4beb5d14dd1fbc3916`
- Candidate 132: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_132.html`
- Candidate size: 9,243,399 bytes
- Candidate SHA-256: `1de08a187020d1818a9f752ba565a04deea576d8bb6d59673af002df9bbd6cce`
- Reference image `image.png`: 2555 × 1438, SHA-256 `f0fd3ab5ec11e87632d95aac0ab7b9df3595c96e20bb03c5201d012d613b99a4`.

## Version identity note
The feature branch already contains a different remote Candidate 131 (SHA-256 `f5e475819810a9b71101e3e70ab073815f12b5dd1e073ecf81631451ced897d3`). To avoid overwriting or conflating artifacts, this checkpoint is uniquely named Candidate 132 and is based directly on the locally verified Candidate 130 parent. The remote Candidate 131 is preserved separately.

## Root-cause changes
1. **7.5 visible cards:** row height now follows the catalog's actual container geometry rather than a fixed 60px. Seven full cards and half of the eighth are visible.
2. **Selection prominence by distance:** the selected song is centered in the scrolling catalog. Rows receive a distance value from the selected index and progressively fade: selected 1.0, distance 1 0.90, distance 2 0.76, distance 3 0.62, distance 4 0.50, distance 5+ 0.40. Natural song order is preserved.
3. **Selected-row gap and movement:** selected row moves 7px left and has 2px margins above/below. Hover on a non-selected row moves 3px left.
4. **No-custom-background fallback:** subtle dark gradient, muted blue/pink radial light and faint diagonal lines. No external artwork was fetched and the reference screenshot is not used as app background. A synthetic custom image style remained intact when custom-background state was enabled.
5. **Card proportions:** cover height follows row size and the card body no longer retains the old fixed 64px height.

## Browser evidence
Playwright + system Chromium rendered the candidate with `page.set_content` after external HTTP(S) requests were blocked. This is actual browser rendering, but not direct `file://` acceptance.

| Viewport | Grid height | Card height | Full cards | Eighth card visible |
|---|---:|---:|---:|---:|
| 1648 × 928, DPR 1 | 759px | 100.00px | 7 | 50.0% |
| 1440 × 900, DPR 1 | 731px | 96.27px | 7 | 50.0% |
| 1280 × 720, DPR 1 | 551px | 72.27px | 7 | 50.0% |

Additional tests: 180 catalog cards rendered; opened a work with 24 song rows; selected row had transform -7px, opacity 1, and 2px margins; adjacent row had transform -3px and opacity 0.90; Enter opened a work from a focused card; custom background image layer remained intact.

## Static checks
- PASS: 62 executable inline JavaScript blocks parsed individually with Node, 0 syntax errors.
- PASS: 90 CSS blocks / 2,591 qualified rules parsed, 0 CSS parse errors.
- PASS: candidate marker and parent marker assertions.
- PASS: actual screenshots at all three required desktop viewports plus selected and hover states.

## Visual metrics
Screenshots normalized to 1648 × 928 using Lanczos. Full-frame Candidate 130 vs Candidate 132: SSIM 0.312034 vs 0.314905, MAE 63.4492 vs 65.1377, RMSE 84.8510 vs 86.3097. Right catalog SSIM improved from 0.402640 to 0.416169, while MAE/RMSE increased because row geometry changed substantially. The neutral fallback cannot match real anime artwork. These metrics do not imply overall visual acceptance.

## BLOCKED / NOT RUN
- Direct `file://` navigation is blocked by the environment; browser probes used `page.set_content`.
- `localStorage` is denied for the opaque test origin; reload persistence NOT RUN.
- Live AniList/MAL/VNDB APIs, actual audio playback, full list create/add/remove/filter/reload tests, and other-workspace regression NOT RUN.
- Left feature rail, top-left metadata and bottom controls remain materially different from osu!stable.

## Acceptance and rollback
**NOT ACCEPTED as final.** Stage 1 overall remains incomplete and Stages 2/3 remain incomplete. Roll back to Candidate 130 SHA-256 `9085754d5b6d8b1463709c25a97402a217e8ddb07afb9e4beb5d14dd1fbc3916`.
