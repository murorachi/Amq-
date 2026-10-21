# Next Task

**Priority 1: finish candidate 26 validation, then continue Song Select visual correction. Do not switch to Home, Play, or Settings.**

## Verified starting point

- Latest verified functional checkpoint: candidate 21.
- Candidate 21 SHA-256: `5a89a1f27b1ce25984e6076ff16531397e48c319fd02d602ee87d984486d2293`.
- Immutable Proto25 baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
- Visual acceptance remains **NOT ACCEPTED**.

## Current candidate 26 validation

- Branch: `v82.85.30-proto35-song-select-visual-correction-01`.
- Workflow: https://github.com/murorachi/Amq-/actions/runs/39633186103.
- Latest workflow commit: `c88cf9b9e407420a63b86f4751eb067f3124d7c0`.
- Candidate 25 failed Playwright because the test tried to measure hover displacement on the first song row, which may already carry the selected class. The test now chooses `.songrow:not(.proto26-song-selected)` first.
- Candidate 25 also showed the scene artwork bounds extending beyond the stage at 1000×562. Candidate 26 removes conflicting fixed width/height from the absolute inset layers and asserts the artwork stays within the scene.
- Candidate 26 browser acceptance and visual comparison are pending. Review the actual result and screenshot before further CSS changes.

## After candidate 26 finishes

1. If browser tests fail, use the exact failing assertion and logs to fix the root cause, increment to candidate 27, and rerun.
2. If browser tests pass, review the generated candidate screenshot, overlay and pixel-diff image against the pinned reference. A passing browser test is not visual acceptance.
3. Inspect the scene artwork and real cover loading in the default AMQ state. Preserve real cover URLs and the existing custom-background manager; do not fabricate art.
4. Continue correcting the left information hierarchy, center composition, right catalog density and bottom controls against the pinned osu!Stable screenshot.
5. Run static and browser checks at 1280×720, 1440×900, 1000×562 and mobile, including scene/artwork bounds, search/mode behavior, workspace switching and selected/hover row behavior.
6. Keep each generated HTML filename unique and immutable. Update these records after each verified checkpoint.

## Reference record

- Official Wiki release label: `20260924.1`; exact matching osu!Stable client source commit: **NOT VERIFIED**.
- Official Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Song Select screenshot Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`.
- Candidate 21 diagnostic normalized MAE: 0.280775.
- Candidate 21 changed-pixel ratio: 88.1249%. These are diagnostic values, not similarity percentages.

## Rollback

- Candidate 21: SHA-256 `5a89a1f27b1ce25984e6076ff16531397e48c319fd02d602ee87d984486d2293`.
- Candidate 10: SHA-256 `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`.
- Candidate 09: SHA-256 `37d5055e91688e7604007d052041aa0f846c04c29793fced2312592f282ea01d`.
- Immutable Proto25 baseline: SHA-256 `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
