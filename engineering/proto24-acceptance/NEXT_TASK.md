# NEXT TASK — Proto25 UI Refactor

## Immediate blocker: build and acceptance evidence
1. Verify whether PR #9 triggers the corrected Stage 24 GitHub Actions workflow. The Stage 24 workflow contained stale Stage 16 artifact names and a Stage 23 publish target; these are corrected at `9ebe65f7d7989f5717066acecf588948424bf74b`. The integration still returns no run/status. If no run appears for the updated PR head, the remaining blocker is GitHub Actions execution/visibility, not the workflow's stale target paths.
2. Retrieve `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`, its SHA-256 manifest, acceptance report and screenshots, including `proto25-song-select.png`.
3. If CI fails, fix the first failing assertion/build step on the working branch, create a new isolated numbered checkpoint and rerun.
4. Compare the generated screenshots against the pinned main menu, Play menu, Song Select and Options references at matched viewports. Record concrete deltas; do not claim a similarity percentage without the screenshot evidence.

## Remaining UI and regression work
5. First pass the corrected home geometry browser acceptance. Run `39495757564` confirmed toolbar hidden and player at 84px; profile was 94px due to padding-box sizing. Latest fix applies border-box; verify profile <=90px and confirm the profile name is visibly rendered against a dark card before further UI review. The previous geometry run passed but its screenshot still showed clipped/missing profile text. Then review the generated profile/player strip, compact footer links, quiz screen, analytics workspace, catalog cards, Song Select drawer, Settings sidebar and scene-background dialog. Fix any clipping, contrast, focus or overflow issues revealed by the screenshots.
6. Verify all home actions and Single Player / Multiplayer / Back routing. Test multiplayer server connectivity only through the room's actual health-check flow.
7. Run real audio output, full quiz-answer lifecycle and multiplayer lifecycle regressions as separate tests.
8. Build the final standalone HTML from the modular CSS and reviewed source. Verify HTML parsing, duplicate IDs, inline JS syntax, browser acceptance, screenshot evidence, file size and SHA-256.

## Checkpoint rules
- Keep changes on `v82.85.30-proto25-ui-refactor-work-03` and numbered stage branches.
- Each successful stage must have a separate remote checkpoint and verified commit/file fingerprints.
- Keep Proto24 at `39d250cf5a269a0e2bf8f514474584bcc864f599` unchanged.
- Update `CURRENT_STATUS.md`, `BASELINE.md`, `NEXT_TASK.md` and the stage report as evidence changes.
- Do not ask for user review until all target screens and required tests are complete, except where a genuine permission or irreversible-decision blocker requires user input.


## Next task: targeted workspace visual repair
1. Use the latest successful evidence from run `39500770125` and artifact `12299323839`; do not rerun already-passing checks without a code change.
2. Identify the precise element causing the prominent light panel in `proto24-learning-workspace.png`. Add a diagnostic to the existing Playwright report for visible large light-background elements in Learning Center and Analysis; use the resulting selector and geometry to fix the root CSS rule in `engineering/proto24/amq-workspace-osu-composition.css`.
3. Add assertions that the target workspace panels use the expected dark palette and that no unintended large light panels remain. Preserve intentionally light controls/dialogs.
4. Rerun static checks and the complete browser acceptance, inspect the updated desktop/mobile screenshots and read back the new artifact, candidate size, SHA-256 and Stage 24 commit.
5. Review the other target screens as a group: home/profile strip, Play menu, catalog, Song Select, Settings, learning workspace and analysis workspace. Record visual deltas against osu!stable references; do not claim >=90% similarity without evidence.
6. Keep actual audio output, full quiz-answer lifecycle and multiplayer server lifecycle as separate NOT RUN items until tested.

## Verified checkpoint and safety
- Latest successful workflow run: `39500770125`, commit `d6209c24f72e1d7cb8ea1eaf0a3739ca14a7b407`.
- Artifact ID: `12299323839`; candidate size 8,899,371 bytes; SHA-256 `9c21bb784ee6e920eeb5a4ce118e5a6ee3e6b19584605078642f1d3dec7605a6`.
- Candidate and all changes remain isolated on Proto25/Stage 24. Preserve accepted baseline `v82.85.30-proto24-accepted-delivery-02` at `39d250cf5a269a0e2bf8f514474584bcc864f599`.
- Do not merge PR #9 or promote until remaining visual and runtime acceptance are complete. Roll back to the accepted Proto24 branch if a regression cannot be resolved safely.
