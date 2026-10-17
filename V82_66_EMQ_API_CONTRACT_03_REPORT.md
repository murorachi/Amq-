# V82.66 EMQ API Contract Checkpoint 03

Status: PARTIAL. This checkpoint adds isolated contract tests; no product runtime logic was changed.

## Scope
- Added `tests/unit/emq_api_contract.test.cjs` locally and in the checkpoint ZIP.
- Executes the exact candidate policy block from `script_004.htmlpart` and exact EMQ loader/API script from `script_038.htmlpart` in a Node VM.
- Loads deterministic gzip-compressed synthetic catalogue data through the production loader path. DOM, storage and history dependencies are isolated; no network or live user data is accessed.
- Checks readiness, ID-space separation, AMQ/Mixed/EMQ pool composition, deduplication, EMQ work metadata, aliases/audio URL association, AMQ-only hard-filter behavior, focus scope, question selection, and fail-closed work-ID collision handling.

## Results
- Candidate policy tests: 70 passed, 0 failed.
- Candidate pool integration tests: 22 passed, 0 failed.
- EMQ API contract tests: 11 passed, 0 failed.
- Build/integrity verifier: 98 passed, 0 failed.
- Final HTML: 8,786,930 bytes; SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33` (unchanged baseline).

## Findings and limits
- EMQ rows/works remain in separate maps; the loader does not append them to AMQ `songs` or `anime` arrays.
- Mixed mode appends eligible EMQ rows and deduplicates by song ID; EMQ-only returns EMQ rows; AMQ mode leaves the base pool unchanged.
- AMQ-specific hard restrictions suppress EMQ in Mixed mode. Focus mode combines the explicit cross-source focus IDs.
- Work ID collision handling fails closed before readiness.
- These are controlled source-level tests, not a real browser with the full embedded catalogue. Live external audio/network, Firefox/manual operation, IndexedDB round-trip, multiplayer multi-device and full product regression remain unverified.
- The official V82.65 delivery ZIP remains unavailable, so its outer hash and internal manifest have not been independently reverified.
- The binary V82.66 checkpoint ZIP is available as a local artifact; it has not been uploaded to GitHub.

## Rollback
Remove the new EMQ API contract test and this report, then revert checkpoint docs/package. Product source fragments and baseline HTML remain unchanged.

## Next
Trace settings/list-scope handoff into `combinePool`, including selected EMQ custom-list behavior, malformed settings and source-specific history/status storage. Reconcile with existing V82.65 browser test records before production changes.
