# Current Status

## Latest verified functional candidate

- Candidate: Song Select candidate 44.
- Tested source commit: `1bd01bbd0820f5f4a5c61c46aa3eed75bac5016e`.
- Generated report commit: `c64b35cf9aa2f1b6cbd7667d35c8379ab7603b4e`.
- GitHub Actions: https://github.com/murorachi/Amq-/actions/runs/39638583685 — SUCCESS.
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_44.html`.
- Size: 8,989,055 bytes.
- SHA-256: `787332a554e40d52a7b0f0e0c9ba490cbf14bb16da1c9e0e56148afb469f432c`.
- Remote Git blob SHA: `473b087541bcb9eb80b1d6771e8277f18ea72530`.
- Static/build assertions: PASS. Playwright: PASS. Page/console errors: 0 / 0.
- Visual evidence: PASS. Visual design acceptance: NOT ACCEPTED. Normalized MAE 0.275356; changed-pixel ratio 83.81% (diagnostics, not similarity percentages).
- Artifact ZIP SHA-256: `102f000aec43ffaf5774b8339f220198a1fba6491f72cc86d39ec07821033feb`.

## Verified changes

- Hover test now moves the pointer away before measuring the baseline.
- At 1000×562, scene and scene image both fit x=282..1000.
- Responsive filter layout is handled in the source-level inline-style function because legacy inline !important styles defeated CSS-only overrides.
- At 1000×562, six filter controls fit inside catalog x=738..1000, each 120px wide; document width remains 1000.
- Visual capture waits for real covers: 7/8 cover containers and 8/8 visible images loaded before capture.
- Workspace switching, source modes, work selection/detail drawer, keyboard dismissal, scene bounds, filter bounds and console/page-error checks pass.

## Baselines and references

- Immutable Proto25 baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
- Previous functional checkpoint candidate 21 SHA-256: `5a89a1f27b1ce25984e6076ff16531397e48c319fd02d602ee87d984486d2293`.
- Official Wiki release label: `20260924.1`; matching osu!Stable client source commit: NOT VERIFIED.
- Pinned Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Song Select reference image Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`.

## Test history

- Candidate 25: browser test FAIL due to an already-hovered initial pointer state.
- Candidate 26: browser test NOT RUN due to test-harness Python syntax error.
- Candidate 29: browser test FAIL; hover setup and scene scaling issues remained.
- Candidate 31: static/browser PASS; responsive filter containment not yet tested.
- Candidate 33: visual evidence confirmed covers were not ready at the original screenshot timing.
- Candidate 36/38/39/41: responsive filter CSS attempts failed; not promoted.
- Candidate 42: bounds PASS, but toolbar too narrow.
- Candidate 44: static/browser PASS; visual design acceptance NOT ACCEPTED.

## Rollback

- Candidate 44 SHA-256: `787332a554e40d52a7b0f0e0c9ba490cbf14bb16da1c9e0e56148afb469f432c`.
- Candidate 21 SHA-256: `5a89a1f27b1ce25984e6076ff16531397e48c319fd02d602ee87d984486d2293`.
- Immutable Proto25 SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
- Never overwrite prior candidates or the immutable baseline.
