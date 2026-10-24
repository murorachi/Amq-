# CURRENT_STATUS — AMQ 100-item engineering continuation (2026-10-24)

## Verified baseline and artifacts
- Target branch: `amq-candidate104-songselect-layout-fix`.
- Branch head before this documentation update: `31b111d3e5530a268d66b10743556cc71770985f` (commit message: `Prioritize shared volume handler after reproduced fallback failure`).
- Candidate212 recorded baseline: 9,352,632 bytes; recorded SHA-256 `52376c693c5c0701d77e80a6076620623ef9ef5decadd11265d6b57bcf6c6952`.
- Candidate207 rollback record: 9,310,496 bytes; recorded SHA-256 `2f3a092a139628daa48bc113d2a192f41e2d7474182471ed926de3de49fd6100`.
- Candidate216 record: 9,352,541 bytes; recorded SHA-256 `70d0b99e069d34bba174f278d8e09c6c3f508841aa3ec25d014f0970e30ad05f`.
- Candidate218 record: 9,352,817 bytes; recorded SHA-256 `5e1bd34e1bc49fe606fc8b9989cfaab26d00f2eee5e12ca0541d16a5ae63099c`.
- All four candidate artifact records were found in the user's AMQ學習工具 Library. The raw-byte materialization action is not authorized in this runtime. Candidate207's and Candidate212's recorded SHA-256 values have not been freshly recomputed from their original bytes here.
- Candidate212 reconstructed readable export: 9,352,606 bytes; SHA-256 `07f2d2428b308d6449e561b9d68cc890932d36089694cdecbff561d092b11636`. It is 26 bytes shorter than the recorded original and is NOT a release source.
- The target branch Git Tree does not contain Candidate207/212/216/218 HTML. No candidate HTML upload or remote HTML SHA-256 verification is claimed.

- Static dependency edge inventory committed and read back: `reports/candidate212-100-item-continuation-20261024/DEPENDENCY_EDGE_INVENTORY.md`. It records 70 script blocks and 268 heuristic cross-script window-API references plus event/storage hints. It is explicitly a text-scan map, not a complete AST call graph and not sufficient by itself to justify deletion.

- Batch selection rerender defect reproduced and documented in `reports/candidate212-100-item-continuation-20261024/BATCH_SELECTION_ACCEPTANCE.md`: after selecting 180 songs and applying familiarity, the selection Set still contains 180 IDs and the counter still says 180, but rerendered row checkboxes become unchecked. A disposable prototype moved the Set to the Candidate210 IIFE scope and rendered checkbox state from that Set; both `聽過` and `有印象` actions then passed with 180 visible checks, matching counter, 180 stored status updates, and no page errors. No source candidate was modified.

