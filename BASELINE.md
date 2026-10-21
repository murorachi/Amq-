# Baseline and rollback record

## Immutable AMQ baseline
- Branch: `v82.85.30-proto25-ui-refactor-stage-24`
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`
- Source commit: `3aea33e7137b7e3e3105c76ed896a515a335c2a3`
- Size: 8,926,248 bytes
- SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`
- Read-only. Never overwrite this file or branch.

## Latest verified development checkpoint: Proto28
- Branch: `v82.85.30-proto28-song-select-default-state-fix-01`
- CI source commit: `52e1677ae3f6385fec577dce3609ee7511cc73c4`
- Generated artifact/report commit: `fbf48765d07401e8b87494eec7c3c84015db7867`
- Run: https://github.com/murorachi/Amq-/actions/runs/39570523908 — **SUCCESS**
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_06.html`
- Size: 8,943,047 bytes
- SHA-256: `3b1626b825ca223d6ff18dc5fb0927ed275f3fd58314782bdec4fe1b1919c08a`
- Static tests: PASS. Playwright browser tests: PASS. Matched-viewport reference evidence: generated.
- Visual acceptance: **NOT VERIFIED**. A large blank left column remains because the default Song Select route retains workspace padding. Candidate 06 is a rollback checkpoint, not final UI approval.

## Earlier accepted rollback candidate
- Branch: `v82.85.30-proto26-song-select-integration-01`
- PR #10 remains draft/unmerged: https://github.com/murorachi/Amq-/pull/10
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_04.html`
- Size: 8,938,670 bytes
- SHA-256: `c1155dc7969613bbc20914816a7833842ba8384fd25f2a4611917ee7d2dd5950`
- Run: https://github.com/murorachi/Amq-/actions/runs/39550068389 — static and browser acceptance PASS.

## Official osu!stable reference record
- Stable release label: `20260924.1`; this label is not a source-control commit.
- Official Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Song Select screenshot: `wiki/Client/Interface/img/song-selection.jpg`.
- Verified Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`.
- Exact osu!stable client source commit matching that release: **NOT VERIFIED**.
- Visual evidence: `engineering/proto26-song-select/VISUAL_COMPARISON_REPORT.md`; image and pixel-difference files are available in the Proto28 Actions artifact.

## Rollback
- For the latest accepted development checkpoint, use candidate 06 with SHA-256 `3b1626b825ca223d6ff18dc5fb0927ed275f3fd58314782bdec4fe1b1919c08a`.
- For the earlier accepted fallback, use candidate 04 with SHA-256 `c1155dc7969613bbc20914816a7833842ba8384fd25f2a4611917ee7d2dd5950`.
- For a clean baseline rebuild, use the immutable Proto25 file and pinned builder.
- Do not merge PR #10/#11 until Song Select visual and functional gates are satisfied.
