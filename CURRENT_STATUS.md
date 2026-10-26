# CURRENT_STATUS.md

Updated: 2026-10-26 (Candidate359, Song Select cleanup pass)

## Current state
- Formal baseline: Candidate302, immutable. Recorded SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`; baseline HTML is unavailable locally for fresh hashing.
- Latest experimental candidate: Candidate359, not promoted.
- Candidate359: `amq_learning_tool_v82_86_70_candidate359_remove_dead_songselect_shortcuts_20261026.html`, 1610257 bytes, SHA-256 `e67498b5d3fbad2424ce06021d523a85a79370b09327022a77cadbd0ec6a28bd`.
- Immediate rollback Candidate358: 1,613,182 bytes, SHA-256 `fb3a0efe0cb9f1bb6cb571b631bf180b4675bb8123af680a870516851f20c7eb`.
- Since Candidate353: file reduced by 8,819 bytes.
- CSS cleanup: removed 132 cascade-dead selector/declaration pairs and 11 rules with no surviving declarations; merged 33 adjacent static Song Select style blocks into 11, reducing total style blocks 109 → 87.
- Runtime ownership: Candidate158 overflow integrated into Candidate106; Candidate103 dock/audio-control behavior integrated into Candidate99; Candidate185 now delegates dock layout to Candidate99; Candidate71 no longer competes with Candidate106 for catalog/filter/mount geometry.
- Dead UI removed: old `#amqSongSelectBackButton` creator and 8 CSS rules; duplicate `#amqSceneBgQuickOpen` creator and 3 CSS rules plus dead remover.
- Static PASS: 63 executable inline JS blocks, 0 syntax errors; CSS 0 parse errors, 3,397 rules / 11,339 declarations; 245 unique IDs, no duplicates.
- Browser visual/route regression: NOT RUN. Candidate346's earlier 24/24 user-reported PASS does not prove Candidate359.
- GitHub docs/reports readback: PASS. Candidate359 HTML upload and remote SHA-256 readback: NOT VERIFIED.
- Formal release: NOT READY.

## Next action
Continue only with source-side Song Select cleanup where dead behavior or overlapping ownership is proven. Review Candidate72 curved frame and Candidate115 artwork as KEEP / DELETE / NEEDS CONFIRMATION, then run one consolidated browser regression after the cleanup scope closes. Do not ask the user to test every intermediate candidate.
