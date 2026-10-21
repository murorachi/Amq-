# Baseline and rollback record

## Current functional checkpoint: Proto34 candidate 11

- Branch: `v82.85.30-proto34-song-select-catalog-density-01`
- Tested source commit: `38921fb2d206b908b363a19d804c2f79410d6fcb`
- Generated HTML/report commit: `4d58e6a9c359f323a778c87271d54d1cc828a7d1`
- Actions run: https://github.com/murorachi/Amq-/actions/runs/39602822402 — **SUCCESS**
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_11.html`
- Size: 8,970,671 bytes
- SHA-256: `10d94cdd4c1eb69f4bd83fdde3538390a4ccef12240d595c81c28a54c427a57a`
- Static assertions: PASS. Playwright browser acceptance: PASS. Browser page errors / console errors: 0 / 0.
- 1280×720 catalog grid: 185.48 px high, 10,079 px scroll height, 180 AMQ cards; at least three cards fully visible above the bottom player.
- Visual evidence generation: PASS. Visual acceptance: **NOT VERIFIED**. Diagnostic normalized MAE is 0.273457 and changed-pixel ratio is 78.27%; these are not similarity percentages and indicate substantial differences requiring correction.
- Artifact and screenshots: https://github.com/murorachi/Amq-/actions/runs/39602822402/artifacts/12347311118
- Artifact ZIP SHA-256: `b9459630197269eb8fb84270e68836eae67b80c543c2412857f22571b578c888`
- Candidate 11 is a functional checkpoint, not an accepted visual release.

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
