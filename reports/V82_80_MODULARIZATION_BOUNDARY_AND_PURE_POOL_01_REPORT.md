# V82.80 MODULARIZATION_BOUNDARY_AND_PURE_POOL_01

Date: 2026-10-18

## Baseline and release
- Immutable baseline: V82.65; preserved and unchanged.
- Previous product: V82.72, retained separately.
- New product: `dist/amq_learning_tool_v82_80.html`, 8,787,422 bytes, SHA-256 `f5b3eadf17300d8ad0ae53ebccc32f471b068743a7c746721401bfb7a0f0c8fe`.
- Current source modules: 8; script/data fragments: 41; CSS fragments: 50.

## 1. GitHub complete source publication
Status: **OPEN / NOT COMPLETE**.
The V82.79/V82.80 GitHub branch is an overlay and lacks the complete source tree, fragment manifest, template, all script/style fragments, and full test/build tooling. The available GitHub connector supports individual text-file/Git-object mutations but does not expose a direct upload operation for the local engineering ZIP as a repository archive. This report does not claim a full remote publication or fresh-checkout build. The local engineering package is complete and independently verified; remote coherent-source publication remains a release blocker.

## 2. getQuizPool pure calculation boundary
- Replaced the old source-only `getQuizPool()` body in `src/modules/get_quiz_pool.htmlpart` with `calculateQuizPoolCandidatesV8280(ctx)` plus a thin `getQuizPool()` adapter.
- The calculator has explicit inputs for song/anime data, settings, policy, status callbacks, blacklist lookup, tags, watchlist, focus mode, and repeat state. It returns `{pool, diagnostic}` and contains no DOM/window/storage references.
- The adapter collects current IIFE values, invokes the calculator, and writes the status text. It remains at the same classic-script insertion position; no runtime script tags/imports/exports were added.
- Added immutable old-source fixture `tests/fixtures/get_quiz_pool_v82_79.js` and `tests/unit/get_quiz_pool_differential.test.cjs`.
- Differential result: 20 scenarios / 40 assertions comparing candidate IDs and diagnostic text to V82.79; all passed. Existing candidate-pool integration: 27 tests passed. Source reconstruction contract: 23 assertions passed.

## 3. History/SRS and storage boundaries
- Generated `reports/STORAGE_ACCESS_BOUNDARY_V82_80.csv`: direct storage API strings appear in 23 of 41 script/data fragments, with literal key references where statically identifiable.
- Generated `reports/HISTORY_SRS_BOUNDARY_V82_80.csv`: 14 candidate fragments/functions/keys for review.
- No history/SRS storage code was moved. Real-origin localStorage/IndexedDB acceptance remains unavailable in the current environment, so the stated precondition for extraction is not met.

## 4. Custom playlist and AMQ/EMQ boundaries
- Generated `reports/AMQ_EMQ_SOURCE_BOUNDARY_V82_80.csv`: 23 script fragments contain AMQ/EMQ source, API or scope-setting references.
- Existing EMQ API, solo-list handoff, history isolation, and backup/restore contracts remain in the runner.
- No custom-list or multiplayer source metadata code was moved: song/work ID mapping, imports/exports, membership and service behavior remain coupled. A static inventory is not a replacement for a source-ID contract or real service acceptance.

## 5. CSS semantic mapping
- Generated `reports/CSS_SELECTOR_COMPONENT_MAP_V82_80.csv`: 2,355 selector records cover all 50 CSS fragments. The heuristic map marks 986 selectors as unmapped and labels all rows unreviewed.
- Added an 8-assertion contract that checks coverage and confirms CSS fragment SHA-256 values remain unchanged.
- No CSS was reordered, merged or removed. Visual screenshot baselines and browser regression remain prerequisites for changes to cascade order.

## Tests and verification
- Full runner: 24/24 commands passed, 0 failed.
- Integrity verifier: 116/116 checks passed.
- Differential candidate pool contract: 40 assertions across 20 scenarios passed.
- Candidate-pool integration: 27 checks passed.
- Boundary inventory contract: 8 assertions passed.
- Constrained Chromium quiz suggestion integration passed; this is not real-origin storage/audio/network/multiplayer acceptance.
- Deterministic builds were byte-identical: 8,787,422 bytes / SHA-256 `f5b3eadf17300d8ad0ae53ebccc32f471b068743a7c746721401bfb7a0f0c8fe`.
- CSS fragments were not modified. V82.65 baseline and V82.72 output remain preserved.

## Risks / unverified
- Real-origin localStorage/IndexedDB, audio/network, Firefox and multiplayer multi-client acceptance remain unverified.
- GitHub complete-source publication remains open.
- CSS mapping is heuristic; 986 selectors remain unmapped and no visual regression baseline was created in this environment.
- The pure calculator's callbacks are explicit inputs, but those callbacks still read app state. This is a testable pure function boundary, not a complete dependency-inversion redesign of the quiz lifecycle.

## Rollback
Restore `src/modules/get_quiz_pool.htmlpart` and `reports/FRAGMENT_MANIFEST.json` from the V82.79 package, use `tests/fixtures/get_quiz_pool_v82_79.js` to restore the prior function body at the module marker, restore the V82.79 `tools/build.py`, `tools/run_all_checks.py`, `tests/browser/quiz_suggestions_integration.py`, and renderer contract test, then rebuild the preserved V82.72 release. Do not modify `baseline/amq_learning_tool_v82_65_candidate_pool_cleanup.html`.
