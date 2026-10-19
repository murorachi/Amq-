# Current engineering checkpoint: V82.85.26 suggestion cache invalidation dedup

- Branch: `v82.85.26-suggestion-cache-invalidation-dedup-01`, based on the V82.85.25 multiplayer audio callback dedup checkpoint.
- Immutable V82.82 product baseline remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Production change: removed one redundant anime suggestion-cache invalidation loop from the multiplayer display-language change listener. It immediately calls `window.__aniRefreshChineseSuggestionsV8237`, which already clears the same anime cache entries and refreshes anime, artist, and title suggestions.
- Change size: 95 source characters removed; only one invalidation loop remains.
- Added `tests/unit/multiplayer_suggestion_cache_invalidation_dedup_contract.test.cjs` and wired it into the source/unit workflow.
- Fragment fingerprint: 139,664 bytes / SHA-256 `c349421f2a4759677669079d5e37a212795958ec6e556b56f36cadddeb56d018`.
- Release candidate fingerprint is awaiting the next CI builder output; do not mark the stage accepted until the candidate manifest hash, unit contract, reproducibility and relevant browser tests pass.
- Stage report: `reports/V82_85_26_SUGGESTION_CACHE_INVALIDATION_DEDUP_01.md`.

## Next direction

After the candidate passes, continue historical-code deduplication. Prefer removing duplicated work when an existing shared function already guarantees the same behavior. Do not merge similarly named functions with different semantics or expand into broad lifecycle changes.

## Rollback

Restore the removed loop in the `mpNameLanguage` listener and revert the focused test, workflow/package/report metadata, and manifest changes together. V82.82 remains immutable.
