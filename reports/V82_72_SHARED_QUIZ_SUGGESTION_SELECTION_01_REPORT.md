# V82.72 Shared Quiz Suggestion Selection 01

Date: 2026-10-18

## Scope
Unify quiz suggestion selection across click and keyboard paths, with regression coverage. V82.65 remains the immutable baseline.

## Changes
- Added `selectQuizSuggestionV8272(value, source)` in `src/scripts/script_004.htmlpart`, exposed as `window.__aniSelectQuizSuggestionV8272` for later inline fragments.
- The helper rejects disabled/missing inputs, empty values and IME-composing state; writes selected text; dispatches exactly one bubbling `input` event; closes the list and sets `aria-expanded=false`; restores focus and caret at end.
- `script_007.htmlpart` click handler now calls the shared helper instead of duplicating selection mutations.
- `script_008.htmlpart` Enter-to-select path calls the same helper. The existing input observer updates the answer mirror; the answer-submit branch is unchanged.
- Browser regression coverage includes click/keyboard parity, exactly-once input event, answer mirror, list/ARIA, focus/caret, no submit/settlement and IME refusal.

## Product output
- `dist/amq_learning_tool_v82_72.html`
- 8,787,018 bytes
- SHA-256: `fb075ed4e68eca454051ecd22cc10d3e7a5def193bf2852bf91547d5465da0d8`
- Immutable V82.65 baseline remains 8,786,930 bytes, SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.

## Validation
- Full runner: 14 commands passed, 0 failed.
- Browser integration: 29 behavioral assertions passed, 0 failed, plus standalone-file existence check.
- Unit/contract: 173 assertions passed, 0 failed.
- Integrity verifier: 106 checks passed, 0 failed.
- Two independent builds match the release fingerprint.
- AST inventory command exited 0.

## Limits
Chromium is constrained to `about:blank`, in-memory storage, disabled IndexedDB, blocked external network and fixture-backed candidate enumeration. Real-origin persistence, audio/network, Firefox, multiplayer multi-client reconnect and full real-answer submission remain untested.

## Publication status
This report is uploaded and will be read back. The full matching source tree, manifest and build tools are not yet all present remotely as one coherent reproducible release. This report alone is not evidence of a complete GitHub release.

## Rollback
Use the retained V82.70 HTML (8,786,974 bytes, SHA-256 `59704427cb924f2fe9f5526417152b7d743ac29f5cb6dc70c886885e6ae7dca6`) and restore the three changed fragments, manifest, test and build files from the V82.72 package.

## Next task
Run real-origin acceptance where permitted, then synchronize the exact source fragments, manifest, modules, tests and build/package tools as one versioned GitHub release and verify remote readback hashes.