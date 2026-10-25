# NEXT_TASK.md

## Stage 4 acceptance blockers (do not mislabel as complete)
1. Recover the exact matching `data.js` and `emq-data.js`; record provenance, byte size and SHA-256.
2. Run real-data schema, cross-source ID, song-to-work association, audio eligibility and real AMQ/EMQ/MIX pool validation.
3. Establish a working browser harness and execute full initialization/runtime/console/network E2E.
4. Run Candidate299 route matrix and Candidate301 custom-list CRUD/import/export/backup-restore regressions.
5. Upload Candidate302 HTML to the Stage 4 branch, download it back, and compare SHA-256.
6. Update this status only after each item has actual evidence. Candidate295 remains the formal baseline; do not promote Candidate302 without acceptance evidence.

## Current verified synthetic coverage
- Catalog validator: 11/11 PASS.
- AMQ/EMQ/MIX pool, blacklist and audio filtering: 11/11 PASS.
- EMQ loader synthetic suite: 9/9 PASS.
