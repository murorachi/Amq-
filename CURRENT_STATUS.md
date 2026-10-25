# CURRENT_STATUS — Candidate277 adopted as working baseline (2026-10-25)

## Current status
- Baseline decision: PASS. User explicitly authorized Candidate277 as the working baseline, replacing the previous hold pending Candidate212 recovery. This does not assert byte identity with Candidate212.
- File: `amq_learning_tool_v82_85_91_candidate277_custom_list_name_normalization_20261025.html`
- Version: `v82.85.91-candidate277-custom-list-name-normalization-20261025`
- Bytes: 9,373,238
- SHA-256: `b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371`
- Batch 2 static dependency inventory completed for Candidate277; dynamic/runtime dependency edges remain to be audited before broad deletion.
- Batch 3 browser acceptance remains incomplete. Browser checks are BLOCKED/NOT RUN under the managed browser restrictions.
- No HTML/CSS/JS or application data was modified during this baseline decision. Candidate277 and Candidate276 remain immutable.

## Static checks previously executed
- PASS: 67/67 executable inline JavaScript blocks passed `node --check`.
- PASS: 109 CSS blocks parsed with zero stylesheet/declaration parse errors.
- PASS: 272 initial DOM IDs were unique.
- PASS: local SHA-256 and byte size match the Candidate277 record.
- NOT RUN/BLOCKED: browser interactions, reload persistence, live APIs, audio, multiplayer, IndexedDB Blob restore and osu!stable pixel comparison.

## Next
1. Continue Batch 2 dependency mapping: workspace/router lifecycle, custom-list selector and storage ownership, CSS cascade groups, observer/timer teardown.
2. Fix title/data-amq-candidate metadata only in a uniquely named child candidate.
3. Attempt isolated Candidate277 artifact upload/readback/hash verification when feasible.


## Stage57 update — Batch2 targeted gap audit (2026-10-25)
- Batch2 static dependency inventory is closed within its declared scope: Stage55 remains the main inventory; Stage57 adds targeted workspace/route, custom-list selector/storage, CSS cascade, dynamic-template, observer/timer evidence without repeating the full inventory.
- PASS (static only): workspace/controller layering and dynamic entry points identified; `syncListSelectors()` has 7 literal references; custom-list data key and selected-list state key are distinct responsibilities; representative observer/timer patterns mapped.
- No HTML/CSS/JS modified. Candidate277 size/SHA remain unchanged.
- Browser/runtime dependency verification and P0 acceptance remain BLOCKED/NOT RUN; do not claim Batch3 complete.
- Report: `reports/stage57-batch2-targeted-gap-audit-20261025/STAGE_57_BATCH2_TARGETED_GAP_AUDIT_CANDIDATE277_20261025.md`.


## Stage58 update — Candidate278 homepage shell and in-place Play menu (2026-10-25)
- Child candidate: `amq_learning_tool_v82_85_92_candidate278_homepage_shell_inplace_play_menu_20261025.html`
- Version: `v82.85.92-candidate278-homepage-shell-inplace-play-menu-20261025`
- Bytes: 9361163
- SHA-256: `cd2fdb8f1f762c4a30f64f54e64ab530607a3a3fb1866f9275804c507df08bf1`
- Parent Candidate277 remains immutable: 9,373,238 bytes, SHA-256 `b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371`.
- PASS (static): initial legacy menu removed from shell; old floating SOLO/MULTI/BACK modal and CSS/observer removed; in-place SOLO/MULTI actions wired; profile card removed from homepage while profile storage key remains; bottom player slot, single viewport CSS authority and original synthesized click sound present; 271 static IDs unique; 67/67 executable inline JS blocks pass `node --check`; 108 CSS blocks parse with zero stylesheet errors.
- BLOCKED: Chromium headless smoke test timed out on `about:blank` after 15 seconds. Browser interaction, mobile viewport fit, route transitions, audio and click-sound runtime checks are NOT RUN.
- NOT IMPLEMENTED: BPM-synchronized visualizer. No verified BPM field/source was found; current ICON hover bounce is only playback-state animation, not BPM sync.
- NOT COMPLETE: GitHub HTML artifact upload/readback and remote SHA verification.
- Full report: `reports/stage58-candidate278-homepage-20261025/STAGE_58_CANDIDATE278_HOMEPAGE_SHELL_AND_INPLACE_PLAY_MENU_20261025.md`.


