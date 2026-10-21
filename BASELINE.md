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


## Active isolated work branch: Proto34 candidate 11 (not yet accepted)
- Branch: `v82.85.30-proto34-song-select-catalog-density-01`
- Base checkpoint: `e2f1fef6299d217d500e90999b64c1852c9bbd50`.
- Current integration source change commit: `7c7190c2905a105d76f0467dbc2d872cc47e9ec5`.
- Build/test target: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_11.html`.
- Goal: reduce stage height and vertical whitespace, make the catalog grid internally scrollable, and require at least three visible real AMQ cards at 1280×720.
- Acceptance status: PENDING. Candidate 11 must not replace candidate 10 until Actions, browser checks and reference comparison results are reviewed.


## Active Proto34 continuation checkpoint (under test)
- Branch: `v82.85.30-proto34-song-select-catalog-density-01`.
- Browser diagnostics on run `39598657010` confirmed the catalog mount had 361.875px of height, but the song grid was only 3px because its intrinsic content size was used as the flex basis and shrunk under sibling controls.
- Corrective source commit: `3769d8bdb503e84d198c045686d699f691668c7d`; static-test assertion commit: `1f76ff00111f27f4ab071d94e6e3d0de67956ea1`.
- New grid rule uses zero flex basis and zero explicit height with min-height 0 and overflow auto, so flex growth should allocate the remaining catalog viewport. This is a hypothesis awaiting browser confirmation, not a pass claim.
- Current Actions run: https://github.com/murorachi/Amq-/actions/runs/39598805123 — in progress at documentation checkpoint.
- Preserve candidate 10 and immutable Proto25 exactly as recorded above; do not promote candidate 11 until all acceptance checks pass.


## Latest diagnostic run after failed zero-basis sizing
- Run `39598805123` failed: the song grid remained 3px tall with a 362px mount, even after using `flex:1 1 0px`. The assumption that the flex basis alone was the cause is disproven/incomplete.
- Diagnostic-only test change commit: `516497851fe4db38d6bc18993b5476695b2ba277`; it reports each direct child of `#p32Mount` with geometry and computed layout styles.
- Latest diagnostic workflow: https://github.com/murorachi/Amq-/actions/runs/39598982384 — running at checkpoint time.
- Do not promote candidate 11. Preserve candidate 10 and the immutable Proto25 baseline.
