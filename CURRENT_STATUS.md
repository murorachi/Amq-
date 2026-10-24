# CURRENT_STATUS.md

## Current candidate
- Version: `v82.85.95-candidate281-remove-duplicate-batch-entry-20261025`
- Artifact: `amq_learning_tool_v82_85_95_candidate281_remove_duplicate_batch_entry_20261025.html`
- Size: `9,379,352` bytes
- SHA-256: `15853184707b2cbdfa872f2be702392bb7a563805f84fb782e467b94e630245a`
- Parent Candidate280 SHA-256: `d4329fee9b7795641c657dd67d9993f9b5808c58df44ad9e71cb226153783d98`
- Immutable Candidate277 SHA-256: `b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371`

## Latest stage
Stage 61 removed the redundant legacy batch navigation group, dead handlers and duplicate work-batch rail-entry creation. Stage 62 completed a source-level caller/lifecycle audit; it did not modify the HTML.

## Verified findings
- The song batch module still implements bulk familiarity, tags, blacklist, and custom-list membership operations; removing it without integration would lose functionality.
- The VNDB rail action is rewritten to `song-batch`, conflicting with the shared import handler. This is the next root-cause routing fix.
- Work-batch API has independent callers and must remain until those callers are migrated and tested.

## Test status
- PASS: baseline size/hash verified before Candidate281 edit.
- PASS: static removal assertions for the duplicate batch entry and dead handlers.
- PASS: source audit found VNDB routing collision and enumerated batch API callers.
- NOT RUN: browser interactions, route transitions, storage persistence, AMQ/EMQ switch selection lifecycle, real APIs/media/multiplayer.
- BLOCKED: local browser runtime automation; Playwright/Puppeteer/jsdom are not installed. Prior browser storage testing was blocked by the environment.

## Remote state
- Candidate280 branch exists remotely: `amq-candidate280-songselect-row-cascade-cleanup-20261025`.
- Candidate281 audit branch created: `amq-candidate281-batch-entry-audit-20261025`.
- Candidate281 HTML has not been uploaded/read back from GitHub. Do not treat local SHA as a remote artifact verification.
