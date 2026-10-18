# Dependency map: SOURCE-SPLIT-02 / CANDIDATE-POOL-TESTS-01

## Runtime composition

The single HTML document remains the runtime composition root. Its 41 inline script/data blocks execute in original order; 50 CSS blocks retain their original cascade order. `reports/FRAGMENT_MAP.csv` is the exact physical order and fingerprint map. Physical separation is complete; semantic decoupling is not.

## Candidate-pool path (confirmed from source)

1. `script_004.htmlpart`: `loadQuizSettings()` loads `aniQuizSettingsV14` and reads the V82.65 selection semantics marker.
2. `script_004.htmlpart`: `window.__aniCandidatePoolPolicyV8265` provides shared policy helpers for source modes, numeric normalization, metadata, familiarity, tags, watchlist, blacklist and repeats.
3. `getQuizPool()` constructs the AMQ base pool from `songs`, `byAnime`, familiarity (`st()`), `songTags`, `watchStatus()`, `animeWatch`, `quizSettings`, `activeFocusSongIdsV72`, `quizRoundSeen`, and `lastQuestionId`.
4. A later wrapper captures the original `getQuizPool` as `__aniEmqGetQuizPoolBaseV8248`, combines EMQ/Mixed candidates through `window.__aniEmqAPI.combinePool`, filters through `window.__aniAudioHealthV857.eligible`, then applies `window.__aniApplyQuizCustomListScopeV8265` or fails closed if custom scope is required but the helper is unavailable.
5. `nextQuiz()` consumes the final pool to choose the next song; playback and settlement behavior is outside the current unit test boundary.

## High-risk coupling observations

- Candidate policy reads state passed as arguments, but the pool builder itself still reads many globals and DOM values.
- `getQuizPool` is reassigned by a wrapper. This is an intentional extension point until proven otherwise; do not remove it based only on duplicate names.
- Candidate selection is cross-coupled to blacklist/history API, custom lists, watchlist state, EMQ mode, audio-health state and repeat tracking.
- `aniQuizSettingsV14` is read/written in several fragments. Treat it as a shared compatibility contract; do not rename or reshape it during source extraction.
- `aniQuizCustomListScopeInvalidV8265` is a fail-closed marker; deleting or ignoring it could broaden candidate scope.
- EMQ uses a compressed/base64 payload (`emqLibraryGzipBase64V8248`) and is decoded by later code; it must remain separate from AMQ song IDs and source metadata.

## Static inventory outputs

- `reports/FUNCTION_DEFINITION_INVENTORY.csv`: regex-detected function/arrow definitions and duplicate-name counts.
- `reports/WINDOW_EXPORT_INVENTORY.csv`: explicit `window.property = ...` exports.
- `reports/DOM_ID_REFERENCE_INVENTORY.csv`: literal DOM ID reads/selectors.
- `reports/LIFECYCLE_STORAGE_INVENTORY.csv`: listener/timer/storage/IndexedDB static matches and literal keys.
- `reports/SEMANTIC_INVENTORY_SUMMARY.md`: counts and interpretation limits.

These inventories are conservative regex scans, not an AST-based call graph. Duplicate names are investigation leads, not proof of redundancy. Timer/listener occurrence counts do not establish leaks. Dynamic keys and indirect storage wrappers may be missed.

## Current evidence limits

Full function-call edges, all DOM writers, listener ownership, timer cleanup guarantees, dynamic storage keys, complete backup allowlists, and browser runtime behavior remain unverified. Continue by tracing the highest-risk candidate-pool dependencies before refactoring its pure policy boundary.


## V82.69 update
- `src/modules/storage_repository.htmlpart` now contains the exact bytes formerly in `src/scripts/script_027.htmlpart`; the fragment is a build marker. This is physical separation only; runtime API and execution order are unchanged.
- `tools/build.py` and `tools/verify.py` validate module marker placement using each module's declared `insertion_fragment`, not a hard-coded script fragment.
- Storage repository tests use a synthetic Map-backed localStorage and exercise rollback/import safeguards. Multiplayer contract tests use synthetic sessionStorage/localStorage and do not contact a room service.
- Remaining gap: no browser origin allowed for real IndexedDB/localStorage reload acceptance; no actual multiplayer server or second browser client is available in this run.

## V82.69 parser-backed dependency pass (AST-PASS-01)

- Tool: `tools/ast_dependency_inventory.cjs` (TypeScript parser), also part of `tools/run_all_checks.py`.
- All 41 script/data fragments were scanned. Thirty-nine executable JS fragments parse with zero syntax diagnostics; `script_030` is JSON data and `script_037` is compressed EMQ payload, so they are deliberately excluded from JS parsing.
- Inventory totals: 809 named function/function-valued definitions and 2,126 direct identifier-call edge records. Resolution labels are fragment-level candidates; duplicate names are marked ambiguous rather than treated as proof of duplicate behavior.
- `script_001.htmlpart` is not purely a catalog payload: its `DB` initializer is 4,975,240 bytes, containing `anime` (9,516 rows) and `songs` (38,821 rows), followed by 102,936 bytes of executable runtime logic including status/history persistence. If extracted, only the DB initializer should move, and only after byte-order/consumer tests.
- `script_004.htmlpart` is 107,042 bytes and has 70 named function/function-valued definitions inside one application IIFE. The first-pass direct-call scan records 12 unique cross-fragment matches, 9 ambiguous-name call sites, and 54 external/global/unresolved call sites. This does not yet cover all property calls, callbacks, DOM effects, globals, listeners, timers or runtime dispatch.
- Full evidence: `reports/AST_DEPENDENCY_MAP.md`, `AST_DEPENDENCY_SUMMARY.csv`, `AST_FUNCTION_DEFINITIONS.csv`, `AST_DIRECT_CALL_EDGES.csv`, `AST_DECLARED_SYMBOL_REFERENCES.csv`, `AST_API_TOUCHPOINTS.csv`, `AST_PARSE_DIAGNOSTICS.csv`.
- No product source fragment or HTML changed during this pass.

## QUIZ-SUGGESTION-TEXT-01 module boundary

`src/modules/quiz_suggestion_text.js` now owns the existing special-symbol-to-space policy, NFKC/lowercase normalization, normalized search text to original UTF-16 source-offset mapping, compact-key position mapping, and highlight-range generation/merging. It is injected at the exact former location in `script_004`.

Contract tests cover 16 cases against the extracted production helpers and production comparator. The UI orchestration in `buildSuggestions()` remains in `script_004`: DOM creation, input/IME guards, matching modes, bounded top-25 insertion, pointer/click listeners, and opening/closing state. Do not call the full suggestion feature modularized until those integration behaviors have their own tests.
