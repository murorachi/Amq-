# Next task

Current checkpoint: V82.66 EMQ-HISTORY-ISOLATION-05. Overall status remains PARTIAL.

## M0: Close formal baseline gap (first priority)
1. Obtain the exact official V82.65 delivery ZIP and sidecar.
2. Recompute ZIP SHA-256; validate CRC, internal manifest coverage, all file hashes and HTML/server/catalog fingerprints.
3. Keep V82.64 and V82.65 originals untouched. Do not substitute the similarly named audit package.

## M1: Resolve solo EMQ custom-list handoff
1. Confirm whether selecting EMQ custom lists is an intended solo quiz feature or whether `selectedEmqSongIds` is an unused/future API hook.
2. If intended, trace authoritative selected-list storage and adapter ordering, then wire only after tests cover the complete `getQuizPool` wrapper path. If not intended, document that boundary rather than adding speculative UI or behavior.
3. Add an exact-source wrapper test that proves which arguments actually reach `combinePool` and which list-scope adapter runs after it.
4. No dedicated V82.65 browser test report/log was found. Obtain it if available; otherwise mark historical browser evidence unavailable and do not claim it was rerun.

## M2: Finish history/status isolation
1. Add a focused executable answer-flow test for audio eligibility, history recording, and familiarity updates by song ID.
2. Keep source-only findings clearly separated from executable coverage.
3. Preserve isolated synthetic storage; never use or mutate live user storage in tests.

## M3: First business refactor
Only after exact candidate fixtures, real EMQ API contract, custom-list wrapper boundary and history/status boundaries are stable, extract the pure policy object to a dedicated source file and embed it during build. Compare output against current policy and API tests before integration.

## Test entry point
```powershell
node tests\unit\candidate_pool_policy.test.cjs
node tests\unit\candidate_pool_integration.test.cjs
node tests\unit\emq_api_contract.test.cjs
node tests\unit\history_status_isolation.test.cjs
python tools\build.py
python tools\verify.py
```
