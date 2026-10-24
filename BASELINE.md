# BASELINE — AMQ Song Select cleanup

## Working baseline (user-authorized)
- Candidate212: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_212_mutation_loop_fix.html`; 9,352,632 bytes; recorded SHA-256 `52376c693c5c0701d77e80a6076620623ef9ef5decadd11265d6b57bcf6c6952`. Unchanged and remains the working baseline.
- Recovery source Candidate207: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_207_home_menu_initial_state_fix.html`; 9,310,496 bytes; recorded SHA-256 `2f3a092a139628daa48bc113d2a192f41e2d7474182471ed926de3de49fd6100`. Unchanged.
- Candidate212 and Candidate207 were located in the AMQ學習工具 Library. Current-session raw-byte materialization is unavailable, so the original recorded hashes are preserved but not freshly re-verified in this runtime.

## Experimental cleanup candidates (not accepted)
- Candidate216: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_216_remove_unreferenced_candidate_marker.html`; 9,352,541 bytes; recorded SHA-256 `70d0b99e069d34bba174f278d8e09c6c3f508841aa3ec25d014f0970e30ad05f`. Intended change: remove one unreferenced Candidate105 marker.
- Candidate218: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_218_idempotent_watch_mode_binding.html`; 9,352,817 bytes; recorded SHA-256 `5e1bd34e1bc49fe606fc8b9989cfaab26d00f2eee5e12ca0541d16a5ae63099c`. Intended change: replace repeated `watchModeTab` / `customModeTab` click-listener registration with idempotent handler assignment.
- Candidate216 and Candidate218 were located as separate Library artifacts. Neither is present in the target branch Git Tree; neither has been uploaded or remotely SHA-verified in this checkpoint.
- Historical validation records: 68 executable inline JS blocks passed `node --check`; 2 embedded payload blocks excluded. Browser acceptance remains NOT RUN/BLOCKED.
- Neither Candidate216 nor Candidate218 is an accepted release. Do not overwrite them or the baseline.

## Current-session integrity limitation
A readable text export of Candidate212 was reconstructed for static inspection. It is 9,352,606 bytes and hashes to `07f2d2428b308d6449e561b9d68cc890932d36089694cdecbff561d092b11636`, differing from the recorded original by 26 bytes. This export is not byte-identical and must not be used as the source for a release candidate. Static syntax results apply to the readable text export only.

## Rollback
Discard any experimental candidate and continue from the unchanged original Candidate212. Candidate207 remains the earlier recovery source. Keep the original Library artifacts unchanged.
