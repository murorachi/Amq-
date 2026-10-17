# Next task

Current checkpoint: **V82.66 EMQ-SOLO-LIST-HANDOFF-06**. Project status remains PARTIAL.

## M0: Baseline package integrity — CLOSED
- Recovered the official V82.65 checkpoint ZIP from the Library.
- Verified outer SHA-256 and external sidecar, ZIP CRC, 291 unique entries, 290/290 internal manifest entries, and all four product payload fingerprints.
- Evidence: `reports/BASELINE_PACKAGE_VERIFICATION_06.md`.

## M1: Solo EMQ custom-list handoff — CLOSED, no product patch needed
- Exact-source trace confirms the solo `getQuizPool()` wrapper calls the EMQ combiner, and script 040 decorates the API combiner to inject selected EMQ song IDs.
- Selected list -> song-ID `Set`; no selection -> `null`; invalid persisted scope -> empty `Set` (fail closed).
- Audio eligibility runs after source composition and before the AMQ custom-list scope adapter.
- Four isolated exact-source integration assertions pass. Existing `emq_api_contract.test.cjs` independently covers the real combiner's selected-Set semantics and the AMQ/EMQ scope boundary.
- Do not add a redundant wrapper patch or change runtime solely because the initial six-argument call site did not visibly pass the Set.

## M2: Answer-flow contract — NEXT
1. Extract exact source for the quiz answer/classification path and record operation, with isolated DOM/audio/history dependencies.
2. Test that a normal answer cannot be recorded as played before audio starts; test correct/wrong/skip or timeout paths only where the source contract distinguishes them.
3. Assert that familiarity updates use the song ID and happen only for the supported target, and that EMQ history retains EMQ source/work metadata.
4. Keep tests isolated; never read or mutate real LocalStorage, IndexedDB, user history, or multiplayer state.
5. Do not claim browser/audio end-to-end coverage unless actually run.

## M3: Expand policy cross-product coverage
Follow the verified V82.65 `NEXT_TASK.md`: prioritize remaining personal-filter/focus/EMQ-list cross-product cases, including missing/null/empty/invalid settings, and assert exact candidate IDs plus exclusion reasons. Reuse existing browser cases unless a fingerprint change or reproducible contradiction requires rerunning them.

## M4: First business refactor
Only after answer-flow and personal-filter boundaries are stable, extract the pure candidate policy and compare it against existing golden fixtures. Do not change UI, storage schemas, catalogue order, or runtime behavior as part of a policy-only extraction.

## Test entry point
```powershell
node tests\unit\candidate_pool_policy.test.cjs
node tests\unit\candidate_pool_integration.test.cjs
node tests\unit\emq_api_contract.test.cjs
node tests\unit\history_status_isolation.test.cjs
node tests\unit\solo_emq_list_handoff.test.cjs
python tools\build.py
python tools\verify.py
```
