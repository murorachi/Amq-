# V82.85.30 — Chinese-title cache record shape guard

## Change

- Baseline branch: `v82.85.29-source-audit-matrix-01`.
- Modified production file: `src/scripts/script_031.htmlpart`.
- Change: `readCache()` now rejects `Array.isArray(item.records)` in addition to the existing current-version/object checks.
- Reason: arrays pass JavaScript's `typeof value === 'object'` guard. Since `loadTitles()` treats any truthy cache result as a hit, an array-shaped record payload could be accepted as an empty/invalid title map and prevent the normal source rebuild path from running.
- Scope intentionally excludes changes to database name, store name, key, source version, cache payload schema, alias behavior or source-fetch behavior.

## Fingerprints

- Changed fragment: 13,842 bytes; SHA-256 `bf6d46591ef75830fb6fa51ccdc55e061f6ac8b71c0848b08c27d35e245b4bb1`.
- Standalone candidate: 8,786,577 bytes; SHA-256 `e76c4a35a406b20b055e91278e3c917832f9a9cb662280ea3d7d3211a69b8bb5`.
- Immutable V82.82 baseline remains 8,787,490 bytes; SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.

## Test plan and status

- Updated `tests/unit/chinese_title_indexeddb_cache_version_contract.test.cjs` to assert that array-shaped cache records are rejected, while retaining current-version, stale-version, malformed-record, read-failure and write-failure cases.
- Other focused characterization contracts are included in the versioned checkpoint package: SRS 41 assertions, scene-background lifecycle 29, EMQ cache/filtering 25, title source mapping/partial failure 19, VNDB cover batching/retry 26.
- CI run [39252468802](https://github.com/murorachi/Amq-/actions/runs/39252468802): source/unit **PASS** (verifier 132/132 and all unit steps including the cache contract); Firefox responsive **PASS**; deterministic source package builds matched and uploaded; standalone candidate built and uploaded. Chromium native-origin was still in progress at the last check.
- Deterministic source package SHA-256: `d1eab00af3bb59955bdcc11650a8edf5a8653df3c46912c08b725b60c7aea56a` (14,691,859 bytes uploaded).
- Standalone HTML candidate SHA-256: `e76c4a35a406b20b055e91278e3c917832f9a9cb662280ea3d7d3211a69b8bb5` (8,786,577 bytes before artifact compression).
- Known CI audio output capture mismatch is not treated as a product playback regression; actual playback was user-confirmed. Any current run failure must still be inspected rather than assumed to be this known issue.

## Delivery and rollback

- Updated `reports/FRAGMENT_MANIFEST.json` for the modified fragment and V82.85.30 standalone fingerprint.
- Updated the engineering workflow candidate/artifact names to V82.85.30.
- Updated checkpoint package name and required paths so the new tests/reports are included.
- Rollback: restore the previous `readCache()` guard, V82.85.29 manifest release entry and workflow/package naming, and revert this report/status updates. Keep immutable V82.82 unchanged.
