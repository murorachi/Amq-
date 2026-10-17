# V82.66 EMQ custom-list scope contract 04

Status: **PARTIAL**. This checkpoint characterizes the existing source contract only. It does not change production fragments or the standalone HTML runtime.

## Baseline
- Candidate product: V82.65 `amq_learning_tool_v82_65_candidate_pool_cleanup.html`.
- Built standalone HTML: 8,786,930 bytes.
- SHA-256: `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.
- Build output is byte-identical to the locked baseline.
- The official full V82.65 delivery ZIP remains unavailable in the workspace. Its expected historical SHA-256 has not been revalidated in this checkpoint.

## Changes
- Extended `tests/unit/emq_api_contract.test.cjs` to execute the exact custom-list scope adapter extracted from `src/scripts/script_025.htmlpart` alongside the exact EMQ API fragment from `src/scripts/script_038.htmlpart`.
- Added assertions for selected EMQ song ID set behavior, empty selected set, blacklist/repeat intersections, malformed year bounds, AMQ list scope preserving EMQ rows, empty settings, focus bypass, malformed `customListIds`, and stale persistent invalid-scope state.
- No production HTML, source fragment, UI, catalog, storage schema or storage key was changed.

## Findings
1. `__aniApplyQuizCustomListScopeV8265` is called after the source combiner and audio-health filter. It is an AMQ custom-list scope: valid AMQ list membership filters AMQ rows while EMQ rows are intentionally left to EMQ-side filtering.
2. Malformed plural `customListIds`, missing list IDs or a persistent invalid-scope marker fail closed for AMQ rows. They do not misclassify or remove otherwise eligible EMQ rows. Explicit focus mode bypasses ordinary custom-list scope.
3. `combinePool` accepts an optional `selectedEmqSongIds` `Set`. When supplied, it creates a dedicated EMQ candidate scope that intentionally bypasses ordinary familiarity/year/song-type/tag filters, while still enforcing audio eligibility, blacklist and no-repeat checks. An empty set does not broaden the EMQ pool.
4. **Unresolved integration seam:** the current solo `getQuizPool` wrapper calls `combinePool(base, settings, focusMode, roundSeen, lastId, focusIds)` without supplying `selectedEmqSongIds`. The selected-EMQ-list argument is therefore covered as an API contract but is not connected through this wrapper. This checkpoint does not assume that solo EMQ custom-list selection is a shipped behavior, and does not add a speculative wiring change.
5. No standalone V82.65 browser test report or reproducible manual test log for source-mode/custom-list interaction was found in the available workspace. The preserved V82.65 full HTML is available as baseline material, but this is not evidence that browser acceptance was rerun now.

## Tests and actual assertions
- `node tests/unit/candidate_pool_policy.test.cjs`: **70 passed, 0 failed**. Includes source-mode gates, numeric/range validation, metadata/status/tag/watchlist/blacklist/repeat policy assertions.
- `node tests/unit/candidate_pool_integration.test.cjs`: **22 passed, 0 failed**. Includes exact candidate ID/order assertions across pool filters, audio health, custom-list adapter outcomes and fail-closed cases.
- `node tests/unit/emq_api_contract.test.cjs`: **18 passed, 0 failed**. Includes exact-source EMQ API composition/ID isolation, selected EMQ list scope and blacklist/repeat checks, custom-list adapter settings behavior, and work-ID collision fail-closed behavior.
- `python tools/build.py`: passed; output 8,786,930 bytes with the baseline SHA-256 above.
- `python tools/verify.py`: **98 passed, 0 failed**; two independent builds were byte-identical to the baseline.
- Not run: real browser/manual interaction, Firefox, live audio/network, IndexedDB round-trip, multiplayer multi-device or full product regression.

## Risks / remaining work
- Official V82.65 delivery ZIP, sidecar, manifest and internal fingerprints remain unverified.
- The product intent and ownership of the optional `selectedEmqSongIds` argument need confirmation before wiring it into solo quiz flow.
- Source-specific status/history isolation is not yet fully tested; that remains M2.

## Rollback
- No product runtime changes were made. To roll back this checkpoint's test-only changes, restore the previous `tests/unit/emq_api_contract.test.cjs` from the preceding `V82.66 EMQ-API-CONTRACT-03` ZIP. The baseline HTML hash must remain unchanged.

## Next
1. Close the M0 baseline gap by locating the exact official V82.65 delivery ZIP and sidecar; verify SHA-256, CRC, manifest and internal hashes.
2. Resolve whether solo EMQ custom-list selection is an intended feature, then test the full wrapper handoff instead of only the optional API argument.
3. Continue M2 history/status isolation only after that contract is clear.
