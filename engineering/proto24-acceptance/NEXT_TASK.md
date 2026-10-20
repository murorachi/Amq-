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


## Next task: full target-screen visual review
1. Start from successful run `39502330658`, artifact `12301551997`, candidate SHA-256 `c215d6e2bf5d6f9e721167da0f0fa19ceaf3094a16986ea5b3f1fe7e02e52656`. Do not repeat unchanged checks without a code change.
2. Review home/profile strip, Play menu, catalog, Song Select, Settings, Learning Center and Analysis screenshots at desktop and mobile sizes. Identify remaining issues as a related UI group and fix their root CSS selectors in the modular sources.
3. Compare against pinned osu!stable references and record concrete differences in geometry, hierarchy, spacing, colors, hover/focus states and modal stacking. Do not claim >=90% similarity without matching screenshots and measured evidence.
4. Add or adjust Playwright assertions for demonstrated regressions only. Rerun static checks and complete browser acceptance; inspect the resulting artifact/screenshots and read back the Stage 24 HTML, manifest, size, SHA-256 and report.
5. Keep actual audio output, full quiz-answer lifecycle and multiplayer server lifecycle as separate NOT RUN items until actually tested.

## Verified checkpoint and safety
- Latest successful workflow run: `39502330658`, tested source head `0437f5656e0b3af0b34813b081c553eea239e94b`.
- Artifact ID: `12301551997`; candidate size 8,901,002 bytes; SHA-256 `c215d6e2bf5d6f9e721167da0f0fa19ceaf3094a16986ea5b3f1fe7e02e52656`.
- Candidate and all changes remain isolated on Proto25/Stage 24. Preserve accepted baseline `v82.85.30-proto24-accepted-delivery-02` at `39d250cf5a269a0e2bf8f514474584bcc864f599`.
- Do not merge PR #9 or promote until the target-screen visual review and runtime acceptance are complete. Roll back to the accepted Proto24 branch if a regression cannot be resolved safely.
