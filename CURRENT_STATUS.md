# Current status

Current checkpoint: **V82.66 CANDIDATE-POOL-TESTS-01**. Overall status: **PARTIAL**.

## Completed
- Preserved source split and deterministic single-file build remain unchanged.
- Added a Node VM test executing the exact V82.65 candidate policy block from script_004.
- Candidate policy contract tests: **70 passed, 0 failed**.
- Static inventories added for function declarations/duplicate names, explicit window exports, DOM ID references, listeners/timers, storage and IndexedDB calls.
- Candidate-pool pipeline semantics documented.
- Product logic/UI/data/storage schemas were not changed.

## Fingerprints
- HTML: `amq_learning_tool_v82_65_candidate_pool_cleanup.html`
- Size: 8,786,930 bytes
- SHA-256: `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`
- Candidate checkpoint ZIP: 13,232,277 bytes; SHA-256 `f2241be88187a095bf3716fdff4b0e2d5ad50047dbd0c95227385a27475cef8e`.
- ZIP CRC: PASS; 123 unique entries.
- Official full V82.65 delivery ZIP remains unavailable, so its expected historical hash was not recomputed here.

## Static scan counts
- 41 script/data fragments scanned.
- 817 detected function/arrow-style declarations.
- 31 names with multiple detected definitions.
- 89 explicit window assignments.
- 391 literal DOM ID references.

Regex scan only; these counts do not prove duplicate behavior or runtime leaks.

## Tests
- Candidate policy tests: 70/70 PASS.
- Builder/verifier: 98 passed, 0 failed.
- Output HTML remains 8,786,930 bytes with SHA-256 identical to baseline.
- Firefox, real external audio/API, IndexedDB round-trip, multi-device multiplayer and full product regression: NOT RUN.

## Next
Obtain official V82.65 ZIP; then add fixed fixtures and exact candidate-ID/order assertions for getQuizPool and EMQ/Mixed wrapper before extracting a policy module.
