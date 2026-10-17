# Architecture: V82.69

Runtime remains one classic standalone HTML. CSS/script order is unchanged. Build-time source modules are inserted at explicit markers; no runtime ESM import, network fetch, extra script tag or asynchronous load is introduced.

Modules:
- `candidate_pool_policy.js`: pure candidate policy.
- `storage_repository.htmlpart`: exact original V82.30 storage repository script, inserted at its original document position.

Candidate flow remains original `getQuizPool` -> EMQ/Mixed combination -> audio eligibility -> custom-list scope; existing exact-source tests protect ordering and fail-closed scope behavior.

Storage tests use synthetic in-memory storage and cover namespace isolation, transactions/rollback, allowlisted import and full-backup manifest validation. Multiplayer tests cover active session/reconnect storage, poll guards, invalid-session cleanup and WebSocket/HTTP fallback without contacting a server.

Environment limitations: direct file:// navigation is blocked; opaque-origin UI smoke does not validate persistence, IndexedDB, real audio/network or multiplayer multi-client behavior.
