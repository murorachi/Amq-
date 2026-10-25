# NEXT_TASK.md — After Stage 6

Stage 6 completed for work that can be verified with the available candidate files and isolated tests. Candidate295 remains the sole formal baseline.

1. **Highest value:** run Candidate302 locally with the user's matching `data.js` and `emq-data.js` in the same folder. Verify full-page initialization, AMQ/EMQ/MIX mode, question/skip/next flow and actual audio playback. Do not upload the large data files.
2. Upload the exact Candidate302 HTML to the intended GitHub branch using a user/local upload path, then download the remote raw bytes and compare SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`. Until verified, do not claim remote HTML delivery.
3. If investigating the 495 AMQ songs with no media fields, compare the upstream schema/source contract before changing data. Do not invent audio URLs or silently patch source rows.
4. After browser verification, re-run Candidate299 route and Candidate301 custom-list/backup acceptance where the tested candidate lineage makes that relevant.
5. Only consider promoting Candidate302 after the missing runtime evidence is collected. Do not overwrite Candidate295.

Artifacts: `STAGE6_FINAL_REPORT_20261025.md`, `STAGE6_STATIC_AUDIT_RESULTS.json`, `STAGE6_EMQ_REGRESSION_RESULTS.json`, `stage6_emq_loader_regression_tests.cjs`.
