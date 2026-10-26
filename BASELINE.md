# BASELINE.md

Updated: 2026-10-26 (Candidate359, Song Select cleanup pass)

## Formal baseline (immutable)
- Candidate302: `amq_learning_tool_v82_86_13_candidate302_emq_loader_state_validation_20261025.html`
- Recorded size: 1,720,249 bytes
- Recorded SHA-256: `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`
- The baseline file is not present locally and the recorded hash was not recomputed in this session.

## Latest experimental candidate (not baseline)
- Candidate359: `amq_learning_tool_v82_86_70_candidate359_remove_dead_songselect_shortcuts_20261026.html`
- Size: 1610257 bytes
- SHA-256: `e67498b5d3fbad2424ce06021d523a85a79370b09327022a77cadbd0ec6a28bd`
- Immediate rollback Candidate358: SHA-256 `fb3a0efe0cb9f1bb6cb571b631bf180b4675bb8123af680a870516851f20c7eb`
- Changes: 132 cascade-dead selector/declaration pairs and 11 fully superseded rules removed; 33 adjacent static style blocks merged into 11; runtime layout owners integrated; old Back and duplicate scene shortcut removed.
- Static checks PASS. Real-browser regression NOT RUN. HTML remote upload/readback NOT VERIFIED.
- Detailed owner classification: `AMQ_CANDIDATE354_SONGSELECT_STYLE_OWNER_MAP_20261026.md`.
- Historical rollback records follow; older “latest candidate” labels are superseded by this checkpoint.


