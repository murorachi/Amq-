# Next task

Current checkpoint: V82.66 EMQ-API-CONTRACT-03. Overall status remains PARTIAL.

## M0: Close formal baseline gap
1. Obtain exact V82.65 delivery ZIP and sidecar.
2. Recompute ZIP SHA-256; validate CRC, internal manifest coverage, file hashes and HTML/server/catalog fingerprints.
3. Keep V82.64 and V82.65 originals untouched.

## M1: Settings/list-scope integration
1. Trace `aniQuizSettingsV14`, `selectedEmqSongIds`, `customListIds`, `aniQuizCustomListScopeInvalidV8265`, and custom-list adapter call order.
2. Add exact-source tests for selected EMQ custom-list semantics, malformed/empty settings, blacklist and repeat intersections.
3. Reconcile against existing V82.65 full-HTML source-mode and custom-list browser test records; do not assume old tests were rerun in this checkpoint.

## M2: History/status isolation
1. Trace `storedStatus`, `storedTag`, quiz history, answer validation and source detection by EMQ song ID.
2. Test that AMQ/EMQ ID collisions and missing work mappings fail closed and do not pollute AMQ arrays or records.
3. Keep destructive tests isolated from live user storage.

## M3: First business refactor
Only after exact candidate fixtures, real EMQ API contract and custom-list/history boundaries are stable, extract the pure policy object to a dedicated source file and embed it during build. Compare outputs against current policy and API tests before integration.

## Test entry point
```powershell
node tests\unit\candidate_pool_policy.test.cjs
node tests\unit\candidate_pool_integration.test.cjs
node tests\unit\emq_api_contract.test.cjs
python tools\build.py
python tools\verify.py
```
