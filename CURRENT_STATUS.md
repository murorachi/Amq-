# CURRENT_STATUS.md

## Current candidate
- Version: `v82.85.96-candidate282-batch-routing-lifecycle-fix-20261025`
- Artifact: `amq_learning_tool_v82_85_96_candidate282_batch_routing_lifecycle_fix_20261025.html`
- Size: `9,379,673` bytes
- SHA-256: `66e97e9963c115a3e3f853e83bc0e6616c9d0bea57007c6fd766cadd44640e49`
- Parent Candidate281 SHA-256: `15853184707b2cbdfa872f2be702392bb7a563805f84fb782e467b94e630245a`
- Immutable Candidate277 SHA-256: `b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371`

## Stage 63
Fixed VNDB rail routing conflict, batch-entry relabeling, batch search observer teardown/rebind, and stale batch selection cleanup on workspace close/back. Details: `docs/engineering/STAGE_63_CANDIDATE282_REPORT.md`.

## Test status
- PASS: Candidate281 baseline hash/size checked before edits.
- PASS: 67/67 executable inline JS blocks pass Node syntax check; JSON and binary payload scripts excluded by declared type.
- PASS: static assertions for VNDB route ownership and batch observer/selection cleanup.
- BLOCKED: Chromium navigation to file and localhost HTTP origins returned `net::ERR_BLOCKED_BY_ADMINISTRATOR`; runtime click tests not possible.
- NOT RUN: persistence reload, external APIs, audio/video and multiplayer.

## Remote state
- Candidate282 branch: `amq-candidate282-batch-routing-lifecycle-fix-20261025`.
- Engineering report committed. HTML artifact is still local-only; no remote HTML readback/hash verification has been completed.