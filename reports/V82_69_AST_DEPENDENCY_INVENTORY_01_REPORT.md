# V82.69 AST Dependency Inventory 01 — Engineering Report

## Scope
Create a reproducible parser-backed first-pass dependency inventory for all existing script/data fragments, focus on `script_001` and `script_004`, update the modularization checklist, and preserve the immutable V82.65 standalone HTML.

## Changes
- Added `tools/ast_dependency_inventory.cjs` using the installed TypeScript JavaScript parser.
- Integrated the inventory into `tools/run_all_checks.py`.
- Added `reports/AST_DEPENDENCY_MAP.md` and CSV inventories for parse status, function definitions, direct identifier calls, declared-symbol references, API touchpoints, and parse diagnostics.
- Updated the checklist's `script_001` and `script_004` status based on parser evidence and refreshed the CSV's byte sizes and SHA-256 fingerprints from actual local files.
- Updated `CURRENT_STATUS.md`, `BASELINE.md`, `NEXT_TASK.md`, `ARCHITECTURE.md`, and `DEPENDENCY_MAP.md`.
- No production source fragment, extracted module, build manifest, or standalone HTML was changed.

## Findings
- 41 script/data fragments scanned; 39 executable JavaScript fragments parsed without syntax diagnostics; 2 data-only blocks (`script_030` AniList JSON map and `script_037` compressed EMQ payload) excluded from JavaScript parsing.
- 809 named function/function-valued definitions and 2,126 direct identifier-call edge records were recorded across fragments. This is a conservative static inventory, not a complete lexical/runtime call graph.
- `script_001.htmlpart` is 5,078,176 bytes. Its `DB` initializer is 4,975,240 bytes and contains 9,516 anime rows and 38,821 song rows. The remaining 102,936 bytes contain runtime code, including status/history logic. The entire file must not be treated as a pure data asset.
- `script_004.htmlpart` is 107,042 bytes and contains 70 named function/function-valued definitions inside an application IIFE. First-pass direct identifier-call analysis found 12 unique cross-fragment matches, 9 ambiguous-name call sites and 54 unresolved/external/global call sites.

## Tests
- `python tools/run_all_checks.py`: 12 commands passed, 0 failed.
- Nine unit/contract suites: 157 assertions passed, 0 failed.
- `tools/verify.py`: 103 passed, 0 failed; two independent builds were byte-identical to each other and the immutable V82.65 baseline.
- AST parser: 39 executable JS fragments with zero parser diagnostics; two data blocks intentionally skipped as non-JavaScript.
- Browser UI smoke was not rerun in this stage because no product source/runtime code changed. Prior browser limitations remain unchanged.

## Risks and limitations
- Name resolution is fragment-level and can report ambiguous names that are unrelated due to lexical scope.
- Direct identifier calls do not capture all property calls, callbacks, dynamic calls, event dispatch, DOM effects or global state dependencies.
- Listener/timer/storage inventories do not prove ownership or cleanup behavior.
- No runtime behavior or actual user data was changed.

## Rollback
This is an engineering-tools/reports-only change. Revert the added AST tool/reports and documentation edits to return to the previous V82.69 engineering checkpoint. The product baseline and output remain unchanged.

## Next task
Add a production-source contract test for the quiz-answer normalization/suggestion helper cluster in `script_004`; then evaluate byte-preserving extraction of only the `DB` initializer from `script_001`. Neither should be moved until contracts and consumer order are verified.
