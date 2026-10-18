# Modularization remaining-work audit — V82.79

Date: 2026-10-18  
Purpose: evidence-based status inventory for the AMQ modularization project. This is an engineering audit, not a claim of completion.

## Executive summary

- Product output remains **V82.72_SHARED_QUIZ_SUGGESTION_SELECTION_01**: 8,787,018 bytes, SHA-256 `fb075ed4e68eca454051ecd22cc10d3e7a5def193bf2852bf91547d5465da0d8`.
- Immutable baseline remains **V82.65**; baseline artifacts must not be overwritten.
- Physical source layout: **41 script/data fragments** and **50 CSS fragments**.
- Source-module insertion markers currently target **3 of 41 script/data fragments**; **38 fragments have no extracted module insertion point**. Some are data payloads or compatibility patches and do not automatically need extraction.
- Extracted source modules: **8**, total 5,004,380 bytes; these remain inserted at their original locations by the deterministic builder.
- Parser-inventoried function definitions remaining in the 41 script/data fragments: **792**; function definitions inventoried in extracted modules: **25**; total inventory: **817**. This is a static count, not a count of independent business modules.
- **Fully decoupled modules with complete end-to-end acceptance: 0 confirmed by current evidence.** Module count cannot be converted to a defensible percentage because module size, coupling and risk vary widely.
- Script fragment bytes currently remaining in `src/scripts`: 3,541,858; style fragment bytes: 220,897. These totals include large embedded data payloads and therefore are not a meaningful measure of unfinished business logic.

## What is complete

| Area | Evidence-backed status |
|---|---|
| Single-file build | Manifest-driven deterministic builder reinserts source fragments and modules without runtime imports; product fingerprint is checked by `tools/verify.py`. |
| Physical source split | 41 script/data fragments and 50 style fragments are tracked in the manifest with byte length and SHA-256. |
| Candidate policy | `candidate_pool_policy.js` has direct policy tests and candidate-pool integration tests. |
| Storage repository | Source module and synthetic storage/backup contracts exist; real-origin persistence and IndexedDB browser acceptance remain open. |
| Quiz suggestion | Text policy, renderer, controller and shared selection contracts exist; constrained Chromium integration exercises UI behavior with fixture-backed catalog data. |
| Candidate pool assembly | `get_quiz_pool.htmlpart` is exact-source extracted and source-order/filter behavior is characterized; it still reads IIFE state and writes DOM diagnostics. |
| Answer metadata helpers | `quiz_answer_metadata.htmlpart` is exact-source extracted; 14 direct assertions and byte-exact restoration checks were added in V82.79. |

## Extracted module inventory

| Module | Source file | Insertion fragment | Bytes | Scope |
|---|---|---|---:|---|
| `candidate_pool_policy` | `src/modules/candidate_pool_policy.js` | `src/scripts/script_004.htmlpart` | 7,851 | pure candidate selection policy; inserted into script_004 at its original execution position |
| `storage_repository` | `src/modules/storage_repository.htmlpart` | `src/scripts/script_027.htmlpart` | 8,694 |  |
| `quiz_suggestion_text` | `src/modules/quiz_suggestion_text.js` | `src/scripts/script_004.htmlpart` | 2,693 | pure quiz suggestion normalization, source-offset mapping and highlight range policy; inserted at original position inside the application IIFE |
| `anime_song_database` | `src/modules/anime_song_database.htmlpart` | `src/scripts/script_001.htmlpart` | 4,975,240 | exact DB initializer for 9,516 anime rows and 38,821 song rows; classic-script let binding retained |
| `quiz_suggestion_renderer` | `src/modules/quiz_suggestion_renderer.js` | `src/scripts/script_004.htmlpart` | 3,338 | production quiz suggestion DOM renderer and bounded top-25 matching/order loop; source-only extraction at the exact original position |
| `quiz_suggestion_controller` | `src/modules/quiz_suggestion_controller.js` | `src/scripts/script_004.htmlpart` | 2,790 | quiz target selection, suggestion catalog/cache, list close state and shared click/keyboard selection contract |
| `get_quiz_pool` | `src/modules/get_quiz_pool.htmlpart` | `src/scripts/script_004.htmlpart` | 2,824 | exact-source extraction of getQuizPool() candidate selection orchestration; preserves the original classic-script IIFE scope and insertion order |
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
| `script_040.htmlpart` | 32,856 | 45 | 0 | inline-script-or-data-payload |
| `script_036.htmlpart` | 21,078 | 31 | 0 | inline-script-or-data-payload |
| `script_038.htmlpart` | 15,277 | 31 | 0 | inline-script-or-data-payload |
| `script_031.htmlpart` | 13,812 | 24 | 0 | inline-script-or-data-payload |
| `script_016.htmlpart` | 10,541 | 12 | 0 | inline-script-or-data-payload |

