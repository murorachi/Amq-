# CURRENT_STATUS.md

## Current candidate
- Version: `v82.85.94-candidate280-songselect-row-geometry-cascade-cleanup-20261025`
- Artifact: `amq_learning_tool_v82_85_94_candidate280_songselect_row_geometry_cascade_cleanup_20261025.html`
- Size: `9,381,134` bytes
- SHA-256: `d4329fee9b7795641c657dd67d9993f9b5808c58df44ad9e71cb226153783d98`
- Parent Candidate279 SHA-256: `dec9a2ae140ba8482804f4df3986c60a7e790b1ab009fb4f2de3756c13692038`
- Immutable Candidate277 SHA-256: `b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371`

## Stage 60 status
- Song Select 7.5-row geometry, selected/hover offsets, right-edge alignment: **PASS** in Chromium 1440×900.
- Mobile Song Select / quiz / multiplayer viewport and route cleanup: **PASS** in Chromium 390×844.
- Multiplayer colors and component states now use shared dark-theme tokens; major layout retained.
- Static audit: **PASS**; 67/67 executable inline JS syntax checks; 109 CSS blocks; 2,819 CSS qualified rules; zero CSS parse/declaration errors; zero duplicate static IDs.
- Browser acceptance: **14 PASS / 0 FAIL / 2 BLOCKED**.
- Real reload persistence and external audio/artwork/API: **BLOCKED** by origin/network restrictions.
- GitHub HTML body upload and remote SHA readback: **BLOCKED**. This branch currently contains engineering checkpoint files, not the HTML binary.
- Full global duplicate CSS cleanup: **INCOMPLETE**; remaining selector repetitions are being handled only with cascade/runtime evidence.

See `STAGE_60_CANDIDATE280_REPORT.md`, `STAGE_60_MANIFEST.json`, and `COMPUTED_STYLES_CANDIDATE280.md`.
