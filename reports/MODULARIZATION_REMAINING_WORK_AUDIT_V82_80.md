# Modularization remaining-work audit — V82.80

Date: 2026-10-18  
Purpose: evidence-based status inventory for the AMQ modularization project. This is an engineering audit, not a claim of completion.

## Executive summary

- Product output remains **V82.82**: 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Immutable baseline remains **V82.65**; baseline artifacts must not be overwritten.
- Physical source layout: **41 script/data fragments** and **50 CSS fragments**.
- Source-module insertion markers currently target **3 of 41 script/data fragments**; **38 fragments have no extracted module insertion point**. Some are data payloads or compatibility patches and do not automatically need extraction.
- Extracted source modules: **8**, total 5,004,784 bytes; these remain inserted at their original locations by the deterministic builder.
- Parser-inventoried function definitions remaining in the 41 script/data fragments: **792**; function definitions inventoried in extracted modules: **26**; total inventory: **818**. This is a static count, not a count of independent business modules.
- **Fully decoupled modules with complete end-to-end acceptance: 0 confirmed by current evidence.** Module count cannot be converted to a defensible percentage because module size, coupling and risk vary widely.
- Script fragment bytes currently remaining in `src/scripts`: 3,541,926; style fragment bytes: 220,897. These totals include large embedded data payloads and therefore are not a meaningful measure of unfinished business logic.

## What is complete

| Area | Evidence-backed status |
|---|---|
| Single-file build | Manifest-driven deterministic builder reinserts source fragments and modules without runtime imports; product fingerprint is checked by `tools/verify.py`. |
| Physical source split | 41 script/data fragments and 50 style fragments are tracked in the manifest with byte length and SHA-256. |
| Candidate policy | `candidate_pool_policy.js` has direct policy tests and candidate-pool integration tests. |
| Storage repository | Source module and synthetic storage/backup contracts exist; real-origin persistence and IndexedDB browser acceptance remain open. |
| Quiz suggestion | Text policy, renderer, controller and shared selection contracts exist; constrained Chromium integration exercises UI behavior with fixture-backed catalog data. |
| Candidate pool assembly | `calculateQuizPoolCandidatesV8280(ctx)` is a side-effect-free candidate calculation with explicit dependencies; `getQuizPool()` is a thin DOM diagnostic adapter. Twenty differential scenarios (40 assertions) match V82.79 behavior. |
| Answer metadata helpers | `quiz_answer_metadata.htmlpart` was exact-source extracted in V82.79; its 14 direct assertions and layered restoration checks remain passing. |

## Extracted module inventory

| Module | Source file | Insertion fragment | Bytes | Scope |
|---|---|---|---:|---|
| `candidate_pool_policy` | `src/modules/candidate_pool_policy.js` | `src/scripts/script_004.htmlpart` | 7,851 | pure candidate selection policy; inserted into script_004 at its original execution position |
| `storage_repository` | `src/modules/storage_repository.htmlpart` | `src/scripts/script_027.htmlpart` | 8,694 |  |
| `quiz_suggestion_text` | `src/modules/quiz_suggestion_text.js` | `src/scripts/script_004.htmlpart` | 2,693 | pure quiz suggestion normalization, source-offset mapping and highlight range policy; inserted at original position inside the application IIFE |
| `anime_song_database` | `src/modules/anime_song_database.htmlpart` | `src/scripts/script_001.htmlpart` | 4,975,240 | exact DB initializer for 9,516 anime rows and 38,821 song rows; classic-script let binding retained |
| `quiz_suggestion_renderer` | `src/modules/quiz_suggestion_renderer.js` | `src/scripts/script_004.htmlpart` | 3,338 | production quiz suggestion DOM renderer and bounded top-25 matching/order loop; source-only extraction at the exact original position |
| `quiz_suggestion_controller` | `src/modules/quiz_suggestion_controller.js` | `src/scripts/script_004.htmlpart` | 2,790 | quiz target selection, suggestion catalog/cache, list close state and shared click/keyboard selection contract |
| `get_quiz_pool` | `src/modules/get_quiz_pool.htmlpart` | `src/scripts/script_004.htmlpart` | 3,228 | pure candidate-pool calculation with explicit dependency context plus a thin DOM diagnostic adapter |
| `quiz_answer_metadata` | `src/modules/quiz_answer_metadata.htmlpart` | `src/scripts/script_004.htmlpart` | 950 | exact-source extraction of answer metadata helpers for alias deduplication, anime/work name bundles and song role labels |

## Largest remaining script/data fragments

This ranking is by raw fragment bytes, not risk or unfinished logic. Data payloads are intentionally identified rather than treated as ordinary executable modules.

| Fragment | Bytes | AST function definitions | Extracted modules targeting fragment | Manifest role |
|---|---:|---:|---:|---|
| `script_037.htmlpart` | 2,684,318 | 0 | 0 | inline-script-or-data-payload |
| `script_028.htmlpart` | 140,145 | 139 | 0 | inline-script-or-data-payload |
| `script_030.htmlpart` | 125,793 | 0 | 0 | inline-script-or-data-payload |
| `script_001.htmlpart` | 102,981 | 102 | 1 | inline-script-or-data-payload |
| `script_004.htmlpart` | 95,160 | 53 | 6 | inline-script-or-data-payload |
| `script_025.htmlpart` | 53,780 | 60 | 0 | inline-script-or-data-payload |
| `script_023.htmlpart` | 44,496 | 52 | 0 | inline-script-or-data-payload |
| `script_020.htmlpart` | 39,032 | 62 | 0 | inline-script-or-data-payload |
| `script_026.htmlpart` | 33,347 | 38 | 0 | inline-script-or-data-payload |
| `script_039.htmlpart` | 33,287 | 42 | 0 | inline-script-or-data-payload |
| `script_040.htmlpart` | 32,924 | 45 | 0 | inline-script-or-data-payload |
| `script_036.htmlpart` | 21,078 | 31 | 0 | inline-script-or-data-payload |
| `script_038.htmlpart` | 15,277 | 31 | 0 | inline-script-or-data-payload |
| `script_031.htmlpart` | 13,812 | 24 | 0 | inline-script-or-data-payload |
| `script_016.htmlpart` | 10,541 | 12 | 0 | inline-script-or-data-payload |

