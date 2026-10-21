# Baseline and rollback record

## In-progress candidate (not a verified baseline)
- Working branch: `v82.85.30-proto32-song-select-reference-composition-01`
- Latest source under test: `8a209316f4b000b4fba767019fc1b28556e963bc`
- CI run: https://github.com/murorachi/Amq-/actions/runs/39584392554 — last observed IN PROGRESS.
- Candidate path: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_09.html`
- Candidate 09 SHA-256 for this source: NOT VERIFIED.
- The previous candidate 09 build hash `bc8a727b7dcea34e01c63fb16588f02a2461a100e3ae190fcab192d62d75e8fc` belongs to an earlier failing source commit and must not be reused.
- The latest verified artifact remains candidate 08 below until current static, browser and visual-evidence gates complete.

## Immutable AMQ baseline
- Branch: `v82.85.30-proto25-ui-refactor-stage-24`
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`
- Source commit: `3aea33e7137b7e3e3105c76ed896a515a335c2a3`
- Size: 8,926,248 bytes
- SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`
- Read-only. Never overwrite this file or branch.

## Latest verified development candidate: Proto31 / Song Select candidate 08
- Branch: `v82.85.30-proto31-scene-background-integration-01`
- Tested source commit: `a8bec92c8549d6fcc2cf13ffc0401c150ce247ed`
- Generated artifact/report commit: `6eda007f92417c8bc3614d8451ae0379e3943d4b`
- Run: https://github.com/murorachi/Amq-/actions/runs/39581069788 — **SUCCESS**
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_08.html`
- Size: 8,952,996 bytes
- SHA-256: `4fcf49520729584e9353f3779551c5f1cd0dc88799aa2ae8cfb69f36c2f4853f`
- Git blob SHA: `34e3f50af4d3224fd56b5237e202bc5bb3904958`
- Static tests: PASS. Playwright browser tests: PASS. Matched-viewport visual evidence generation: PASS.
- Visual acceptance: **NOT VERIFIED**. Diagnostic normalized MAE is 0.277352 and changed-pixel ratio is 91.02%; neither is a similarity percentage.
- Browser page errors / console errors: 0 / 0.
- Preserve candidate 08 as an immutable checkpoint for the next stage.

## Previous verified development checkpoint: Proto29 / candidate 07
- Branch: `v82.85.30-proto29-song-select-layout-width-01`
- CI source commit: `d0f89294ca16488453f9afa2225b8ac9d1c5dda5`
- Generated artifact/report commit: `ae0377e5efab163b9501456c371bce5e0074cafc`
- Run: https://github.com/murorachi/Amq-/actions/runs/39571163151 — **SUCCESS**
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_07.html`
- Size: 8,943,265 bytes
- SHA-256: `2aad33f00a7553545784d726dd9b89f07ce90ae390596c277452014605d988f8`
- Candidate 07 remains available for rollback.

## Official osu!stable reference
- Stable release label: `20260924.1`; this is not a source-control commit.
- Official Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Song Select screenshot: `wiki/Client/Interface/img/song-selection.jpg`.
- Verified Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`.
- Exact osu!stable client source commit matching that release: **NOT VERIFIED**.
- The public `ppy/osu` repository is the successor client (lazer); do not treat its current source as Stable source.
- The official Wiki screenshot is a traceable visual reference, but its exact capture build is unknown.

## Rollback
1. Prefer the previous verified candidate 07 if candidate 08 needs to be reverted: SHA-256 `2aad33f00a7553545784d726dd9b89f07ce90ae390596c277452014605d988f8`.
2. Candidate 08 SHA-256: `4fcf49520729584e9353f3779551c5f1cd0dc88799aa2ae8cfb69f36c2f4853f`.
3. For a clean rebuild, use the immutable Proto25 baseline and pinned builder.
4. Do not merge PR #10/#11 until Song Select visual and functional gates are satisfied.
