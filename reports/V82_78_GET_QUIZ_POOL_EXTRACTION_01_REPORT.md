# V82.78 GET-QUIZ-POOL-EXTRACTION-01

Date: 2026-10-18

## Scope and pinned versions

This checkpoint extracts only the base getQuizPool() declaration and its adjacent __aniEmqGetQuizPoolBaseV8248 wrapper, which composes the EMQ pool, audio-health eligibility and custom-list scope. It does not move settings UI, playback, answer settlement, history or multiplayer code.

- Immutable V82.65 HTML baseline: 8,786,930 bytes; SHA-256 abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33.
- Current standalone product V82.72: 8,787,018 bytes; SHA-256 fb075ed4e68eca454051ecd22cc10d3e7a5def193bf2852bf91547d5465da0d8.
- The V82.65 baseline, V82.70 and V82.72 outputs remain preserved. This is an engineering source checkpoint, not a new product release.

## Changes

- Moved the exact 4,249-byte contiguous source block into src/modules/quiz_pool_pipeline.htmlpart.
- Module SHA-256: 68ea7687d55a4ae658e8e5ee69f686f5c500e8692bae0bd7262704cda5ee63a2.
- Added the single marker <!-- AMQ_SPLIT_MODULE:quiz_pool_pipeline --> at the exact original position in src/scripts/script_004.htmlpart; the module manifest records its byte count and hash.
- The module is reconstructed inside the existing classic-script IIFE. No runtime script tag, new closure, renamed shared binding, or intentional execution-order change was introduced.
- Updated candidate-pool integration, source-characterization, EMQ list handoff and boundary-audit tests/tools to substitute exact module bytes at the marker.
- Added tests/unit/quiz_pool_pipeline_extraction_contract.test.cjs with 16 assertions.
- Updated older renderer/controller reconstruction contracts to account for the newly extracted pool module, and updated FRAGMENT_MANIFEST.json module count.

## Validation results

- Targeted extraction contract: 16 assertions passed.
- Source characterization contract: 40 assertions passed.
- Candidate-pool behavioral golden fixture: 27 assertions passed.
- EMQ selected-list handoff: 4 assertions passed.
- Script_004 boundary audit contract: 15 assertions passed.
- Existing Node suites: 173 assertions passed across policy, integration, EMQ API/list, history/status, storage, backup/restore, multiplayer, answer flow and suggestion helpers.
- Existing extraction contracts: renderer 15, controller 15, DB initializer 19 assertions passed.
- Constrained Chromium suggestion integration: 29 assertions passed.
- Full runner: 20 commands passed, 0 failed.
- Integrity/deterministic build verifier: 114 checks passed, 0 failed. Two independent builds matched the pinned release.
- Rebuilt standalone HTML: 8,787,018 bytes; SHA-256 fb075ed4e68eca454051ecd22cc10d3e7a5def193bf2852bf91547d5465da0d8, byte-identical to pinned V82.72.
- Total named behavioral/contract assertions: 322 passed, 0 failed. Integrity checks are reported separately.

## Not verified / residual risks

- Real-origin browser acceptance remains blocked by the previously observed ERR_BLOCKED_BY_ADMINISTRATOR navigation restriction.
- Real LocalStorage/IndexedDB persistence and upgrade/failure behavior, live audio/network recovery, Firefox, and multiplayer multi-client isolation/reconnect remain unverified.
- GitHub does not yet contain a coherent complete source/build/test release matching this checkpoint. This branch currently publishes only selected V82.78 artifacts; it is not a reproducible full source release.

## Rollback

Restore src/scripts/script_004.htmlpart, reports/FRAGMENT_MANIFEST.json, affected test/tool/docs files and tools/package_checkpoint.py from the V82.77 checkpoint, or unpack the V82.77 engineering ZIP into a separate directory. Do not overwrite the immutable V82.65 baseline. Since the built product remains byte-identical to V82.72, no product HTML rollback is required.

## Next task

Add a differential fixture contract comparing the exact reconstructed candidate-pool source against the extracted module under the same fixtures, asserting exact candidate IDs/order and status side effects. Keep playback, answer settlement, settings UI and multiplayer outside that task.