## Stage 1 — Candidate277 raw-byte retrieval recheck (2026-10-25)
- Status: BLOCKED. Candidate277 Library indexes exist and record 9,373,238 bytes, but raw-byte materialization returned “This Project file does not have an authorized raw-byte materialization path.”
- GitHub checks: the Candidate277 filename returned HTTP 404 on Candidate278, Candidate280, Candidate282, Candidate284, and Candidate287 branches. Commit search by recorded SHA and filename returned no usable results. Candidate278 tree does not contain the Candidate277 HTML artifact.
- The recorded SHA-256 remains historical evidence only; it was NOT recomputed in this execution. Do not promote Candidate295, Candidate283, or any reconstructed/indexed excerpt to Candidate277 baseline.
- Candidate295 HTML and its original smoke/Coverage/recovery attachments were not mounted in this execution environment. No application code, HTML, data, or storage schema was modified. Browser acceptance and single-file build were NOT RUN.
- Test-oracle work is documented in `reports/stage1-candidate295-baseline-retrieval-20261025/STAGE_1_BASELINE_RETRIEVAL_AND_SAFE_CONTINUATION_20261025.md`.


## Stage 2 — Uploaded Candidate295 HTML verification (2026-10-25)
- User supplied raw `index-old.html`; actual size 1,720,917 bytes and recomputed SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`, matching the recorded Candidate295 identity.
- PASS (static): 271 DOM IDs, zero duplicate IDs; all 68 inline executable JS blocks passed individual `node --check` checks.
- Candidate295 references external `data.js` and `emq-data.js`, neither is present beside the uploaded HTML in the current workspace. Single-file portability and data-dependent runtime behavior are not verified.
- BLOCKED: Playwright navigation to both file:// and local HTTP URL returned `net::ERR_BLOCKED_BY_ADMINISTRATOR`; this is an environment blocker, not an application pass/fail result.
- Candidate277 raw HTML remains BLOCKED. The uploaded file is Candidate295, not Candidate277. Candidate277's recorded size/SHA remain historical records and were not recomputed in this stage. Do not promote Candidate295 or reconstruct Candidate277 from excerpts.
- No application HTML/CSS/JS/data/storage changes. Stage report: `reports/stage2-candidate295-uploaded-html-audit-20261025/STAGE_2_UPLOADED_CANDIDATE295_STATIC_AND_RUNTIME_GATE_20261025.md`.
- Rollback: revert the documentation-only Stage 2 commit; preserve Candidate277 and Candidate276 unchanged.


## Stage 2 recovery follow-up (2026-10-25)
- Re-searched Library for the exact Candidate277 filename: two indexed records report 9,373,238 bytes, but raw-byte materialization of both failed with `This Project file does not have an authorized raw-byte materialization path`.
- Found indexed `Coverage-20261025T094140.json` (10,050,921 bytes); its raw-byte materialization failed with the same blocker. Data files described inside the handoff/coverage records are not locally recovered or hash-reverified in this stage.
- Candidate277 remains BLOCKED for raw-byte SHA verification. Search/index presence is not proof of byte recovery. No application files were changed.

## Stage 3 — Candidate295 candidate-baseline freeze (2026-10-25)
- Candidate295 is now the working candidate baseline for validation; Candidate277 recovery is no longer a prerequisite for continuing this work. This is not formal release-baseline acceptance.
- Frozen local byte-for-byte rollback snapshot created from uploaded `index-old.html`: 1,720,917 bytes; SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`. Snapshot equality and hash recheck: PASS.
- Browser runtime remains BLOCKED by `net::ERR_BLOCKED_BY_ADMINISTRATOR` on file and local HTTP navigation.
- `data.js` and `emq-data.js` are required by the HTML but are not currently alongside the uploaded source; single-file portability is NOT VERIFIED.
- AMQ/EMQ/MIX gameplay, search/select, custom-list CRUD and reload persistence: NOT RUN / BLOCKED pending matching data assets and executable browser runtime.
- Six previously reported smoke child-action failures remain to be re-tested with corrected assertions; parent `ok:true` is not sufficient.
- No application HTML/CSS/JS/data/storage schema was changed. Report: `reports/stage3-candidate295-candidate-baseline-freeze-20261025/STAGE_3_CANDIDATE295_BASELINE_FREEZE_AND_ACCEPTANCE_GATE_20261025.md`.
- Rollback: restore the frozen local Candidate295 snapshot and verify its SHA-256 before use.


