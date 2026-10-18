# Next task

Current checkpoint: **V82.85.7 quiz browser acceptance coverage, pending CI**.

1. Run the two newly wired browser suites and resolve any environment-specific failures without altering product behavior.
2. Add a dedicated real-browser quiz submit/classify/skip and playback lifecycle contract, with deterministic audio/network stubs and assertions for history, familiarity, events, timers, and teardown.
3. Add a separate multiplayer lifecycle acceptance harness using a controlled mock API/WebSocket for waiting → preparing → running → paused → reveal → finished → leave/reconnect; only then assess extraction boundaries.
4. Keep CSS isolated from lifecycle refactors.

Rollback: `v82.85.6-amq-anime-id-normalization-module-01`; product baseline remains V82.82.

---


Current checkpoint: **V82.85.6 AMQ anime-ID normalization module, accepted**. CI: https://github.com/murorachi/Amq-/actions/runs/39115085244

1. Preserve V82.85.6's ID-normalization contract alongside native-storage, custom-list CRUD/mapping, reload, and backup/restore tests.
2. Before extracting answer submission, playback, or multiplayer lifecycle code, map the existing ownership boundaries and identify missing real-browser acceptance coverage. Do not alter these subsystems until their tests are adequate.
3. Keep CSS as a separate future workstream; do not combine it with lifecycle extraction.
4. Inspect `readListData` normalization carefully before any extraction: it mixes safe storage reads, schema validation, legacy payload migration, and timestamp defaults, so it is not a pure helper and needs a dedicated contract if later extracted.

Rollback to `v82.85.5-amq-custom-list-validation-module-01`; product baseline remains V82.82.

---


Current checkpoint: **V82.85.5 AMQ custom-list validation module, pending CI**.

1. Check V82.85.5 Actions; require deterministic V82.82 byte-identical build and focused tests to pass.
2. If accepted, inspect pure AMQ list normalization helpers next. Do not extract DOM/storage mutation logic without a separate contract.
3. Keep native-origin list/backup tests in CI; answer submission, playback, multiplayer lifecycle and CSS remain gated.

Rollback: return to `v82.85.4-native-storage-custom-lists-modularization-01`; product baseline remains V82.82.

---


Current engineering checkpoint: **V82.85.4 native storage + custom-list acceptance + low-risk module extraction**. Product remains **V82.82**; immutable baseline remains V82.65.

