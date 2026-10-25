# NEXT_TASK — Candidate295 baseline, Candidate296 route checkpoint (2026-10-25)

## Current baseline and candidate
- Baseline: Candidate295, `index-old.html`, 1,720,917 bytes, SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`.
- Child candidate: `amq_learning_tool_v82_86_07_candidate296_route_guard_consolidation_20261025.html`, 1,719,843 bytes, SHA-256 `ec94f1daabdcc0b3151ba45b50d1e42d5ed5ddbf9ff4861050285cb44e94bddc`.

## Next execution order
1. Browser-test Candidate296 route matrix: six intercepted destinations, normal home/quiz/multiplayer navigation, one event per interception, dashboard body classes, home menu close, back/return, repeated initialization. Browser restriction means these remain BLOCKED/NOT RUN, not PASS.
2. Audit the four AMQ custom-list fallback readers and centralize them behind one explicit compatibility adapter only after specifying error-vs-empty semantics. Preserve backup/import/export boundaries.
3. Inspect `data.js` and `emq-data.js` when available in the execution workspace. Verify AMQ DB shape, EMQ packed data schema, ready timing, ID integrity and AMQ/EMQ/MIX pool boundaries.
4. Add focused persistence tests for list CRUD/reload, backup/restore, and quiz history/target summaries.
5. Any further app change creates a unique child candidate; preserve Candidate295 and Candidate296. Run static tests and update `CURRENT_STATUS.md`, `BASELINE.md`, `NEXT_TASK.md`, and the report.

## Current test statuses
- PASS: 67/67 JS syntax blocks; 109 CSS blocks / 2,808 rules with zero parser errors; 271 unique DOM IDs.
- BLOCKED: browser runtime route and interaction acceptance.
- BLOCKED: complete AMQ/EMQ data loading due missing external files.
- NOT RUN: CRUD, persistence reload, backup/restore, audio, multiplayer.

## Rollback
Return to the untouched Candidate295 baseline file. Do not overwrite it with Candidate296.
