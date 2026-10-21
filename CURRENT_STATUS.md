# Current Status

## Latest verified functional checkpoint: Candidate 12 under visual review

- Active branch: `v82.85.30-proto34-song-select-catalog-density-01`
- Source commit tested: `f449129ea01221ab48c2e04f8560b00b61f52f22`
- CI generated artifact/report commit: `8361c21e3cd391e56b37f4a23fd635ddec54330e`
- GitHub Actions run: https://github.com/murorachi/Amq-/actions/runs/39615864371 — **SUCCESS**
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_12.html`
- Size: 8,979,311 bytes
- SHA-256: `8934c12d814d8846f90f6331d1b0757f17a86b20f12e336619c27371c7dd4470`
- Static source/build assertions: **PASS**.
- Playwright browser acceptance: **PASS**. Page errors / console errors: 0 / 0.
- Layout assertions: **PASS** at 1280×720, 1440×900, 1000×562, and mobile. At 1440×900 the stage spans x=28..1440; the full scene background spans x=28..1440; the title occupies x=459..868; catalog begins x=882, so the title does not overlap the catalog.
- Existing background manager integration and fallback style test: **PASS**.
- Visual evidence generation: **PASS**.
- Visual design acceptance: **NOT ACCEPTED**. The screenshot has a clear title/catalog separation now, but the center scene remains mostly gradient/empty, the left information panel is too flat, catalog covers still show placeholder/overlay treatment, and overall visual hierarchy still differs substantially from osu!Stable.
- Diagnostic normalized MAE: 0.266530; changed-pixel ratio: 0.849977. These are diagnostics, not similarity percentages.
- Artifact: https://github.com/murorachi/Amq-/actions/runs/39615864371/artifacts/12351564867
- Artifact ZIP SHA-256: `cf1053e793e7fb73ce2db9565ca75e766a3c1647efcc8b4ea28a265609d277e2`
- Candidate 11 is not reused by the builder; candidate 12 has a distinct filename. Immutable Proto25 baseline remains unchanged.

## Changes validated in candidate 12

- Replaced the conflicting Proto35 CSS override stack with a single explicit desktop scene-geometry block.
- Anchored the background scene to the entire stage instead of the second grid column.
- Moved central work title to a defined lower-middle area and asserted that it does not overlap the right catalog.
- Kept catalog as a single-column compact vertical list.
- Preserved workspace behavior, data bindings, custom background manager, audio dock, and responsive layout.

## Test results

- Static source/build assertions: **PASS**.
- Browser acceptance: **PASS**.
- Page errors / console errors: **0 / 0**.
- Scene geometry and title/catalog non-overlap: **PASS**.
- Responsive overflow and detail drawer checks: **PASS**.
- Visual evidence generation: **PASS**.
- Visual design acceptance against pinned osu!Stable screenshot: **NOT ACCEPTED**.
- Exact osu!Stable client source commit matching Wiki release label `20260924.1`: **NOT VERIFIED**.

## Visual evidence

- Reference: https://raw.githubusercontent.com/ppy/osu-wiki/ae2c6443a4264e5429ea7bcd2f3503be8a518a50/wiki/Client/Interface/img/song-selection.jpg
- Reference Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`
- Artifact: https://github.com/murorachi/Amq-/actions/runs/39615864371/artifacts/12351564867
- Artifact ZIP SHA-256: `cf1053e793e7fb73ce2db9565ca75e766a3c1647efcc8b4ea28a265609d277e2`
- Diagnostic normalized MAE: 0.266530; changed-pixel ratio: 0.849977. Neither is a similarity score. Human visual review still finds major composition differences.

## Rollback and immutable baseline

- Last prior functional checkpoint, candidate 10: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_10.html`, SHA-256 `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`.
- Candidate 09: SHA-256 `37d5055e91688e7604007d052041aa0f846c04c29793fced2312592f282ea01d`.
- Immutable Proto25 baseline: SHA-256 `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
- Keep candidate 11 as the current functional working checkpoint, candidate 10 as rollback, and Proto25 read-only. Never overwrite prior candidates or the immutable baseline.
