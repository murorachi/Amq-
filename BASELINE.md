# BASELINE.md

## Formal maintenance baseline (promoted 2026-10-25)
- File: `amq_learning_tool_v82_86_13_candidate302_emq_loader_state_validation_20261025.html`
- Version: `v82.86.13-candidate302-emq-loader-state-validation-20261025`
- Size: 1,720,249 bytes
- SHA-256: `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`
- Status: formal baseline by user authorization after local verification. Treat as read-only; all future changes use a unique new candidate.
- Candidate295 remains immutable rollback: 1,720,917 bytes; SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`.

## Candidate302 acceptance evidence
- Static audit PASS: 67 executable inline JS blocks, 109 style blocks, 2,808 top-level CSS rules, 271 unique IDs.
- Source-derived EMQ loader tests 9/9 PASS; prior isolated regression suites 40/40 PASS.
- Real catalog structural audit PASS (prior stage evidence).
- User reports local verification complete. Full automated browser E2E was not independently reproduced in this environment.

## Cleanup work
- Batch 1 feature inventory report: `FEATURE_INVENTORY_BATCH1_CANDIDATE302_20261025.md`.
- Batch 1 identified KEEP / INTEGRATE / DELETE / NEEDS CONFIRMATION categories. No code was deleted in this batch; no item met the direct-delete evidence threshold.
- Batch 2: dependency tracing for route wrappers, storage owners/schema, custom-list APIs, listeners/observers/timers and CSS selector ownership.
- Candidate302 HTML body still needs to be added to the intended remote branch and its downloaded SHA-256 compared. Documents describing the hash are not proof that the HTML itself exists remotely.

## Rollback
Use the preserved Candidate295 file only after verifying SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`. Never overwrite either baseline file.


## 2026-10-25 Batch 2 dependency trace
- Candidate302 remains byte-identical: 1,720,249 bytes; SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Static evidence identifies the core `showView`, generic navigation wrapper, final Song Select route guard, in-place workspace mode, AMQ custom-list canonical store, backup allowlist, separate EMQ list schema, and high-density observer/timer/CSS areas.
- Batch 2 source-evidence assertions: 10/10 PASS. Browser route E2E, computed-style checks, lifecycle instrumentation, and custom-list/backup restore interaction tests remain NOT RUN.
- No application source changes or deletions in Batch 2; DELETE=0.
- Full report and evidence JSON are being delivered as separate artifacts. Candidate302 HTML itself still returns NOT_FOUND on this branch; remote artifact/hash verification remains BLOCKED.


## 2026-10-25 Batch 3
- Formal Candidate302 source unchanged (1,720,249 bytes; SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`).
- Isolated route tests 14/14 PASS; isolated storage repository tests 6/6 PASS. Both use synthetic/stubbed dependencies, not full-app E2E.
- No application code changed/deleted; Candidate295 remains rollback.
- Candidate302 remote HTML still NOT_FOUND; remote artifact verification BLOCKED.


## 2026-10-25 Batch 4
- Candidate302 remains unchanged and is the formal baseline (1,720,249 bytes; SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`).
- Expanded isolated route matrix: 15/15 PASS, 0 page errors; stubbed dependencies, not full-app E2E.
- Storage ownership review: AMQ custom lists remain owned by `v82-25-custom-lists-and-practice-hub`; AMQ recovery snapshots remain required; EMQ lists and selected scope remain owned/written by the EMQ module. AMQ and EMQ schemas must not be merged.
- No application source changes/deletions. Candidate302 HTML remains NOT_FOUND remotely; remote hash is unverified.


## 2026-10-25 Batch 5
- Candidate302 remains immutable and locally verified at 1,720,249 bytes, SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Static lifecycle inventory covered 70 inline script blocks; 14 high-priority scripts were shortlisted for future runtime instrumentation. No leak is claimed from counts alone.
- Chromium computed-style probe PASS for present static DOM and CSS at 1440x900, with inline scripts removed; dynamic nodes and full-app behavior were not tested.
- No app source changes/deletions. Remote artifact verification remains BLOCKED; full-app E2E remains NOT RUN.


