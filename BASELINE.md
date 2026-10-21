# Baseline and rollback record

## Immutable AMQ baseline
- Branch: `v82.85.30-proto25-ui-refactor-stage-24`
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`
- Source commit: `3aea33e7137b7e3e3105c76ed896a515a335c2a3`
- Size: 8,926,248 bytes
- SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`
- Read-only. Never overwrite this file or branch.

## Latest verified functional candidate: Proto33 / candidate 10
- Branch: `v82.85.30-proto33-song-select-visual-correction-01`
- Tested source commit: `783a64e9207f1d4f7febbad240b136487d2cdc26`
- Generated artifact/report commit: `bb6aaa5c7ac3a20b46cc2d5320d969b8ea00ec7c`
- Run: https://github.com/murorachi/Amq-/actions/runs/39585952303 — **SUCCESS**
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_10.html`
- Size: 8,968,245 bytes
- SHA-256: `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`
- Static tests: PASS. Playwright browser tests: PASS. Matched-viewport visual evidence generation: PASS.
- Visual acceptance: **NOT VERIFIED**. Diagnostic normalized MAE is 0.281997 and changed-pixel ratio is 81.04%; neither is a similarity percentage.
- Browser page errors / console errors: 0 / 0.
- Preserve candidate 10 as an immutable checkpoint for further work.

## Previous verified functional candidate: Proto32 / candidate 09
- Branch: `v82.85.30-proto32-song-select-reference-composition-01`
- Tested source commit: `8a209316f4b000b4fba767019fc1b28556e963bc`
- Generated artifact/report commit: `1ae0419`
- Run: https://github.com/murorachi/Amq-/actions/runs/39584392554 — **SUCCESS**
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_09.html`
- Size: 8,961,290 bytes
- SHA-256: `37d5055e91688e7604007d052041aa0f846c04c29793fced2312592f282ea01d`
- Candidate 09 remains available for rollback.

## Previous verified functional candidate: Proto31 / candidate 08
- Branch: `v82.85.30-proto31-scene-background-integration-01`
- Generated artifact/report commit: `6eda007f92417c8bc3614d8451ae0379e3943d4b`
- Run: https://github.com/murorachi/Amq-/actions/runs/39581069788 — **SUCCESS**
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_08.html`
- SHA-256: `4fcf49520729584e9353f3779551c5f1cd0dc88799aa2ae8cfb69f36c2f4853f`

## Official osu!stable reference
- Stable release label: `20260924.1`; this is not a source-control commit.
- Official Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Song Select screenshot Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`.
- Exact osu!stable client source commit matching that release: **NOT VERIFIED**.
- Do not treat current `ppy/osu` source as Stable source; it is the successor client (lazer).

## Rollback
1. Candidate 09 SHA-256: `37d5055e91688e7604007d052041aa0f846c04c29793fced2312592f282ea01d`.
2. Candidate 10 SHA-256: `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`.
3. Immutable Proto25 baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
4. Never overwrite prior candidates or merge PR #10/#11 before visual and functional acceptance.
