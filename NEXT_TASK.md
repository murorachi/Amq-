# NEXT_TASK.md

## Stage 4 — highest-value next work
1. Recover the exact matching `data.js` and `emq-data.js`; record provenance, byte size and SHA-256.
2. Run real-data schema, cross-source ID, song-to-work association and audio-eligibility validation.
3. Verify real AMQ / EMQ / MIX pool sizes, blacklist filtering, audio-unavailable markers and empty-pool fallback.
4. Retry full browser E2E with a controlled Chromium harness and capture console/network/runtime errors.
5. Run Candidate299 route matrix and Candidate301 custom-list CRUD/import/export/backup-restore regression.
6. Upload Candidate302 HTML to the Stage 4 branch and verify the downloaded remote file's SHA-256.
7. Preserve Candidate295 as formal baseline. Do not promote candidates without evidence.
