# V82.66 solo EMQ custom-list handoff (checkpoint 06)

## Scope

Resolve the previously recorded uncertainty about the solo quiz wrapper passing EMQ custom-list selection into the EMQ candidate combiner. No production runtime, UI, storage schema, catalog, or generated HTML was changed. The only executable source change in this stage is a new exact-source integration test.

## Source trace

1. `script_004.htmlpart` wraps `getQuizPool()`: it builds the base AMQ pool, calls `window.__aniEmqAPI.combinePool(...)`, then applies audio-health eligibility, and finally invokes `window.__aniApplyQuizCustomListScopeV8265`.
2. `script_040.htmlpart` installs an adapter on `__aniEmqAPI.combinePool` after the EMQ API is ready. It reads selected IDs from `aniEmqWorkListsSelectedV8254` / the quiz picker, resolves each list into EMQ song IDs, and passes a `Set` as the seventh argument to the original combiner.
3. If no EMQ list is selected and there is no invalid-scope marker, the adapter passes `null`, meaning EMQ membership is unrestricted. If the persisted selection is invalid, it passes an empty `Set`, causing the EMQ scope to fail closed rather than broadening to all EMQ songs.
4. The production `combinePool` implementation in `script_038.htmlpart` treats the selected-song Set as a dedicated EMQ scope while still applying audio metadata checks, blacklist, and no-repeat constraints. Existing EMQ API contract tests already exercise this policy directly.
5. The AMQ custom-list adapter is a later stage and deliberately does not reinterpret EMQ rows as AMQ works.

## Changes

- Added `tests/unit/solo_emq_list_handoff.test.cjs`, executing exact source fragments for the quiz wrapper, selected-list lookup, list-to-song resolution, and API installation adapter in an isolated Node VM.
- The test stubs only the external combiner and custom-list adapter boundary to record the handoff and order. The real combiner's Set semantics are covered separately by `emq_api_contract.test.cjs`; this stage does not claim a full browser test.
- Added the baseline package verification report and updated checkpoint documentation.
- No changes to production HTML or runtime fragments.

## Results

- Candidate policy: 70 passed, 0 failed.
- Candidate pool integration: 22 passed, 0 failed.
- EMQ API/custom-list contract: 19 passed, 0 failed.
- History/status isolation: 7 passed, 0 failed.
- Solo EMQ list handoff exact-source integration: 4 passed, 0 failed.
- Build/integrity verifier: 98 passed, 0 failed; two builds byte-identical to the V82.65 HTML baseline.
- Total unit assertions across the five Node suites: 122 passed, 0 failed.

## Limits

- No browser/manual UI run was performed in this stage.
- The new handoff test executes the exact wrapper and adapter source but stubs the combiner and AMQ custom-scope adapter; their own production policy is covered by existing separate tests.
- Audio/network playback, IndexedDB round-trip, Firefox, multiplayer multi-device and full product regression remain unrun.

## Conclusion

The suspected missing argument was a misleading reading of the call site alone: the six-argument `getQuizPool` call is intentionally decorated by the script 040 API adapter, which injects the selected EMQ song-ID Set. The handoff is present and now has executable coverage. No production change is warranted for this seam.

## Rollback

Remove `tests/unit/solo_emq_list_handoff.test.cjs` and this report; restore `BASELINE.md`, `CURRENT_STATUS.md`, `NEXT_TASK.md`, `README.md`, and package checksums to the previous checkpoint. The product HTML and runtime source fragments are unchanged.
