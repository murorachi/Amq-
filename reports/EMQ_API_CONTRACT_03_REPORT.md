# V82.66 EMQ API Contract Checkpoint 03

Status: PARTIAL. This checkpoint adds isolated contract tests; no product runtime logic was changed.

## Scope
- Added `tests/unit/emq_api_contract.test.cjs`.
- Executes the exact candidate policy block from `script_004.htmlpart` and the exact EMQ loader/API script from `script_038.htmlpart` in a Node VM.
- Loads a deterministic gzip-compressed synthetic catalogue through the production loader path. Browser DOM, storage and history dependencies are isolated; no network or live user data is accessed.
- Checks API readiness, ID-space separation, AMQ/Mixed/EMQ pool composition, deterministic deduplication, EMQ work metadata, aliases/audio URL association, AMQ-only hard-filter behavior, focus-mode composition, question selection, and fail-closed work-ID collision handling.

## Results
- Candidate policy unit tests: 70 passed, 0 failed.
- Candidate pool integration tests: 22 passed, 0 failed.
- EMQ API contract tests: 11 passed, 0 failed.
- Deterministic build/integrity verifier: 98 passed, 0 failed.
- Final HTML: 8,786,930 bytes; SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33` (unchanged baseline).

## Findings and limits
- The API keeps EMQ rows/works in separate maps and does not append them to AMQ `songs` or `anime` arrays.
- Mixed mode appends eligible EMQ rows to the AMQ base pool and deduplicates by song ID; EMQ-only mode returns EMQ rows only; AMQ mode returns the base pool unchanged.
- AMQ-specific hard restrictions suppress EMQ rows in Mixed mode. Focus mode is an explicit cross-source scope and combines supplied AMQ candidates with matching EMQ IDs.
- ID collision handling fails closed before `ready` becomes true.
- These are controlled source-level tests, not a real browser with the full embedded catalogue. Live external audio, real network behavior, Firefox/manual operation, IndexedDB round-trip, multiplayer multi-device and full product regression remain unverified.
- The exact official V82.65 delivery ZIP is still unavailable; its outer hash and internal manifest have not been independently reverified.

## Rollback
Remove `tests/unit/emq_api_contract.test.cjs` and this report, then revert the checkpoint status files/package. The baseline HTML and product source fragments are unchanged.

## Next
Trace settings and list-scope handoff into `combinePool`, including selected EMQ custom-list behavior, malformed settings and source-specific history/status storage. Compare with the existing V82.65 full-HTML source-mode and custom-list browser test records before making any production change.
