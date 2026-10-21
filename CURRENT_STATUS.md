# Current Status

## Latest verified checkpoint: Proto30 Song Select composition prototype (2026-10-21)

- Working branch: `v82.85.30-proto30-song-select-composition-01`
- Source commit: `3bc5ebb418d435905388c11bb63ba445362848e6`
- Generated artifact/report commit: `a3e6bebf780a5bb82952db87a8dbaae5762ca8fa`
- GitHub Actions: https://github.com/murorachi/Amq-/actions/runs/39574095207 — **SUCCESS**
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_08.html`
- Candidate SHA-256: `bb56c70202b90c9926eb9299fa863048fb71fe0edc402460ddfda8f0a2f6c3ff`
- Static acceptance: **PASS**; Playwright browser acceptance: **PASS**; reference evidence generation: **PASS**; page errors / console errors: **0 / 0**.
- Visual acceptance: **NOT VERIFIED**. Diagnostic MAE `0.286490`; 78.28% of pixels have max-channel difference ≥24. These are difference diagnostics, not a similarity score.
- Proto30 introduced a three-zone Song Select layout using existing catalog DOM nodes. Initial browser failure was traced to moving catalog nodes before inserting the new stage; corrected in `3bc5ebb`.

## Previous verified checkpoint: Proto29 default layout width fix (2026-10-21)

- Working branch: `v82.85.30-proto29-song-select-layout-width-01`
- CI source commit: `d0f89294ca16488453f9afa2225b8ac9d1c5dda5`
- Generated artifact/report commit: `ae0377e5efab163b9501456c371bce5e0074cafc`
- GitHub Actions: https://github.com/murorachi/Amq-/actions/runs/39571163151 — **SUCCESS**
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_07.html`
- Size: 8,943,265 bytes
- SHA-256: `2aad33f00a7553545784d726dd9b89f07ce90ae390596c277452014605d988f8`
- Static acceptance: **PASS**
- Playwright browser acceptance: **PASS**
- Pinned reference identity and matched-viewport evidence generation: **PASS**
- Page errors / console errors: **0 / 0**
- Immutable baseline hash verification: **PASS**, unchanged.

### Verified Proto29 changes
- Removed the legacy left padding reserved for the workspace sidebar when no workspace mode is selected.
- Default Song Select now uses the full available width; at 1440×900 the measured body left padding is 0 px, search starts at x=38, and catalog starts at x=28.
- Preserved the bottom four-workspace dock and conditional sidebar behavior.
- Created a unique candidate filename `...song_select_07.html`; candidate 06 remains unchanged as the previous checkpoint.
- Added static and browser assertions for the full-width geometry and continued workspace-mode behavior.

### Visual comparison: evidence generated, visual acceptance NOT VERIFIED
- Official osu!-wiki reference commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`
- Reference image Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`
- Matched viewport: 1280×720; geometry additionally checked at 1440×900.
- Diagnostic normalized MAE: `0.303679`
- Pixels with max-channel difference ≥ 24: 833,933 / 921,600 (90.49%). This is **not** a similarity score. The changed-pixel ratio rose after filling the previously blank left region; do not interpret that as a regression by itself.
- The blank left column defect is fixed.
- Remaining major visual gaps: AMQ still uses a generic filter bar and multi-column catalog card grid; the Stable reference uses a left ranking/score panel, large central background composition, right-side horizontal song/beatmap cards, and bottom controls. AMQ's required content must be mapped into that hierarchy rather than simply retaining the existing grid.
- Exact osu!stable client source commit matching Stable `20260924.1`: **NOT VERIFIED**. Do not substitute osu!lazer.

### Remaining gates
- Redesign Song Select's main composition around the pinned Stable reference while preserving AMQ's required information and existing data handlers.
- Trace real song history/play-count/last-wrong-answer data before adding the selected-song information panel; missing fields must show empty states.
- Integrate the existing anime/VN catalog as horizontal cards, with real sorting/filtering and AMQ/EMQ/MIX/Singer mode behavior.
- Search edge cases, sort-result assertions, Enter/double-event regression, and real audio-output acceptance: **NOT RUN** in this stage.
- Full quiz answer lifecycle and multiplayer server lifecycle: **NOT RUN**.
- Home, Play, Settings, profile/statistics visual acceptance: **NOT RUN**.

## Immutable baseline and rollback

- Immutable baseline branch: `v82.85.30-proto25-ui-refactor-stage-24`
- Baseline file: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`
- Baseline source commit: `3aea33e7137b7e3e3105c76ed896a515a335c2a3`
- Baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`
- Earlier accepted rollback candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_04.html`
- Rollback candidate SHA-256: `c1155dc7969613bbc20914816a7833842ba8384fd25f2a4611917ee7d2dd5950`
- Candidate 06 checkpoint SHA-256: `3b1626b825ca223d6ff18dc5fb0927ed275f3fd58314782bdec4fe1b1919c08a`
- Draft PRs #10 and #11 remain unmerged. Do not overwrite the baseline or any prior candidate.

## Next task

Start an isolated Song Select composition stage from candidate 07. Use the pinned reference to establish the layout regions and map existing AMQ data/functions into them. Keep candidate 07 unchanged, build a uniquely named next HTML, and rerun static, browser, geometry, and visual-evidence tests before claiming progress.
