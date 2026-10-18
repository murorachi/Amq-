# Next task

Current checkpoint: **V82.86.05 custom-list ID lifecycle matrix**. Branch `v82.86.05-custom-list-id-lifecycle-matrix-01`.

## Scope completed in source
- Extended exact-source CRUD/reload tests with AMQ and EMQ failed-write assertions.
- Added EMQ direct song ID normalization/reload coverage.
- Added EMQ corrupt JSON fallback assertion.
- Wrote an explicit matrix identifying existing versus new tests and uncovered backup/restore paths.
- No product source or generated HTML changed.

## Pending verification
- Inspect GitHub Actions for this branch and report actual job/test results.
- Do not mark the stage fully accepted until the unit test and source fingerprint/build gate pass.

## Next bounded task
1. Locate the actual backup export/import path for AMQ and EMQ custom-list keys.
2. Add browser-level backup → restore → reload assertions on real origin.
3. Cover corrupt backup rejection before mutation and rollback behavior.
4. Keep IndexedDB quota/corruption and real audio-provider tests as separate external gates.

## Rollback
Revert the test/report/status changes in V82.86.05. Product rollback is not required.