Machine-readable full list: `reports/MODULARIZATION_REMAINING_SCRIPT_INVENTORY_V82_79.csv`.

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
| P0 | Core `script_004` | Build a call-site and shared-state map for `getQuizPool`, settings, playback, answer submission and answer lifecycle. Extract pure calculations only behind explicit inputs/outputs and differential tests. Keep DOM messages and audio/timer effects in a thin adapter. |
| P0 | Reproducible publication | Publish a coherent full source tree, manifest, tests, tools and reports to GitHub; read back exact paths and verify hashes. Current overlay-only branch is not a complete source release. |
| P1 | Storage / user data | Identify remaining direct storage access outside the repository; test real-origin localStorage, IndexedDB Blob round-trip, migration, quota/error and rollback behavior. |
| P1 | SRS and history | Map state ownership and storage calls in `script_020`, `script_023`, `script_001`; add behavioral contracts before moving functions. |
| P1 | Custom playlists / AMQ-EMQ | Map source-specific IDs, imports, exports, playlist membership and metadata boundaries in `script_025`, `script_031`, `script_038`, `script_040`. |
| P1 | Multiplayer | Separate UI, session protocol and server contracts only with real service plus two-client acceptance; mock tests do not count as end-to-end proof. |
| P2 | Remaining script patches | Group late compatibility fragments by the behavior they override; do not merge/delete duplicate-looking patches without proof of precedence and regression tests. |
| P2 | CSS semantics | Create selector-to-view/component inventory and screenshot baselines; keep cascade order unchanged until visual regression is available. |
| P2 | Browser coverage | Real-origin persistence, audio/network, Firefox and multiplayer multi-client remain unverified; record blocked tests separately from passed tests. |

## Current limitations

- The AST inventory is parser-backed but does not resolve every lexical binding, reflective property access, indirect call, dynamic selector, or cross-fragment runtime interaction.
- The 50 CSS fragments have not been proven to map cleanly to independent components. Repeated selectors and later override layers may be intentional.
- Source-only extraction and byte-identical HTML prove the output bytes are unchanged; they do not prove that future semantic refactors are behaviorally correct.
- Full GitHub source-tree publication and remote archive/hash verification are not yet complete.

## Recommended order

1. Finish V82.79 tests, deterministic rebuild and package integrity.
2. Close coherent GitHub publication, including remote readback.
3. Add a dependency/side-effect adapter contract for candidate pool assembly before changing its logic.
4. Work next on a well-bounded pure helper from SRS/history or playlist code, selected by AST dependency evidence.
5. Defer CSS reordering and high-risk multiplayer/audio/IndexedDB rewrites until their test environments exist.

## Reproducibility

Generated by `tools/modularization_progress_audit.py` from `reports/FRAGMENT_MANIFEST.json` and `reports/AST_FUNCTION_DEFINITIONS.csv`. Re-run after the parser-backed inventory step to refresh the report and CSVs.
