# Next task — V82.86 automatic acceptance closeout (2026-10-19)

## Completed
- GitHub Actions clean checkout, deterministic V82.82 build and fresh tracked-file SHA-256 inventory.
- Full runner: 36/36 commands passed; integrity verifier: 116/116; inventory generator contract and runner contract passed.
- Chromium home/quiz visual baseline passed with narrowly bounded cross-build tolerance: body height <=1 CSS px; element geometry <=1.5 CSS px; selector presence, display/visibility, body class and widths remain exact.
- Latest CI-verified branch HEAD: `f41a0ef8465f43e9a73935eafae540731fdae6d3`; acceptance code commit: `d340ba5e4431cdd1aaab591c8da0f2f46947e012`; run: https://github.com/murorachi/Amq-/actions/runs/39177551001

## Next highest-value task
1. Add/run `tests/browser/real_origin_acceptance_localhost.py` as a separate GitHub Actions gate using the clean Ubuntu Chromium environment. Verify native localStorage/IndexedDB, actual same-origin reload persistence, export/import, corrupt backup rejection, write-failure rollback, and exact restored state. Do not count the in-memory shim tests as native acceptance.
2. If localhost navigation is still blocked, record the exact error as BLOCKED and keep the gate open; do not weaken or skip the assertions.
3. Then address Firefox responsive/cascade acceptance, followed by real audio/network and two-client multiplayer/reconnect. Do not extract high-risk lifecycle code before these gates pass.

## Current limits and rollback
- Product remains V82.82; immutable V82.65 remains untouched. No production rollback is required because this stage changed only test/tooling/workflow/docs.
- Native-origin storage and backup rollback are NOT VERIFIED; Firefox, real audio/network, and multiplayer multi-client are NOT RUN.
- Revert the engineering-only acceptance-comparator commit if its bounded Chromium tolerance is later shown to hide a real layout change; never roll back by replacing the locked product baseline.

---

# Next task

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


## V82.86 automatic acceptance inventory — 2026-10-19
- Completed read-only inventory of existing acceptance assets and known gaps. Report: `reports/V82_86_AUTOMATIC_ACCEPTANCE_INVENTORY_AND_GAP_PLAN.md`.
- Next: identify the exact canonical full-runner entry point and its 34 registered commands; check prerequisite handling and whether any failed command can be masked. Then add a machine-readable summary distinguishing PASS, FAIL, BLOCKED and NOT RUN.
- Do not change product/runtime files. Do not treat historical results as a current test run. Native-origin Storage remains blocked by recorded Chromium policy; Firefox/audio/multiplayer remain NOT VERIFIED/NOT RUN.

- Acceptance matrix now exists at `reports/V82_86_AUTOMATIC_ACCEPTANCE_MATRIX.csv` (14 gates). Continue by locating the canonical runner definition; do not invent its path or duplicate the existing verifier.

- Before calling publication acceptance complete, reconcile the V82.85.1 report's 345-file count against `reports/V82_85_1_REMOTE_SHA256SUMS.json`'s 346-file count and confirm the canonical runner's 34 commands.


## V82.86 next verification steps — 2026-10-19
- Read back tools/run_all_checks.py, tests/unit/automatic_acceptance_runner_contract.test.py, and status documents from exact branch v82.86-auto-acceptance-inventory-01; verify command 35 is registered and all script paths exist.
- In a clean checkout/environment, execute the new runner contract first, then the complete runner in bounded batches after building the expected dist files. Record exact command counts, exits and output.
- Fix the inventory producer so option tokens such as --help cannot be recorded as file paths; regenerate a separate corrected inventory artifact and compare the 345 actual paths against the exact branch. Do not rewrite the historical V82.85.1 evidence in place.
- Native-origin Storage, Firefox, real audio and two-client multiplayer remain separate blocked/not-run acceptance gates.

- Static remote review confirms the 35-command registry and required source paths. The next meaningful gate is executable validation in a clean checkout: run the new Python contract, then runner in bounded batches with dist artifacts built first, then verifier and deterministic build. Capture exact outputs rather than infer PASS from GitHub file readback.


## V82.86 next task — execute inventory regression and regenerate from clean checkout
1. In a clean checkout of `v82.86-auto-acceptance-inventory-01`, run `python tests/unit/source_inventory_generator_contract.test.py` and `python tests/unit/automatic_acceptance_runner_contract.test.py`; capture exact exit codes and output.
2. Run `python tools/generate_source_inventory.py --output reports/V82_86_REMOTE_SHA256SUMS.json`, inspect `file_count`, assert no path begins with `-`, and compare each generated path/hash/size with the checkout. Do not replace the derived V82.85.1 artifact or historical evidence.
3. Build expected `dist/` artifacts, run all 36 canonical runner commands in bounded batches, then run `tools/verify.py` and a second deterministic build. Record actual output, not source-inspection assumptions.
4. Confirm GitHub branch tree no longer contains root `--help`; read back generator, tests, runner, matrix, status files and corrected inventory. Product baseline must remain V82.82 at its existing SHA-256; V82.65 remains immutable.
5. Native-origin Storage, Firefox, real audio and two-client multiplayer remain separate gates and must not be marked passed by this source-inventory work.
