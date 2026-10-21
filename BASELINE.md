# Baseline and rollback record

## Immutable AMQ baseline
- Branch: `v82.85.30-proto25-ui-refactor-stage-24`
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`
- Source commit: `3aea33e7137b7e3e3105c76ed896a515a335c2a3`
- Size: 8,926,248 bytes
- SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`
- Do not overwrite this branch/file.

## Current Proto26.8 candidate (CI accepted; not final UI approval)
- Working branch: `v82.85.30-proto26-song-select-integration-01`
- Draft PR #10: https://github.com/murorachi/Amq-/pull/10
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_06.html`
- CI run: https://github.com/murorachi/Amq-/actions/runs/39563090398 (**PASS**)
- Tested source commit: `ccf033399e2b4e30d0a7a70b5c2a746134b777b8`
- Size: 8,942,305 bytes
- SHA-256: `abaf342050f0d73c0450544114b124e1f95be9cb109956f25189532e770e52ca`
- Git blob SHA: `d953acd9fdcf5a5211ab95c996603325a1b9dd22`
- The downloaded CI artifact hash and committed Git blob were independently matched.
- This is a rollback checkpoint, not final UI approval; osu!stable visual comparison and audio output acceptance remain outstanding.


## Previous accepted rollback candidates
- Proto26.3: 8,933,730 bytes, SHA-256 `fae6492da52d5e1389e9b2d0122496843697d1fa42088a2805593420a296ff4f`; run https://github.com/murorachi/Amq-/actions/runs/39547940204.
- Proto26.4 / file `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_02.html`: 8,937,515 bytes, SHA-256 `9d052a0557a021309a596bf0fcdb127389107dc9b08878e63d13b31c4d6d15af`; run https://github.com/murorachi/Amq-/actions/runs/39549067049.
- Proto26.5 / file `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_03.html`: 8,938,405 bytes, SHA-256 `aa7da030b6324526cbdd0497b71b1607b8c832497940f5041a1dad559f6e7d06`; run https://github.com/murorachi/Amq-/actions/runs/39550068389 is the historical CI report for the then-current artifact; the same workflow later generated Proto26.6.

## Official osu!stable reference record
- Stable release label: `20260924.1`, as pinned by the existing Proto24 reference audit. This release label is not a source-control commit.
- Official Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Exact client source commit matching that Stable build: **NOT VERIFIED**.
- Song Select screenshot path: `wiki/Client/Interface/img/song-selection.jpg`, blob SHA `1e927a00a1984a5ba20fa5efec639410f349607a`.
- Reference evidence and limitations: `engineering/proto26-song-select/OSU_STABLE_REFERENCE_AUDIT.md`.

## Rollback
- To return to the last accepted candidate, use the versioned HTML listed above without overwriting the baseline.
- For source rollback, revert only the isolated Proto26 branch to the prior accepted commit or rebuild from the immutable Proto25 baseline using the pinned builder.
- Never merge PR #10 until in-place workspace actions and evidence-backed visual comparison pass.
