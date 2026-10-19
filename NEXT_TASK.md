# Current task: verify malformed Chinese-title cache guard fix

Current branch: `v82.85.29-source-audit-matrix-01`.

## Change made

- `src/scripts/script_031.htmlpart`: `readCache()` rejects arrays as malformed records, avoiding an empty-array cache hit that could skip title-map download.
- Test: `tests/unit/chinese_title_indexeddb_cache_version_contract.test.cjs` now asserts array cache rejection.
- Manifest and source audit matrix refreshed to 13,842 bytes / SHA-256 `bf6d46591ef75830fb6fa51ccdc55e061f6ac8b71c0848b08c27d35e245b4bb1`.

## Acceptance steps

1. Check the latest workflow run after the manifest refresh.
2. Confirm source verifier 132/132, deterministic package build, all source/unit tests including cache contract, and Firefox responsive.
3. Report Chromium native-origin separately. Known audio output capture mismatch (`peak=0, rms=0`) is not evidence of a product audio regression because actual playback was user-confirmed; do not expand scope to debug it.
4. If all required checks pass apart from that known audio capture assertion, mark this bounded stage accepted with that limitation explicit.

## Next after acceptance

The first-pass audit covers all 91 registered fragments. Do not re-audit every fragment. Pick the next concrete task only from remaining evidence-backed risks; otherwise pause broad audit work and resume the user's feature-development goals.

## Rollback

Revert the single `readCache()` guard change, restore the original test expectation, and restore the old manifest/matrix fingerprint. V82.82 remains immutable.