## 2026-10-25 Batch 6
- Candidate302 remains unchanged: 1,720,249 bytes; SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Isolated lifecycle stress probe: 12/12 selected scripts initialized without uncaught errors; 0 browser page errors; 20 synthetic route cycles per script showed no net active listener/observer growth in the harness.
- Manual reinjection duplicates were observed for eight scripts; this is a controlled reinjection finding, not proof of a production leak. No deletion is approved from this evidence alone.
- Active multiplayer session poll/socket cleanup and full-app E2E remain NOT RUN. No app source changed/deleted.


## 2026-10-25 Batch 7
- Candidate302 unchanged: 1,720,249 bytes; SHA-256 f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd.
- Isolated Chromium fake-server test passed for classic/team initialization, polling start, route-away poll stop, team WebSocket close, and local session release; 0 page errors.
- Heartbeat continues after route-away while the session is retained; pending design question, not classified as a defect.
- Static topology: 70 inline scripts; no duplicate IDs or duplicated non-empty source hashes; all eight manual-reinjection candidates appear once.
- No application code modified or deleted. Full-app E2E NOT RUN; remote HTML hash verification BLOCKED/NOT_FOUND.


## Batch 8 candidate (not promoted as formal baseline)
- Formal baseline remains Candidate302: `amq_learning_tool_v82_86_13_candidate302_emq_loader_state_validation_20261025.html`, 1,720,249 bytes, SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Candidate303: `amq_learning_tool_v82_86_14_candidate303_opencc_shared_loader_20261025.html`, 1,720,527 bytes, SHA-256 `ffb223a37f2ba7f243430c7e0a643f8916ebae13f809d83cc2b8cbd9153df1c8`.
- Candidate303 changes only script blocks 31 and 41 to consolidate duplicate OpenCC injection. Tests: 67/67 script syntax PASS, 3/3 isolated Chromium tests PASS. Full-app E2E NOT RUN; do not promote until broader AMQ/EMQ workflow tests and user browser verification.
- Candidate302 and Candidate295 remain immutable rollback points.


## Batch 9 candidate (not promoted)
- Formal baseline remains Candidate302, 1,720,249 bytes, SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Candidate304: `amq_learning_tool_v82_86_15_candidate304_opencc_and_diagnostic_cleanup_20261025.html`, 1,720,215 bytes, SHA-256 `afec1555f4e6a56bb39ffac2622d16a148656ee5c4c5c50a3bb5aa7eab254f21`.
- Changes: shared OpenCC loader for AMQ/EMQ title services; remove diagnostic-only `v41-classification-diagnostic` with no internal readers. 2 scripts modified, 1 deleted, CSS unchanged.
- Tests: JS syntax 66/66 PASS; OpenCC isolated Chromium 3/3 PASS; synthetic EMQ loader 9/9 PASS. Full-app E2E NOT RUN; do not promote until broader/browser verification.

## Candidate chain update — Batch 10
- Formal baseline is unchanged: Candidate302, SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Candidate305 is an unpromoted child of Candidate304. Candidate305 SHA-256: `3bcaaa70fe05b130dd302462a1ef2aa41fbed855f2e12526d526c7675bd07e9f`, 1,670,933 bytes.
- Batch10 removed 1,432 provably superseded CSS declarations and 167 empty rules. Static CSS/JS and computed-style checks passed; full-app E2E is NOT RUN.
- Rollback: use immutable Candidate302 formal baseline, or recreate Candidate305 from Candidate304 (`afec1555f4e6a56bb39ffac2622d16a148656ee5c4c5c50a3bb5aa7eab254f21`). Do not promote Candidate305 without user acceptance.
