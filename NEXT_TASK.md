# Next task

Current checkpoint: **V82.69 ARCHITECTURE-STORAGE-MULTIPLAYER-01**.

Completed: exact-byte storage repository source extraction; candidate-pool ordering contracts retained; storage repository (9 tests), backup manifest/allowlist (6 tests), multiplayer session/reconnect (7 tests); total 157 Node assertions passed; 11/11 runner commands and 103/103 integrity checks passed.

Remaining acceptance: standalone-origin localStorage persistence, IndexedDB save/restore/upgrade/failure, real audio and failed-source recovery, multiplayer multi-client state isolation/reconnect/WebSocket recovery, Firefox and full manual regression.

Never clear or overwrite real profile/history/list/IndexedDB/server state during tests. Full source tree and ZIP binary are not yet published on this branch.


## AST dependency inventory pass (local checkpoint AST-PASS-01, 2026-10-18)
- First-pass TypeScript-parser inventory scanned all 41 script/data fragments: 39 executable JavaScript fragments parsed without syntax diagnostics; script_030 (AniList JSON map) and script_037 (compressed EMQ payload) were treated as data blocks.
- Inventory: 809 named function/function-valued definitions and 2,126 direct identifier-call edge records. This is static evidence, not a complete lexical/runtime call graph.
- script_001 is 5,078,176 bytes. Its DB initializer is 4,975,240 bytes (anime 9,516 rows; songs 38,821 rows), followed by 102,936 bytes of executable runtime code. The whole file must not be treated as a pure data module.
- script_004 is 107,042 bytes with 70 named function/function-valued definitions. Direct-call scan: 12 unique cross-fragment matches, 9 ambiguous-name call sites, 54 external/global/unresolved call sites.
- Product HTML/source was not changed. Local tests: 12 commands passed, 0 failed; 157 assertions passed; integrity verifier 103 passed, 0 failed; standalone HTML remains byte-identical to immutable V82.65.
- Browser-origin persistence, IndexedDB, real audio/network and multi-client multiplayer remain untested. This is a partial engineering update, not a full source release; the AST tool, full CSV inventories and ZIP are not yet published to this branch.
