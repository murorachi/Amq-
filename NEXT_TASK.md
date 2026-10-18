# Next task

Current checkpoint: **V82.86.05 custom-list ID lifecycle matrix**. Branch `v82.86.05-custom-list-id-lifecycle-matrix-01`.

## Scope completed and verified
- Extended exact-source CRUD/reload tests with AMQ and EMQ failed-write assertions.
- Added EMQ direct song ID normalization/reload coverage.
- Added EMQ corrupt JSON fallback assertion.
- Wrote an explicit matrix identifying existing versus new tests and uncovered backup/restore paths.
- No product source or generated HTML changed.
- CI run [39162546062](https://github.com/murorachi/Amq-/actions/runs/39162546062) passed both jobs.
- New/expanded custom-list CRUD/reload tests: 15 passed, 0 failed.
- Deterministic V82.82 output remains 8,787,490 bytes with SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.

## Next bounded task
1. Locate the actual backup export/import path for AMQ and EMQ custom-list keys.
2. Add browser-level backup → restore → reload assertions on real origin.
3. Cover corrupt backup rejection before mutation and rollback behavior.
4. Keep IndexedDB quota/corruption and real audio-provider tests as separate external gates.

## Rollback
Revert the test/report/status changes in V82.86.05. Product rollback is not required.
