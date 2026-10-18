# V82.69 QUIZ-SUGGESTION-TEXT-01 — Engineering Report

## Scope
Extract one bounded, pure helper responsibility from the core quiz script after the parser-backed dependency pass, while preserving the immutable V82.65 standalone HTML output byte-for-byte.

## Actual changes
- Moved the existing special-symbol policy, quiz suggestion text normalization, normalized-to-original source-offset mapping, and highlight-range helper block from `src/scripts/script_004.htmlpart` into `src/modules/quiz_suggestion_text.js`.
- Replaced the original code span with `<!-- AMQ_SPLIT_MODULE:quiz_suggestion_text -->` at the same location inside the existing application IIFE. The build injects the exact helper bytes there; no runtime script tag or external loading was added.
- Updated `reports/FRAGMENT_MANIFEST.json` with the exact module length/SHA-256 and the new script_004 fragment fingerprint.
- Added `tests/unit/quiz_suggestion_helpers_contract.test.cjs`, testing production source extracted from the new module plus the production suggestion comparator.
- Updated the full modularization checklist to 94 entries: 41 script/data fragments + 50 CSS fragments + 3 extracted modules.

## Tests and assertions
- Quiz suggestion helper contract: **16 passed, 0 failed**. Cases cover NFKC/full-width lowercase, ligature expansion, configured symbol separators, nullish input, raw/search keys, UTF-16 offsets for expansions and astral Unicode, compact positions, code-point title length, raw/compact highlight mapping, separator omission, range merging and deterministic comparator order.
- Full runner: **13 commands passed, 0 failed**.
- Unit/contract suites: **173 assertions passed, 0 failed**.
- Integrity verifier: **105 passed, 0 failed**. Two independent builds match the immutable V82.65 baseline byte-for-byte.
- Standalone HTML: 8,786,930 bytes; SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.

## Not covered
- Full `buildSuggestions()` DOM rendering and click/pointer event behavior, IME behavior, input selection/caret behavior, and top-25 list integration have not been end-to-end tested by this helper contract.
- Real-origin persistence, IndexedDB, live audio/network, Firefox and multiplayer multi-client behavior remain untested.
- Full semantic modularization is not complete; `script_004` still contains settings, candidate selection, suggestion UI, playback, answer settlement and timers.

## Rollback
Restore `src/scripts/script_004.htmlpart` from the V82.69 AST-PASS-01 source checkpoint, remove `src/modules/quiz_suggestion_text.js`, restore `reports/FRAGMENT_MANIFEST.json` to the prior module count/fragment hash, remove the helper contract test from `tools/run_all_checks.py`, and rebuild/verify. The immutable V82.65 baseline is untouched.

## Next task
Add integration contract coverage for `buildSuggestions()` DOM output, bounded top-25 selection, event wiring, IME and empty-query guards. In parallel, create a byte-preserving test for extracting only the DB initializer from `script_001` without moving its remaining runtime code.

## Transient development failures (resolved)
- The first helper-test run failed before any assertions because the harness counted helper-name references as multiple policy declarations. The harness was corrected to identify the exact Set declaration.
- The next run exposed one incorrect expected `compactPositions` fixture index for the space in `Koi no Hime`; the fixture was corrected after checking the production offset mapping. The final contract suite passes 16/16.
- The first integrity run after extraction failed because `FRAGMENT_MANIFEST.json` still held the pre-extraction `script_004` fingerprint. The manifest was updated to the actual marker-bearing fragment fingerprint; the final integrity run passes 105/105.
- No product behavior change was made to address these harness/manifest issues. The standalone output is still byte-identical to V82.65.
