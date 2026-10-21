# Baseline and rollback record

## Immutable AMQ baseline
- Branch: `v82.85.30-proto25-ui-refactor-stage-24`
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`
- Source commit: `3aea33e7137b7e3e3105c76ed896a515a335c2a3`
- Size: 8,926,248 bytes
- SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`
- Read-only. Never overwrite this file or branch.

## Latest verified functional candidate: Proto32 / candidate 09
- Branch: `v82.85.30-proto32-song-select-reference-composition-01`
- Tested source commit: `8a209316f4b000b4fba767019fc1b28556e963bc`
- Generated artifact/report commit: `1ae0419` (Build Proto26 candidate and record visual comparison evidence)
- Run: https://github.com/murorachi/Amq-/actions/runs/39584392554 — **SUCCESS**
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_09.html`
- Size: 8,961,290 bytes
- SHA-256: `37d5055e91688e7604007d052041aa0f846c04c29793fced2312592f282ea01d`
- Git blob SHA: `6e8eb31653e9069333d44096287eac489c887922`
- Static tests: PASS. Playwright browser tests: PASS. Matched-viewport visual evidence generation: PASS.
- Visual acceptance: **NOT VERIFIED**. Diagnostic normalized MAE is 0.277068 and changed-pixel ratio is 80.57%; neither is a similarity percentage.
- Browser page errors / console errors: 0 / 0.
- Preserve candidate 09 as an immutable checkpoint for subsequent visual corrections.

## Previous verified functional candidate: Proto31 / candidate 08
- Branch: `v82.85.30-proto31-scene-background-integration-01`
- Tested source commit: `a8bec92c8549d6fcc2cf13ffc0401c150ce247ed`
- Generated artifact/report commit: `6eda007f92417c8bc3614d8451ae0379e3943d4b`
- Run: https://github.com/murorachi/Amq-/actions/runs/39581069788 — **SUCCESS**
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_08.html`
- Size: 8,952,996 bytes
- SHA-256: `4fcf49520729584e9353f3779551c5f1cd0dc88799aa2ae8cfb69f36c2f4853f`
- Candidate 08 remains available for rollback.

## Official osu!stable reference
- Stable release label: `20260924.1`; this is not a source-control commit.
- Official Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Song Select screenshot: `wiki/Client/Interface/img/song-selection.jpg`.
- Verified Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`.
- Exact osu!stable client source commit matching that release: **NOT VERIFIED**.
- The public `ppy/osu` repository is the successor client (lazer); do not treat its current source as Stable source.
- The official Wiki screenshot is a traceable visual reference, but its exact capture build is unknown.

## Rollback
1. Prefer candidate 08 if candidate 09 needs to be reverted: SHA-256 `4fcf49520729584e9353f3779551c5f1cd0dc88799aa2ae8cfb69f36c2f4853f`.
2. Candidate 09 SHA-256: `37d5055e91688e7604007d052041aa0f846c04c29793fced2312592f282ea01d`.
3. For a clean rebuild, use the immutable Proto25 baseline and pinned builder.
4. Do not merge PR #10/#11 until Song Select visual and functional gates are satisfied.
