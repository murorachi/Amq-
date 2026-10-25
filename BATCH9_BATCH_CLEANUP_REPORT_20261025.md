# Batch 9 — Bulk triage and first confirmed cleanup

Formal baseline Candidate302 remains immutable (1,720,249 bytes; SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`). Candidate304 is `amq_learning_tool_v82_86_15_candidate304_opencc_and_diagnostic_cleanup_20261025.html` (1,720,215 bytes; SHA-256 `afec1555f4e6a56bb39ffac2622d16a148656ee5c4c5c50a3bb5aa7eab254f21`).

Changes: shared OpenCC loader across AMQ/EMQ Chinese-title services; delete `v41-classification-diagnostic`, whose only internal effect was writing `window.__v41LastClassifiedSong` and which had no internal reader. Two scripts modified, one deleted, CSS unchanged.

Tests: JavaScript syntax 66/66 PASS; isolated OpenCC Chromium tests 3/3 PASS; synthetic EMQ loader regression 9/9 PASS; duplicate DOM IDs 0. Full-app E2E NOT RUN.

Bulk CSS scan: 109 style blocks, 3,637 rules, 651 repeated selector groups and 1,385 extra occurrences. Counts are triage evidence only, not deletion authorization. Candidate304 HTML upload and remote hash verification remain blocked.
