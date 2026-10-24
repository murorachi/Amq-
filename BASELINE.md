# BASELINE — AMQ Song Select cleanup

## Working baseline (user-authorized)
- Candidate212: 9,352,632 bytes; SHA-256 `52376c693c5c0701d77e80a6076620623ef9ef5decadd11265d6b57bcf6c6952`. Unchanged and remains the working baseline.
- Recovery source Candidate207: 9,310,496 bytes; SHA-256 `2f3a092a139628daa48bc113d2a192f41e2d7474182471ed926de3de49fd6100`. Unchanged.

## Experimental cleanup candidates (not accepted)
- Candidate216: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_216_remove_unreferenced_candidate_marker.html`; 9,352,541 bytes; SHA-256 `70d0b99e069d34bba174f278d8e09c6c3f508841aa3ec25d014f0970e30ad05f`. Removes only the unreferenced Candidate105 marker.
- Candidate218: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_218_idempotent_watch_mode_binding.html`; 9,352,817 bytes; SHA-256 `5e1bd34e1bc49fe606fc8b9989cfaab26d00f2eee5e12ca0541d16a5ae63099c`. Replaces the repeated `watchModeTab` / `customModeTab` click-listener registrations with idempotent handler assignment. Exact one-function replacement verified.
- Candidate218 static tests: 68 inline JS blocks pass `node --check`; 2 embedded payload blocks excluded.
- NOT RUN: browser runtime acceptance, list CRUD/reload, workspace lifecycle, real audio/API/IndexedDB and pixel acceptance.
- BLOCKED: current runtime blocks `file://` and localhost navigation and external DNS/network. HTML upload/remote SHA readback is not available through the current workflow.
- Neither Candidate216 nor Candidate218 is an accepted release. Do not overwrite either or the baselines.

## Rollback
Discard the experimental candidate and continue from unchanged Candidate212; Candidate207 remains the recovery source.
