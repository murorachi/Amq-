# Stage 1 — Candidate277 baseline retrieval and safe continuation
Date: 2026-10-25
Status: BLOCKED for baseline byte verification.

## Baseline record
- File: `amq_learning_tool_v82_85_91_candidate277_custom_list_name_normalization_20261025.html`
- Expected size: 9,373,238 bytes
- Recorded SHA-256: `b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371`

## Results
- Project/Library search found two same-name Candidate277 HTML indexes, each recording 9,373,238 bytes and snippets of HTML content.
- Raw-byte materialization failed because the indexed Project file has no authorized raw-byte materialization path. No SHA-256 recomputation was possible.
- GitHub filename retrieval returned 404 on Candidate278, Candidate280, Candidate282, Candidate284, and Candidate287 branches.
- GitHub commit search by the recorded SHA, filename, and candidate name returned no usable commit result. The Candidate278 branch tree has related reports but no Candidate277 HTML artifact.
- Candidate278 branch HEAD: `66fbfbfa1903afcc97cff88670d944add254181f`.
- Candidate278 `CURRENT_STATUS.md` and `BASELINE.md` record Candidate277 as an authorized working baseline and report a historical local hash verification. That history does not substitute for a fresh byte-level verification in this execution.

## Safety decision
Candidate277 raw bytes and hash verification remain BLOCKED. Do not promote Candidate295 or use Candidate283/index snippets as a substitute. No application source, HTML, data, or storage schema was modified. Candidate295 HTML, Coverage JSON, smoke JSON, and recovery ZIP were not mounted in this execution, so no runtime tests or new build were run.

## Test-oracle specification (design only; NOT RUN)
1. Parent step result is derived from child actions; any required child failure, missing result, or exception prevents PASS.
2. Workspace assertions check target panel existence, visibility, expected content, and closure of non-target panels rather than only comparing `activeView` strings.
3. Exercise close/back, then repeat each workspace open/close at least twice; record duplicate DOM nodes, duplicate event effects, and observer/timer cleanup evidence.
4. Persistence-writing cases use isolated browser contexts/profiles to prevent cross-test storage contamination.
5. Preserve actual assertion values, expected values, console/error logs, and browser version. Static checks do not count as runtime PASS.
6. Browser launch or page-load timeout is BLOCKED unless separate evidence identifies an application defect.

## Test status
- PASS: Located Library indexes; read Candidate278 `CURRENT_STATUS.md` and `BASELINE.md`; obtained Candidate278 HEAD and recursive tree; confirmed Candidate277 HTML is absent from that tree.
- FAIL: Candidate277 filename lookup returned 404 on five checked branches. This is a retrieval failure, not an application-function failure.
- BLOCKED: Raw-byte retrieval and fresh SHA-256 verification.
- NOT RUN: Candidate295 browser acceptance, application edits, single-file build, GitHub HTML upload/readback/hash verification.

## Rollback
No application or data files were changed. This checkpoint contains documentation only on a new branch. Candidate277 and Candidate276 remain untouched.

## Next action
Obtain Candidate277 from a raw-byte-accessible source or a Git commit/tree that actually contains the file. Recompute size and SHA-256 and require an exact match before code deletion. If still blocked, retrieve Candidate295 plus its existing test attachments and continue only non-destructive harness work.
