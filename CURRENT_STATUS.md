# CURRENT_STATUS — Batch 2 dependency inventory checkpoint (2026-10-25)

- Batch 1: BLOCKED for formal baseline promotion. Candidate212 raw bytes cannot be retrieved to recompute recorded SHA-256.
- Batch 2: static dependency inventory completed for the local Candidate277 audit snapshot; unresolved dynamic/runtime dependencies remain explicitly deferred. No HTML/CSS/JS or user data changed in Stage54/55.
- Batch 3 browser acceptance remains incomplete. Native browser navigation/reload remains blocked; real API/audio/multiplayer/pixel tests NOT RUN.
- Batch 4 code work has not started; the consolidated plan says baseline and dependency inventory precede source changes.

## Local audit snapshot, not accepted baseline
- File: amq_learning_tool_v82_85_91_candidate277_custom_list_name_normalization_20261025.html
- Build comment: v82.85.91-candidate277-custom-list-name-normalization-20261025
- Size: 9,373,238 bytes
- SHA-256: b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371
- Rollback Candidate276 SHA-256: 7a604c1d2d604b928d2ccb51dbb55d58ead2d34f73abfcba27693c794a4ddbd5
- Candidate277 upload/readback/hash verification: NOT RUN.
- Metadata defect: title says Candidate219 and data-amq-candidate says 227, while build comment says Candidate277.

## GitHub state
- main HEAD 0ebea5488149775f55808683e59dbed168fc0363; contains older Proto17 root HTML, not the latest candidate.
- Candidate229 branch HEAD 4ce4af799d00a21390376832af500379e89ef67a.
- Candidate231 branch HEAD d9527cb3e251833c3845a73062d60a89689e812a.
- Candidate264 branch HEAD 830c1cb8f923daa46928d75aed91aa21d6c04bd1; Candidate231 is ancestor by 140 commits.
- Candidate229/231 HTML is recorded in manifests but absent from their remote branch trees.

## Static tests
- PASS: 67/67 executable JS blocks; 109 CSS blocks; 3,628 parsed rules; zero CSS parser/declaration errors; 272 initial DOM IDs unique; local SHA recomputed.
- NOT RUN: native browser interaction/reload, live API/audio/multiplayer, fixed osu!stable pixel comparison.