## Stage 4 — Candidate295 core static acceptance (2026-10-25)
- PASS (static): traced main IndexedDB cache validation/write path, EMQ packed gzip/base64 decode and schema/ID checks, AMQ/EMQ/MIX pool construction, custom-list APIs, Song Select route guards and Candidate210 behavior module.
- NOT RUN: browser runtime, actual EMQ decode/counts, mode pool assertions, audio, IndexedDB reload persistence, full custom-list CRUD and repeated route switching.
- BLOCKED: paired data.js and emq-data.js are absent from the current working environment; browser navigation was blocked by the managed runtime. Do not represent these as application failures or passes.
- Candidate295 remains a validation candidate only, not a formally accepted single-file release. Candidate277 remains an earlier user-authorized baseline record; do not overwrite or conflate the two identities.
- No application source/data/storage schema was modified. Report: reports/stage4-candidate295-core-static-acceptance-20261025/STAGE_4_CANDIDATE295_CORE_STATIC_ACCEPTANCE_20261025.md.


## Stage 4.1 — Candidate295 local acceptance tool v1.1 (2026-10-25)
- Added a new local tool version using Candidate295's actual API names: loadDB, useDB, randomSong, songPoolForModeV857 and songSourceV857.
- Read-only diagnostics added for __aniEmqAPI ready/count/workCount/getRows, AMQ/EMQ/MIX pool sizes, and custom-list API presence. No CRUD mutations or audio playback are triggered automatically.
- Tool HTML: 19,462 bytes; SHA-256 8272523986420abef4f1820856fc2c81021941d28b67178b3130687e9f5e2b06. ZIP: 10,204 bytes; SHA-256 285dac12c163a55ef1ed08213fc02743d6c4b60d4bfdeea09635aa2f0368bb37.
- PASS: Node.js syntax check, tool content assertions, ZIP integrity, and Candidate295 frozen snapshot byte/hash equality. NOT RUN: actual local execution with matching data.js/emq-data.js; browser interactions remain NOT RUN/BLOCKED.
- Report: reports/stage4-1-local-acceptance-tool-v11-20261025/STAGE_4_1_LOCAL_ACCEPTANCE_TOOL_V11_20261025.md.


## Stage 4.2 — Candidate295 local acceptance tool v1.2 (2026-10-25)
- Based on the user's runtime symbol inventory, v1.2 adds read-only presence checks for quiz/answer/audio-failure APIs, quiz history/target-summary APIs, Song Select workspace APIs, both route-guard flags and the Candidate210 module marker.
- Tool HTML: 22,781 bytes; SHA-256 f42dde260c25215fb93b21b76806ed1457edb1fce0b2e861b476777181f811b4. ZIP: 11,286 bytes; SHA-256 db88b70fabd226bf4998215f3a1e8c6a6b9313c7466808400e66f88c2f4de19c.
- PASS: Node.js syntax check and ZIP integrity. NOT RUN: actual browser execution against matching Candidate295/data.js/emq-data.js, interactive routing, quiz persistence, audio recovery and CRUD.
- Symbol presence is not behavioral acceptance; BLOCKED may reflect scope visibility limits. No application source was modified. Report: reports/stage4-2-local-acceptance-tool-v12-symbol-audit-20261025/STAGE_4_2_LOCAL_ACCEPTANCE_TOOL_V12_SYMBOL_AUDIT_20261025.md.


