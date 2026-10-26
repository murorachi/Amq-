# Candidate359 Song Select Cleanup Summary

- Candidate: `amq_learning_tool_v82_86_70_candidate359_remove_dead_songselect_shortcuts_20261026.html`
- Size: 1610257 bytes
- SHA-256: `e67498b5d3fbad2424ce06021d523a85a79370b09327022a77cadbd0ec6a28bd`
- Immediate rollback Candidate358 SHA-256: `fb3a0efe0cb9f1bb6cb571b631bf180b4675bb8123af680a870516851f20c7eb`
- Formal baseline Candidate302 remains unchanged.

## Changes
- Removed 132 selector/declaration pairs proven cascade-dead and 11 rules with no surviving declarations.
- Merged 33 adjacent static Song Select styles into 11 consolidated blocks, removing 22 style tags; total style blocks 109 → 87.
- Integrated Candidate158 overflow behavior into Candidate106; integrated Candidate103 dock/audio-control behavior into Candidate99; Candidate185 delegates dock layout to Candidate99; Candidate71 no longer competes with Candidate106 for catalog/filter/mount geometry.
- Removed old `#amqSongSelectBackButton` creator and 8 CSS rules; removed duplicate `#amqSceneBgQuickOpen` creator and 3 CSS rules plus its dead remover.
- Preserved current C99 Back/Home, Escape behavior, ranking placeholder, Candidate137 list component, Candidate210 row factory/actions, Candidate185 modal lifecycle, Candidate71 home/workspace functions.

## Static verification
- PASS: 63 executable inline JavaScript blocks, 0 syntax errors.
- PASS: CSS parse, 0 errors; 3,397 CSS rules / 11,339 declarations.
- PASS: 245 unique IDs, 0 duplicates.
- NOT RUN: real-browser visual/route regression.
- NOT VERIFIED: Candidate359 HTML upload and remote SHA-256 readback.

Candidate359 remains experimental; Candidate358 is the direct rollback. Static checks do not prove final visual behavior.
