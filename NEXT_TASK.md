# NEXT_TASK — Continue from user-authorized Candidate277 baseline

## Active baseline
- File: `amq_learning_tool_v82_85_91_candidate277_custom_list_name_normalization_20261025.html`
- Version: `v82.85.91-candidate277-custom-list-name-normalization-20261025`
- Size: 9,373,238 bytes
- SHA-256: `b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371`
- Direct rollback parent Candidate276 SHA-256: `7a604c1d2d604b928d2ccb51dbb55d58ead2d34f73abfcba27693c794a4ddbd5`
- User explicitly authorized Candidate277 as the working baseline on 2026-10-25. Do not block work on recovering Candidate212. Do not claim Candidate277 is byte-identical to Candidate212.

## Execution order
1. Continue Batch 2 dependency mapping: workspace/router lifecycle; custom-list create/select/delete and selector sync; storage key readers/writers; CSS cascade groups; observer/timer teardown.
2. Distinguish confirmed dead code from uncertain dynamic references. Delete only after caller, indirect-reference and data-compatibility checks.
3. Every source edit creates a new uniquely named child candidate. Never overwrite Candidate277 or Candidate276.
4. Run static tests and relevant regressions; browser-only checks remain NOT RUN/BLOCKED until a permitted browser runtime exists.
5. Update CURRENT_STATUS.md, BASELINE.md, NEXT_TASK.md, test report and handoff after each stage.
6. Attempt isolated GitHub artifact upload and verify remote version, byte size and SHA-256 before claiming success.

## Guardrails
- Do not infer runtime success from static inspection.
- Do not remove CSS solely because selectors repeat.
- Do not merge AMQ/EMQ storage schemas without migration and rollback proof.


## Stage57 handoff: Batch2 static inventory closed, Batch3 remains
1. Keep Candidate277 immutable as the user-authorized baseline. Stage55 is the main dependency inventory; Stage57 is targeted gap coverage, not a full AST/runtime call graph.
2. Batch3 begins with a uniquely named child candidate to correct `<title>` and `data-amq-candidate` metadata only after preserving the baseline and running static checks.
3. Then prioritize P0 acceptance where an allowed browser runtime exists: route/workspace repeat switching and cleanup; custom-list create/select/delete/filter/reload persistence; Song Select keyboard/DOM stability. Mark unavailable browser checks BLOCKED/NOT RUN.
4. User wants to discuss new features in Batch3; do not expand scope in Batch2. Capture requirements before implementation, but do not block this handoff on them.
5. Isolated GitHub delivery of Stage57 report and status/handoff docs is attempted separately from HTML delivery. Do not claim HTML binary upload or remote hash verification unless verified.
