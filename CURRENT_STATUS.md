# Current status

Current engineering checkpoint: **V82.68 CANDIDATE-POLICY-MODULE-01**. Product baseline remains immutable V82.65. Candidate policy has been physically separated into a source module; the runtime remains a single classic HTML document and is byte-identical to baseline. Automated build/unit checks: **PASS**. Latest constrained browser smoke attempt: **TIMED OUT / EPIPE**, so current browser smoke revalidation is not passed. Full end-to-end product acceptance remains **PARTIAL**.

## Locked baseline
- HTML: 8,786,930 bytes; SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.
- The V82.65 HTML and ZIP baseline were not overwritten.

## V82.68 changes
- Added `src/modules/candidate_pool_policy.js`, inserted at its original position inside the existing classic script.
- Builder verifies module marker, length and SHA-256; verifier checks module count/hash/marker.
- New build target: `dist/amq_learning_tool_v82_68.html`.
- Tests read policy from the extracted module; candidate-pool integration still executes the exact source `getQuizPool` function.

## Latest tests
- `python tools/run_all_checks.py`: 8 commands passed, 0 failed.
- Six Node suites: 135 passed, 0 failed.
- `tools/verify.py`: 101 passed, 0 failed; two deterministic builds match the baseline byte-for-byte.
- HTML: 8,786,930 bytes, SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.
- Browser smoke rerun timed out with Playwright driver EPIPE after 11 preliminary assertions; not counted as pass. Earlier V82.67 report is historical evidence only.

## Limits
- Real-origin browser navigation, localStorage reload persistence, IndexedDB, actual external audio/network, Firefox, multiplayer multi-device/reconnect and full manual regression remain untested.
- GitHub branch contains documentation checkpoint history but not the complete source fragments or binary ZIP; remote source tree is not independently buildable from this commit.

## Next
1. Review consumers and exact-source tests for the extracted policy module.
2. Choose the next pure side-effect-free module only after inventorying inputs, outputs and side effects.
3. Add golden tests before moving source adapters or candidate pipeline code.
4. Retry browser smoke in a stable permitted Chromium environment; do not alter product code solely to work around EPIPE.
