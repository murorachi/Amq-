# BASELINE — AMQ Song Select cleanup (2026-10-24)

## User-authorized working baseline
- Candidate212: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_212_mutation_loop_fix.html`; recorded size 9,352,632 bytes; recorded SHA-256 `52376c693c5c0701d77e80a6076620623ef9ef5decadd11265d6b57bcf6c6952`.
- Candidate207 recovery source: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_207_home_menu_initial_state_fix.html`; recorded size 9,310,496 bytes; recorded SHA-256 `2f3a092a139628daa48bc113d2a192f41e2d7474182471ed926de3de49fd6100`.
- Candidate216 experimental artifact: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_216_remove_unreferenced_candidate_marker.html`; recorded size 9,352,541 bytes; recorded SHA-256 `70d0b99e069d34bba174f278d8e09c6c3f508841aa3ec25d014f0970e30ad05f`.
- Candidate218 experimental artifact: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_218_idempotent_watch_mode_binding.html`; recorded size 9,352,817 bytes; recorded SHA-256 `5e1bd34e1bc49fe606fc8b9989cfaab26d00f2eee5e12ca0541d16a5ae63099c`.
- These four artifact records exist in the user's AMQ學習工具 Library. Raw-byte materialization was denied in this runtime, so the recorded hashes/sizes are preserved as prior records, not freshly verified original-byte hashes.
- None of Candidate207/212/216/218 HTML exists in the target branch's current Git Tree. No remote HTML upload/hash validation has been performed.

## Analysis-only reconstructed source
- Local file: `/mnt/data/amq_work/candidate212_reconstructed.html`.
- Size: 9,352,606 bytes.
- SHA-256: `07f2d2428b308d6449e561b9d68cc890932d36089694cdecbff561d092b11636`.
- It differs from the recorded Candidate212 source by 26 bytes. Do not overwrite the Library artifact, create a release candidate from it, or claim source equivalence. It may be used for static inspection and explicitly labelled disposable browser prototypes only.

## Existing candidate dispositions
- Candidate212 remains the user-authorized baseline; unchanged.
- Candidate207 remains the recovery source; unchanged.
- Candidate216 remains experimental and unaccepted; unchanged.
- Candidate218 remains experimental and unaccepted; unchanged. The `onclick` assignment is idempotent, but normal-init call-graph inspection did not reproduce the claimed duplicate-listener root cause.
- No source cleanup or volume fix has been applied to any candidate HTML in this continuation.

- Batch selection state defect: the Candidate210 row factory always creates unchecked batch checkboxes while the batch controller's selection Set persists across search-triggered rerender. A disposable prototype with one outer-scope Set and checked-state rendering passes repeat-action assertions; see `BATCH_SELECTION_ACCEPTANCE.md`. Not applied to any candidate because the original source bytes remain unavailable.

- Imported-list removal: in-memory Chromium tests pass for AniList and MAL source-specific watch-status removal and VNDB local-list-key removal, including confirmation prompts and preservation of manual/unrelated data. This does not validate live imports or native persistence; see `IMPORT_REMOVAL_ACCEPTANCE.md`.
## Verified analysis findings
- Static JS: 68 executable inline blocks pass `node --check`; two payload blocks are excluded.
- CSS: 108 style blocks parse without errors in the current tinycss2 scan.
- Initial DOM: 296 unique IDs; runtime-injected fixture: 631 live IDs with no duplicates at the measured startup point.
- Custom-list create/add/remove/delete and workspace panel open/close interactions pass in isolated in-memory storage; real reload persistence is still blocked.
- Primary V44 volume behavior passes the tested DOM/property assertions. Forced V82.35 fallback has a reproduced audio/video synchronization and mute-at-zero defect. A temporary fixture proves that applying volume and mute to all audio/video elements fixes those two assertions, but the source is unchanged.
- Song Select geometry still fails the 7.5-card / half-visible bottom-card target. Do not change source geometry until byte-preserving baseline access is restored.

- Workspace-entry static review found the catalog is a live dependency, the `資料品質` relabel script has no matching live dock entry, batch organization is live and must be integrated before removal, and the multiplayer workspace definition has no visible dock entry. Details are in `DEPENDENCY_EDGE_INVENTORY.md`.

## Dependency inventory checkpoint
- `reports/candidate212-100-item-continuation-20261024/DEPENDENCY_EDGE_INVENTORY.md` records 70 script blocks and heuristic cross-script window-API references. Treat it as a navigation aid only; it is not a complete AST call graph and must not be used alone to delete code.

## Rollback and data safety
- Discard any disposable prototype and continue from the unchanged Candidate212 artifact.
- Candidate207 is the earlier recovery source if the user-authorized rollback is required.
- Preserve all original Library artifacts, localStorage/sessionStorage keys, IndexedDB schemas/data, learning records, custom-list data and Blob backups. Do not promote Candidate216/218 without their own acceptance.
