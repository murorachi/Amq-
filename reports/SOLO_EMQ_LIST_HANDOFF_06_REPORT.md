# V82.66 solo EMQ custom-list handoff (checkpoint 06)

## Scope
Resolve the uncertainty about the solo quiz wrapper passing EMQ custom-list selection into the EMQ candidate combiner. No production runtime, UI, storage schema, catalog, or generated HTML was changed. This stage adds exact-source integration coverage only.

## Source trace
1. `script_004.htmlpart` wraps `getQuizPool()`: it builds the base AMQ pool, calls `window.__aniEmqAPI.combinePool(...)`, then applies audio-health eligibility, and finally invokes `window.__aniApplyQuizCustomListScopeV8265`.
2. `script_040.htmlpart` installs an adapter on `__aniEmqAPI.combinePool` after the EMQ API is ready. It reads selected IDs from `aniEmqWorkListsSelectedV8254` / the quiz picker, resolves each list into EMQ song IDs, and passes a `Set` as the seventh argument to the original combiner.
3. No selected list with no invalid-scope marker passes `null`, meaning EMQ membership is unrestricted. Invalid persisted selection passes an empty `Set`, failing closed.
4. The production `combinePool` in `script_038.htmlpart` treats the selected-song Set as a dedicated EMQ scope while still applying audio metadata checks, blacklist and no-repeat constraints. Existing EMQ API contract tests cover this policy directly.
5. The AMQ custom-list adapter runs later and does not reinterpret EMQ rows as AMQ works.

## Changes
- Added `tests/unit/solo_emq_list_handoff.test.cjs`, executing exact source fragments for the quiz wrapper, selected-list lookup, list-to-song resolution and API installation adapter in an isolated Node VM.
- The handoff test stubs only the combiner and final custom-scope adapter boundary to record argument flow/order. The real combiner's selected-Set semantics are covered separately by `emq_api_contract.test.cjs`; this is not a full browser test.
- Added baseline package verification report and updated checkpoint docs.
- No changes to production HTML or runtime fragments.

## Results
- Candidate policy: 70 passed, 0 failed.
- Candidate pool integration: 22 passed, 0 failed.
- EMQ API/custom-list contract: 19 passed, 0 failed.
- History/status isolation: 7 passed, 0 failed.
- Solo EMQ list handoff: 4 passed, 0 failed.
- Build/integrity verifier: 98 passed, 0 failed; two builds byte-identical to V82.65 HTML baseline.
- Total unit assertions across five Node suites: 122 passed, 0 failed.

## Limits
Browser/manual UI, Firefox, external audio/network, IndexedDB round-trip, multiplayer multi-device and full product regression were not run. The handoff test stubs the underlying combiner and final AMQ custom-scope adapter; their production policy is covered separately.

## Conclusion
The suspected missing argument was a misleading reading of the call site alone: the six-argument `getQuizPool` call is intentionally decorated by the script 040 API adapter, which injects the selected EMQ song-ID Set. The handoff exists and now has executable coverage. No production change is warranted.

## Rollback
Remove the handoff test and this report; restore checkpoint docs/checksums. Product HTML and runtime fragments remain unchanged.