## Verified in V82.85.4
- Tracked native-origin Chromium harness uses real browser localStorage on a localhost HTTP origin and the corrected reload snapshot policy.
- AMQ/EMQ custom-list create, membership, rename, reload persistence, work/VNDB/song ID mapping and full-backup export/restore passed.
- Stale EMQ selected-list IDs remain fail-closed; isolated custom-list UI regression passed 19 assertions with zero page errors.
- Node contracts: reload snapshot 7/7, custom-list CRUD/mapping 10/10, backup/restore 6/6.
- `tools/verify.py`: 118/118. Two deterministic builds are byte-identical to V82.82 (8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`).
- Exact EMQ work/VNDB/song mapping helpers are isolated in `src/modules/emq_list_membership.htmlpart`; generated output is unchanged.
- Final workflow: [run 39110833508](https://github.com/murorachi/Amq-/actions/runs/39110833508).

## Next highest-value work
1. Inspect the dependency map for the next low-risk, pure AMQ custom-list validation helpers and add focused tests before extracting them.
2. Keep AMQ/EMQ CRUD persistence and backup acceptance in CI for each later extraction.
3. Do not extract answer submission, playback, multiplayer lifecycle or CSS cascade until their specific real-browser gates pass.

## Still unverified
Firefox/cascade comparison, real audio playback, production-domain storage policy and multiplayer multi-client reconnect. The original local-only script was not accessible in this repository session; the tracked harness is a reproducible equivalent, not a verbatim copy.

## Rollback
Return to `v82.85.3-native-storage-reload-assertion-fix-01` to discard this engineering-only checkpoint. Product fallback remains V82.82 at 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`. Immutable V82.65 remains untouched.

---

Current engineering checkpoint: **V82.85.4 native storage + custom-list acceptance + low-risk module extraction**. Product remains **V82.82**; immutable baseline remains V82.65.

## Work added in this checkpoint
1. Tracked native-origin Chromium harness for the corrected reload snapshot contract, AMQ/EMQ custom-list create/member/rename/reload, and full-backup export/delete/restore.
2. Node source-contract tests for custom-list persistence and work/VNDB/song ID mapping; the seven-case native-storage snapshot contract and backup manifest tests remain in place.
3. Extracted only the EMQ list membership mapping helpers into `src/modules/emq_list_membership.htmlpart`; exact original bytes remain at the original build insertion point.
4. Added a branch-scoped GitHub Actions workflow for source verification, focused unit tests and browser acceptance.

## Immediate next action
- Inspect the first GitHub Actions run for this branch. Fix actual failures before treating this checkpoint as accepted. Confirm deterministic build still matches V82.82 byte-for-byte.
- If the native-origin harness passes, retain the source-only EMQ helper extraction. If it fails, keep the production HTML unchanged and fix the test assumptions or root cause based on captured evidence.
- Then select the next low-risk extraction only after its dependencies and tests are mapped. Do not extract answer submission, audio playback, multiplayer lifecycle or CSS cascade until their real-browser acceptance gates are satisfied.

## Known unverified gates
- Firefox/cascade comparison, real audio playback, production-domain storage policies, multiplayer multi-client reconnect.
- The original local-only test file was not available in this repository session; the new tracked harness is a reproducible equivalent, not a verbatim copy.

## Rollback
- Return to `v82.85.3-native-storage-reload-assertion-fix-01` to discard the entire V82.85.4 engineering-only checkpoint.
- Product fallback remains V82.82 at 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`. Immutable V82.65 remains untouched.

---

Current engineering checkpoint: **V82.85.3 NATIVE_STORAGE_RELOAD_ASSERTION_FIX_01**. Product remains **V82.82**; immutable baseline remains V82.65.

## Just completed: native storage reload assertion review

- Inspected the actual SRS source `src/scripts/script_020.htmlpart`. When `aniSrsScheduleV1` is absent, `loadStore()` creates an in-memory default; the `pagehide` handler writes that default to native localStorage. This explains the one-key diff seen after reload.
- Revised the acceptance contract narrowly: all existing keys and values must remain byte-identical; only a valid default-empty `aniSrsScheduleV1` may be newly created. Unrelated additions, deletions, changed values, malformed schedules, and non-empty schedules still fail.
- Added `tests/unit/native_storage_reload_snapshot_contract.test.cjs`; 7/7 test cases passed in an executed Node run.
- User manually confirmed the V82.82 standalone HTML opens and the learning feature works.
- Report: `reports/V82_85_3_NATIVE_STORAGE_RELOAD_ASSERTION_FIX_01_REPORT.md`.
- Limitation: the full Playwright native-origin harness was not rerun after this assertion correction, and its local-only script is not tracked. Treat the captured native-origin run plus corrected snapshot-contract test as reviewed evidence, not a fresh end-to-end rerun.
- Production HTML remains unchanged at 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.

## Next highest-value task

1. Make the native-origin acceptance harness reproducible inside the repository and integrate the corrected reload snapshot contract. This removes dependence on a local-only script and prevents the same false-positive from recurring.
2. Use that same isolated native-origin harness for AMQ/EMQ custom-list CRUD, reload persistence, invalid IDs, work/VNDB/song ID mapping, and backup round-trip.
3. Continue modularization only along low-risk boundaries whose dependencies are already mapped. Keep answer submission/playback and multiplayer lifecycle extraction gated on their applicable real-browser acceptance.
4. Firefox responsive/cascade comparison, real audio, and two-client multiplayer/reconnect remain separate gates. Do not mark them passed without evidence.

## Rollback and limits

- Engineering-only changes can be discarded by returning to base branch `v82.85.2-native-storage-backup-acceptance-01` at `3cb626c5501822c6b4ed3d13ebe5bdab3ab74809`.
- Product fallback remains V82.82. Immutable V82.65 remains untouched.
- The new snapshot contract test passed 7/7; full Playwright rerun after the policy change, Firefox, real audio, and multiplayer remain NOT RUN/NOT VERIFIED.

---

Current engineering checkpoint: **V82.84 SOURCE_SYNC_AND_ACCEPTANCE_GATE_AUDIT**. Product remains **V82.82**; immutable baseline remains V82.65.

## Verified in V82.84
- Fresh runner 34/34 passed in bounded batches; integrity verifier 116/116 passed.
- V82.82 deterministic build: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- AMQ/EMQ isolated UI test 19/19; backup export/import/rollback in-memory contract 4/4; responsive Chromium 3 viewport sizes x home/quiz passed.
- Boundary-audit tool remote/local Git blob SHA-1 matches at `ae6690750077445dc85c22a740f4ab5497d9e737`.

## Remaining work, strict order
1. **Complete GitHub source sync:** current remote branch has 125 tree entries and lacks Manifest, all source fragments, template, build/test tools and visual baseline binaries. Local DNS cannot reach GitHub and current connector has no local binary/tree upload path. Establish an authorized transfer route, then upload the complete tree, run a clean checkout build and verify remote SHA-256 values. Do not treat the overlay as completion.
2. **Native Storage/backup acceptance:** run on a browser/test origin that permits localhost; verify native localStorage/IndexedDB, reload persistence, export/import, corrupt backup, write failure and exact rollback. Current managed Chromium policy blocks navigation before app load.
3. **Native AMQ/EMQ custom-list acceptance:** create/edit/delete, real reload persistence, malformed/invalid IDs, work/VNDB/song ID mapping and backup round-trip.
4. **Firefox responsive/cascade review:** Firefox is not installed in this environment. Add desktop/tablet/mobile comparisons before moving CSS; the 32 residual rows are classified, but CSS remains unchanged.
5. **Real audio and two-client multiplayer/reconnect:** test real media events, stale timer cleanup, create/join/leave/rejoin/reconnect and duplicate events. Extract lifecycle code only after these gates pass.

## Rollback and limits
- V82.84 is engineering-only; no production runtime or CSS changed. Rollback to V82.82 product/package if needed; V82.65 remains immutable.
- Native Storage, Firefox, real audio, multiplayer and clean remote checkout build remain NOT VERIFIED/NOT RUN.

--- Historical V82.79 notes follow for traceability.

# Next task

Current engineering checkpoint: **V82.79 MODULARIZATION_REMAINING_WORK_AUDIT_01**. Current standalone product remains **V82.72**; immutable baseline remains V82.65.

## Latest completed task
- Audited the existing V82.78 source archive and current test/build state before changing files.
- Extracted the exact 950-byte answer-metadata helper block (`uniqueQuizNamesV8239`, `getQuizAnimeNameBundleV8239`, `quizSongRoleLabelV8239`) into `src/modules/quiz_answer_metadata.htmlpart`, preserving its exact classic-script IIFE location.
- Added 14 direct contract assertions and layered source reconstruction checks; module count is now 8.
- Added `reports/MODULARIZATION_REMAINING_WORK_AUDIT_V82_79.md` and its machine-readable inventories. This report distinguishes physical splitting from semantic decoupling and does not invent a percentage from module count.
- Product remains byte-identical to V82.72.

## Next highest-value task
1. Finish the current V82.79 full test run, deterministic rebuild, package integrity and checksum verification.
2. Close the GitHub publication gap: the existing overlay branch is not a coherent full source tree; publish the full source/build/test tree only through a workflow that can transfer every file and verify remote paths/hashes. Do not claim completion based on the overlay.
2. For `getQuizPool()`, map each closure dependency and separate pure candidate selection from DOM diagnostics only when differential behavior can be proven.
3. Next semantic boundaries should be selected from the remaining dependency audit, not by splitting large functions arbitrarily. Answer submission/playback, SRS, playlist, multiplayer, and IndexedDB require dedicated contracts and browser/service acceptance.
4. CSS work remains separate: build selector-to-view mapping and visual regression coverage before reordering, merging or deleting cascade layers.

## Remaining acceptance limits
- No verified real-origin persistence, audio/network, Firefox or multiplayer multi-client acceptance.
- Product remains V82.72; preserve V82.65, V82.70 and V82.72 artifacts. Do not overwrite the immutable baseline.

## V82.85.1 GitHub source sync publication
- Next stage: execute native-origin Storage and backup rollback acceptance; do not extract answer/playback or multiplayer lifecycle before its gate.
# Next task

Current engineering checkpoint: **V82.85.2 NATIVE_STORAGE_BACKUP_ACCEPTANCE_01**. Product remains **V82.82**; immutable baseline remains V82.65.

## Completed stage 1: GitHub source sync
- Accepted commit: `14936c9247c58833ce8492702c75c1bd51589451` on `v82.84-source-sync-acceptance-gate-01`.
- Remote SHA-256 inventory: 346 files, 0 mismatches.
- Clean checkout deterministic build: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; `tools/verify.py` exit 0.

## Current stage 2: native Storage and full backup
- Harness: `V82_85_2_NATIVE_STORAGE_BACKUP_ACCEPTANCE_01.py` (14,163 bytes; SHA-256 `359275c2bb424aed739ba5967e6eb5c4b5037e1a9a5db436ca05b2c511630de2`). The local downloadable artifact is not yet included as a repository file; runbook/report are published under `reports/V82_85_2_NATIVE_STORAGE_BACKUP_ACCEPTANCE_01_*`.
- Static/unit gates passed: storage repository 9/9, backup restore 6/6, full backup round-trip 4/4, verifier 116/116, deterministic product hash unchanged.
- Native browser gate is BLOCKED / NOT RUN in the current managed Chromium environment (`ERR_BLOCKED_BY_ADMINISTRATOR` before localhost page initialization). Run the harness on a Windows/browser environment that permits localhost and retain its full log. Exit code 0 is required to close this gate; exit code 2 is an environment block, not a product pass/fail.

## Strict next order
1. Run native-origin acceptance on Windows using the exact V82.82 HTML fingerprint. Verify localStorage and IndexedDB reload persistence, actual full-backup export, malformed import no-mutation, valid import, injected write-failure exact rollback and post-reload persistence.
2. If stage 2 passes, perform AMQ/EMQ custom-list CRUD + real reload + backup round-trip acceptance in the same native-origin browser context.
3. Obtain Firefox responsive/cascade comparison before any CSS movement.
4. Run real audio and two-client multiplayer/reconnect acceptance. Only after these gates pass may high-risk answer/playback or multiplayer lifecycle extraction begin.

## Rollback and constraints
- No production runtime/CSS/HTML changes in V82.85.2. Roll back engineering-only changes by returning to the V82.84 source-sync branch/commit. Product fallback remains V82.82; V82.65 remains immutable.
- Do not label native-origin storage, Firefox, audio, or multiplayer as passed until the corresponding test evidence exists.
