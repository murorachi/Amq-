# Current task: verify V82.85.30 release acceptance

Current branch: `v82.85.30-chinese-title-cache-shape-guard-01`.

## Change under acceptance

- `src/scripts/script_031.htmlpart`: reject array-shaped `records` in the versioned IndexedDB title cache, so malformed cache data triggers a cache miss and normal rebuild.
- Fragment: 13,842 bytes / SHA-256 `bf6d46591ef75830fb6fa51ccdc55e061f6ac8b71c0848b08c27d35e245b4bb1`.
- Expected standalone candidate: 8,786,577 bytes / SHA-256 `e76c4a35a406b20b055e91278e3c917832f9a9cb662280ea3d7d3211a69b8bb5`.
- Report: `reports/V82_85_30_CHINESE_TITLE_CACHE_SHAPE_GUARD_01.md`.

## Acceptance checklist

1. Verify source fingerprints and deterministic build pass with the new manifest release pin.
2. Confirm the Chinese-title cache test passes with arrays rejected and valid cache data still accepted.
3. Confirm checkpoint package required-path contract and deterministic package reproducibility pass.
4. Confirm Firefox responsive and browser-native tests; report the known audio output capture failure separately if it recurs.
5. Verify GitHub branch contents and final commit; do not treat source/unit pass as proof that the whole workflow passed.

## Rollback

Restore the previous `readCache()` guard, V82.85.29 manifest release pin, workflow candidate/artifact names and package name. Immutable V82.82 remains unchanged.
