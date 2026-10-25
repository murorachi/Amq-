# NEXT_TASK.md — Candidate302 promotion and cleanup continuation

## Current baseline
Candidate302 is now the formal maintenance baseline by explicit user authorization and reported local verification:
- `amq_learning_tool_v82_86_13_candidate302_emq_loader_state_validation_20261025.html`
- 1,720,249 bytes
- SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`

Candidate295 remains the preserved rollback baseline (SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`). Never overwrite either file. Create a uniquely named candidate for every future code change.

## Highest-priority next steps
1. **Remote artifact verification:** make the exact Candidate302 HTML available on the intended GitHub branch, download the raw remote file, and compare SHA-256 with `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`. The Stage 6 branch has updated documentation, but the remote HTML body/hash is not yet independently verified.
2. **Complete feature inventory:** classify each feature as KEEP / INTEGRATE / DELETE / NEEDS CONFIRMATION. Include HTML, CSS, JS, listeners, initialization, routes, timers, observers, storage schema, build sources, formal HTML and tests.
3. **Dependency mapping:** trace entry points, callers/callees, dynamic references, initialization order, routing, state/data writes, persistence and indirect dependencies for each candidate deletion.
4. **Consolidation:** choose one canonical implementation for confirmed duplicate functionality; move necessary behavior first, then remove duplicate code and test the migrated path.
5. **Actual deletion:** remove confirmed obsolete markup, styles, handlers and initialization logic instead of hiding/disabling them. Preserve unresolved candidates with evidence and a verification plan.
6. **Targeted regression:** after each deletion batch, test affected initialization, DOM stability, routing, duplicate event binding, workspace switching, persistence, AMQ/EMQ/MIX pools, media, custom-list CRUD/import/export and backup/restore as applicable.
7. Update reports and all status documents with PASS / FAIL / NOT RUN / BLOCKED. Do not claim browser E2E from static or synthetic tests.

## Known evidence and cautions
- Stage 6 static audit: PASS for Candidates 295/299/300/301/302.
- Candidate302 isolated synthetic tests: 40/40 PASS; real catalog structural audit PASS.
- Browser automation in this environment timed out; user separately reports local Candidate302 verification complete, but a case-by-case manual test record is not in this repo.
- 495 AMQ rows have no media value in the current extractor's source slots; do not modify these records without upstream schema evidence.

## Definition of done
All six cleanup goals must have auditable artifacts: complete feature inventory; dependency map; canonical implementation map; deletion ledger with before/after evidence; regression matrix with reproducible test results; and verified final HTML plus exact remote SHA-256. Promotion of Candidate302 alone does not satisfy the six goals.
