# V82.69 QUIZ-SUGGESTION-INTEGRATION-01 report

Date: 2026-10-18  
Engineering-only checkpoint. Product baseline and runtime output remain unchanged.

## Scope

Added a Chromium integration harness for the production `buildSuggestions()` renderer and the real input/event wiring. The test replaces only `targetOptions()`' large production-data enumeration with a deterministic fixture; the production helper module, `buildSuggestions()`, suggestion label renderer, event listeners and DOM remain from the generated production HTML. The harness uses in-memory storage, blocks network, and disables IndexedDB. It does not modify a real user profile or persistent data.

## Results

- Browser integration: **18 assertions passed**.
- Full runner: **14 commands passed, 0 failed**.
- Unit/contract suites: **173 assertions passed, 0 failed**.
- Integrity verifier: **105 passed, 0 failed**.
- Two independent builds match each other and the immutable V82.65 HTML byte-for-byte: 8,786,930 bytes, SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.

The browser test verifies bounded top-25 results, deterministic comparator order, non-empty rendering, list open/ARIA state, IME guard, input rebuild, ArrowDown focus, Enter selection, pointerdown blur prevention, click selection, caret placement and empty-query behavior.

## Known issue discovered

The click-selection path clears the list and removes its `open` class, but leaves `#quizAnswer[aria-expanded="true"]`. Event tracing shows the older capture-phase click handler in `src/scripts/script_007.htmlpart` clears the list, dispatches a synthetic `input` event (which calls `buildSuggestions()` and updates `aria-expanded`), then clears the list a second time without resetting `aria-expanded`. This conflicts with the newer selection handler in `script_004` and the keyboard handler in `script_008`.

This test stage does **not** modify product behavior to hide the conflict. The controller should not be extracted yet: event ownership must first be consolidated or explicitly contracted across `script_004`, `script_007`, and `script_008`. The next minimal fix should ensure the click path ends with an empty closed list and `aria-expanded="false"`, then rerun this integration test and all checks.

## Limits

- Fixture-backed `targetOptions()` means this test does not measure the cost or correctness of scanning the full 38,821-song database.
- This is Chromium `about:blank` with in-memory storage. Real-origin persistence, IndexedDB, audio/network, Firefox, multiplayer and full answer submission were not tested.
- GitHub source publication remains incomplete; no claim of a reproducible remote source release is made.

## Rollback

This stage adds a test and engineering documentation only. Revert `tests/browser/quiz_suggestions_integration.py`, its `tools/run_all_checks.py` entry, the stage report and the associated status/checksum docs to roll back. The generated product HTML is unchanged and remains reproducible from the locked V82.65 baseline.
