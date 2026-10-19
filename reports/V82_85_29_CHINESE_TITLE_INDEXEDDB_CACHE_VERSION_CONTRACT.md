# Chinese-title IndexedDB cache version contract — V82.85.29

## Scope

- Production file: `src/scripts/script_031.htmlpart`.
- Test: `tests/unit/chinese_title_indexeddb_cache_version_contract.test.cjs`.
- CI step: `Test Chinese-title IndexedDB cache version contract`.
- Production source, DB name, store name, cache key and version are unchanged.

## Deterministic scenarios

1. A valid cache with the current source revision returns its records.
2. A stale version or missing/malformed records returns a cache miss.
3. IndexedDB read errors degrade to a cache miss.
4. Cache writes use the existing `merged-map` key and current `VERSION` value.
5. Write errors return false without throwing.
6. The current cache guard accepts an array as records because it checks only truthiness and `typeof records === 'object'`. The test records this existing behavior rather than silently changing production behavior.

## Acceptance status

- Static review: exact-source cache functions are tested through a deterministic IndexedDB-boundary stub.
- Automated execution: pending CI at report creation. Record assertion count and run ID after the focused test and source/unit job complete.
- Not covered: actual browser IndexedDB upgrade/transaction behavior, cache eviction, storage quota behavior or live source freshness.

## Deferred observation

Array acceptance may be worth tightening to a non-array object check, but no production change is made in this characterization stage. If changed later, add a migration/cache compatibility decision and verify the fallback download path.

## Rollback

Remove this test and workflow step, then revert its report/status references. No production source or immutable baseline rollback is needed.
