# AMQ Learning Tool V82.82 product / V82.83 engineering checkpoint

## Current state
- Product: `V82.82`, standalone HTML `dist/amq_learning_tool_v82_82.html`, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Fix: define the EMQ invalid-selection storage key used by `script_040`; regression test confirms stale selection persists the fail-closed marker.
- Custom-list UI test: 19/19 assertions passed, 0 page errors, using production UI with isolated in-memory storage. This is not native-origin persistence acceptance.
- Responsive Chromium baseline: mobile, tablet, desktop; home and quiz; no horizontal overflow. Firefox remains unavailable.
- CSS review queue covers all 563 formerly unmapped selectors: 531 statically triaged, 32 explicitly unresolved. CSS has not been moved or reordered.
- Integrity verifier: 116/116 checks passed. Full runner result is in `reports/V82_82_VALIDATION_RESULTS.txt`.
- Native storage/backup rollback, full GitHub source sync/remote clean build, Firefox, real audio and two-client multiplayer gates remain open. V82.65 is immutable; V82.72 and V82.80 are preserved.

## Historical notes

# AMQ Learning Tool V82.69 engineering checkpoint

## Checkpoint
- Version: `V82.69 ARCHITECTURE-STORAGE-MULTIPLAYER-01`.
- Product baseline: immutable V82.65 standalone HTML, 8,786,930 bytes, SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.
- Runtime remains one standalone classic HTML file; generated output is byte-identical to baseline.
- Source modules are build-time includes: candidate policy, storage repository, quiz suggestion text helpers, anime/song DB initializer, and quiz suggestion renderer. All are inserted at their original classic-script positions.
- Added isolated storage repository (9 tests), full-backup validation (6 tests), and multiplayer session/reconnect (7 tests) contracts.
- Existing candidate/EMQ/history/answer tests retained.

## Build and checks
```bash
python tools/run_all_checks.py
python tools/semantic_inventory.py
python tests/browser/browser_ui_smoke_opaque_origin.py --html dist/amq_learning_tool_v82_69.html
python tools/package_checkpoint.py
```

## Latest acceptance boundary
Automated source/build tests pass. One constrained Chromium smoke run passed 19 assertions on byte-identical output; a later rerun ended with Playwright driver `EPIPE`. Direct `file://` navigation is blocked in this execution environment (`ERR_BLOCKED_BY_ADMINISTRATOR`), so real-origin localStorage reload, IndexedDB persistence/upgrade/restore/failure, actual audio/network, Firefox and multiplayer multi-client reconnect are not claimed as passed.


## Full modularization progress checklist
See `reports/MODULARIZATION_PROGRESS_CHECKLIST.md` for the readable checklist and `reports/MODULARIZATION_PROGRESS_CHECKLIST.csv` for the sortable 97-entry file inventory (41 script/data fragments, 50 CSS fragments, 6 extracted modules). Physical splitting is not the same as semantic modularization; substantial settings, candidate composition, playback, answer settlement, storage lifecycle, multiplayer, and CSS responsibilities remain coupled.

## Quiz suggestion UI integration checkpoint

`tests/browser/quiz_suggestions_integration.py` runs a Chromium contract against the production suggestion renderer, using deterministic fixtures for the candidate label source. It verifies the top-25 bound, ordering, IME guard, keyboard/click selection, caret placement and empty-query behavior. V82.70 fixes the click-selection ARIA mismatch. V82.71 adds an event ownership map and regression assertions for exactly-once input dispatch, closed-list/ARIA state, restored focus/caret, and no answer submission. Current targeted Chromium run: 22 assertions passed. See `reports/V82_71_SUGGESTION_EVENT_OWNERSHIP_AUDIT_01.md`. Handler consolidation remains deferred until a shared selection contract can be tested separately.

## Modularization dependency tools

- Run `node tools/ast_dependency_inventory.cjs` to regenerate the parser-backed first-pass source dependency inventory. The result is static evidence, not a complete runtime call graph.
- Run `node tests/unit/quiz_suggestion_helpers_contract.test.cjs` to test the extracted quiz suggestion normalization/offset/highlight helpers against production source.
- Run `python tools/run_all_checks.py` for all unit/contracts, AST inventory, deterministic standalone build and baseline-integrity checks.
- The current source modules are `candidate_pool_policy.js`, `storage_repository.htmlpart`, `quiz_suggestion_text.js`, `anime_song_database.htmlpart`, `quiz_suggestion_renderer.js`, and `quiz_suggestion_controller.js`. The standalone HTML remains the delivery format.


