# Stage 4 — Data initialization and source-pool regression report

Date: 2026-10-25
Test target: Candidate302 HTML, SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
Formal baseline remains Candidate295, SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`.
No production HTML was modified in this Stage 4 checkpoint; no new candidate number is assigned without a code change.

## Executed tests

### PASS — source pool / audio / blacklist synthetic harness: 11/11
1. AMQ mode returns only audio-qualified AMQ songs.
2. EMQ mode returns only EMQ songs.
3. MIX combines sources without duplicate song IDs.
4. Song blacklist filters both AMQ and EMQ.
5. Work blacklist filters both AMQ and EMQ.
6. AMQ songs without audio are excluded.
7. Matching audio-unavailable signature excludes a song.
8. Changed audio signature clears a stale unavailable marker.
9. EMQ rows are excluded while EMQ API is not ready.
10. MIX falls back to an available source when the other pool is empty.
11. Returns null when neither source has eligible songs.

### PASS — AMQ catalog snapshot validator: 11/11
1. Valid snapshot accepted.
2. Null input rejected.
3. Missing anime array rejected.
4. Empty catalog rejected.
5. Duplicate anime ID rejected.
6. Invalid anime ID rejected.
7. Missing anime title rejected.
8. Duplicate song ID rejected.
9. Invalid song ID rejected.
10. Missing song title rejected.
11. Short song row rejected.

Both suites execute the actual candidate's function source extracted from the HTML with Node.js VM and controlled synthetic dependencies. These are focused function-level tests, not full browser E2E and not real-catalog tests.

### Existing Stage 3 suite rerun
- Candidate302 EMQ loader synthetic suite: 9/9 PASS.
- Candidate301 regression probe: FAIL as expected on duplicate EMQ work ID; it intentionally embeds Candidate301's original getter and demonstrates the previously recorded defect. This is not a Candidate302 failure.

## BLOCKED / NOT RUN
- Real `data.js` and `emq-data.js` are absent from available files and were not found by filesystem search or GitHub code search.
- Real data schema, true cross-source ID uniqueness, actual song-to-work mapping, audio availability distribution and real AMQ/EMQ/MIX pool counts: BLOCKED.
- Full browser E2E: NOT RUN. A headless Chromium attempt timed out without DOM output; therefore no browser pass is claimed.
- Candidate299 route matrix and Candidate301 full CRUD/backup-restore regression: NOT RUN.
- Candidate302 HTML upload and remote SHA-256 verification: BLOCKED; GitHub file endpoint returned NOT_FOUND.
- No Stage 4 production code change made, so Candidate302 remains the latest test target and Candidate295 remains formal baseline.

## Risk and next steps
1. Recover the matching real data files and verify source/version/hash.
2. Test real catalog initialization, cross-source IDs, audio eligibility, blacklist interactions and MIX fallback.
3. Retry browser E2E in a controlled Chromium environment with a reproducible timeout/logging harness.
4. Run route and CRUD/backup regressions.
5. Upload Candidate302 HTML to GitHub and download it back for SHA-256 comparison.
6. Do not promote Candidate302 or close Stage 4 until blocked acceptance items are resolved or explicitly dispositioned.