Machine-readable full list: `reports/MODULARIZATION_REMAINING_SCRIPT_INVENTORY_V82_80.csv`.

## Largest parser-inventoried function bodies

These are useful review starting points, not automatic extraction candidates. Large functions may depend on shared state, DOM, audio, timers, storage, or initialization order.

| Function | Fragment | Line | Body bytes |
|---|---|---:|---:|
| `renderState` | `script_028.htmlpart` | 257 | 14,856 |
| `setupHome` | `script_026.htmlpart` | 113 | 10,366 |
| `renderPracticeHub` | `script_025.htmlpart` | 216 | 9,142 |
| `candidateSongIds` | `script_028.htmlpart` | 120 | 7,482 |
| `renderCustomLists` | `script_025.htmlpart` | 129 | 6,737 |
| `openQuizFloatingDetailV8239` | `script_004.htmlpart` | 349 | 5,799 |
| `openManageModal` | `script_025.htmlpart` | 147 | 5,550 |
| `render` | `script_001.htmlpart` | 322 | 5,454 |
| `reviewCandidates` | `script_023.htmlpart` | 121 | 5,449 |
| `currentRoomSettingsMarkup` | `script_028.htmlpart` | 219 | 5,410 |
| `fullRestore` | `script_023.htmlpart` | 221 | 5,271 |
| `statsForHistory` | `script_023.htmlpart` | 90 | 5,214 |
| `renderLearningInsights` | `script_023.htmlpart` | 176 | 5,176 |
| `installModal` | `script_036.htmlpart` | 41 | 4,362 |
| `loadData` | `script_038.htmlpart` | 98 | 3,977 |
| `init` | `script_039.htmlpart` | 87 | 3,939 |
| `renderHistory` | `script_015.htmlpart` | 13 | 3,884 |
| `getWeakIds` | `script_025.htmlpart` | 191 | 3,846 |
| `showQuizRevealInfoV30` | `script_004.htmlpart` | 385 | 3,829 |
| `appendViews` | `script_039.htmlpart` | 17 | 3,769 |

## Remaining work, grouped by engineering risk

| Priority | Work area | Remaining work and completion evidence |
|---|---|---|
| P0 | Core `script_004` | Pure candidate calculation and DOM diagnostic adapter are now separated and differential-tested. Remaining work is a full call-site/shared-state map for settings, playback, answer submission and answer lifecycle. |
| P0 | Reproducible publication | Publish a coherent full source tree, manifest, tests, tools and reports to GitHub; read back exact paths and verify hashes. Current overlay-only branch is not a complete source release. |
| P1 | Storage / user data | Static direct-storage/key inventory is complete. Real-origin localStorage, IndexedDB Blob round-trip, migration, quota/error and rollback browser acceptance remains blocked/unverified. |
| P1 | SRS and history | Static candidate-function/key inventory is complete; state ownership, data migration and real-origin persistence contracts remain before extraction. |
| P1 | Custom playlists / AMQ-EMQ | Static API/source-mode boundary inventory is complete. Source-specific song IDs, import/export and membership contracts remain before extraction. |
| P1 | Multiplayer | Separate UI, session protocol and server contracts only with real service plus two-client acceptance; mock tests do not count as end-to-end proof. |
| P2 | Remaining script patches | Group late compatibility fragments by the behavior they override; do not merge/delete duplicate-looking patches without proof of precedence and regression tests. |
| P2 | CSS semantics | Heuristic selector-to-view/component map is generated for review; visual baselines and browser screenshot regression remain before any CSS movement. |
| P2 | Browser coverage | Real-origin persistence, audio/network, Firefox and multiplayer multi-client remain unverified; record blocked tests separately from passed tests. |

## Current limitations

- The AST inventory is parser-backed but does not resolve every lexical binding, reflective property access, indirect call, dynamic selector, or cross-fragment runtime interaction.
- The 50 CSS fragments have not been proven to map cleanly to independent components. Repeated selectors and later override layers may be intentional.
- The V82.80 getQuizPool semantic refactor changes the output bytes; 20 differential scenarios match the V82.79 function's candidate IDs and diagnostic text. This is strong unit evidence, not a substitute for real browser acceptance.
- Full GitHub source-tree publication and remote archive/hash verification are not yet complete.

## Recommended order

1. Close coherent GitHub publication: current remote branch still lacks the complete source tree and manifest.
2. Run real-origin localStorage/IndexedDB acceptance in a permitted browser environment before changing history/SRS storage code.
3. Add source-ID/metadata contracts for custom playlists and AMQ/EMQ membership before extracting list functions.
4. Build screenshot baselines for the generated CSS selector map; do not reorder CSS without visual regression.
5. Only then split further answer/playback/multiplayer boundaries behind explicit contracts.

## Reproducibility

Generated by `tools/modularization_progress_audit.py` from `reports/FRAGMENT_MANIFEST.json` and `reports/AST_FUNCTION_DEFINITIONS.csv`. Re-run after the parser-backed inventory step to refresh the report and CSVs.
