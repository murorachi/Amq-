# Stage 15: Candidate228 direct batch API extraction
Date: 2026-10-24

## Baseline and artifact integrity
- Parent Candidate227: 9,360,586 bytes; SHA-256 `2c0b8154b95fbe0685a19e50e185646eedb06f978be211e9eeb06eebb956529d`.
- Rollback copy: `amq_learning_tool_v82_85_46_candidate227_rollback_before_candidate228_20261024.html`; 9,360,586 bytes; SHA-256 `2c0b8154b95fbe0685a19e50e185646eedb06f978be211e9eeb06eebb956529d`; byte-identical to Candidate227.
- Candidate228: `amq_learning_tool_v82_85_46_candidate228_direct_batch_api_extraction_20261024.html`; 9,364,981 bytes; SHA-256 `9d696a307d4e02ef8270da41936920f1b26d9eca9a70b230a1088de4f8466f22`.
- Candidate227 source and Candidate226 rollback were not overwritten.

## Changes
1. Added `window.__aniBatchBusinessAPIv228` with explicit-ID APIs for work watch status, song familiarity and practice actions.
2. Watch-status API accepts work IDs + one of `completed/current/planning/paused/dropped/none`; writes existing `aniAnimeWatch_v1` and verifies read-back. On write failure, restores the in-memory snapshot and returns `storage-failure`.
3. Song-familiarity API accepts work IDs + status `0..3`; writes existing `aniCollection_v2` and verifies read-back. On write failure, restores the in-memory snapshot and returns `storage-failure`.
4. Practice API accepts work IDs + action + list ID and supports list add/remove, weak-set add/remove, blacklist add/remove, and SRS enrollment. It returns structured success/cancel/invalid-input/storage-failure results.
5. Candidate227 work-batch bridge now calls the direct API; its `applyWatch`, `applySong`, and `applyPractice` methods no longer click hidden legacy buttons.
6. Existing DOM event handlers remain as compatibility entry points and call the same practice API. No persistent schema/key was added.

## Tests
- PASS: 67 executable inline JavaScript blocks passed `node --check`; 2 payload scripts excluded.
- PASS: 109 CSS blocks parsed with 0 parser errors.
- PASS: Playwright `page.set_content()` + test-only memory storage shim initialized page (`readyState=complete`), title `AMQ學習工具`, 9,516 works, direct API and work bridge present.
- PASS: all six work watch statuses returned success and matched observable state.
- PASS: song familiarity status `0,1,2,3` each handled 2 songs for work 1.
- PASS: custom-list add/remove through direct API against a synthetic test-only list.
- PASS: manual weak-set add/remove, blacklist add/remove, SRS enrollment (2 cards), empty selection, invalid status, missing list, and bridge direct watch action.
- PASS: injected storage-write failure returned `storage-failure` and restored the previous in-memory watch state.
- PASS: 0 page errors. Console reported external resource `ERR_NAME_NOT_RESOLVED` entries; these are network resource failures, not JS syntax/page errors.
- BLOCKED: native `file://` and durable reload persistence because managed Chromium URLBlocklist blocks local/file/localhost navigation. The shim does not validate real persistence.
- NOT RUN: audio output, live API behavior, multiplayer, reference-image pixel comparison, accepted >300-item confirmation path, and native storage transaction semantics.

## Cleanup decision
- KEEP: existing storage keys, custom-list logic, blacklist/weak-set/SRS logic, AniList/MAL import entry and Candidate210 song-batch owner.
- INTEGRATE: direct-ID batch APIs now serve the visible work workspace and the legacy practice handler.
- DELETE: none in this stage. Old quicktools markup, listeners, observers and CSS still have active references and are not safe to remove yet.
- DEFER: complete caller/call-graph audit and old UI removal until all bridge operations are migrated and tested.

## GitHub
- Branch: `amq-candidate228-direct-batch-api-extraction-20261024`.
- This stage's docs/status checkpoint is committed separately from the HTML.
- Candidate228 HTML upload is not available through the exposed local-file GitHub action in this runtime. Do not claim remote HTML existence or remote SHA verification.

## Rollback
Use `amq_learning_tool_v82_85_46_candidate227_rollback_before_candidate228_20261024.html`. It is a byte-identical copy of Candidate227 with SHA-256 `2c0b8154b95fbe0685a19e50e185646eedb06f978be211e9eeb06eebb956529d`. Candidate228 is a separate file and does not overwrite its parent.

## Next highest-value task
Migrate all visible workspace actions and any C99 wrappers to structured API results; add full action/confirmation tests; then remove only old markup/listeners/CSS proven unreachable by an updated reference and runtime audit.
