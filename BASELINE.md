# BASELINE — AMQ Song Select cleanup

## Working baseline (user-authorized)
- Candidate212: 9,352,632 bytes; SHA-256 52376c693c5c0701d77e80a6076620623ef9ef5decadd11265d6b57bcf6c6952. Experimental, not accepted, unchanged.
- Recovery source Candidate207 remains unchanged: 9,310,496 bytes; SHA-256 2f3a092a139628daa48bc113d2a192f41e2d7474182471ed926de3de49fd6100.

## Latest minimal cleanup candidate (not accepted)
- Candidate216: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_216_remove_unreferenced_candidate_marker.html`
- Size: 9,352,541 bytes; SHA-256 `70d0b99e069d34bba174f278d8e09c6c3f508841aa3ec25d014f0970e30ad05f`.
- Only removes the unreferenced Candidate105 marker script; the exact parent/output comparison passes. No functional code/data/storage schema changed.
- Candidate216 is not a full cleanup or accepted release. Keep Candidate212 and Candidate207 unchanged.
- PASS: 67 inline JS syntax blocks; 108 CSS blocks, 2,763 qualified rules, zero parse errors.
- NOT RUN: native file launch, durable storage, CRUD, workspace lifecycle, real audio, API/CDN, IndexedDB, pixel acceptance.
- BLOCKED: browser navigation and external network; HTML upload/remote SHA readback unavailable.

## Rollback
Discard Candidate216 and continue from unchanged Candidate212; Candidate207 remains recovery source. Never overwrite existing candidates.
