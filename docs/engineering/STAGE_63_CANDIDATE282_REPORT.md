# Stage 63 — Unified batch route/lifecycle fixes

## Artifact
- Version: `v82.85.96-candidate282-batch-routing-lifecycle-fix-20261025`
- HTML: `amq_learning_tool_v82_85_96_candidate282_batch_routing_lifecycle_fix_20261025.html`
- Size: `9,379,673` bytes
- SHA-256: `66e97e9963c115a3e3f853e83bc0e6616c9d0bea57007c6fd766cadd44640e49`
- Parent Candidate281 SHA-256: `15853184707b2cbdfa872f2be702392bb7a563805f84fb782e467b94e630245a`

## Root causes fixed
1. Removed the batch handler's rewrite of rail action `vndb` to `song-batch`, which blocked the shared import handler.
2. Restricted batch-entry relabeling to explicit `song-batch` actions only.
3. Added the left-rail `vndb` action to the shared import capture handler.
4. Stored the batch-search MutationObserver on its tracklist and disconnected any previous observer before rebinding.
5. On workspace close/back, clear selection IDs, uncheck row boxes, remove search-hidden row classes, and disconnect the batch-search observer.

## Test evidence
- PASS: Candidate281 size/hash verified before editing.
- PASS: 67/67 executable inline JavaScript blocks pass Node.js syntax checks. `application/json` and `application/octet-stream` payloads were excluded based on their declared types.
- PASS: static assertions verify VNDB action ownership, no VNDB-to-batch rewrite/relabel, observer teardown/rebind, and selection cleanup.
- BLOCKED: Chromium navigation to both `file://` and `http://127.0.0.1` returned `net::ERR_BLOCKED_BY_ADMINISTRATOR`. Browser click tests and screenshot capture could not run.
- NOT RUN: persistence reload, real VNDB API, media playback, multiplayer.

## Scope and rollback
This is a focused fix, not proof that all legacy code is removable. Song batch still implements bulk familiarity, tags, blacklist and custom-list membership; migrate and test those operations before deleting the module. Roll back to Candidate281 and verify SHA-256 `15853184707b2cbdfa872f2be702392bb7a563805f84fb782e467b94e630245a`. Candidate277 remains immutable.