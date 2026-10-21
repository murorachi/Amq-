# Next Task

**Priority 1: continue Song Select visual correction from candidate 31. Do not switch to Home, Play, or Settings.**

## Verified starting point

- Candidate 31: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_31.html`.
- Source commit tested: `a09ba9fb9fdc443d8100042569d920f5dc1313df`.
- Generated report commit: `46db5f2bc21b39fbe3fbcf6084da13ad08d3ae0d`.
- Passing GitHub Actions: https://github.com/murorachi/Amq-/actions/runs/39634395693.
- HTML SHA-256: `c7041795ed3be10993dc9785bb97a86c794ff7861df8c7212a89ea4bac5b529d`.
- Artifact: https://github.com/murorachi/Amq-/actions/runs/39634395693/artifacts/12359524431.
- Immutable Proto25 baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.

## Test state

- Static/build assertions: **PASS**.
- Playwright browser acceptance: **PASS**.
- Page/console errors: **0 / 0**.
- Scene image bounds at 1000×562: **PASS** (scene and image both x=282..1000).
- Hover row displacement test: **PASS** after moving the pointer away before baseline measurement; debug confirms unselected hover X transform = -3px.
- Visual evidence generation: **PASS**.
- Visual design acceptance: **NOT ACCEPTED**. Candidate 31 diagnostic normalized MAE 0.275356; changed-pixel ratio 83.8122%. Neither is a similarity percentage.

## Next implementation steps

1. Inspect the actual computed opacity, filter, overlay and z-index of the first several loaded catalog cover images. The report confirms valid external image URLs and nonzero natural dimensions, but the screenshot still makes the covers look like subdued gradients/placeholders.
2. Identify the exact CSS layer causing the thumbnails to appear washed out. Do not change data sources or fabricate cover art; preserve the actual loaded cover URLs and fallback behavior for unloaded images.
3. Review the candidate 31 default screenshot, selected-work detail screenshot, overlay and pixel-diff against the pinned osu!Stable reference. Correct the largest visual hierarchy gaps first: left information panel, center artwork treatment, right catalog density/cover treatment and bottom controls.
4. Keep the central title clear of the catalog; preserve the single-column list, internal scroll ownership, audio dock clearance and existing custom-background manager.
5. Run static and browser checks at 1280×720, 1440×900, 1000×562 and mobile. Include hover/selected state, real cover loading, mode switching and four-workspace regression checks.
6. Produce a unique candidate filename for every build and update these records only with verified evidence.

## Reference record

- Official Wiki release label: `20260924.1`; exact matching osu!Stable client source commit: **NOT VERIFIED**.
- Official Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Song Select screenshot Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`.
- Candidate 31 normalized MAE: 0.275356.
- Candidate 31 changed-pixel ratio: 83.8122%. Diagnostic only, not a similarity percentage.

## Rollback

- Candidate 31: SHA-256 `c7041795ed3be10993dc9785bb97a86c794ff7861df8c7212a89ea4bac5b529d`.
- Candidate 21: SHA-256 `5a89a1f27b1ce25984e6076ff16531397e48c319fd02d602ee87d984486d2293`.
- Candidate 10: SHA-256 `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`.
- Candidate 09: SHA-256 `37d5055e91688e7604007d052041aa0f846c04c29793fced2312592f282ea01d`.
- Immutable Proto25 baseline: SHA-256 `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
