# Current Status

## Latest verified functional checkpoint: Proto34 candidate 11

- Active branch: `v82.85.30-proto34-song-select-catalog-density-01`
- Tested source commit: `38921fb2d206b908b363a19d804c2f79410d6fcb`
- Generated HTML/report commit: `4d58e6a9c359f323a778c87271d54d1cc828a7d1`
- Actions run: https://github.com/murorachi/Amq-/actions/runs/39602822402 — **SUCCESS**
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_11.html`
- Size: 8,970,671 bytes
- SHA-256: `10d94cdd4c1eb69f4bd83fdde3538390a4ccef12240d595c81c28a54c427a57a`
- Functional/browser checkpoint: **PASS**. Visual acceptance: **NOT VERIFIED**. Do not treat candidate 11 as a visually accepted release.

## Changes validated in this stage

- Fixed AMQ/Singer empty-state synchronization after asynchronous catalog rendering.
- Forced the catalog category tabs to remain in a compact, single-row, horizontally scrollable viewport.
- Reduced toolbar padding, compacted source-mode controls and the load-more action, and increased the stage height at 1280×720.
- The catalog grid now owns its vertical scroll area instead of collapsing under its sibling controls.
- The versioned candidate 11 HTML and test reports were committed to the branch only after static, browser, and evidence-generation steps passed.

## Test results

- Static source/build assertions: **PASS**.
- Playwright browser acceptance: **PASS**.
- At 1280×720: grid height 185.48 px; grid scroll height 10,079 px; 180 real AMQ cards in the catalog; four cards intersect the internal scroll viewport and at least three cards are fully visible above the bottom player.
- Internal vertical scrolling: **PASS**.
- Workspace routes/actions, AMQ/EMQ/MIX/Singer modes, selected-song detail data, mobile overflow and drawer checks: **PASS**.
- Uncaught page errors / browser console errors: **0 / 0**.
- Matched-viewport visual evidence generation: **PASS**.
- Visual acceptance: **NOT VERIFIED**. The overlay and pixel-difference image show major structural differences from the pinned osu! Stable screenshot. Diagnostic normalized MAE is 0.273457; 78.27% of pixels have max-channel difference >=24. These metrics are not a similarity percentage.
- Exact osu! Stable client source commit corresponding to Wiki release label `20260924.1`: **NOT VERIFIED**.

## Visual evidence

- Reference: https://raw.githubusercontent.com/ppy/osu-wiki/ae2c6443a4264e5429ea7bcd2f3503be8a518a50/wiki/Client/Interface/img/song-selection.jpg
- Reference Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`
- Workflow artifact: https://github.com/murorachi/Amq-/actions/runs/39602822402/artifacts/12347311118
- Artifact ZIP SHA-256: `b9459630197269eb8fb84270e68836eae67b80c543c2412857f22571b578c888`
- Evidence includes the matched screenshot, reference, overlay, pixel-diff image, browser report and visual comparison report.

## Rollback and immutable baseline

- Last prior functional checkpoint, candidate 10: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_10.html`, SHA-256 `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`.
- Candidate 09: SHA-256 `37d5055e91688e7604007d052041aa0f846c04c29793fced2312592f282ea01d`.
- Immutable Proto25 baseline: SHA-256 `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
- Keep candidate 11 as the current functional working checkpoint, candidate 10 as rollback, and Proto25 read-only. Never overwrite prior candidates or the immutable baseline.
