# AMQ Core Regression Matrix — Candidate346

- Candidate: `amq_learning_tool_v82_86_57_candidate346_batch50_remove_orphaned_local_helpers_20261026.html`
- Size: 1,625,225 bytes
- SHA-256: `dfef81df1572219d2b96b5f8eeeb50696acfe99a0fced53b6c83371f930c99ca`
- Formal baseline: Candidate302
- Rollback checkpoint: Candidate320
- Overall core regression: **INCOMPLETE**
- Browser interaction: **BLOCKED** (`ERR_BLOCKED_BY_ADMINISTRATOR` on file:// and localhost)

| Domain | Candidate346 status | Existing evidence | Remaining gap |
|---|---|---|---|
| AMQ/EMQ/MIX mode and source switching | NOT RUN | Static source marker smoke PASS; historical isolated route/storage evidence is not full mode/source E2E. | Real app mode switching and source selection were not exercised. |
| Player, play/pause, skip, next question | NOT RUN | Static source marker smoke PASS; 65 inline JS syntax checks PASS. | Real audio playback and player controls were not exercised. |
| Custom-list create/rename/delete/add/remove/persistence | NOT RUN | Historical isolated storage repository harness 6/6 PASS with synthetic in-memory storage on Candidate302. | Candidate346 full-app CRUD and reload persistence not exercised. |
| Backup/restore and failure protection | NOT RUN | Historical isolated storage/import rollback checks passed on Candidate302 with synthetic storage. | Candidate346 real-app backup/restore and failure recovery not exercised. |
| Workspace route/actions/sidebar | BLOCKED | Candidate341/346 static ownership assertions PASS; historical isolated route matrix 15/15 PASS with stubbed dependencies on Candidate302. | Actual click, ESC, resize, Song Select and content-panel interaction cannot be tested in the current browser environment. |
| Multiplayer lifecycle | NOT RUN | Historical fake-server isolated lifecycle test passed for selected classic/team init, polling stop, WebSocket close and local release on Candidate302. | Candidate346 live app multiplayer lifecycle not exercised. |
| Inline JavaScript syntax | PASS | 65 executable inline JS blocks passed node --check with zero syntax errors. | Syntax does not prove runtime correctness. |
| Core source marker preservation | PASS | 11 static marker groups passed for AMQ/EMQ/MIX, quiz flow, player, custom lists, backup/restore, workspace APIs/actions, multiplayer markers and navigation event. | Marker presence is not functional validation. |

## Interpretation
Historical isolated tests are prior evidence, not Candidate346 full-app PASS results. Candidate346 currently has static syntax and marker-presence checks only. No browser E2E is claimed.

## Decision
Candidate346 remains experimental. Continue to the final high-risk residue/dependency scan, but keep browser-dependent core cases BLOCKED or NOT RUN until a usable browser environment is available. Do not describe formal release as fully functionally accepted while these cases remain untested.
