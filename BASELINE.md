# Baseline and rollback record

## Immutable AMQ baseline
- Branch: `v82.85.30-proto25-ui-refactor-stage-24`
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`
- Source commit: `3aea33e7137b7e3e3105c76ed896a515a335c2a3`
- Size: 8,926,248 bytes
- SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`
- Read-only. Never overwrite this file or branch.

## Latest verified development checkpoint: Proto29
- Branch: `v82.85.30-proto29-song-select-layout-width-01`
- CI source commit: `d0f89294ca16488453f9afa2225b8ac9d1c5dda5`
- Generated artifact/report commit: `ae0377e5efab163b9501456c371bce5e0074cafc`
- Run: https://github.com/murorachi/Amq-/actions/runs/39571163151 — **SUCCESS**
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_07.html`
- Size: 8,943,265 bytes
- SHA-256: `2aad33f00a7553545784d726dd9b89f07ce90ae390596c277452014605d988f8`
- Static tests: PASS. Playwright browser tests: PASS. Matched-viewport visual evidence: generated.
- Geometry: body left padding 0 px; search x=38 and catalog x=28 at 1440×900.
- Visual acceptance: **NOT VERIFIED**. The generic grid/filter composition still differs substantially from the pinned Stable screenshot.

## Previous verified checkpoints
- Proto28 branch: `v82.85.30-proto28-song-select-default-state-fix-01`
- Candidate 06 SHA-256: `3b1626b825ca223d6ff18dc5fb0927ed275f3fd58314782bdec4fe1b1919c08a`
- Proto28 run: https://github.com/murorachi/Amq-/actions/runs/39570523908 — SUCCESS.
- Earlier accepted candidate 04: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_04.html`, SHA-256 `c1155dc7969613bbc20914816a7833842ba8384fd25f2a4611917ee7d2dd5950`, run https://github.com/murorachi/Amq-/actions/runs/39550068389.

## Official osu!stable reference
- Stable release label: `20260924.1`; this is not a source-control commit.
- Official Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Song Select screenshot: `wiki/Client/Interface/img/song-selection.jpg`.
- Verified Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`.
- Exact osu!stable client source commit matching that release: **NOT VERIFIED**.
- Current comparison report: `engineering/proto26-song-select/VISUAL_COMPARISON_REPORT.md`.

## Rollback
- Latest verified development checkpoint: candidate 07, SHA-256 `2aad33f00a7553545784d726dd9b89f07ce90ae390596c277452014605d988f8`.
- Previous checkpoint: candidate 06, SHA-256 `3b1626b825ca223d6ff18dc5fb0927ed275f3fd58314782bdec4fe1b1919c08a`.
- Earlier accepted fallback: candidate 04, SHA-256 `c1155dc7969613bbc20914816a7833842ba8384fd25f2a4611917ee7d2dd5950`.
- For a clean rebuild, use the immutable Proto25 baseline and pinned builder.
- Do not merge PR #10/#11 until Song Select visual and functional gates are satisfied.
