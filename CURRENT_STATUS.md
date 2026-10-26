# CURRENT_STATUS.md

Updated: 2026-10-26 (Candidate360, Song Select cleanup pass)

## Current state
- Formal baseline: Candidate302, immutable. Recorded SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`; baseline HTML is unavailable locally for fresh hashing.
- Latest experimental candidate: Candidate360, not promoted.
- Candidate360: `amq_learning_tool_v82_86_71_candidate360_remove_redundant_arc_route_observer_20261026.html`, 1,610,053 bytes, SHA-256 `9ac93c28ba456cfd4f5b7b1694d8178da9505c119fb52fff9fe8ae5bff31b923`.
- Immediate rollback Candidate359: 1,610,257 bytes, SHA-256 `e67498b5d3fbad2424ce06021d523a85a79370b09327022a77cadbd0ec6a28bd`.
- Candidate360 change: removed Candidate72 curved-frame route observer and redundant inline display writes; CSS owns visibility, one-time element creation retained; Candidate115 unchanged.
- Since Candidate353: file reduced by 9,023 bytes.
- CSS cleanup: removed 132 cascade-dead selector/declaration pairs and 11 rules with no surviving declarations; merged 33 adjacent static Song Select style blocks into 11, reducing total style blocks 109 → 87.
- Runtime ownership: Candidate158 overflow integrated into Candidate106; Candidate103 dock/audio-control behavior integrated into Candidate99; Candidate185 now delegates dock layout to Candidate99; Candidate71 no longer competes with Candidate106 for catalog/filter/mount geometry.
- Dead UI removed: old `#amqSongSelectBackButton` creator and 8 CSS rules; duplicate `#amqSceneBgQuickOpen` creator and 3 CSS rules plus dead remover.
- Candidate359 static PASS: 63 executable inline JS blocks, 0 syntax errors; CSS 0 parse errors, 3,397 rules / 11,339 declarations; 245 unique IDs, no duplicates. Candidate360 static PASS: 63 executable inline JS blocks, 0 syntax errors; CSS 0 parse errors, 3,397 rules / 11,339 declarations; no duplicate IDs.
- Browser visual/route regression: NOT RUN. Candidate346's earlier 24/24 user-reported PASS does not prove Candidate359 or Candidate360.
- GitHub status, baseline, next-task, Candidate360 report and owner-map docs readback: PASS. Candidate360 HTML upload and remote SHA-256 readback: NOT VERIFIED.
- Formal release: NOT READY.

## Next action
Continue only with source-side Song Select cleanup where dead behavior or overlapping ownership is proven. Candidate72 curved frame is KEEP/INTEGRATE: visible element and responsive geometry retained, redundant observer removed. Candidate115 artwork is KEEP for non-primary AMQ/EMQ inline lists. Continue bounded cleanup, then run one consolidated browser regression. Do not ask the user to test every intermediate candidate.