## Current validated HTML
- V82.70: `dist/amq_learning_tool_v82_70.html` (quiz suggestion ARIA fix).
- SHA-256: `59704427cb924f2fe9f5526417152b7d743ac29f5cb6dc70c886885e6ae7dca6`.
- V82.65 remains immutable; current release fingerprint is stored in `reports/FRAGMENT_MANIFEST.json`.


## Latest checkpoint: V82.72_SHARED_QUIZ_SUGGESTION_SELECTION_01
- Standalone HTML: `dist/amq_learning_tool_v82_72.html` (8,787,018 bytes; SHA-256 `fb075ed4e68eca454051ecd22cc10d3e7a5def193bf2852bf91547d5465da0d8`).
- Shared selection helper now serves click and keyboard selection; regression tests cover exactly-once input notification, mirror, list/ARIA, focus/caret, IME guard and no submission.
- Validation: 14/14 commands, 173 unit/contract assertions, 106 integrity checks, deterministic double build.
- See `reports/V82.72_SHARED_QUIZ_SUGGESTION_SELECTION_01_REPORT.md`; V82.65 remains immutable.


## V82.73 local-origin acceptance attempt
`tests/browser/real_origin_acceptance_localhost.py` tests native localStorage/IndexedDB and suggestion selection without shims. In this environment Chromium blocked localhost navigation with `ERR_BLOCKED_BY_ADMINISTRATOR`, so the test is retained but excluded from the mandatory runner until it can run in a permitted environment. See `reports/V82_73_LOCAL_ORIGIN_ACCEPTANCE_BLOCKED_01_REPORT.md`.


### V82.74 source-only checkpoint
The 4,975,240-byte anime/song `DB` initializer is now isolated in `src/modules/anime_song_database.htmlpart`. The builder inserts it at the exact former position, preserving classic-script execution and the original standalone HTML bytes. Run `node tests/unit/anime_song_database_extraction_contract.test.cjs` and `python tools/run_all_checks.py` to validate the extraction. The current product remains V82.72; this is not a new behavior release.


### V82.75 source-only checkpoint
`renderQuizSuggestionLabelV824()` and `buildSuggestions()` are in `src/modules/quiz_suggestion_renderer.js`; target/catalog/cache/shared-selection functions are in `src/modules/quiz_suggestion_controller.js`. Both are restored at their original positions. Full runner: 17/17 commands passed; 222 unit/contract assertions, 29 browser integration assertions and 112 integrity checks passed. The generated V82.72 product HTML remains byte-identical. Real-origin browser acceptance is still blocked by the environment.


### V82.76 dependency audit checkpoint

The V82.76 engineering-only checkpoint adds a TypeScript-parser-backed boundary audit for `script_004` plus CSV inventories of shared closure state and browser/API touchpoints. It does not alter runtime source or product behavior. The audit shows `getQuizPool()` is coupled to quiz settings, focus/repeat state, candidate policy and DOM values; add a production-source characterization contract before extracting that responsibility. V82.72 remains the standalone product output.


### V82.77 getQuizPool characterization checkpoint

V82.77 adds a nine-assertion production-source characterization contract for `getQuizPool()` and wires it into the full check runner. The existing candidate-pool integration harness supplies behavioral coverage. No production source or standalone product HTML changed; V82.72 remains the current product output. The next step is a dependency-aware extraction review, not a blind function move. See `reports/V82_77_GET_QUIZ_POOL_CHARACTERIZATION_01_REPORT.md`.


## V82.83 engineering-only update
- The product remains V82.82. The residual CSS queue's 32 entries are dispositioned (8 parser artifacts, 24 actual selectors); no CSS changed.
- Added a 4-assertion production-source backup export/import/rollback contract. This is in-memory unit acceptance only.
- Native-origin Storage, Firefox, complete GitHub source synchronization, clean remote build, real audio and two-client multiplayer remain open. See `reports/V82_83_CSS_SELECTOR_RESIDUAL_REVIEW_01_REPORT.md`.
