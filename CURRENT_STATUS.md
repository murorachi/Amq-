# CURRENT_STATUS.md

Updated: 2026-10-26 (work session based on uploaded Candidate346 handoff)

## Current state
- Formal baseline: **Candidate302**, unchanged and not included in the uploaded handoff ZIP. The reported baseline hash is retained but cannot be independently re-hashed from this package.
- Latest experimental candidate: **Candidate346**, not promoted.
- Bounded safety cleanup: **complete for the already evidence-confirmed items through Batch50**. Do not keep inventing deletion batches from low-confidence residues.
- Core regression: **INCOMPLETE**. Static verification passed; real browser interaction is blocked or not run.
- Final residue scan: existing scan has classified the known remaining items. Runtime-dependent items remain NEEDS CONFIRMATION.
- Formal release: **NOT READY for fully accepted release** because full-app regression and remote HTML readback remain outstanding.

## Verified local artifacts
- Candidate346: `amq_learning_tool_v82_86_57_candidate346_batch50_remove_orphaned_local_helpers_20261026.html`
  - Size: 1,625,225 bytes
  - SHA-256: `dfef81df1572219d2b96b5f8eeeb50696acfe99a0fced53b6c83371f930c99ca`
- Immediate rollback Candidate345:
  - Size: 1,625,630 bytes
  - SHA-256: `de4b96d355763015e747b72d25f3feabd40e6b2edfec69d2a4a19469bd9414f3`
- Rollback checkpoint Candidate320:
  - Size: 1,645,470 bytes
  - SHA-256: `134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`

## This work session
- Verified all 15 payload entries in `HANDOFF_MANIFEST_20261026.json` against local byte sizes and SHA-256: all matched.
- Verified handoff ZIP integrity and all 21 packaged entries.
- Confirmed the target GitHub branch exists: `amq-stage6-static-audit-regression-20261025`.
- Confirmed Candidate346 HTML and Candidate302 HTML are not found at the expected paths on that branch. Do not claim either remote artifact exists or that its remote hash was verified.
- No application HTML was changed in this session; no candidate number was incremented.

## Test state
- PASS: handoff ZIP integrity; local artifact hashes for Candidate346/Candidate345/Candidate320; independent inline JS syntax check; independent static ID check.
- PASS: existing handoff static source-marker smoke (11 groups) as recorded in its report; not a functional test.
- PASS: manifest size/hash verification for all listed payload files.
- BLOCKED: browser interaction due to observed `ERR_BLOCKED_BY_ADMINISTRATOR` on `file://` and localhost. A `page.set_content` probe built a DOM but ran under opaque-origin conditions and is not valid full-app acceptance.
- NOT RUN: full AMQ/EMQ/MIX application regression, real audio, custom-list persistence, backup/restore in the full app, workspace interaction, multiplayer E2E on Candidate346.
- BLOCKED / NOT VERIFIED: GitHub remote HTML presence and SHA-256 readback for Candidate346; Candidate302 HTML is also absent at its expected path.

## Known remaining risk
- C103 audio controls/geometry, v47 hero display, Candidate72 home icon inline styles, v33 `showToast`, and Candidate84 dock/sidebar CSS require runtime or stronger caller/selector evidence. Keep them deferred rather than deleting blindly.
- Candidate60 and Candidate193 navigation wrappers have distinct side effects; do not merge without route-dispatch mapping and targeted tests.
- Workspace state/geometry consolidation has static evidence only; actual click/Escape/resize/Song Select transitions remain unverified.

## Rollback
- Immediate rollback: Candidate345 HTML above.
- Secondary checkpoint: Candidate320 HTML above.
- Formal baseline Candidate302 remains unchanged. Do not promote Candidate346 solely because it is the latest candidate.

## GitHub documentation readback — 2026-10-26
- Updated `CURRENT_STATUS.md`, `BASELINE.md`, and `NEXT_TASK.md` on branch `amq-stage6-static-audit-regression-20261025`; fetched them after writing.
- Uploaded `CANDIDATE346_INDEPENDENT_STATIC_VERIFY_20261026.md`, `.json`, browser probe report and handoff manifest; readback confirmed the report and manifest.
- This verifies documentation/evidence files only. Candidate346 HTML was not uploaded; its expected path remains 404 and remote HTML SHA-256 is NOT VERIFIED.

## Additional browser probe — 2026-10-26
- Attempted Playwright `page.set_content` in system Chromium. DOM construction completed (title `AMQ學習工具`, 567 ID-bearing elements, 152 buttons), but the opaque `about:blank` origin is not a valid full-app environment.
- **BLOCKED:** direct file navigation returned `net::ERR_BLOCKED_BY_ADMINISTRATOR`.
- **NOT RUN:** real-origin end-to-end interaction tests. Isolated probe runtime errors are documented in `AMQ_CANDIDATE346_BROWSER_PROBE_20261026.md`; do not treat them as proven application regressions or PASS.
- No application HTML changed. Candidate346 remains experimental; Candidate302 remains formal baseline.

## Continuation checkpoint — 2026-10-26
- Revalidated all 15 manifest payload entries against local byte sizes and SHA-256 values: all matched.
- Revalidated ZIP integrity: no archive errors.
- The browser-probe alternative has been attempted; do not repeat blocked `file://` or opaque-origin routes. Next task is a bounded check for a supported binary upload path, then stop and report BLOCKED if unavailable.
- **Remote publication blocker confirmed:** connected GitHub tools provide text-content writes but no local-path/binary upload action for the 1.6 MB HTML. Candidate346 remote publication remains BLOCKED; documentation commits are not a substitute.
