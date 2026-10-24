# NEXT_TASK.md

## Highest-value next work
1. Resolve the browser-origin blocker: use Chromium with a permitted local HTTP origin and persistent storage, then rerun actual localStorage/IndexedDB reload tests. The current CRUD test used an in-memory shim and does not prove persistence.
2. Upload Candidate280 HTML to this branch; read back the actual HTML and verify version, byte size and SHA-256. The current connector can commit UTF-8 engineering files but has no local-file/binary-path upload interface; do not claim the HTML is remote.
3. Audit remaining high-risk CSS owners individually: `#audioDock`, `#amqWorkspaceDock`, `body.ui-home-menu #homeMenu`, `.amqHomeLandingAction`, `#quizView .quizMystery`, and remaining Song Select root rules. Current parser still finds 387 repeated selector strings; no bulk deletion without cascade/runtime proof.
4. Complete network-dependent tests with external access allowed: artwork/background loading, real audio timing, API failure/recovery, and multiplayer reconnect.
5. Revisit outstanding information architecture only against Candidate277/280. The homepage retains the original three actions; do not reuse rejected Candidate278. Old batch-organization entries remain until full call/dependency/data-flow analysis supports safe removal.
6. Recheck `#amqWorkspaceDock`: it remains hidden (0×0) on Song Select; current page uses `#audioDock` and the left rail. Do not reactivate a duplicate dock without a defined responsibility.

## Required evidence
- Actual reload persistence PASS/FAIL with browser origin and storage keys.
- Real audio/API/network PASS/FAIL/BLOCKED, no simulated PASS.
- Desktop/mobile route and stale DOM tests after each CSS-owner consolidation.
- Final single-file HTML uploaded and read back from GitHub with matching version, bytes and SHA-256.
