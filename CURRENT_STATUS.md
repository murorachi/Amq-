# CURRENT_STATUS — Candidate277 adopted as working baseline (2026-10-25)

## Current status
- Baseline decision: PASS. User explicitly authorized Candidate277 as the working baseline, replacing the previous hold pending Candidate212 recovery. This does not assert byte identity with Candidate212.
- File: `amq_learning_tool_v82_85_91_candidate277_custom_list_name_normalization_20261025.html`
- Version: `v82.85.91-candidate277-custom-list-name-normalization-20261025`
- Bytes: 9,373,238
- SHA-256: `b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371`
- Batch 2 static dependency inventory completed for Candidate277; dynamic/runtime dependency edges remain to be audited before broad deletion.
- Batch 3 browser acceptance remains incomplete. Browser checks are BLOCKED/NOT RUN under the managed browser restrictions.
- No HTML/CSS/JS or application data was modified during this baseline decision. Candidate277 and Candidate276 remain immutable.

## Static checks previously executed
- PASS: 67/67 executable inline JavaScript blocks passed `node --check`.
- PASS: 109 CSS blocks parsed with zero stylesheet/declaration parse errors.
- PASS: 272 initial DOM IDs were unique.
- PASS: local SHA-256 and byte size match the Candidate277 record.
- NOT RUN/BLOCKED: browser interactions, reload persistence, live APIs, audio, multiplayer, IndexedDB Blob restore and osu!stable pixel comparison.

## Next
1. Continue Batch 2 dependency mapping: workspace/router lifecycle, custom-list selector and storage ownership, CSS cascade groups, observer/timer teardown.
2. Fix title/data-amq-candidate metadata only in a uniquely named child candidate.
3. Attempt isolated Candidate277 artifact upload/readback/hash verification when feasible.
