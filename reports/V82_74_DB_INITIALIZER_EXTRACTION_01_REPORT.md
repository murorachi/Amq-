# V82.74 DB Initializer Extraction 01

Date: 2026-10-18  
Type: engineering-only, byte-preserving source extraction  
Product behavior change: none

## Baseline and current product

- Immutable V82.65 baseline: 8,786,930 bytes, SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.
- Current product remains V82.72: `dist/amq_learning_tool_v82_72.html`, 8,787,018 bytes, SHA-256 `fb075ed4e68eca454051ecd22cc10d3e7a5def193bf2852bf91547d5465da0d8`.
- V82.70 and V82.72 product files remain separate and retained. The source-only change did not modify the immutable baseline or the product output bytes.

## Actual source change

- Moved the exact 4,975,240-byte `let DB={...};` initializer from `src/scripts/script_001.htmlpart` into `src/modules/anime_song_database.htmlpart`.
- The builder reinserts the module marker at the original position inside the same classic script. The following `let anime=DB.anime,songs=DB.songs,...` consumer initialization remains after the initializer.
- No JSON parse/stringify, key sorting, whitespace normalization, new runtime script tag, or data transformation was introduced.
- The remaining runtime portion of `script_001` stays in place. This is a data-boundary extraction, not a claim that the entire script has been semantically modularized.

## Test cases and actual results

1. Exact module payload: byte length and SHA-256 match the captured initializer. Passed.
2. Reconstruction contract: reconstructed `script_001` is 5,078,176 bytes and matches the pre-extraction SHA-256 `f838aea1ca5b263cf932edecf1345aad6c15e9578098c58b724f9e2c9e679af7`. Passed.
3. Data shape: top-level keys are exactly `anime` and `songs`; all 9,516 anime rows have seven fields and all 38,821 song rows have twelve fields. Passed.
4. Execution order: all `DB` consumers remain after the restored initializer in the original classic script. Passed.
5. Manifest/build integrity: module and fragment metadata validate; two independent builds match the expected V82.72 product fingerprint. Passed.
6. Regression suite: `python tools/run_all_checks.py` completed with 15 commands passed, 0 failed. The new extraction contract reported 19 assertions passed. Existing unit/contract suites report 173 assertions passed, so combined unit/contract assertions are 192 passed, 0 failed. Browser suggestion integration remains 29 assertions passed, 0 failed under its documented fixture-backed `about:blank` constraints. `tools/verify.py` reports 108 checks passed, 0 failed.

Full command output: `reports/ALL_CHECKS_V82_74_DB_INITIALIZER_EXTRACTION_01.txt`.

## Not covered / remaining risks

- The local-origin test remains blocked: Chromium navigation to localhost returns `ERR_BLOCKED_BY_ADMINISTRATOR` before page navigation. This extraction does not resolve that environment limitation.
- Production-origin persistence, IndexedDB, audio/network recovery, Firefox and multiplayer multi-client reconnect remain unverified.
- GitHub does not yet contain a coherent, remotely verified source release with this exact module, all source fragments, manifest, tests and build/package tools. This report-only upload is documentation, not a complete release publication.

## Rollback

Restore the V82.72 engineering source checkpoint from `AMQ_V82_73_LOCAL_ORIGIN_ACCEPTANCE_BLOCKED_01.zip`, or revert these source-only changes: restore the original `src/scripts/script_001.htmlpart`, remove `src/modules/anime_song_database.htmlpart` and its manifest/checklist/test entries, and restore the prior build runner/docs. The standalone V82.72 product HTML does not need rollback because its bytes are unchanged.

## Next task

1. Close the coherent GitHub source publication gap with remote readback/blob SHA verification.
2. Run the native local-origin test in a browser environment where localhost navigation is permitted.
3. Continue with the next highest-risk semantic module only after release/acceptance evidence is secured.
