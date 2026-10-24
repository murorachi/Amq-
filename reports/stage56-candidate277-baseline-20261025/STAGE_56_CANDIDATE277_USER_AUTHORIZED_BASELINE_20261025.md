# Stage 56 — Candidate277 user-authorized baseline decision

Date: 2026-10-25
Decision source: explicit user instruction: “直接採用277當基準就行”.

## Decision
Candidate277 is now the active working baseline. This resolves the prior process block caused by Candidate212's missing raw bytes. It does not assert Candidate277 is identical to Candidate212, and does not claim the HTML artifact has been uploaded or verified remotely.

## Baseline evidence
- File: `amq_learning_tool_v82_85_91_candidate277_custom_list_name_normalization_20261025.html`
- Version: `v82.85.91-candidate277-custom-list-name-normalization-20261025`
- Size: 9,373,238 bytes
- Local SHA-256: `b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371`
- Direct rollback parent Candidate276 SHA-256: `7a604c1d2d604b928d2ccb51dbb55d58ead2d34f73abfcba27693c794a4ddbd5`
- Candidate277 artifact itself was not modified.

## Existing verification carried forward
- PASS: 67/67 executable inline JavaScript blocks passed `node --check`.
- PASS: 109 CSS blocks parsed with zero parse errors and zero declaration parse errors.
- PASS: 272 initial DOM IDs were unique.
- PASS: local byte count and SHA-256 match the Candidate277 artifact.
- BLOCKED/NOT RUN: browser interactions, storage reload, live API imports, audio, multiplayer, IndexedDB Blob restore and pixel comparison.

## Caveats
1. `<title>` says Candidate219 and `data-amq-candidate` remains `227`, while build comment says Candidate277. Correct only in a new child candidate.
2. Candidate277 GitHub upload/readback/hash verification remains NOT RUN.
3. Stage55 inventory is static; dynamic call graph and runtime lifecycle proof are incomplete.

## Changes
Updated BASELINE.md, CURRENT_STATUS.md and NEXT_TASK.md. No HTML, CSS, JavaScript, application data or rollback files were changed.

## Next
Continue Batch 2 dependency mapping from Candidate277: route/workspace lifecycle, custom-list selector/storage ownership, CSS cascade dependencies, and observer/timer teardown. Any source edit must be a new uniquely named child candidate.
