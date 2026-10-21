# Next Task

**Priority 1: complete candidate 29 validation, then continue Song Select visual correction. Do not switch to Home, Play, or Settings.**

## Verified starting point

- Latest verified functional checkpoint: candidate 21.
- Candidate 21 SHA-256: `5a89a1f27b1ce25984e6076ff16531397e48c319fd02d602ee87d984486d2293`.
- Immutable Proto25 baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
- Visual design acceptance remains **NOT ACCEPTED**.

## Current validation

- Branch: `v82.85.30-proto35-song-select-visual-correction-01`.
- Candidate 25: Playwright failed because the hover test used a row that may already be selected.
- Candidate 26: static/build passed, but Playwright never ran because the browser test file contained a literal newline escape and failed Python parsing.
- Candidate 29 corrects the syntax, selects an unselected row for the hover assertion, and adds a containment assertion for the scene artwork at 1000×562. CSS now uses auto-sized absolute inset geometry for the scene and artwork layers.
- Workflow: https://github.com/murorachi/Amq-/actions/runs/39633715502.
- Candidate 29 is pending; do not treat the static test as browser acceptance.

## After candidate 29 finishes

1. If the browser test fails, inspect the exact assertion and log. Increment the candidate filename before further edits.
2. If browser tests pass, inspect the actual candidate screenshot, overlay and pixel-diff against the pinned osu!Stable reference. A passing browser run is not visual acceptance.
3. Verify that real cover images load in default AMQ mode and that the central scene uses actual loaded artwork without breaking the existing custom-background manager.
4. Continue correcting left information hierarchy, central composition, right catalog density and bottom controls against the pinned reference.
5. Run static and browser checks at 1280×720, 1440×900, 1000×562 and mobile, including artwork bounds, workspace switching, source modes, and hover/selected row behavior.
6. Keep generated HTML filenames unique and immutable. Update these records after each verified checkpoint.

## Reference record

- Official Wiki release label: `20260924.1`; exact matching osu!Stable client source commit: **NOT VERIFIED**.
- Official Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Song Select screenshot Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`.
- Candidate 21 normalized MAE: 0.280775.
- Candidate 21 changed-pixel ratio: 88.1249%. These are diagnostics, not similarity percentages.

## Rollback

- Candidate 21: SHA-256 `5a89a1f27b1ce25984e6076ff16531397e48c319fd02d602ee87d984486d2293`.
- Candidate 10: SHA-256 `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`.
- Candidate 09: SHA-256 `37d5055e91688e7604007d052041aa0f846c04c29793fced2312592f282ea01d`.
- Immutable Proto25 baseline: SHA-256 `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
