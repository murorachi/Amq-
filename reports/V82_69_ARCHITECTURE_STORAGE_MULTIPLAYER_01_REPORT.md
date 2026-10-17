# V82.69 architecture/storage/multiplayer checkpoint

## Changes
- Documented architecture and module boundaries.
- Extracted the exact original storage repository script block to `src/modules/storage_repository.htmlpart`, injected at its original position; generated HTML bytes unchanged.
- Kept candidate pool composition and fail-closed custom-list semantics unchanged.
- Added synthetic tests for storage namespace/transaction/rollback/legacy import, backup manifest/allowlist validation, multiplayer session/reconnect and polling/WebSocket fallback contracts.
- Versioned artifact: `dist/amq_learning_tool_v82_69.html`.

## Verification
- 157 assertions passed, 0 failed across nine Node suites.
- 11 runner commands passed, 0 failed.
- Integrity verifier: 103 passed, 0 failed.
- HTML: 8,786,930 bytes, SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.
- ZIP CRC passed, 171 unique entries, internal manifest 170/170 matches, deterministic ZIP bytes verified.

## Acceptance limits
One opaque-origin Chromium smoke run passed 19 assertions; a later rerun failed with EPIPE. Direct file navigation is blocked. Real-origin persistence, IndexedDB round-trip/upgrade/failure, actual audio/network, Firefox, multiplayer multi-client reconnect and full manual regression are not passed.

## Publication limit
This branch contains engineering documentation and reports, not the complete 91-fragment source tree or the binary ZIP. It is not a remotely reproducible source release.
