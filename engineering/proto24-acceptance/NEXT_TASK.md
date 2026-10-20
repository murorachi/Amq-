# NEXT TASK — Proto25 UI Refactor

## Immediate blocker: build and acceptance evidence
1. Verify the Stage 16 GitHub Actions run and outcome. The available GitHub integration does not expose push-triggered run listing, so no run has been independently confirmed in this session.
2. Retrieve `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage16.html`, its SHA-256 manifest, acceptance report and screenshots, including `proto25-song-select.png`.
3. If CI fails, fix the first failing assertion/build step on the working branch, create a new isolated numbered checkpoint and rerun.
4. Compare the generated screenshots against the pinned main menu, Play menu, Song Select and Options references at matched viewports. Record concrete deltas; do not claim a similarity percentage without the screenshot evidence.

## Remaining UI and regression work
5. Review the generated profile/player strip, compact footer links, quiz screen, analytics workspace, catalog cards, Song Select drawer, Settings sidebar and scene-background dialog. Fix any clipping, contrast, focus or overflow issues revealed by the screenshots.
6. Verify all home actions and Single Player / Multiplayer / Back routing. Test multiplayer server connectivity only through the room's actual health-check flow.
7. Run real audio output, full quiz-answer lifecycle and multiplayer lifecycle regressions as separate tests.
8. Build the final standalone HTML from the modular CSS and reviewed source. Verify HTML parsing, duplicate IDs, inline JS syntax, browser acceptance, screenshot evidence, file size and SHA-256.

## Checkpoint rules
- Keep changes on `v82.85.30-proto25-ui-refactor-work-01` and numbered stage branches.
- Each successful stage must have a separate remote checkpoint and verified commit/file fingerprints.
- Keep Proto24 at `39d250cf5a269a0e2bf8f514474584bcc864f599` unchanged.
- Update `CURRENT_STATUS.md`, `BASELINE.md`, `NEXT_TASK.md` and the stage report as evidence changes.
- Do not ask for user review until all target screens and required tests are complete, except where a genuine permission or irreversible-decision blocker requires user input.
