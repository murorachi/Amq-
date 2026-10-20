# NEXT TASK — Proto25 UI Refactor

## Immediate blocker: build and acceptance evidence
1. Verify the Stage 24 pull-request-triggered GitHub Actions run and outcome. The GitHub integration has not yet returned a run for the current PR head; do not claim the trigger or browser acceptance succeeded until a run ID and artifacts are retrieved.
2. Retrieve `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`, its SHA-256 manifest, acceptance report and screenshots, including `proto25-song-select.png`.
3. If CI fails, fix the first failing assertion/build step on the working branch, create a new isolated numbered checkpoint and rerun.
4. Compare the generated screenshots against the pinned main menu, Play menu, Song Select and Options references at matched viewports. Record concrete deltas; do not claim a similarity percentage without the screenshot evidence.

## Remaining UI and regression work
5. First pass the corrected home geometry browser acceptance. Run `39495757564` confirmed toolbar hidden and player at 84px; profile was 94px due to padding-box sizing. Latest fix applies border-box; verify profile <=90px and confirm the profile name is visibly rendered against a dark card before further UI review. The previous geometry run passed but its screenshot still showed clipped/missing profile text. Then review the generated profile/player strip, compact footer links, quiz screen, analytics workspace, catalog cards, Song Select drawer, Settings sidebar and scene-background dialog. Fix any clipping, contrast, focus or overflow issues revealed by the screenshots.
6. Verify all home actions and Single Player / Multiplayer / Back routing. Test multiplayer server connectivity only through the room's actual health-check flow.
7. Run real audio output, full quiz-answer lifecycle and multiplayer lifecycle regressions as separate tests.
8. Build the final standalone HTML from the modular CSS and reviewed source. Verify HTML parsing, duplicate IDs, inline JS syntax, browser acceptance, screenshot evidence, file size and SHA-256.

## Checkpoint rules
- Keep changes on `v82.85.30-proto25-ui-refactor-work-02` and numbered stage branches.
- Each successful stage must have a separate remote checkpoint and verified commit/file fingerprints.
- Keep Proto24 at `39d250cf5a269a0e2bf8f514474584bcc864f599` unchanged.
- Update `CURRENT_STATUS.md`, `BASELINE.md`, `NEXT_TASK.md` and the stage report as evidence changes.
- Do not ask for user review until all target screens and required tests are complete, except where a genuine permission or irreversible-decision blocker requires user input.


## Workflow trigger repair
- Stage 24 workflow is PR-triggered only, avoiding a push-triggered publish loop. It targets `v82.85.30-proto25-ui-refactor-stage-24` and emits Stage 24 artifact/file names.
- Latest workflow commits on Stage 24: `2294f0ce073d074df5f7df1728a9ab22b577b0d9` (trigger/name correction), `c9137b63747f861d86e4b45a7347f9d3c5d44023` (remove recursive push trigger).
- A new head commit is required to prompt a fresh PR workflow event; verify run status and generated artifact rather than assuming it fired.
