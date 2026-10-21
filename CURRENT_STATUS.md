# Current Status

## Latest verified functional candidate

- Candidate: Song Select candidate 44.
- Tested source commit: `1bd01bbd0820f5f4a5c61c46aa3eed75bac5016e`.
- Generated report/artifact commit: `c64b35cf9aa2f1b6cbd7667d35c8379ab7603b4e`.
- GitHub Actions: https://github.com/murorachi/Amq-/actions/runs/39638583685 — **SUCCESS**.
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_44.html`.
- Size: 8,989,055 bytes.
- SHA-256: `787332a554e40d52a7b0f0e0c9ba490cbf14bb16da1c9e0e56148afb469f432c`.
- Remote Git blob SHA: `473b087541bcb9eb80b1d6771e8277f18ea72530`.
- Static/build assertions: **PASS**.
- Playwright browser acceptance: **PASS**; page/console errors 0 / 0.
- Visual evidence generation: **PASS**.
- Visual design acceptance: **NOT ACCEPTED**. Normalized MAE 0.275356; changed-pixel ratio 83.81%. These are diagnostics, not similarity percentages.
- Artifact ZIP SHA-256: `102f000aec43ffaf5774b8339f220198a1fba6491f72cc86d39ec07821033feb`.

## Verified changes in candidate 44

- Hover state now has a reproducible test: pointer is moved away before measuring the baseline. Unselected hover uses a smaller left displacement than selected state.
- At 1000×562, scene and scene artwork both fit x=282..1000. Previously the scene image extended x=269..1013 due to scale transform.
- Responsive catalog filters now use source-level inline style synchronization, since legacy code sets inline `!important` widths and flex settings that stylesheet-only overrides could not replace.
- At 1000×562, all six filter controls are within the catalog panel x=738..1000; each is 120px wide. The document has no horizontal overflow.
- Visual capture waits for real catalog cover loading. Candidate 44 captured 7/8 real covers and 8/8 visible images loaded before screenshot.
- Four-workspace switching, source-mode switching, work selection/detail drawer, history data, keyboard dismissal, responsive overflow, scene bounds and filter bounds all pass.

## Active branch and immutable baseline

- Active branch: `v82.85.30-proto35-song-select-visual-correction-01`.
- Latest verified generated report commit: `c64b35cf9aa2f1b6cbd7667d35c8379ab7603b4e`.
- Immutable Proto25 baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
- Candidate 21 remains an earlier verified functional rollback: SHA-256 `5a89a1f27b1ce25984e6076ff16531397e48c319fd02d602ee87d984486d2293`.

## Reference

- Official osu! Wiki release label: `20260924.1`; exact matching osu!Stable client source commit: **NOT VERIFIED**.
- Pinned Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Song Select reference image Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`.

## Test state

- Candidate 21 static/browser acceptance: **PASS**; visual design acceptance: **NOT ACCEPTED**.
- Candidate 25 browser acceptance: **FAIL** due to an already-hovered initial pointer state in the test.
- Candidate 26 browser acceptance: **NOT RUN** because the test harness contained a Python syntax error.
- Candidate 29 browser acceptance: **FAIL**; hover test setup and scene scaling were still incorrect.
- Candidate 31 static/browser acceptance: **PASS**; responsive filter containment was not yet tested.
- Candidate 33 visual evidence: **PASS**; confirmed covers were not ready at the original screenshot timing.
- Candidate 36/38/39/41 runs exposed ineffective filter CSS due to legacy inline styles and wrong parent scope; no failed candidate was promoted.
- Candidate 42 responsive bounds: **PASS**, but toolbar width was too narrow to be useful.
- Candidate 44 static/build assertions: **PASS**.
- Candidate 44 Playwright browser acceptance: **PASS**.
- Candidate 44 visual evidence generation: **PASS**.
- Candidate 44 visual design acceptance: **NOT ACCEPTED**.

## Rollback

- Candidate 44 functional checkpoint SHA-256: `787332a554e40d52a7b0f0e0c9ba490cbf14bb16da1c9e0e56148afb469f432c`.
- Candidate 21 functional checkpoint SHA-256: `5a89a1f27b1ce25984e6076ff16531397e48c319fd02d602ee87d984486d2293`.
- Candidate 10 rollback SHA-256: `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`.
- Immutable Proto25 baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
- Never overwrite prior candidates or the immutable baseline.
