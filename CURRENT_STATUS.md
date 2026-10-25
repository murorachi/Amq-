# CURRENT_STATUS — Candidate295 baseline / Candidate299 Stage 1 route checkpoint (2026-10-25)

## Baseline
- User-authorized baseline: Candidate295, `index-old.html`.
- Version: `v82.86.06-candidate295-db-extraction-20261025`.
- Bytes: 1,720,917; SHA-256: `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`.
- Candidate295 remains unchanged.

## Latest child candidate
- File: `amq_learning_tool_v82_86_10_candidate299_route_acceptance_20261025.html`.
- Version: `v82.86.10-candidate299-route-acceptance-20261025`.
- Bytes: 1,719,884; SHA-256: `1e7a37cef7a7d791c5dd40f09c2143b2e507dac76c73951e5060b82f5c44c2e4`.
- Parent Candidate298 SHA-256: `5fa8f137c9aa6b3fdaafbadff44fec846673bcc1617ad94b2d6f484e8d74ac4a`.
- Changes: prevent delayed route-guard rewrapping; close home overlay on intercepted routes; assign `amq-workspace-active` to the existing visibility observer only; route inactive `vnList` through its canonical API.
- Candidate299 is not yet the formal baseline.

## Tests
- PASS: 67/67 executable inline JavaScript blocks pass Node.js `--check`.
- PASS: 109 CSS blocks / 2,808 top-level qualified rules / zero stylesheet-level parser errors.
- PASS: 271 HTML IDs, all unique.
- PASS: 36/36 route harness assertions, zero failures and zero page errors. Tests use a synthetic empty DB and storage substitutes, so this validates routing behavior only.
- PASS: Candidate295 original size and SHA-256 unchanged.
- BLOCKED: direct file and local HTTP navigation from Chromium both return `ERR_BLOCKED_BY_ADMINISTRATOR`; this prevents user-style double-click runtime validation in this environment.
- BLOCKED: `data.js` and `emq-data.js` are absent from this workspace, so real AMQ/EMQ data and non-empty panels are not validated.
- BLOCKED: Candidate299 HTML upload and remote SHA-256 verification are not completed.
- NOT RUN: real-data visual review, browser history back/forward, audio playback, multiplayer sessions, CRUD/persistence/backup regression.

## Stage 1 status
The code-level route fixes and controlled route matrix pass. Stage 1 is not fully closed until the candidate is tested locally with the matching `data.js` and `emq-data.js`.

## Reports
- Stage 1 report: `reports/stage1-candidate299-route-acceptance-20261025/STAGE1_ROUTE_ACCEPTANCE_REPORT_CANDIDATE299_20261025.md`.
- Candidate296 route consolidation report remains historical: `reports/stage6-candidate296-route-guard-consolidation-20261025/ROUTE_GUARD_CONSOLIDATION_CANDIDATE296_20261025.md`.

## Rollback
Use the untouched Candidate295 baseline file. Do not overwrite it with Candidate299.
