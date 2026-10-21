# Current Status

## Latest verified functional checkpoint: Song Select candidate under visual review

- Active branch: `v82.85.30-proto34-song-select-catalog-density-01`
- Source commit tested by CI: `c0737573422be39ea5bebd19639e0d785ad1a64d`
- CI-generated artifact/report commit: `67c9cb875c2347635fae97a2121a7e48012c609f`
- Actions run: https://github.com/murorachi/Amq-/actions/runs/39608921983 — **SUCCESS**
- Current generated HTML path: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_11.html`
- HTML size: 8,978,788 bytes
- SHA-256: `660738b4b193ccbfe6eb57931c520bd75ceca23239459cbe6b7a85269f3f41c6`
- Static source/build assertions: **PASS**.
- Playwright browser acceptance: **PASS**; no uncaught page errors or browser console errors. Checks cover workspace navigation, AMQ/EMQ/MIX/Singer modes, asynchronous EMQ loading, song detail history, hover/selected row offsets, desktop drawer, search/filter space, player/dock placement, and mobile overflow/drawer.
- Scene-background integration and 1440×900 search positioning: **PASS** in the browser run.
- Matched-viewport evidence generation: **PASS**.
- Visual acceptance: **NOT VERIFIED / NOT ACCEPTED**. Diagnostic normalized MAE is 0.269961 and changed-pixel ratio is 77.3776%; these are not similarity percentages. Manual screenshot review still shows major differences: the center visual is mostly empty/dark, the title is partially obscured by the catalog overlay, card art/row composition does not match the pinned osu! Stable reference, and the overall hierarchy remains materially different.
- Artifact: https://github.com/murorachi/Amq-/actions/runs/39608921983/artifacts/12349617275
- Artifact ZIP SHA-256: `869cacdfce82e698146ce35579427024f75fa58efed4a51f4d7649910122a823`
- Important versioning risk: the workflow currently regenerates candidate 11 at the same path despite changing its content/hash. Before another release-quality iteration, make a new candidate path (candidate 12) and preserve candidate 11 as a distinct rollback artifact. Do not present the current candidate as visually accepted.

## Changes validated in this stage

- Corrected the desktop stage geometry to keep the catalog search in the intended right-hand region.
- Corrected custom Catalog scene styling so the stage can reveal the existing scene background rather than fully covering it.
- Reduced panel opacity and adjusted central-title positioning and catalog typography.
- Kept existing workspace routes, real catalog data, audio dock, custom background entry point, and song-row hover/selection behavior intact.

## Test results

- Static source/build assertions: **PASS**.
- Browser acceptance: **PASS**.
- Console/page errors: **0 / 0**.
- 1280×720 and 1440×900 layout assertions: **PASS**.
- 1000×562 and mobile overflow/drawer checks: **PASS**.
- Visual comparison evidence: **PASS** (generated).
- Visual design acceptance against pinned osu! Stable screenshot: **NOT ACCEPTED**.
- Exact osu! Stable client source commit matching Wiki release label `20260924.1`: **NOT VERIFIED**.

## Visual evidence

- Reference: https://raw.githubusercontent.com/ppy/osu-wiki/ae2c6443a4264e5429ea7bcd2f3503be8a518a50/wiki/Client/Interface/img/song-selection.jpg
- Reference Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`
- Workflow artifact: https://github.com/murorachi/Amq-/actions/runs/39608921983/artifacts/12349617275
- Artifact ZIP SHA-256: `869cacdfce82e698146ce35579427024f75fa58efed4a51f4d7649910122a823`
- Evidence includes matched screenshot, reference, overlay, pixel-diff image, browser report, and visual comparison report.
- Diagnostic normalized MAE: 0.269961; changed-pixel ratio: 0.773776. Neither is a similarity score. The screenshot remains visibly far from the reference.

## Rollback and immutable baseline

- Last prior functional checkpoint, candidate 10: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_10.html`, SHA-256 `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`.
- Candidate 09: SHA-256 `37d5055e91688e7604007d052041aa0f846c04c29793fced2312592f282ea01d`.
- Immutable Proto25 baseline: SHA-256 `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
- Keep candidate 11 as the current functional working checkpoint, candidate 10 as rollback, and Proto25 read-only. Never overwrite prior candidates or the immutable baseline.
