# CURRENT_STATUS — Candidate295 baseline / Candidate301 Stage 2 custom-list checkpoint (2026-10-25)

## Baseline
- Formal user-authorized baseline: Candidate295, `index-old.html`.
- Version: `v82.86.06-candidate295-db-extraction-20261025`.
- Bytes: 1,720,917; SHA-256: `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`.
- Candidate295 remains unchanged.

## Stage 1
- Candidate299 route acceptance was confirmed by the user.
- Candidate299 SHA-256: `1e7a37cef7a7d791c5dd40f09c2143b2e507dac76c73951e5060b82f5c44c2e4`.

## Stage 2 candidate
- Parent checkpoint: Candidate300, 1,717,671 bytes, SHA-256 `5fea42650ede3b8b779afdf7b61e42365388d41b34e4231988065eb2fb7d34a5`.
- Current candidate: `amq_learning_tool_v82_86_12_candidate301_custom_list_error_state_hardening_20261025.html`.
- Version: `v82.86.12-candidate301-custom-list-error-state-hardening-20261025`.
- Bytes: 1,720,241; SHA-256: `e8eb07ccab26b6e424eda9aed11d1c21b90cca9c544ed2b6843096e3b6762454`.
- Candidate301 is a child candidate, not the formal baseline.

## Stage 2 results
- PASS: 67/67 executable inline JavaScript syntax blocks.
- PASS: 109 CSS blocks / 2,808 top-level rules / zero parser errors.
- PASS: 271 HTML IDs, all unique.
- PASS: adapter tests 7/7; store/UI tests 7/7; playback-pool tests 3/3; selector synchronization PASS; backup/restore tests 5/5.
- PASS: controlled Chromium harness tests have zero page errors after synthetic DB/storage stubs.
- Changes: central AMQ list read adapter; distinct empty/invalid/unavailable states; CRUD/membership through canonical store; playback pool and selectors consume adapter; UI shows explicit read failure; duplicate backup handler removed; full and legacy backup payloads validated before commit; corrupt raw data preserved in recovery keys.
- Stage 2 engineering and controlled acceptance are complete. Real catalog end-to-end checks remain BLOCKED and are not represented as PASS.

## Blockers / NOT RUN
- `data.js` and `emq-data.js` absent from workspace: real AMQ/EMQ data integration NOT RUN/BLOCKED.
- Chromium direct file and localhost navigation return `ERR_BLOCKED_BY_ADMINISTRATOR`; no user-style double-click end-to-end test in this environment.
- Candidate301 HTML upload and remote SHA verification BLOCKED; docs/report upload is separate and does not imply the HTML was uploaded.
- Real-data visual, audio playback and multiplayer sessions NOT RUN.

## Reports
- Stage 2 report: `reports/stage2-candidate301-custom-list-acceptance-20261025/STAGE2_CUSTOM_LIST_ACCEPTANCE_REPORT_CANDIDATE301_20261025.md`.
- Test summary JSON: `reports/stage2-candidate301-custom-list-acceptance-20261025/STAGE2_TEST_SUMMARY_CANDIDATE301_20261025.json`.

## Rollback
- Candidate301 regression: return to Candidate300 SHA-256 `5fea42650ede3b8b779afdf7b61e42365388d41b34e4231988065eb2fb7d34a5`.
- Stage 2 data-safety regression: return to user-confirmed Candidate299 SHA-256 `1e7a37cef7a7d791c5dd40f09c2143b2e507dac76c73951e5060b82f5c44c2e4`.
- Formal fallback remains untouched Candidate295 SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`.
