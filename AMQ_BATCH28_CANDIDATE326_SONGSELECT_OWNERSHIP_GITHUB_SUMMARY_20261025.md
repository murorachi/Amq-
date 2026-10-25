# Batch28 Candidate326：Song Select ownership／初始化生命週期整併
- Candidate326: `amq_learning_tool_v82_86_37_candidate326_batch28_songselect_lifecycle_ownership_cleanup_20261025.html`, 1,645,785 bytes; SHA-256 `9fee7d3a68c0833b6e84d6f0a3a3beca1ab09902bdb3ec2f8b76f5e60d5db3ba`. Not promoted.
- Based on Candidate325; carries forward Batch27 CSS cleanup and integrates the previously tested Candidate321/324 Song Select changes.
- Candidate106: remove two conflicting catalog overflow assignments. Candidate115: exclude main `#amqSongSelectTracklist` from generic artwork scanner. Candidate210: install stage subtree observer only after route activation, then ensure selection/list/artwork observers bind after tracklist creation.
- PASS: Node syntax 65/65; CSS parse 0 errors; 269 IDs, 0 duplicates. Candidate326 JS hashes match Candidate324; CSS block hashes match Candidate325.
- PASS (isolated test copy): real data startup 9,516 anime / 38,821 songs; synthetic click on hidden legacy Song Select control activates route and creates 180 rows / 180 artwork img nodes; row selection sets song ID 45305; 0 page errors.
- BLOCKED: visible UI click test because the matched legacy control is inside hidden `#amqHomeOverlay`; synthetic click is not user-visible UI acceptance.
- BLOCKED: cover network/fallback; external requests blocked. NOT RUN: real media playback and persistent storage.
- Candidate326 HTML remote upload/hash verification BLOCKED; connector exposes text-content writes but no direct local-file upload action. Candidate302 remains formal baseline; Candidate320 rollback unchanged.
- Full local report: `AMQ_BATCH28_CANDIDATE326_SONGSELECT_OWNERSHIP_CLEANUP_20261025.md`; regression JSON: `AMQ_BATCH28_CANDIDATE326_BROWSER_REGRESSION_20261025.json`.
