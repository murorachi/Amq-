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
