# V82.66 Candidate Pool Integration Checkpoint 02

Status: PARTIAL. This checkpoint adds tests only; product behavior and the standalone HTML are expected to remain unchanged.

## Scope

- Test file: `tests/unit/candidate_pool_integration.test.cjs`.
- The test extracts the exact policy block, `getQuizPool()` implementation, and post-processing wrapper from `src/scripts/script_004.htmlpart`.
- Stubs only browser DOM/storage, catalog globals, familiarity/watch status, EMQ combine, audio health and custom-list scope dependencies.
- Fixtures assert exact candidate IDs and order for base eligibility, quick pool, status, metadata, missing year, blacklist/tags, watch status, watchlist membership, repeat protection, combine behavior, audio health, custom-list scope, focus mode, empty pools, duplicate IDs and invalid source-mode normalization.

## Test result

- Candidate policy unit tests: 70 passed, 0 failed.
- Candidate pool integration fixtures: 22 passed, 0 failed.
- Build/verification: see `reports/VERIFY_RUN.txt`; must remain byte-identical to the V82.65 HTML baseline.

## Boundaries and risks

- The integration harness executes the exact pool functions but does not load the full page or real AMQ/EMQ APIs.
- EMQ/Mixed aggregation is exercised through a controlled combiner stub; real source identity, metadata mapping and external audio-health behavior remain unverified.
- Browser/Firefox manual tests, IndexedDB round-trip, multiplayer multi-device and full product regression are not run.
- The exact historical V82.65 delivery ZIP is still absent, so its full ZIP hash, CRC, internal manifest and payload hashes remain unverified.
- No product business logic, UI, catalog, storage key, schema or standalone HTML was changed.

## Rollback

Delete `tests/unit/candidate_pool_integration.test.cjs` and revert the checkpoint documentation/package. The baseline HTML and source fragments remain unchanged.

## Next task

Validate real EMQ/Mixed API contract and source metadata isolation, then continue dependency tracing. Do not extract the policy into a production module until expected fixture outputs and the real combiner interface are stable.
