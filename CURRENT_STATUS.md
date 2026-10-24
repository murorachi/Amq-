# CURRENT_STATUS.md

## Current candidate
- Version: `v82.85.96-candidate282-batch-routing-lifecycle-fix-20261025`
- Artifact: `amq_learning_tool_v82_85_96_candidate282_batch_routing_lifecycle_fix_20261025.html`
- Size: `9,379,673` bytes
- SHA-256: `66e97e9963c115a3e3f853e83bc0e6616c9d0bea57007c6fd766cadd44640e49`
- Parent Candidate281 SHA-256: `15853184707b2cbdfa872f2be702392bb7a563805f84fb782e467b94e630245a`
- Immutable Candidate277 SHA-256: `b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371`

## Stage 63 — targeted routing/lifecycle fix
Fixed VNDB action ownership, batch-entry relabeling, batch search observer teardown/rebind, and stale selection cleanup on close/back. Details: `docs/engineering/STAGE_63_CANDIDATE282_REPORT.md`.

## Stage 64 — unified static inventory
- 69 script tags: 67 executable JavaScript blocks and 2 typed non-JS payloads.
- 109 CSS blocks, 2,819 CSS rules, 2,143 selector groups; 387 groups repeat, with zero parser errors and zero exact selector+declaration duplicates.
- 272 parsed literal IDs, zero duplicate IDs.
- Dock/Sidebar have many active callers; broad removal is not justified until responsibilities are migrated.
- Full report: `docs/engineering/STAGE_64_UNIFIED_STATIC_INVENTORY.md`.

## Test status
- PASS: Candidate282 SHA-256/size verified locally.
- PASS: 67/67 executable inline JS blocks pass Node syntax checks (previous stage).
- PASS: CSS parse audit (2,819 rules, zero parse errors).
- PASS: parsed literal ID audit (272, zero duplicates).
- BLOCKED: Chromium navigation to local file returned `net::ERR_BLOCKED_BY_ADMINISTRATOR`; computed styles, screenshots and interactions cannot be verified here.
- NOT RUN: persistence reload, external APIs, media playback, multiplayer.

## Remote state
- Branch: `amq-candidate282-batch-routing-lifecycle-fix-20261025`.
- Stage 63 and Stage 64 engineering reports committed; status update pending readback verification.
- Candidate282 HTML remains local-only. No remote HTML upload/readback/SHA verification completed.