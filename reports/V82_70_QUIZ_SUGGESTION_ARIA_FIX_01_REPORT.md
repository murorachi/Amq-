# V82.70 Quiz suggestion ARIA fix report

## Scope
Fixed the confirmed click-selection accessibility-state mismatch with a minimal change. V82.65 remains the immutable baseline; V82.70 is a distinct release fingerprint.

## Source change
- `src/scripts/script_007.htmlpart`: after the legacy capture-phase handler dispatches the `input` event and clears any rebuilt suggestion list, explicitly set `#quizAnswer[aria-expanded]` to `false`.
- Preserve existing event order, selected text, focus restoration, caret placement and downstream `input` event. No controller extraction or unrelated UI changes.
- Browser integration now hard-asserts the final ARIA state.
- Builder/verifier preserve and independently verify V82.65 while checking the current release against the manifest `release` fingerprint.

## Artifact identity
- Release: `V82.70_QUIZ_SUGGESTION_ARIA_FIX_01`
- HTML: `dist/amq_learning_tool_v82_70.html`
- Bytes: 8,786,974
- SHA-256: `59704427cb924f2fe9f5526417152b7d743ac29f5cb6dc70c886885e6ae7dca6`
- Immutable V82.65: 8,786,930 bytes, SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.

## Tests
- Full runner: 14/14 commands passed.
- Chromium integration: 19 assertions passed.
- Unit/contract suites: 173 assertions passed.
- Integrity verifier: 106 checks passed.
- Two independent builds match exactly.
- 42 executable sources parsed with zero syntax diagnostics; two data-only blocks intentionally excluded.

## Limits
Browser harness uses about:blank, in-memory storage, disabled IndexedDB and blocked external network; suggestion candidates are fixture-backed. Real-origin persistence, audio/network, Firefox, multiplayer multi-client reconnect and full answer submission remain untested. This fix does not reconcile or extract overlapping handlers in scripts 004/007/008.

## Rollback
Restore the prior V82.69 script_007 fragment and fingerprint in a separate rollback checkpoint. Never modify the immutable V82.65 baseline.

## Next task
Map event registration order and ownership across scripts 004/007/008, then test exactly-once input dispatch, closed-list ARIA state, focus/caret and no accidental answer submission before considering controller extraction.
