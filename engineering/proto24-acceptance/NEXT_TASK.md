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


## Next task: continue the coherent visual pass
1. Start from the verified artifact in run `39505109779`, artifact `12302779205`, candidate SHA-256 `4497f0c48bd2d548bf0f8449c33be74c3728978ee915d3578ee961e3af83d3f9`. Do not repeat unchanged checks without a code change.
2. Review fresh desktop/mobile screenshots for home, Play menu, catalog, Song Select, Settings, Learning Center and Analysis. Group issues by layout/component rather than changing isolated colors or buttons.
3. Compare against the pinned osu!Stable references and record specific differences in geometry, hierarchy, spacing, colors, focus/hover states and overlay stacking. Do not claim >=90% similarity without comparable reference screenshots and measured evidence.
4. Make modular CSS changes inside the active style block. Keep assertions for profile/header containment, responsive overflow, route integrity and no console/page errors.
5. Rerun static and full browser acceptance; inspect the new artifact/screenshots; read back the Stage 24 candidate, checksum manifest and test report. Verify exact byte size and SHA-256.
6. Keep actual audio output, full quiz-answer lifecycle and multiplayer server lifecycle separately marked NOT RUN until exercised.

## Verified checkpoint and safety
- Latest successful run: `39505109779`, source head `fbb8c8a3c94f554040be07eef38d76b7db359b31`.
- Artifact ID: `12302779205`; candidate size 8,901,420 bytes; SHA-256 `4497f0c48bd2d548bf0f8449c33be74c3728978ee915d3578ee961e3af83d3f9`.
- Production rollback baseline remains `v82.85.30-proto24-accepted-delivery-02` at `39d250cf5a269a0e2bf8f514474584bcc864f599`.
- Do not merge PR #9 or promote Proto25 until target-screen review and required runtime acceptance are complete.
