# CURRENT_STATUS.md

Updated: 2026-10-25
Stage: Stage 4 — final acceptance attempt.
State: **BLOCKED**. Local synthetic validation and reporting are complete; required real-data and browser acceptance are not.

## Protected versions
- Formal maintenance baseline: Candidate295, 1,720,917 bytes, SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`.
- Latest test target: Candidate302, 1,720,249 bytes, SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Candidate301 SHA-256: `e8eb07ccab26b6e424eda9aed11d1c21b90cca9c544ed2b6843096e3b6762454`.
- No production code change in Stage 4; no Candidate303 is assigned. Candidate295 remains formal baseline.

## Executed tests
- Candidate302 catalog validator synthetic tests: PASS 11/11.
- Candidate302 source pool/audio/blacklist synthetic tests: PASS 11/11.
- Candidate302 EMQ loader synthetic suite rerun: PASS 9/9.
- Candidate301 regression probe: EXPECTED FAIL, reproduces the old duplicate-work-ID getter defect.
- Chromium full browser E2E: NOT RUN (timeout/no DOM output).
- Candidate299 route matrix: NOT RUN.
- Candidate301 CRUD/import/export/backup-restore: NOT RUN.

## Acceptance blockers
- Real `data.js` and `emq-data.js` absent locally and no matches in GitHub code search; real-catalog validation BLOCKED.
- Candidate302 HTML upload and remote hash verification BLOCKED; remote path returned NOT_FOUND.
- No browser E2E pass is claimed.

See `STAGE4_FINAL_ACCEPTANCE_REPORT_20261025.md` and machine-readable test outputs. Preserve Candidate295; do not promote Candidate302.
