# Next Task

**Priority: continue Song Select visual correction from candidate 44. Do not switch to Home, Play, or Settings.**

## Verified starting point

- Candidate 44 HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_44.html`.
- Tested source commit: `1bd01bbd0820f5f4a5c61c46aa3eed75bac5016e`.
- Report commit: `c64b35cf9aa2f1b6cbd7667d35c8379ab7603b4e`.
- Passing GitHub Actions: https://github.com/murorachi/Amq-/actions/runs/39638583685.
- SHA-256: `787332a554e40d52a7b0f0e0c9ba490cbf14bb16da1c9e0e56148afb469f432c`.
- Immutable Proto25 baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.

## Verified tests

- Static/build: PASS.
- Playwright browser acceptance: PASS; page/console errors 0 / 0.
- Scene bounds at 1000×562: PASS; scene and image x=282..1000.
- Filter controls at 1000×562: PASS; six controls are 120px wide and remain inside catalog x=738..1000.
- Cover readiness: 7/8 real covers and 8/8 visible images loaded before visual capture.
- Visual evidence: PASS.
- Visual design acceptance: NOT ACCEPTED. Normalized MAE 0.275356; changed-pixel ratio 83.81%. Diagnostic only, not a similarity percentage.

## Next implementation steps

1. Compare candidate 44 default/selected screenshots, overlay and pixel-diff with the pinned osu!Stable reference. Separate required AMQ content differences from true layout/style defects.
2. Correct the largest remaining differences: left information hierarchy, central artwork treatment, right catalog card proportions/typography, and bottom playback controls.
3. Preserve horizontal cover+title cards, clear title/subtitle hierarchy, the scene background manager and a usable fallback when no custom background is selected.
4. Run static and browser checks at 1280×720, 1440×900, 1000×562 and mobile. Keep filter bounds, hover/selected behavior, cover loading, source modes and four-workspace switching in regression tests.
5. Continue identifying the exact osu!Stable client source commit. The pinned Wiki screenshot blob is verified, but the matching client build remains NOT VERIFIED.
6. Use a unique filename for each source change; update records only from actual test and remote verification results.

## Reference record

- Official Wiki release label: `20260924.1`; exact matching osu!Stable client source commit: NOT VERIFIED.
- Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Song Select screenshot Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`.

## Rollback

- Candidate 44: SHA-256 `787332a554e40d52a7b0f0e0c9ba490cbf14bb16da1c9e0e56148afb469f432c`.
- Candidate 21: SHA-256 `5a89a1f27b1ce25984e6076ff16531397e48c319fd02d602ee87d984486d2293`.
- Candidate 10: SHA-256 `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`.
- Immutable Proto25: SHA-256 `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
