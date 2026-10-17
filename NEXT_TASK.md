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


## QUIZ-SUGGESTION-TEXT-01 (local follow-on, 2026-10-18)
- Local source tree extracts the existing symbol normalization, Unicode source-offset mapping and highlight-range helpers from script_004 into `src/modules/quiz_suggestion_text.js`, injected at the original execution position with no new runtime script tag.
- Contract test: 16/16 assertions passed. Full local runner: 13 commands passed, 0 failed; 173 total assertions passed; integrity verifier 105 passed, 0 failed.
- The standalone HTML remains byte-identical to immutable V82.65 (8,786,930 bytes; SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`).
- The full local checkpoint ZIP is `AMQ_V82_69_QUIZ_SUGGESTION_TEXT_01.zip`, 9,084,709 bytes, SHA-256 `d74541c241c31ce6dde2159f5bdf891d97995d1f2b62b2c26e50302f37303a9b`.
- IMPORTANT: this branch remains only partially published. The new module, updated script_004, manifest, contract test, AST tool and full binary ZIP have not been published/read back as an exact matching set. Do not treat this remote branch as the current reproducible source release.


## Integration follow-up — 2026-10-18
The production suggestion integration test passed 18 assertions and exposed a click-selection ARIA mismatch. The legacy capture-phase handler in `script_007` dispatches `input`, which rebuilds suggestions, then clears the list without resetting `aria-expanded`. Do not extract the controller until event ownership across `script_004`, `script_007`, and `script_008` is reconciled. The product HTML remains byte-identical to immutable V82.65. Next: fix this minimal interaction contract, then rerun the browser test and full checks. The remote source release remains incomplete.


## Next task after V82.70 ARIA fix
1. Map event registration order and ownership in `script_004.htmlpart`, `script_007.htmlpart`, and `script_008.htmlpart`.
2. Add regression coverage for exactly-once input dispatch, list closure, `aria-expanded=false`, focus/caret, and no accidental answer submission.
3. Only then assess whether duplicate legacy handlers can be consolidated safely.
