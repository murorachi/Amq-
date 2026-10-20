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


## Immediate execution checkpoint
1. Confirm a new Actions run on `v82.85.30-proto25-ui-refactor-work-03` after workflow commit `ec31a4b12c3e842859f06063c044dac0127a9ee4`.
2. Inspect the job result and logs. The publisher now preserves the tested candidate, checks out the Stage 24 target branch and commits only the HTML, SHA-256 manifest and test report.
3. Retrieve artifact screenshots and `acceptance-report.json`; confirm the new profile-gradient assertion passed and review the actual desktop/mobile images.
4. Verify the Stage 24 branch head, published HTML size, checksum file and matching SHA-256. Do not treat an old successful run as evidence for the latest head.
5. If the workflow fails, fix the exact root cause and rerun the affected acceptance. Then continue reviewing the quiz, catalog, Song Select, Settings, learning and analysis workspaces.
6. Keep real audio output, complete quiz-answer lifecycle and multiplayer server lifecycle as separately reported NOT RUN until actually exercised.

## Safety and rollback
- Keep all Proto25 work isolated to `v82.85.30-proto25-ui-refactor-work-03` and numbered Stage branches.
- Preserve accepted baseline branch `v82.85.30-proto24-accepted-delivery-02` at commit `39d250cf5a269a0e2bf8f514474584bcc864f599`.
- Do not merge PR #9 or promote a candidate without fresh screenshots, passing browser assertions, verified candidate hash and remote file read-back.
- If validation exposes a regression, return to the last verified isolated checkpoint; production rollback remains the accepted Proto24 branch above.
