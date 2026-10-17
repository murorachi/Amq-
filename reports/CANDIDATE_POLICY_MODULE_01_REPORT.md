# V82.68 CANDIDATE-POLICY-MODULE-01 report

Date: 2026-10-18 (Asia/Taipei). Status: automated build/unit checks PASS; constrained browser smoke rerun TIMED OUT.

## Baseline
Locked V82.65 HTML: 8,786,930 bytes, SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`. Baseline was not overwritten.

## Changes
- Extracted the pure candidate-policy block into `src/modules/candidate_pool_policy.js`.
- The build inserts module bytes at the original position inside the same classic script. No new runtime script tag, external load, ESM, or asynchronous execution.
- Added module hash/length/marker checks; updated policy, candidate-pool, EMQ API and history-isolation tests to read the module.
- Versioned output is `dist/amq_learning_tool_v82_68.html`.
- No intentional changes to product behavior, UI, storage schema, audio or multiplayer contracts.

## Actual test results
- `python tools/run_all_checks.py`: 8 commands passed, 0 failed.
- Six Node suites: 135 passed, 0 failed (70 + 27 + 19 + 7 + 4 + 8).
- `tools/verify.py`: 101 passed, 0 failed; two deterministic builds matched each other and the V82.65 baseline byte-for-byte.
- HTML output: 8,786,930 bytes; SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.
- Browser smoke rerun timed out with Playwright driver EPIPE after 11 preliminary assertions; no final summary. It is not a pass. The prior V82.67 19-assertion report is historical only.

## Package
- `AMQ_V82_68_CANDIDATE_POLICY_MODULE_01.zip`
- Final outer ZIP bytes and SHA-256 are recorded in the external sidecar `reports/V82_68_CANDIDATE_POLICY_MODULE_01_SHA256.txt` (kept outside the archive to avoid a self-referential hash). The binary is local and has not been uploaded to GitHub.

## Remaining limits
Real-origin browser acceptance, persistence, IndexedDB, actual audio/network, Firefox, multiplayer multi-device/reconnect and full manual regression remain untested. The full source tree and binary ZIP are not published on this branch, so this documentation update is not a remotely reproducible code release.

## Rollback
Restore the V82.67 checkpoint versions of `src/scripts/script_004.htmlpart`, `tools/build.py`, `tools/verify.py`, the four policy-consuming tests, and `reports/FRAGMENT_MANIFEST.json`; remove `src/modules/candidate_pool_policy.js` and `reports/MODULE_MAP.csv`. Preserve the immutable V82.65 baseline and unique V82.68 artifacts.

## Next
Inspect the next side-effect-free module boundary, add golden tests, and only then extract source adapters/candidate pipeline. Persistence and multiplayer follow after contracts stabilize.
