# V82.70 Quiz suggestion ARIA fix report

## Scope

Fix the confirmed click-selection accessibility-state mismatch with the smallest possible change. The V82.65 product baseline remains immutable; V82.70 is recorded as a distinct release fingerprint in `reports/FRAGMENT_MANIFEST.json`.

## Source change

- `src/scripts/script_007.htmlpart`: after the legacy capture-phase handler dispatches the `input` event and clears any rebuilt suggestion list, explicitly set `#quizAnswer[aria-expanded]` to `false`.
- Preserve the existing event order, selected text, focus restoration, caret placement and downstream `input` event. No controller extraction or unrelated UI changes.
- `tests/browser/quiz_suggestions_integration.py`: replace the previous known-issue note with a hard assertion for the final ARIA state.
- `tools/build.py` and `tools/verify.py`: preserve and independently verify the immutable V82.65 baseline, while checking the distinct current release against the manifest's `release` fingerprint.
- Update the fragment fingerprint for `script_007`, unique output name and release metadata. V82.69 output is not overwritten.

## Artifact identity

- Release: `V82.70_QUIZ_SUGGESTION_ARIA_FIX_01`
- HTML: `dist/amq_learning_tool_v82_70.html`
- Bytes: `8,786,974`
- SHA-256: `59704427cb924f2fe9f5526417152b7d743ac29f5cb6dc70c886885e6ae7dca6`
- Immutable V82.65 baseline: 8,786,930 bytes, SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`; file verified unchanged.

## Tests

- `python tools/run_all_checks.py`: 14 commands passed, 0 failed.
- Chromium suggestion integration: 19 assertions passed, including the new click-selection ARIA assertion.
- Unit/contract suites: 173 assertions passed, 0 failed.
- `tools/verify.py`: 106 checks passed, 0 failed.
- Two independent builds produced identical V82.70 bytes and SHA-256.
- Parser inventory: 42 executable sources parsed with zero syntax diagnostics; two data-only blocks intentionally excluded.

## Scope limits / risks

- Browser harness uses `about:blank`, in-memory storage, disabled IndexedDB and blocked external network; target option enumeration is fixture-backed.
- Real-origin persistence, audio/network, Firefox, multiplayer multi-client reconnect and full answer submission were not tested.
- This fixes the observed ARIA mismatch only. It does not reconcile or extract the overlapping suggestion event handlers across `script_004`, `script_007`, and `script_008`.

## GitHub

The report and status metadata are eligible for publication to `v82.69-architecture-storage-multiplayer-01`. The branch is still not a complete reproducible source release until matching source fragments, build tools, manifest, tests and release artifacts are remotely read back and hash-verified as a consistent set.

## Rollback

Restore `src/scripts/script_007.htmlpart` to the prior V82.69 fragment, restore the prior `script_007` fingerprint and remove the V82.70 `release` entry only in a new rollback checkpoint. Do not edit or replace `baseline/amq_learning_tool_v82_65_candidate_pool_cleanup.html`. The previous V82.69 HTML remains a separate file.

## Next task

Map event ownership and ordering across `script_004`, `script_007`, and `script_008`, then add tests for event listener ordering and prevent regressions before any UI-controller extraction.
