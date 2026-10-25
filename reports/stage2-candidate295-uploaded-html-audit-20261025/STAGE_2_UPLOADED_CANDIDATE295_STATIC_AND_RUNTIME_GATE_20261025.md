# Stage 2 — Uploaded Candidate295 HTML verification and safe continuation
Date: 2026-10-25
Repository: murorachi/Amq-
Branch: amq-candidate295-baseline-retrieval-blocked-20261025

## Scope
This stage rechecks the user-supplied raw HTML bytes, performs safe static checks, and continues the Candidate277 recovery search. No application code, CSS, data files, storage, or baseline files were modified.

## Artifact identity
- Uploaded path: `/mnt/data/index-old.html`
- Embedded version: `v82.86.06-candidate295-db-extraction-20261025`
- Actual byte size: `1,720,917`
- Recomputed SHA-256: `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`
- Result: PASS. Size and SHA-256 match the previously recorded Candidate295 values.
- Important: this is Candidate295, not Candidate277. It is not promoted to the formal or working Candidate277 baseline.

## Candidate277 retrieval
Expected Candidate277 artifact:
- Filename: `amq_learning_tool_v82_85_91_candidate277_custom_list_name_normalization_20261025.html`
- Recorded size: `9,373,238` bytes
- Recorded SHA-256: `b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371`

Status: BLOCKED. This stage's upload is Candidate295 and does not recover Candidate277. Earlier GitHub checks recorded 404s for the Candidate277 HTML on Candidate278, Candidate280, Candidate282, Candidate284 and Candidate287 branches; repository commit/branch searches for the exact Candidate277 filename/hash yielded no usable artifact. The historical Candidate277 SHA is not recomputed from original bytes in this stage. Preserve Candidate277/Candidate276 records as-is; do not reconstruct or promote another version by assumption.

## Static checks on uploaded Candidate295
- PASS: raw file read succeeded.
- PASS: actual file size and SHA-256 recomputed.
- PASS: HTML parser found 271 IDs and zero duplicate IDs.
- PASS: 68 inline executable JavaScript blocks passed individual `node --check` syntax checks.
- PASS: 70 total script tags identified; 2 external script dependencies identified: `data.js`, `emq-data.js`.
- BLOCKED: those two external data files are not present alongside the uploaded HTML in the current workspace. A complete portable single-file build cannot be certified from this HTML alone.
- NOT RUN: CSS parser validation, because no stylesheet parser was installed/selected for this stage; the count of 109 style blocks is inventory only, not a CSS pass.
- NOT RUN: functional storage/custom-list CRUD/reload, router switching, imports, audio, multiplayer, IndexedDB, and visual comparison.

## Browser/runtime attempt
- BLOCKED: Playwright navigation to `file:///mnt/data/index-old.html` was rejected with `net::ERR_BLOCKED_BY_ADMINISTRATOR`.
- BLOCKED: navigation through a local HTTP server was also rejected with `net::ERR_BLOCKED_BY_ADMINISTRATOR`.
- These are environment restrictions, not evidence of application pass or application failure. No runtime feature result is claimed.

## Changes and delivery
- Application source changes: none.
- Data/storage/schema changes: none.
- New application HTML candidate: none.
- This report and accompanying status/handoff updates are documentation-only checkpoints.
- Rollback: revert the documentation-only Stage 2 commit on this branch. Keep uploaded `index-old.html` unchanged; keep Candidate277 and Candidate276 immutable.

## Remaining risks and next highest-value work
1. Recover the actual Candidate277 raw HTML from the user's Library or a verified remote artifact, then recompute its size/SHA before any source edit.
2. Recover the matching `data.js` and `emq-data.js` for Candidate295 only if Candidate295 needs further inspection; do not combine mismatched data versions.
3. Once the exact Candidate277 artifact is available, compare Candidate277 -> subsequent candidates at the byte/source level and continue the minimal dependency audit.
4. Run browser acceptance only in an environment that permits browser navigation; until then mark browser checks BLOCKED/NOT RUN.


## Recovery follow-up — repeated Library raw-byte checks (2026-10-25)
- Search returned two Library records for the exact Candidate277 filename; each index reports 9,373,238 bytes. Both raw-byte materialization attempts failed with: `This Project file does not have an authorized raw-byte materialization path.`
- The indexed `Coverage-20261025T094140.json` record was also found (10,050,921 bytes), but raw-byte materialization failed with the same authorization limitation. The handoff record describes data.js/emq-data.js content inside that coverage file, but those bytes have not been recovered into this runtime and their hashes were not recomputed here.
- These search results confirm indexed records exist; they do not prove the original Candidate277 bytes can be exported or hash-verified. Candidate277 recovery remains BLOCKED.
