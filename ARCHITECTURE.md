# Architecture: V82.69 ARCHITECTURE-STORAGE-MULTIPLAYER-01

## Runtime composition
The deliverable remains a single classic standalone HTML file. CSS and scripts retain their exact original order. Source modules are build-time includes only; no runtime ESM, extra script request, dynamic import, or asynchronous loading is introduced. Current source tree has six extracted modules, while broader semantic separation is still in progress.

## Build data flow
`src/template.html.in` + ordered CSS/script fragments + `src/modules/*` injected at explicit markers -> `tools/build.py` -> the versioned standalone HTML (current product: `dist/amq_learning_tool_v82_72.html`). The builder validates every template/fragment/module length and SHA-256, checks marker uniqueness and absence of unresolved markers, validates final byte length/hash, and atomically replaces only the versioned output. `tools/verify.py` makes two independent builds and compares both against the immutable V82.65 HTML fingerprint.

## Extracted modules
- `candidate_pool_policy.js`: pure policy decisions for source mode, metadata, familiarity, tags, watchlist, blacklist and repeats.
- `storage_repository.js`: exact original V82.30 storage repository script block, moved out of `script_027.htmlpart` and injected at the same document position. It exposes user namespaces, adapter registration, transactional writes/rollback, snapshots and allowlisted legacy import. No storage schema migration or product behavior change is included in this extraction.

## Business flow and adapters
- Candidate pool: original `getQuizPool()` in `script_004`, followed by EMQ/Mixed combination, audio eligibility and custom-list scope adapters. This ordering is covered by exact-source tests.
- Multiplayer: `script_028` owns active session in `sessionStorage`, reconnect capability index in `localStorage`, HTTP polling, and optional team WebSocket drafts. The WebSocket is supplemental; HTTP polling remains fallback. Session/reconnect contract tests use synthetic storage and never contact a room server.
- User backup/restore: `script_023` validates allowlisted localStorage snapshots and performs rollback on write failure; scene image backups use IndexedDB through `script_036`. Actual browser IndexedDB persistence remains an environment-gated acceptance item.

## Test boundaries
Node tests exercise exact source with synthetic data/storage. Chromium smoke tests navigation and answer flow under an opaque origin with in-memory storage and blocked network. Neither substitutes for standalone file-origin persistence, IndexedDB round-trip/upgrade/failure, real audio/network, Firefox, or multi-client room reconnect.

## Parser-backed dependency inventory — AST-PASS-01
The first TypeScript-parser pass is available in `reports/AST_DEPENDENCY_MAP.md`. It scans all 41 script/data fragments, parses 39 executable JS fragments without syntax diagnostics, and explicitly classifies the AniList JSON and compressed EMQ payload as data blocks. It confirms `script_001` mixes a large DB initializer with runtime state/history code, and `script_004` remains a large IIFE with settings, candidate selection, suggestions, playback and answer settlement. This pass is evidence for planning, not proof of complete module boundaries. No production code was moved.

## QUIZ-SUGGESTION-TEXT-01
`src/modules/quiz_suggestion_text.js` isolates the pure normalization/source-offset/highlight helper layer formerly embedded in `script_004`. The builder inserts its exact bytes at the original location within the application IIFE; there is no added runtime script tag. The production-source contract suite has 16 assertions. `buildSuggestions()` and `renderQuizSuggestionLabelV824()` have since been extracted to `src/modules/quiz_suggestion_renderer.js` at the original source position. Its contract checks byte-identical reconstruction, bounded ordering, click delegation and ARIA update. Selection ownership and the surrounding quiz lifecycle remain in `script_004`/`script_007`/`script_008` and are not claimed fully modularized.


## DB initializer boundary (V82.74)
`src/modules/anime_song_database.htmlpart` contains only the exact original `let DB={...};` initializer from `script_001`. It is restored at the same source position before `let anime=DB.anime,songs=DB.songs...`; the rest of `script_001` retains its original order and responsibilities. This is a byte-preserving source-boundary extraction, not a schema or runtime API change. The contract test reconstructs the former full fragment and checks its SHA-256, all row lengths, row counts, and consumer ordering.


## Quiz suggestion renderer boundary (V82.75)
`src/modules/quiz_suggestion_renderer.js` contains the exact 3,338 source bytes formerly defining `renderQuizSuggestionLabelV824()` and `buildSuggestions()` in `script_004`. The marker is replaced during build at the original position within the same classic script. No event handler or comparator behavior was changed. `tests/unit/quiz_suggestion_renderer_extraction_contract.test.cjs` reconstructs the original 104,875-byte `script_004` fragment and verifies its captured SHA-256. The helper contract was updated to locate the production comparator in the renderer module.


## Quiz suggestion controller boundary (V82.75)
`src/modules/quiz_suggestion_controller.js` contains the exact contiguous source block for answer-target resolution, the Chinese suggestion toggle state, AMQ/EMQ target catalog construction, option cache invalidation, suggestion-list closure and the shared selection contract. It is injected immediately before the text-helper marker, preserving the original initialization and classic-script scope. The contract reconstructs the pre-extraction `script_004` fingerprint and checks the IME guard, exactly-one bubbling `input` dispatch, and legacy selection bridge. Keyboard event registration and answer submission remain in `script_004`; this is not a claim that the whole quiz controller is modularized.


## Core script_004 boundary audit (V82.76)

`tools/script004_boundary_audit.cjs` and `reports/CORE_SCRIPT_004_BOUNDARY_AUDIT.md` provide a parser-backed, static dependency inventory for the main quiz IIFE. CSV companions list closure-state reference candidates and recognized browser/API call sites. The audit shows high coupling among `quizSong`, `quizSettings`, `quizFinished`, `quizActive`, audio-start timing, candidate selection, answer settlement, event handlers and playback timers. This is evidence for selecting the next extraction boundary, not a complete lexical resolver. No production source was moved in V82.76. The next step is a production-source characterization contract for `getQuizPool()` before any candidate pipeline extraction.


## getQuizPool characterization (V82.77)

`tests/unit/get_quiz_pool_characterization_contract.test.cjs` locks the production function's filter ordering and fail-closed boundaries before extraction. `tests/unit/candidate_pool_integration.test.cjs` remains the behavioral fixture. This is test/documentation-only: no production fragment was moved and V82.72 output remains unchanged. The next extraction decision must account for closure state, DOM status reporting, focus/repeat state and policy adapters.


## V82.80 getQuizPool dependency boundary
`calculateQuizPoolCandidatesV8280(ctx)` performs candidate filtering without DOM/window/storage access; dependencies are explicit in the context object (song/anime rows, settings, policy functions, familiarity/watch status callbacks, tags, watchlist, focus/repeat state and blacklist lookup). It returns `{pool, diagnostic}`. `getQuizPool()` remains the IIFE adapter: read the quick-pool control, provide current state, and write `quizStatus` only when a diagnostic exists. `tests/unit/get_quiz_pool_differential.test.cjs` compares 20 scenarios to `tests/fixtures/get_quiz_pool_v82_79.js`. This improves testability but does not make the whole quiz flow independent; playback, answer submission, external source policy and lifecycle still share app state.
