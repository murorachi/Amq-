# V82.82 EMQ invalid-scope fix and custom-list UI acceptance

Date: 2026-10-18

## Baseline and change scope
- Source baseline: V82.81 engineering workspace, based on the verified V82.80 source package. V82.65 remains immutable; V82.72 and V82.80 outputs are preserved.
- Product change: `src/scripts/script_040.htmlpart` now defines `INVALID_SCOPE_KEY_V8265` as `aniQuizCustomListScopeInvalidV8265`. Before this fix, the EMQ custom-list picker referenced the identifier but no definition existed anywhere in the source tree. Its surrounding `try/catch` hid the `ReferenceError`, allowing the visible stale-list warning to appear without reliably persisting the fail-closed invalid-scope marker.
- The fragment manifest was updated with the exact `script_040.htmlpart` byte length and SHA-256; the new product release metadata is V82.82.
- No CSS source declarations or order were changed. No answer/playback or multiplayer runtime extraction was performed.

## Product artifact
- Standalone HTML: `dist/amq_learning_tool_v82_82.html`
- Bytes: 8,787,490
- SHA-256: `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`
- This is a distinct bug-fix release. V82.80 remains available at its previous fingerprint.

## Tests and results
- Custom-list source/backup contract: 8/8 assertions passed, including a regression assertion for the formerly undefined invalid-scope key.
- Production UI acceptance harness: 19/19 assertions passed, 0 uncaught page errors. It exercised AMQ list create/rename/delete, AMQ anime-ID membership, EMQ list create/rename/delete, catalog search and batch-add, work ID to VNDB ID mapping, fresh-document initialization from a captured storage snapshot, and stale EMQ selection fail-closed marker persistence.
- Important boundary: UI test uses production HTML and production event handlers but `page.set_content` with an in-memory Storage shim. Direct `file://` and localhost navigation both fail with `ERR_BLOCKED_BY_ADMINISTRATOR`. The fresh-document step is not a native-origin browser reload.
- Responsive Chromium baseline: mobile 390x844, tablet 768x1024, desktop 1440x1200; home and quiz captured at each size. No horizontal overflow or uncaught page errors. Six screenshots plus geometry are recorded under `reports/visual-baselines/v82_82_responsive/` and `reports/V82_82_RESPONSIVE_VISUAL_BASELINE.json`.
- CSS triage: all 563 previously unmapped selector rows were processed into `reports/CSS_SELECTOR_REVIEW_V82_82.csv`. 531 received a static ownership/category triage; 32 remain explicitly unresolved. All rows are marked DO NOT MOVE until cross-browser/cascade ownership gates are met. Firefox is not installed, so Firefox acceptance is still open.
- Integrity verifier: 116 checks passed, including immutable V82.65 baseline, manifest fingerprints, two deterministic builds and byte-identical V82.82 release output.
- Full runner result is recorded in `reports/V82_82_VALIDATION_RESULTS.txt` after final execution.

## Not completed / acceptance gates remain open
1. GitHub full-source synchronization is incomplete. The existing branch is an overlay, not a coherent remote source tree. A clean remote checkout build and SHA-256 readback have not been run. The boundary-audit generator's remote/local Git blob mismatch remains open.
2. Native localStorage/IndexedDB persistence, actual browser reload, full backup import/export, restore rollback and storage-failure recovery are not verified in this environment.
3. The UI harness covers AMQ/EMQ create/edit/delete and source-ID mapping, but not real-origin backup import/restore rollback.
4. Firefox and additional responsive browser engines are unavailable. No CSS extraction/reordering is authorized by this checkpoint.
5. Real audio playback, stale media event/timer cleanup and two-client multiplayer/reconnect acceptance remain unexecuted. No lifecycle extraction is authorized by this checkpoint.

## Rollback
- Restore V82.80 standalone HTML and source package to return to the prior release.
- Revert the single production-fragment change in `src/scripts/script_040.htmlpart` and restore its V82.81 manifest fragment hash/release metadata. V82.65 and V82.72 files were not modified.