## Stage 5 — Candidate295 feature/dependency inventory (2026-10-25)
- Confirmed feature baseline for the next cleanup phase: (A) data core, (B) AMQ/EMQ/MIX gameplay core, (C) Song Select/custom lists/workspace routing, (D) quiz history/target summaries and persistence.
- Static source evidence: Candidate295 `index-old.html` is 1,720,917 bytes, SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`; embedded version `v82.86.06-candidate295-db-extraction-20261025`.
- Identified overlapping Song Select route wrappers at approximately lines 7,374–7,375 and 11,650–11,653. Treat as integration candidate only; no guard deletion until call order and runtime routing are verified.
- The Candidate210 initialization guard protects active workspace/song-row/batch-list behavior; its old version marker is not deletion evidence.
- Decision: no application code changed and no symbols deleted. Keep required capabilities; continue mapping direct/indirect references and storage/event/init paths before any cleanup.
- Tests: PASS for file identity recheck; prior 68/68 inline JS syntax and 271 unique DOM IDs remain static PASS evidence. Browser behavior and data-dependent checks remain NOT RUN/BLOCKED.
- Detailed report: `reports/stage5-candidate295-feature-dependency-inventory-20261025/FEATURE_DEPENDENCY_INVENTORY_CANDIDATE295_20261025.md`.
- Baseline note: Candidate295 remains a validation target only. The existing Candidate277 working-baseline record is unchanged; do not conflate the two.


## Stage 5.1 — Targeted dependency findings (2026-10-25)
- Route chain is at least three wrappers: earlier Song Select guard (~7373), generic workspace/body-class guard (~10594–10607), and final Song Select guard (~11650). Static install-order inference: final → generic → earlier guard → base showView. No deletion authorized; three responsibilities differ.
- AMQ custom lists have a canonical recovery-aware store at ~3543 and membership adapter at ~3579. Several consumers retain direct localStorage fallback reads for `aniCustomPracticeListsV1`; these are integration candidates, not confirmed dead code.
- EMQ lists use a distinct schema/key (`aniEmqWorkListsV8254`, `workIds/vndbIds/songIds`) from AMQ lists (`aniCustomPracticeListsV1`, `animeIds`). Do not merge schemas without an adapter and migration evidence.
- Quiz detail history (`aniQuizHistory_v1`), history summary (`aniQuizHistorySummaryV1`) and target summary (`aniQuizTargetSummaryV1`) have distinct purposes/schemas. Similar save flows alone do not prove redundancy.
- Application source unchanged. No deletions. Browser routing, CRUD/reload, persistence and EMQ decode remain NOT RUN/BLOCKED.
- Updated report: `reports/stage5-candidate295-feature-dependency-inventory-20261025/FEATURE_DEPENDENCY_INVENTORY_CANDIDATE295_20261025.md`.


## Stage 5.2 — Source-order audit findings (2026-10-25)
- Static source order establishes navigation wrapper chain: final Song Select guard (~11650) → generic workspace/body-class guard (~10594) → first Song Select guard (~7373) → base navigator. The two Song Select guards have overlapping destination maps; generic guard owns body-class sync and final guard closes the home menu for non-intercepted navigation. Integration candidate only; no guard deleted.
- AMQ custom-list direct-read fallbacks are localized at ~2359, ~4983, ~7410 and ~11492. Canonical recovery-aware store is initialized at ~3543. Event callbacks likely run after initialization, but this remains inference until browser/runtime checks; backup import/export direct storage access is separate and must remain supported.
- Quiz detail history is saved once to `aniQuizHistory_v1`, then updates distinct history and target summaries with their own processed-ID dedupe and save scheduling. Startup summary reconstruction is a recovery path, not confirmed dead work.
- Candidate295 rechecked unchanged: 1,720,917 bytes; SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`.
- No application source changes/deletions. Browser behavior remains NOT RUN/BLOCKED. Full report extended with source-order and storage findings.


## Stage 5.3 — Route guard semantic qualification (2026-10-25)
- Both Song Select guards map the same six destinations and dispatch the same interception event, but placement changes side effects: the inner guard's return still allows the generic wrapper's body-class post-processing; the outer final guard returns before generic wrapper execution and therefore bypasses that post-processing. This confirms duplicated routing logic with order-dependent behavior, not safe whole-block deletion.
- Added a static-only regression matrix for six panel destinations, normal routes, dashboard class behavior, repeat initialization, body-class synchronization and browser return navigation. All behavior cases remain NOT RUN.
- No app source modified. Full report now includes the semantic qualification and regression matrix.


## Stage 5.4 — Re-run syntax check count correction (2026-10-25)
- Re-ran Node.js syntax checks while excluding the inline JSON data block `aniAnilistIdMapV8237` from executable JS: 67/67 executable inline JS blocks PASS. There are 70 script tags total, 2 external tags, and 1 inline JSON data block.
- Corrected prior inventory wording that had counted the JSON data block as executable JavaScript. No app source changed.


## Stage 5.5 — Route owner and custom-list fallback analysis (2026-10-25)
- Extended the Candidate295 dependency inventory with static evidence for the four AMQ custom-list fallback readers and a safe consolidation plan.
- Confirmed route wrapper chain: base navigator → first Song Select guard → generic workspace/body-class guard → final Song Select guard. Duplicate route maps are not safe to delete blindly because wrapper placement changes body-class side effects.
- Added a single-owner route design and required browser regression matrix to the report.
- Candidate295 file remains 1,720,917 bytes, SHA-256 aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81. No application source or storage schema changed.
- Static dependency analysis: PASS. Browser routing, custom-list CRUD/persistence and backup/restore: NOT RUN. No deletion currently proven safe.
- Formal working baseline remains Candidate277 as recorded in BASELINE.md. Candidate295 is a validation target only.
- Report: reports/stage5-candidate295-feature-dependency-inventory-20261025/FEATURE_DEPENDENCY_INVENTORY_CANDIDATE295_20261025.md
