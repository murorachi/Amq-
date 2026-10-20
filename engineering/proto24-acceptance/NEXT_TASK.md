# NEXT TASK — Proto25 UI Refactor

## Immediate blocker: build and acceptance evidence
1. Obtain the push-triggered Stage 14 GitHub Actions run and verify its outcome. The current GitHub integration does not expose the run listing, so this has not been independently confirmed in this session.
2. Retrieve `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage14.html`, its SHA-256 manifest, acceptance report, and screenshots.
3. If the workflow fails, fix the first failing assertion or build step on the working branch, create a new numbered checkpoint, and rerun. Do not promote an unverified artifact.
4. Review the generated desktop and mobile screenshots against the pinned official main menu, Play menu, Song Select, and Options references; record measured deltas before claiming a similarity score.

## Remaining UI and regression work
5. Finish visual review of the profile/player strip, footer utilities, quiz screen and workspace pages. Fix any white legacy panels, clipping, focus issues or unexpected horizontal overflow revealed by screenshots.
6. Verify all seven home actions and the actual Single Player, Multiplayer, Back routes; test multiplayer room entry without claiming server connectivity unless its own health check passes.
7. Run separate real audio output, full quiz-answer lifecycle and multiplayer lifecycle regressions.
8. Rebuild the final single-file HTML from the reviewed modular CSS and source. Verify HTML parsing, duplicate IDs, inline JS syntax, browser acceptance, screenshot evidence and SHA-256.

## Checkpoint rules
- Keep all work on `v82.85.30-proto25-ui-refactor-work-01` and numbered stage branches.
- After each successful stage, fast-forward a separate checkpoint branch and verify remote file existence, commit and SHA-256.
- Keep Proto24 at `39d250cf5a269a0e2bf8f514474584bcc864f599` unchanged.
- Update `CURRENT_STATUS.md`, `BASELINE.md`, `NEXT_TASK.md` and the stage report as evidence changes.
- Do not ask for user review until all target screens and required tests are complete, except where a missing permission or irreversible decision genuinely blocks progress.
