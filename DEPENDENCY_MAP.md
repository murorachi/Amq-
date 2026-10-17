# Dependency map: SOURCE-SPLIT-02 / CANDIDATE-POOL-TESTS-01

## Runtime composition
The single HTML remains the runtime composition root. Its 41 inline script/data blocks execute in original order; 50 CSS blocks retain their original cascade order. See reports/FRAGMENT_MAP.csv for order and hashes. Physical separation is complete; semantic decoupling is not.

## Candidate-pool path confirmed from source
1. script_004: loadQuizSettings reads aniQuizSettingsV14 and the V82.65 selection semantics marker.
2. script_004: window.__aniCandidatePoolPolicyV8265 provides source-mode, numeric normalization, metadata, familiarity, tags, watchlist, blacklist and repeat rules.
3. getQuizPool builds the AMQ base pool from songs, byAnime, st(), songTags, watchStatus(), animeWatch, quizSettings, activeFocusSongIdsV72, quizRoundSeen and lastQuestionId.
4. A later wrapper captures getQuizPool as __aniEmqGetQuizPoolBaseV8248, combines EMQ/Mixed candidates through __aniEmqAPI.combinePool, filters audio health via __aniAudioHealthV857.eligible, then applies __aniApplyQuizCustomListScopeV8265. Missing/throwing custom scope fails closed when scope is required.
5. nextQuiz consumes the final pool; playback and settlement are outside the current unit test boundary.

## High-risk coupling
- Candidate policy uses arguments, but pool builder reads global state and DOM directly.
- getQuizPool is intentionally reassigned by a wrapper; do not remove based on name similarity.
- Candidate selection depends on blacklist/history, custom lists, watchlist, EMQ mode, audio health and repeat state.
- aniQuizSettingsV14 is a shared compatibility contract.
- aniQuizCustomListScopeInvalidV8265 is a fail-closed marker; ignoring it can broaden the candidate pool.
- EMQ's compressed/base64 payload must remain separate from AMQ identifiers and source metadata.

## Static inventories
FUNCTION_DEFINITION_INVENTORY.csv, WINDOW_EXPORT_INVENTORY.csv, DOM_ID_REFERENCE_INVENTORY.csv, LIFECYCLE_STORAGE_INVENTORY.csv and SEMANTIC_INVENTORY_SUMMARY.md are regex-based navigation aids, not a complete AST/call graph. Duplicate names are not proof of redundant logic; occurrence counts do not prove timer/listener leaks.

## Unverified
Full function-call edges, all DOM writers, listener ownership, timer cleanup, dynamic storage keys, backup allowlists, and browser runtime behavior remain unverified.