- Imported-list removal acceptance committed in `reports/candidate212-100-item-continuation-20261024/IMPORT_REMOVAL_ACCEPTANCE.md`: seeded in-memory tests passed for AniList-only removal, MAL-only removal, and VNDB local-list-key removal; manual watch status and unrelated records remained intact; all three controls prompted confirmation; zero page errors. Live API/import and native persistence remain untested.
- Custom-list isolation acceptance committed in `reports/candidate212-100-item-continuation-20261024/CUSTOM_LIST_ISOLATION_ACCEPTANCE.md`: PASS for two unique list IDs, duplicate-membership deduplication, per-list remove isolation, rename preserving ID, deleting one list while preserving the other list and its membership, and zero page errors. All checks used in-memory storage; reload persistence remains blocked.
- Four-workspace panel lifecycle report committed in `reports/candidate212-100-item-continuation-20261024/FOUR_WORKSPACE_PANEL_ACCEPTANCE.md`: direct adapter tests pass for custom-list, learning-center, quiz and multiplayer panels, single-panel uniqueness, Song Select route preservation, DOM parent/hidden-state restoration and zero page errors. Important limit: the test bypasses visible navigation; the multiplayer entry is still missing from the dock, so user-flow acceptance is not complete.
- Observer mount-cycle acceptance committed in `reports/candidate212-100-item-continuation-20261024/OBSERVER_MOUNT_CYCLE_ACCEPTANCE.md`: after first lazy mount, observer counts stayed stable across the remaining 11 of 12 workspace transitions. Startup 47/46 MutationObserver created/active, 2/2 ResizeObserver, 1/1 IntersectionObserver; first lazy mount added 2 active MutationObservers and 1 active IntersectionObserver observing 180 additional targets; counts then remained stable. No errors. Owner/target lifetime tracing remains NOT RUN; this does not prove all observers leak-free.
## Actual checks executed against the reconstructed text export
- PASS: Node `node --check` for 68 executable inline JavaScript blocks; 2 embedded payload blocks excluded.
- PASS: 108 CSS style blocks parsed with tinycss2; 2,763 top-level qualified rules counted by this scan; zero stylesheet/declaration parse errors. The rule count is scanner-scope-specific and is not comparable to nested-rule totals from other reports.
- PASS: initial HTML parse found 296 ID attributes, all unique.
- PASS: Chromium `page.set_content()` initialization; title and core roots present; dynamic startup DOM had 631 IDs and no duplicate live IDs.
- PASS: watch/custom-list tab click probe observed one click per action.
- PASS: workspace panel lifecycle: import, batch, lists, learning and dashboard × 2 rounds = 10 successful open/close transitions; one panel instance; no page errors.
- PASS: custom-list create, membership add/remove, and delete in isolated in-memory storage.
- PASS: batch selection selected 180 loaded rows; batch familiarity update wrote to isolated mock storage.
- PASS: AMQ/EMQ/MIX mode switches; search; decade/type filtering; name sorting.
- PASS: primary V44 volume control stores values, synchronizes current audio/video elements in the tested fixture, mutes at zero, and reapplies volume after replacing the audio node.
- FAIL (reproduced): forced V82.35 fallback builder updates audio volume but not video volume, and zero volume does not mute audio/video consistently.
- PASS (prototype only): a disposable Playwright fixture routes both V44 and V82.35 fallback through one shared volume controller. Both paths pass single-control, 35% audio/video sync, audio-node replacement reapplication, zero-volume mute, and no-page-error assertions. The controller updates output text only when changed; omitting that guard triggered a MutationObserver self-loop and hung the first prototype. No HTML source was modified.
- FAIL: Song Select geometry target. At 1920×1080, tracklist height is about 830 px, row height 130 px, average pitch about 126 px; only 7 rows intersect the viewport and the last is about 33% visible. Target is about 7.5 cards with a half-visible bottom card.
- PASS: hover shift 3 px is smaller than selected shift 7 px; clicking a row updates selected styling and the right-side title.
- One additional workspace-dock script reported FAIL because it attempted to click controls inside a dock whose computed display was `none`; the test did not exercise visible controls and is not evidence of a user-flow failure. Use the separately passing visible workspace-panel lifecycle test for the verified scope.

## NOT RUN / BLOCKED
- BLOCKED: native `file://` and localhost navigation in Chromium (`ERR_BLOCKED_BY_ADMINISTRATOR`).
- BLOCKED: real persistent-origin localStorage/sessionStorage reload acceptance.
- NOT RUN: IndexedDB object-store/version migration and Blob backup/restore.
- BLOCKED: live AniList/MAL/VNDB API and cover retry/failure behavior; external network was aborted or unavailable in the test environment.
- NOT RUN: real AMQ/EMQ/MIX sound output, seeking, and complete answer/score/history acceptance.
- NOT RUN: fixed-region masked pixel comparison against osu!stable reference.
- NOT RUN: owner-instrumented observer/timer counts across route teardown.
- Candidate218's idempotent tab assignment is a defensive change; the normal initial call graph did not reproduce the claimed duplicate-binding root cause. Browser repeated-mount acceptance remains incomplete.

- Workspace-entry review added to `reports/candidate212-100-item-continuation-20261024/DEPENDENCY_EDGE_INVENTORY.md`: `動畫圖鑑` is live core catalog functionality and should remain an internal mode; `資料品質` is a dead relabel script with no matching live dock button; `批次整理` is live and must be integrated before standalone removal; the four-workspace dock is incomplete because the current markup exposes lists, learning and quiz but no multiplayer entry.

## Engineering disposition
- No executable code has been deleted in this continuation. Duplicate names/IDs and CSS rules alone are not proof of dead code.
- Keep custom-list data keys/schema, learning records, IndexedDB/Blob data, AMQ/EMQ/MIX selection/audio, Song Select route/list/covers/player, and required fallback behavior until dependent behavior is verified.
- Integrate the V44 and V82.35 volume builders behind one shared controller; retain fallback recovery until parity and replacement-node tests pass.
- The `批次整理` module is live and provides familiarity, tag, blacklist and custom-list batch operations. Integrate these into the official list-management surface before removing its standalone entry.
- Candidate212, Candidate207, Candidate216 and Candidate218 originals remain untouched. No release candidate has been created.

## Next action
Continue the 100-item plan using the reconstructed source only for analysis/prototypes. Prepare and test the shared volume-controller change in a disposable fixture, continue owner/call-graph and Song Select geometry diagnostics, and apply source changes only after byte-preserving Candidate212 access is restored. Then rerun affected regression tests, update all reports, create a uniquely named candidate from verified bytes, and read back/verify the remote artifact.
