# V82.85.26 suggestion cache invalidation deduplication

## Change

In `src/scripts/script_028.htmlpart`, removed one redundant 95-character anime suggestion-cache invalidation loop from the display-language change listener. That listener immediately invokes `window.__aniRefreshChineseSuggestionsV8237`, which already owns the same invalidation loop and refreshes the anime, artist, and title suggestion fields.

The single remaining invalidation loop is now maintained by the refresh function. No cache key format, source-mode logic, language preference persistence, or suggestion rendering behavior was changed.

## Verification

- Added `tests/unit/multiplayer_suggestion_cache_invalidation_dedup_contract.test.cjs` to assert exactly one invalidation loop remains, the shared refresh function owns it, all three fields are refreshed, and the display-language listener delegates to the shared function.
- The first CI run reported the expected stale fragment fingerprint; the manifest is now pinned to the observed source hash (139,664 bytes / SHA-256 `c349421f2a4759677669079d5e37a212795958ec6e556b56f36cadddeb56d018`). The next CI run must verify the updated fragment and release fingerprint: 8,787,009 bytes / SHA-256 `1745600f52de09983ca3b66e45341a27acbd463e233fc77719e42f4673d4abad`. The prior run reached the deterministic build and reported this exact output hash.
- This is a behavior-preserving removal of redundant invalidation; no audio or multiplayer protocol logic changed.

## Rollback

Restore the removed loop in the `mpNameLanguage` change listener, revert the new contract/workflow/package/report metadata, and restore the previous fragment/release fingerprints. V82.82 remains immutable.

## Next task

Continue the historical technical-debt inventory. Prefer exact repeated logic where one existing owner already guarantees the behavior; do not merge similarly named helpers with different semantics.
