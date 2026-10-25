# CURRENT_STATUS.md

Updated: 2026-10-25
Stage: Candidate302 promoted; project cleanup remains in progress.
State: **Candidate302 is the formal maintenance baseline by user authorization. The six-goal cleanup project is NOT complete.**

## Formal baseline
- File: `amq_learning_tool_v82_86_13_candidate302_emq_loader_state_validation_20261025.html`
- Version: `v82.86.13-candidate302-emq-loader-state-validation-20261025`
- Size: 1,720,249 bytes
- SHA-256: `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`
- User reports local verification is complete and explicitly authorized promotion.
- Rollback baseline Candidate295 is preserved: 1,720,917 bytes; SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`.
- Candidate301 remains the immediate code-level rollback reference for Candidate302's loader change, but it has a known readiness-state defect.
- No Candidate303 has been created.

## Stage 6 evidence
- Static checks for Candidates 295/299/300/301/302: all PASS; 67 executable inline JS blocks, 109 style blocks, 2,808 top-level CSS rules, 271 unique HTML IDs per candidate.
- Candidate302 source-derived EMQ loader tests: 9/9 PASS; Candidate301 reproduces the known regression.
- Existing synthetic suites: EMQ loader 9/9, AMQ catalog validator 11/11, pool/audio/blacklist 11/11 PASS. Combined isolated tests: 40/40 PASS.
- Real catalog audit PASS: AMQ data.js 4,975,244 bytes, SHA-256 `692f69f56079d6cc0b30bd1951ab625f53799b87525c1bd52a27f29274703cf3`; 9,516 works / 38,821 songs. EMQ emq-data.js 2,684,266 bytes, SHA-256 `88441b4a6090c01db1dae23c970a6fa24d457a54f4b915be3e23c3799b3794cc`; 6,645 works / 16,839 songs. Invalid/duplicate IDs, missing EMQ associations, and cross-source ID collisions: 0.
- 495 AMQ songs have no media values in row slots 9/10/11. No source corruption has been established.

## Six-goal cleanup progress (qualitative, evidence-based)
1. Function inventory: **PARTIAL**. Existing inventories and audits cover important subsystems, not every HTML/CSS/JS feature and all dynamic references.
2. Dependency tracing: **PARTIAL**. Several loader, pool, route and storage paths have been inspected; no complete cross-project dependency graph exists.
3. Duplicate implementation consolidation: **NOT COMPLETE**. No evidence supports claiming all duplicated UI/business logic/configuration/routing has one canonical implementation.
4. Deprecated code removal: **NOT COMPLETE**. Stage 6 primarily audited and regression-tested; it did not perform the broad confirmed deletion pass.
5. Regression testing: **PARTIAL**. Static, synthetic and real-catalog audits pass; browser-driven end-to-end coverage and several CRUD/import/export/backup/restore flows do not have reproducible test reports in this package. User has separately reported local Candidate302 verification complete, but detailed test cases were not supplied here.
6. Final delivery: **PARTIAL**. Reports/scripts are on the Stage 6 branch; remote Candidate302 HTML content/hash still needs independent verification.

## Explicit test status
- Static JS/CSS/HTML-ID audit: PASS.
- Isolated synthetic regression suites: PASS 40/40.
- Real catalog structural audit: PASS.
- Automated browser E2E: NOT RUN / BLOCKED by headless Chromium timeout in this environment.
- Actual audio playback, full-page initialization and AMQ/EMQ/MIX browser flows: user reports local verification complete; not independently reproduced by this environment.
- Remote Candidate302 HTML download-and-hash comparison: NOT VERIFIED.
- Full six-goal cleanup acceptance: NOT COMPLETE.

## Next work
Follow `NEXT_TASK.md`: verify the promoted HTML is available in the intended remote branch and hash-matches; then continue a scoped feature/dependency inventory, only delete confirmed deprecated code, consolidate duplicate implementations, and run regression tests for each affected area. Keep Candidate295 as rollback; never edit the formal baseline in place.
