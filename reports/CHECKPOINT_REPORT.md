# V82.66 CANDIDATE-POOL-INTEGRATION-02 checkpoint report

Date: 2026-10-18 (Asia/Taipei)
Status: PARTIAL. Product business logic remains unchanged.

## Baseline
- Input HTML: `baseline/amq_learning_tool_v82_65_candidate_pool_cleanup.html`
- Size: 8,786,930 bytes
- SHA-256: `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`
- The exact historical official V82.65 delivery ZIP is still absent; its outer SHA-256, CRC, manifest coverage and internal payload hashes remain unverified.

## Changes
- Added `tests/unit/candidate_pool_integration.test.cjs`. It extracts and executes the exact existing candidate policy, `getQuizPool()` and wrapper from the preserved script fragment.
- Added fixed-fixture candidate ID/order assertions for base eligibility, quick pool, status, metadata, tags, watchlist, repeat, combiner output, audio health, custom-list scope, focus mode and fail-closed cases.
- Updated current status, next-task and README documentation.
- No product logic, UI, data, storage key/schema, catalog or audio payload changed.

## Actual test results
- Candidate policy unit tests: 70 passed, 0 failed.
- Candidate pool integration fixtures: 22 passed, 0 failed.
- Build and deterministic verification: 98 passed, 0 failed.
- Two generated builds are byte-identical; final HTML remains 8,786,930 bytes with SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.
- Semantic inventory regenerated; it remains regex-based and is not a complete AST/call graph.

## Not run / risks
- Real EMQ API contract and real source metadata isolation; the combiner is stubbed in fixtures.
- Browser/Firefox manual operation, external audio/network, IndexedDB backup/restore, multiplayer multi-device and full product regression.
- Official V82.65 ZIP verification as noted above.

## Rollback
Remove `tests/unit/candidate_pool_integration.test.cjs` and revert the checkpoint docs/reports/package. Product baseline remains unchanged; no user-data migration or rollback is required.

## Next
Validate the actual EMQ/Mixed combine interface and source metadata isolation, then trace settings/custom-list/audio-health/history interfaces. Do not extract a production policy module until these boundaries are tested.

## GitHub delivery status
- Text artifacts and test source/report were committed to branch `v82.66-source-split-02` and will be read back for verification.
- The binary checkpoint ZIP is not uploaded to GitHub; a checksum sidecar may be published separately. Do not treat the text commit as binary package upload success.
