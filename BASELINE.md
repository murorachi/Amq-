# Baseline and rollback record

## Latest verified functional candidate

- Candidate: Proto45 / Song Select candidate 21.
- Source commit tested: `e1ced6d32dba444415069778dd1f686789058375`.
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_21.html`.
- Size: 8,968,944 bytes.
- SHA-256: `5a89a1f27b1ce25984e6076ff16531397e48c319fd02d602ee87d984486d2293`.
- Browser acceptance: **PASS**.
- Visual evidence generation: **PASS**.
- Visual design acceptance: **NOT ACCEPTED**; normalized MAE 0.280775 and changed-pixel ratio 88.1249% are diagnostics only.
- Candidate 21 remains an immutable functional checkpoint.

## Active candidate validation

- Branch: `v82.85.30-proto35-song-select-visual-correction-01`.
- Current candidate target: 26.
- Candidate 25 HTML was generated during CI but not promoted because browser acceptance failed.
- Candidate 25 failure was in the hover assertion: the test selected the first song row, which can already be selected, then incorrectly expected unselected hover behavior.
- Candidate 26 changes the test to choose an unselected row and changes the scene/artwork layers to inset + auto dimensions. A new 1000×562 scene-artwork bounds assertion is included.
- Workflow: https://github.com/murorachi/Amq-/actions/runs/39633186103.
- Latest workflow commit: `c88cf9b9e407420a63b86f4751eb067f3124d7c0`.
- Candidate 26 browser/visual result: pending at last update. Do not promote until tests finish.

## Immutable AMQ baseline

- Branch: `v82.85.30-proto25-ui-refactor-stage-24`.
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`.
- Source commit: `3aea33e7137b7e3e3105c76ed896a515a335c2a3`.
- Size: 8,926,248 bytes.
- SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
- Read-only. Never overwrite this file or branch.

## Official osu!Stable reference

- Wiki release label: `20260924.1`; this is not a source-control commit.
- Official Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Song Select screenshot Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`.
- Exact osu!Stable client source commit matching that release: **NOT VERIFIED**.
- Do not substitute current `ppy/osu` source, which is the successor client (lazer).

## Rollback

1. Candidate 21 verified functional checkpoint: SHA-256 `5a89a1f27b1ce25984e6076ff16531397e48c319fd02d602ee87d984486d2293`.
2. Candidate 10: SHA-256 `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`.
3. Candidate 09: SHA-256 `37d5055e91688e7604007d052041aa0f846c04c29793fced2312592f282ea01d`.
4. Immutable Proto25 baseline: SHA-256 `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
5. Never overwrite prior candidates or merge an unaccepted visual candidate into the baseline.
