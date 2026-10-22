# Candidate 129 — Song Select layout-owner correction and first browser acceptance

## Status
Candidate 129 is an intermediate candidate, not an accepted final release. Stage 1 is partially advanced: the catalog's CSS and JavaScript layout owners now agree on the same right-side geometry, and the first-row width fits the viewport-normalized reference. The overall Song Select layout remains visibly different from osu!stable; Stage 1 is not complete.

## Baseline and artifact
- Parent Candidate 128: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_128.html`
- Parent SHA-256: `29804a2d11062ffc8673f0e8f2ff29896a2777c52369ded3c4f7916d8df9b31b`
- Candidate 129: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_129.html`
- Size: 9,237,869 bytes
- SHA-256: `b23fbbfc1596d6f54db3bb54345cc4052b5128284387e43057754107dcdac1ef`
- Rollback Candidate 128 remains unchanged. Candidate 126 and Candidate 125 remain unchanged.
- Reference `image.png`: 2555 × 1438, SHA-256 `f0fd3ab5ec11e87632d95aac0ab7b9df3595c96e20bb03c5201d012d613b99a4`.

## Root cause
Candidate 128 browser geometry showed competing layout owners: the CSS fallback specified a 46.5vw catalog while the JavaScript layout owner still applied `left:35.5vw; width:64.5vw`. Geometry varied with runtime timing and oversized rows could overflow. Candidate 129 updates the existing JavaScript owner and CSS fallback to `left:53.5vw; width:46.5vw`, keeps the widest song row at 46vw, and reduces card hover movement to 3px.

## Tests and evidence
- PASS: parent SHA-256 verified before editing.
- PASS: 62 inline JavaScript blocks parsed by Node, zero syntax errors.
- PASS: 90 CSS blocks / 2,579 top-level qualified rules parsed, zero errors.
- PASS: static assertions 7/7.
- PASS: Playwright rendered the actual HTML using `page.set_content` and navigated the home-menu interaction into Song Select.
- PASS: screenshot and DOM geometry captured at 1648×928, 1440×900, and 1280×720, DPR 1.
- PASS: 180 catalog cards rendered; `#grid` computes to vertical flex with right alignment.
- PASS: card expansion inserts an inline song row with real song metadata. Hover geometry moves 3px left.
- PARTIAL: selected row receives `proto26-song-selected` and white selected styling, but computed transform remains `none`; selected-vs-hover displacement is not fully fixed.
- BLOCKED: direct `file://` navigation is rejected by the environment. `page.set_content` uses an opaque origin and localStorage access is denied, so true reload persistence is NOT RUN.
- NOT RUN: live AniList/MAL/VNDB APIs, actual audio playback in this run, full import/backup recovery, and persistence across a real browser reload.
- NOT RUN: pixel metrics for 1440×900 and 1280×720; screenshots and geometry exist, but only the 1648×928 view has full-frame metrics.

## Pixel comparison
Reference and Candidate 129 screenshots normalized to 1648×928 with Lanczos resizing. Scores are descriptive only because the app currently has a different background/player panel and uses different song artwork.

| Candidate | SSIM | MAE | RMSE |
|---|---:|---:|---:|
| Candidate 126 | 0.308599 | 64.4134 | 86.2203 |
| Candidate 129 | 0.312034 | 63.4492 | 84.8510 |

This is a small improvement, not a high-fidelity pass. Major gaps remain: left feature rail instead of compact ranking/player panel, no actual scene artwork when no user background is selected, top-left metadata/layout differences, bottom control composition, and card text clipping.

## Acceptance
**NOT ACCEPTED as final.** Real screenshot measurement is now demonstrated, but direct file navigation and persistent-storage acceptance remain blocked. Stage 1 is incomplete; Stages 2 and 3 remain incomplete.

## Rollback
Use Candidate 128, SHA-256 `29804a2d11062ffc8673f0e8f2ff29896a2777c52369ded3c4f7916d8df9b31b`.
