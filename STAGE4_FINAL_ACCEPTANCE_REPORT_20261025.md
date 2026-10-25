# AMQ Stage 4 — Final Acceptance Attempt Report

Date: 2026-10-25
Branch: `amq-stage4-data-init-regression-20261025`

## Decision

**Stage 4 acceptance is BLOCKED, not passed or fully completed.** All safe local synthetic suites were run and the documentation/package checkpoint is complete. Remaining acceptance criteria require source files and an executable browser environment that are unavailable here. No production HTML changes were made, so no new candidate number is assigned and no candidate is promoted.

## Protected baseline and test target

- Formal baseline: Candidate295 `amq_learning_tool_v82_86_06_candidate295_db_extraction_20261025.html`
  - Size: 1,720,917 bytes
  - SHA-256: `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`
- Latest test target: Candidate302 `amq_learning_tool_v82_86_13_candidate302_emq_loader_state_validation_20261025.html`
  - Size: 1,720,249 bytes
  - SHA-256: `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`
- Candidate301 SHA-256: `e8eb07ccab26b6e424eda9aed11d1c21b90cca9c544ed2b6843096e3b6762454`
- Candidate295 remains the only formal maintenance baseline. Candidate302 is not promoted.

## Executed results

| Test | Result | Evidence / scope |
|---|---|---|
| Candidate302 AMQ catalog snapshot validation | PASS, 11/11 | Synthetic inputs against actual extracted validator function |
| Candidate302 AMQ/EMQ/MIX pool, blacklist and audio filtering | PASS, 11/11 | Synthetic dependencies against actual extracted candidate functions |
| Candidate302 EMQ loader validation (Stage 3 suite rerun) | PASS, 9/9 | Machine-readable result uploaded alongside this report |
| Candidate301 regression reproduction | EXPECTED FAIL | Candidate301 probe demonstrates the old duplicate-work-ID count leak; not a Candidate302 failure |
| Formal browser E2E | NOT RUN | Chromium attempts timed out without DOM output; no browser pass claimed |
| Candidate299 route matrix | NOT RUN | No usable browser harness/session available |
| Candidate301 CRUD/import/export/backup-restore regression | NOT RUN | No usable browser harness/session available |

## Blockers confirmed

1. `data.js` and `emq-data.js` are absent from available local files. GitHub code search in `murorachi/Amq-` also returned no matching files. Real-catalog schema, cross-source ID uniqueness, song-to-work associations, audio eligibility and actual pool counts cannot be verified.
2. Chromium headless did not return DOM output before timeout. Full initialization/runtime/console/network browser acceptance is NOT RUN, not PASS.
3. Candidate302 HTML has not been uploaded to the Stage 4 GitHub branch. The remote file lookup returned NOT_FOUND. Remote HTML hash verification is BLOCKED.
4. Candidate299 routing and Candidate301 full CRUD/backup restore are not validated in this checkpoint.

## Changes made

- No production HTML, CSS, JavaScript, routing, storage, or data schema was changed in Stage 4.
- Ran two Candidate302 source-extraction synthetic test harnesses and saved machine-readable outputs.
- Re-ran the Stage 3 EMQ loader suite and preserved the intentional Candidate301 regression reproduction separately.
- Updated status and next-task records and assembled a reproducible package with candidate files, scripts, reports, results and hashes.

## GitHub publication and remote verification

- Branch: `amq-stage4-data-init-regression-20261025`.
- Uploaded and fetched back successfully: this final report, `CURRENT_STATUS.md`, `NEXT_TASK.md`, both Stage 4 test harnesses, and the machine-readable synthetic result files and Candidate301 expected-regression summary.
- Remote Git blob SHA values verified for the harnesses: `stage4_catalog_validation_tests.cjs` = `ae8fab959ab4317c0332bffccbbb1fcd963baab9`; `stage4_pool_regression_tests.cjs` = `0468b865ee91543ecde0ef4b358b861444ab8606`.
- Remote result blob SHA values verified: pool results `7ad3493fe8e7d92baa1a390e5a5d6d603464aa97`; catalog results `4abaeaebbb22107b7f0ae244c8ae29a539ad0b80`; EMQ rerun `8e0f5581d3b37e1e1798bd71c6ade1460cdef5fc`.
- Candidate302 HTML itself remains absent from the remote branch (fetch returned HTTP 404/NOT_FOUND), so remote HTML SHA-256 verification is BLOCKED. Git blob SHA values above are Git object identifiers, not file SHA-256 hashes.

## Rollback and safety

There is no Stage 4 production code delta to roll back. Keep Candidate295 untouched as the formal baseline. Candidate301 and Candidate302 remain separate artifacts. Do not promote Candidate302 until the blockers are resolved.

## Highest-value next work

Recover the exact matching `data.js` and `emq-data.js`, then run real-catalog and browser E2E validation. Once available, run Candidate299 route matrix and Candidate301 CRUD/backup regressions, upload Candidate302 to GitHub, download it back, and verify SHA-256. Until then Stage 4 remains BLOCKED at acceptance.
