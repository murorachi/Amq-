# BASELINE — AMQ Song Select cleanup audit

## User-authorized working baseline
- Candidate212: amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_212_mutation_loop_fix.html
- Size: 9,352,632 bytes
- SHA-256: 52376c693c5c0701d77e80a6076620623ef9ef5decadd11265d6b57bcf6c6952
- Candidate212 is an experimental working baseline, not an accepted formal release. The original file remains unchanged.
- Recovery source Candidate207 remains unchanged: 9,310,496 bytes; SHA-256 2f3a092a139628daa48bc113d2a192f41e2d7474182471ed926de3de49fd6100.
- Cleanup audit found repeated functions/IDs/templates and many observers, but no large region was proven safely deletable without call-chain/runtime regression evidence. No new HTML candidate was created.
- PASS: 68 executable inline JS blocks passed Node syntax checks; CSS parser found 0 errors across 108 style blocks and 3,567 qualified rules.
- NOT RUN: native file launch/persistence, custom-list reload CRUD, workspace lifecycle, actual audio/seek, network API/CDN, IndexedDB Blob persistence, pixel acceptance.
- BLOCKED: native browser navigation and external network unavailable; HTML byte transfer and remote hash readback unavailable.
## Rollback
Continue from unchanged Candidate212; Candidate207 remains the earlier recovery source. Never overwrite either file.
