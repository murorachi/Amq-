# V82.66 Candidate Pool Integration Checkpoint 02

Status: PARTIAL. This checkpoint adds tests only; product behavior and standalone HTML remain unchanged.

## Scope
- Test file: `tests/unit/candidate_pool_integration.test.cjs`.
- Extracts and executes the exact candidate policy, `getQuizPool()`, and post-processing wrapper from `src/scripts/script_004.htmlpart`.
- Uses disposable fixed catalog fixtures and stubs browser DOM/storage, catalog globals, familiarity/watch status, EMQ combine, audio health and custom-list scope.
- Asserts exact candidate IDs/order for base eligibility, quick pool, status, metadata, missing year, blacklist/tags, watch status/list, repeat protection, combine behavior, audio health, custom-list scope, focus mode, empty pools, duplicate IDs and invalid source mode.

## Test results
- Candidate policy unit tests: 70 passed, 0 failed.
- Candidate pool integration fixtures: 22 passed, 0 failed.
- Deterministic build/verification: 98 passed, 0 failed.
- Final HTML: 8,786,930 bytes; SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.

## Limits
The harness does not load the complete page or real AMQ/EMQ APIs. EMQ/Mixed aggregation is represented by a controlled combiner stub; real source identity/metadata mapping, browser behavior, external audio/network, IndexedDB round-trip, multiplayer multi-device and full product regression remain unverified. The exact historical V82.65 delivery ZIP is still unavailable, so its outer hash/CRC and internal manifest/payload hashes are not independently verified.

No product business logic, UI, catalog, storage key/schema or standalone HTML was changed.

## Rollback
Remove `tests/unit/candidate_pool_integration.test.cjs` and revert checkpoint docs/reports/package. The baseline HTML remains unchanged; no user data migration is required.

## Next
Validate the real EMQ/Mixed combine interface and source metadata isolation, then trace settings/custom-list/audio-health/history interfaces. Do not extract a production policy module until these boundaries are tested.
