# AMQ Song Select continuous audit — 2026-10-23

## Scope and decision
This checkpoint executes the seven requested stages against the fixed user reference screenshot and Candidate 161. It is an audit/verification checkpoint, not an accepted UI release. No new HTML was emitted because the evidence does not justify a safe visual code change; central image persistence could not be tested in the intended origin.

## Stage 1 — fixed reference and candidate
- Reference: image.png, 2555×1438, SHA-256 `f0fd3ab5ec11e87632d95aac0ab7b9df3595c96e20bb03c5201d012d613b99a4`.
- Candidate: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_161_bottom_player_geometry.html`, 9,272,310 bytes, SHA-256 `e144bd6ee4ad69ee2f05e4b761700c4c748b50d00fc31dd9117d6ce862974839`.
- Comparison: reference resized to 1648×928 with Lanczos; region boxes are recorded in VISUAL_METRICS.json.
- Branch checked: `amq-candidate104-songselect-layout-fix`, head at audit start `b39069a98ace1d98b27ff514df88c35cc60df401`.

## Stage 2 — song-list geometry and states
PASS in Playwright harness: 26 assertions, 0 failures, across 1648×928, 1440×900 and 1280×720. Checks include 7.5 visible rows, no document overflow, selected row, arrow keys, hover movement, search fallback, EMQ-only records, workspace panel, profile move/restore, AMQ profile stats and filter visibility.
At 1648×928, first eight row tops were [93, 169, 262, 373, 480, 580, 672, 764], against [93, 170, 263, 375, 479, 580, 673, 766], max error 2 px. This is DOM geometry, not full pixel similarity.

## Stage 3 — central background and real images
- Empty scene store initialization and fallback: PASS.
- Synthetic image input validation and preview status: PASS.
- Image blob rendering, apply/persistence, export, clear and restore: BLOCKED. page.set_content yields opaque origin and blob:null URLs; save reports background storage not ready. Direct file:// and localhost navigation are blocked. No claim of real image rendering or durable IndexedDB success is made.

## Stage 4 — composition, top controls and bottom player
Candidate 161 bottom geometry checks pass. At 1648×928: cover fallback x≈763/y=839/90×60; metadata x≈850/y≈842/295×66; progress x≈905/y=908/240×12.
Full SSIM 0.311279, MAE 54.6844; bottom SSIM 0.213940, MAE 57.5509. This is a small measured improvement over Candidate 145, not a close reproduction.
Largest unresolved gaps: left player/info SSIM 0.201218 and MAE 71.4378; top song metadata SSIM 0.054814 and MAE 55.2234; bottom controls SSIM 0.213940 and MAE 57.5509. Differences include artwork/background, layout, song content and osu-specific widgets. No fake osu controls/data were added.

## Stage 5 — CSS duplication and runtime overrides
Static parse: 96 style blocks, 2,648 qualified rules, zero parser errors. 379 exact selectors appear more than once; this is a review queue, not 379 confirmed defects.
High-risk ownership conflicts:
- `.p32-scene` appears in three route-scoped definitions (style blocks 75, 82, 94); style 94 changes it to a fixed full-viewport layer.
- `.p32-scene-image` has conflicting hide/show and full-screen overlay rules.
- `.p32-info .p32-stat` appears in three definitions, changing row/column layouts.
- `#audioDock.amqHomeDock` has two overlapping home-menu definitions with different heights/grid columns.
- `#amqWorkspaceSidebar` has four overlapping route-scoped definitions with materially different geometry.
These were not mass-deleted: removing late rules without valid-origin image tests and regression could break routing, background layering or workspace behavior. Consolidate one component at a time, beginning with scene layer ownership.

## Stage 6 — regression and single-file acceptance
- Playwright DOM/interaction harness: 26 PASS / 0 FAIL.
- Inline JS syntax: 61 checked / 0 errors; 5 data blocks skipped.
- CSS parsing: 2,648 rules / 0 errors.
- Direct double-click file:// acceptance: BLOCKED_BY_ADMINISTRATOR.
- Durable localStorage/IndexedDB, actual image reload/export/restore, real audio/live APIs, full custom-list CRUD and cross-workspace regression: NOT RUN or BLOCKED. Harness uses page.set_content and in-memory Storage, so this is not full standalone acceptance.

## Stage 7 — reporting and GitHub checkpoint
This directory records baseline, tests, metrics, CSS audit and rollback. Candidate HTML remains local; this checkpoint does not claim the HTML itself was uploaded. Each remote report path and branch head must be read back after upload.

## Acceptance
NOT ACCEPTED. Retain Candidate 145 as the last measured baseline per existing handoff. Candidate 161 remains an experiment until intended-runtime tests and the major left/top/background mismatches are addressed.
