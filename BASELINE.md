# Baseline and rollback record

## Current functional checkpoint under visual review

- Branch: `v82.85.30-proto34-song-select-catalog-density-01`
- Source commit tested: `c0737573422be39ea5bebd19639e0d785ad1a64d`
- CI-generated artifact/report commit: `67c9cb875c2347635fae97a2121a7e48012c609f`
- Run: https://github.com/murorachi/Amq-/actions/runs/39608921983 — **SUCCESS**
- Generated HTML path currently used by workflow: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_11.html`
- Size: 8,978,788 bytes
- SHA-256: `660738b4b193ccbfe6eb57931c520bd75ceca23239459cbe6b7a85269f3f41c6`
- Static/browser checks: **PASS**. Page/console errors: 0 / 0.
- Matched viewport evidence generation: **PASS**.
- Visual acceptance: **NOT ACCEPTED**. Diagnostic normalized MAE 0.269961; changed-pixel ratio 77.3776%. Manual review shows substantial structural differences.
- Artifact: https://github.com/murorachi/Amq-/actions/runs/39608921983/artifacts/12349617275
- Artifact ZIP SHA-256: `869cacdfce82e698146ce35579427024f75fa58efed4a51f4d7649910122a823`
- Candidate naming warning: preserve the previous candidate 11 file/hash from Git history or a separate immutable path before another iteration. The workflow currently reuses the candidate 11 path for different HTML content; next version should be candidate 12, not another overwrite.

## Previous functional rollback: Proto33 candidate 10

- Branch: `v82.85.30-proto33-song-select-visual-correction-01`
- Tested source commit: `783a64e9207f1d4f7febbad240b136487d2cdc26`
- Generated artifact/report commit: `bb6aaa5c7ac3a20b46cc2d5320d969b8ea00ec7c`
- Run: https://github.com/murorachi/Amq-/actions/runs/39585952303 — **SUCCESS**
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_10.html`
- SHA-256: `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`
- Static/browser checks passed; visual acceptance was not verified.

## Previous functional candidate: Proto32 / candidate 09

- Branch: `v82.85.30-proto32-song-select-reference-composition-01`
- Tested source commit: `8a209316f4b000b4fba767019fc1b28556e963bc`
- Generated artifact/report commit: `1ae0419`
- Run: https://github.com/murorachi/Amq-/actions/runs/39584392554 — **SUCCESS**
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_09.html`
- SHA-256: `37d5055e91688e7604007d052041aa0f846c04c29793fced2312592f282ea01d`

## Immutable AMQ baseline

- Branch: `v82.85.30-proto25-ui-refactor-stage-24`
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`
- Source commit: `3aea33e7137b7e3e3105c76ed896a515a335c2a3`
- Size: 8,926,248 bytes
- SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`
- Read-only. Never overwrite this file or branch.

## Official osu! Stable reference

- Wiki release label: `20260924.1`; this is not a source-control commit.
- Official Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Song Select screenshot Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`.
- Reference image: https://raw.githubusercontent.com/ppy/osu-wiki/ae2c6443a4264e5429ea7bcd2f3503be8a518a50/wiki/Client/Interface/img/song-selection.jpg
- Exact osu! Stable client source commit matching that release: **NOT VERIFIED**. Do not substitute current `ppy/osu` source, which is the successor client (lazer).

## Rollback

1. Candidate 10 rollback SHA-256: `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`.
2. Candidate 09 SHA-256: `37d5055e91688e7604007d052041aa0f846c04c29793fced2312592f282ea01d`.
3. Immutable Proto25 baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
4. Keep candidate 11 for ongoing functional work, but do not promote it to a visually accepted release until reference-based corrections and review pass.
5. Never overwrite prior candidates or merge PR #10/#11 before functional and visual acceptance.
