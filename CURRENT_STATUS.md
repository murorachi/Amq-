# CURRENT_STATUS.md

Updated: 2026-10-25
Stage: Stage 4 — data initialization and source-pool regression.
State: Focused synthetic tests pass; real data and full browser acceptance remain BLOCKED/NOT RUN.

## Baselines
- Formal maintenance baseline: Candidate295, SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`, 1,720,917 bytes.
- Latest candidate under test: Candidate302, SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`, 1,720,249 bytes.
- No production HTML changes in Stage 4 checkpoint; Candidate302 is not promoted.

## Stage 4 test evidence
- AMQ catalog validator synthetic tests: 11/11 PASS.
- AMQ/EMQ/MIX source pool, blacklist and audio qualification tests: 11/11 PASS.
- Stage 3 EMQ loader synthetic suite rerun: 9/9 PASS.
- Candidate301 regression probe: expected FAIL reproducing old duplicate-work-ID getter defect.
- Full Chromium E2E: NOT RUN; headless attempt timed out without DOM output.
- Real `data.js` / `emq-data.js`: BLOCKED, not found locally or via GitHub code search.
- Candidate302 HTML remote upload/hash verification: BLOCKED; remote file path returns NOT_FOUND.
- Candidate299 routing and Candidate301 full CRUD/backup regression: NOT RUN.

See `STAGE4_DATA_INITIALIZATION_REGRESSION_REPORT.md` and the two stage4 test harnesses.
