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
6. Array-shaped `records` are rejected as malformed cache data, forcing the existing cache-miss/download fallback rather than treating an empty array as a successful cache hit.

## Acceptance status

- Static review: exact-source cache functions are tested through a deterministic IndexedDB-boundary stub.
- Updated contract: **14 assertions passed** in run [39257936940](https://github.com/murorachi/Amq-/actions/runs/39257936940), including the array-shaped cache miss assertion. Source verifier passed 132/132, deterministic build matched the V82.85.29 pin, and Firefox responsive passed.
- Not covered: actual browser IndexedDB upgrade/transaction behavior, cache eviction, storage quota behavior or live source freshness.

## Deferred observation

Fixed in this stage: `readCache()` now rejects arrays with `!Array.isArray(item.records)`. The existing `loadTitles()` cache-miss path therefore proceeds to build/download the title map. DB name, store name, key and version are unchanged.

## Rollback

Remove this test and workflow step, then revert its report/status references. No production source or immutable baseline rollback is needed.
