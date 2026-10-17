# V82.71 Suggestion Event Ownership Audit 01

Date: 2026-10-18  
Scope: event registration/ownership map and production-source regression coverage for quiz suggestion selection. This is an engineering-only checkpoint; no production HTML/source fragment changed.

## Immutable product/build identities

- Locked baseline: `baseline/amq_learning_tool_v82_65_candidate_pool_cleanup.html`
- Baseline: 8,786,930 bytes, SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`
- Current product output retained: `dist/amq_learning_tool_v82_70.html`
- V82.70 output: 8,786,974 bytes, SHA-256 `59704427cb924f2fe9f5526417152b7d743ac29f5cb6dc70c886885e6ae7dca6`

## Registration order and ownership

The manifest assembles these fragments in this order:

| Manifest order | Fragment | Relevant registration / responsibility |
|---:|---|---|
| 9 | `src/scripts/script_004.htmlpart` | Core quiz owns `#quizAnswer`'s `input` listener (`buildSuggestions`), IME composition guards, input-level keyboard handling (including arrow navigation), the `closeQuizSuggestions()` helper, and a document bubble-phase click listener that closes suggestions when clicking outside `.quizSuggest`. The answer submission button is wired to `submitQuiz` here. |
| 17 | `src/scripts/script_007.htmlpart` | Legacy `#quizSuggestions` capture-phase `click` listener. It selects a `.quizSuggestion`, prevents the event, writes the input value, clears the list, dispatches one synthetic bubbling `input` event, clears the list again to undo the synchronous `buildSuggestions()` rebuild, synchronizes `aria-expanded=false`, restores input focus and moves the caret to the end. This listener is the source of the historical ARIA mismatch if the final ARIA reset is omitted. |
| 19 | `src/scripts/script_008.htmlpart` | Adds an `input` mirror listener for the visible answer panel and a document capture-phase `keydown` listener that is the authoritative Enter path. It handles Enter suggestion selection/answer submission and stops propagation before the input-level handler can also process Enter. It also listens for answer-settlement/new-question events. |

### Effective event flow

- **Typing:** input event → `script_004` `buildSuggestions()`; `script_008` mirrors the value into the answer panel. The production listeners are registered in fragment order, so suggestion rebuilding occurs before the later mirror listener.
- **Click selection:** document capture listeners see the click first; then `script_007`'s list capture listener intercepts the click. It sets the selected value and dispatches exactly one bubbling synthetic `input` event. `script_004` rebuilds the list synchronously; `script_008` mirrors the value; the `script_007` handler then clears the rebuilt list and leaves `aria-expanded=false`. It restores focus and caret. Propagation is stopped, preventing the normal document bubble outside-click handler from running for this click.
- **Keyboard navigation:** `script_004` handles arrow-key movement and the input's suggestion navigation state. For Enter, the earlier-registered document capture listener in `script_008` intercepts first and calls `stopImmediatePropagation()`, making it the effective authoritative Enter owner. It either selects a suggestion and returns, or follows the answer-submission bridge when no selectable list is open.
- **Answer settlement:** the suggestion click handler itself does not call the answer-submit bridge. Submission is owned by the Enter path in `script_008` or the explicit submit button in `script_004`.

## Regression coverage added

`tests/browser/quiz_suggestions_integration.py` now asserts against the production renderer/handlers in Chromium that click selection:

1. copies the selected suggestion;
2. empties/closes the list;
3. leaves `aria-expanded=false`;
4. dispatches exactly one bubbling `input` event;
5. restores focus to `#quizAnswer`;
6. leaves the caret collapsed at the end of the selected text; and
7. does not invoke the answer-submit bridge or emit the answer-settlement event.

The test still exercises keyboard selection and its list/ARIA/caret contract. Only `targetOptions()` enumeration is fixture-backed; production renderer and event listeners are retained.

## Decision

**Do not consolidate/remove handlers in this checkpoint.** The ownership map exposes overlapping behavior but not enough evidence to remove the legacy click listener without a behavior change. The click handler currently relies on the synchronous `input` listener to update the answer mirror and other input observers, then clears the list a second time. The Enter handler has separate keyboard and submit semantics. A future consolidation should first introduce one explicit selection helper shared by click and keyboard, prove input dispatch count/IME/focus/caret/submit behavior, then remove only a demonstrably redundant listener in a separate uniquely named checkpoint.

## Verification results

- Targeted Chromium integration: **22 assertions passed, 0 failed**.
- Full runner: **14 commands passed, 0 failed**.
- Unit/contract assertions: **173 passed, 0 failed** across ten unit/contract suites.
- Integrity verifier: **106 checks passed, 0 failed**.
- Two independent standalone builds matched each other and the expected V82.70 fingerprint: 8,786,974 bytes, SHA-256 `59704427cb924f2fe9f5526417152b7d743ac29f5cb6dc70c886885e6ae7dca6`.
- Immutable V82.65 baseline fingerprint remained unchanged.
- Package: `AMQ_V82_71_SUGGESTION_EVENT_OWNERSHIP_AUDIT_01.zip`; 196 unique entries, ZIP CRC passed. The package SHA-256 is recorded in the `.zip.sha256` sidecar and `reports/V82_71_SUGGESTION_EVENT_OWNERSHIP_AUDIT_01_SHA256.txt`.

## Environment limits

Chromium uses `about:blank`, in-memory storage, IndexedDB disabled, external network blocked, and fixture-backed candidate enumeration. This does not validate real-origin persistence, audio/network, Firefox, multiplayer, or a complete real answer-submission flow.
