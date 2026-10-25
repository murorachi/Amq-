# CURRENT_STATUS.md

Updated: 2026-10-25
Stage: Batch 3 route/storage isolated verification complete; full-app runtime verification remains open.
Stage: Batch 2 dependency trace complete; runtime verification and cleanup remain in progress.
Stage: Batch 1 — Candidate302 feature inventory (static evidence).
State: **Candidate302 is the formal baseline. Batch 1 has produced a first evidence-backed inventory; the six-goal cleanup is not complete.**

## Formal baseline
- File: `amq_learning_tool_v82_86_13_candidate302_emq_loader_state_validation_20261025.html`
- Size: 1,720,249 bytes
- SHA-256: `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`
- User authorized promotion after local verification.
- Candidate295 remains immutable rollback: SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`.

## Batch 1 — feature inventory
- Report: `FEATURE_INVENTORY_BATCH1_CANDIDATE302_20261025.md`.
- Local machine-readable inventory: `FEATURE_INVENTORY_BATCH1_CANDIDATE302_20261025.json`.
- Verified Candidate302 local bytes/hash against baseline.
- Static audit rerun: 67 executable inline JS blocks, 0 syntax errors; 109 style blocks; 2,808 top-level CSS rules; 271 HTML IDs, 0 duplicates.
- Identified 30 literal local/session storage keys; 383 repeated CSS selector strings (665 extra occurrences); 480 addEventListener text occurrences, 4 removeEventListener, 54 MutationObserver, 3 ResizeObserver, 5 IntersectionObserver, 137 setTimeout, 10 setInterval and 35 requestAnimationFrame occurrences. These are text counts, not live runtime instances.
- Classified key feature domains as KEEP / INTEGRATE / DELETE / NEEDS CONFIRMATION. No item met the evidence threshold for direct DELETE.
- Highest-risk integration areas: multi-layer Song Select/workspace route wrappers; CSS cascade overrides; legacy/anonymous script blocks; storage ownership and schema.
- No application source code was modified or deleted in Batch 1.

## Six-goal cleanup progress
1. Feature inventory: **PARTIAL — first static evidence-backed inventory created; dynamic references and full runtime reachability remain.**
2. Dependency tracing: **PARTIAL — previous route/list/storage findings exist; full dependency map not complete.**
3. Duplicate implementation consolidation: **NOT COMPLETE.**
4. Confirmed obsolete code deletion: **NOT COMPLETE; zero direct deletions in Batch 1.**
5. Regression testing: **PARTIAL — static/synthetic/catalog audits exist; this batch did not run browser E2E.**
6. Formal delivery: **PARTIAL — report committed; Candidate302 HTML itself still not found on this branch, so remote HTML/hash verification is BLOCKED.**

## Test status
- Static JS/CSS/HTML-ID audit on Candidate302: PASS.
- Existing isolated Candidate302 tests: 40/40 PASS (previously executed).
- Real catalog structural audit: PASS (previously provided; not rerun in this batch).
- Browser E2E, live audio, route/CRUD/backup runtime flows: NOT RUN in this batch.
- Candidate302 remote HTML body/hash: BLOCKED / NOT VERIFIED.

## Next
Batch 2: map route wrappers and side effects, storage key owners and read/write paths, custom-list store/API boundaries, event/listener/observer/timer lifecycles, and CSS selector-to-DOM ownership. Use the Batch 1 inventory as the index; do not start deleting based only on names or repeated selectors.


## Batch 2 dependency trace
- Static source evidence extraction: PASS; baseline hash and size unchanged.
- Route finding: Candidate193's final guard intercepts selected destinations while Song Select is active, opens workspace content and returns without invoking core `showView` or dispatching `ani-app-navigation`. Generic wrapper side effects are bypassed on this path; destination strings alone do not establish equivalent behavior.
- Storage finding: `aniCustomPracticeListsV1` canonical writer/store is `v82-25-custom-lists-and-practice-hub`; compatibility fallback readers and backup/restore consumers remain.
- AMQ custom lists use `animeIds`; EMQ lists use `workIds`, `vndbIds`, and `songIds`. Do not merge schemas.
- Static extraction located 383 listener registration/removal patterns, 57 observer constructors and 182 timer/RAF calls. These counts do not prove leaks.
- No application source changes/deletions; DELETE=0.
- NOT RUN: browser route/workspace E2E, computed-style verification, runtime lifecycle instrumentation, synthetic custom-list CRUD/import/export/backup/restore.
- BLOCKED: Candidate302 HTML artifact still NOT_FOUND; remote hash not verified.


## Batch 3 results
- Route isolated Chromium harness: 14/14 PASS, 0 page errors; uses Candidate302 scripts 3/62/70 with stubbed dependencies, not full app E2E.
- Storage repository isolated Chromium harness: 6/6 PASS, 0 page errors; synthetic in-memory storage only, no user data.
- Confirmed Song Select guard interception bypasses core navigation event and generic standalone class wrapper.
- Confirmed malformed/non-allowlisted legacy import refusal, source-key preservation and transaction rollback after injected write failure.
- No application source changes/deletions; DELETE=0.
- Full AMQ/EMQ/MIX E2E, observer/timer runtime instrumentation and computed-style tests NOT RUN.
- Candidate302 HTML remote artifact remains NOT_FOUND; remote SHA-256 verification BLOCKED.


## Batch 4 — 2026-10-25
- Expanded isolated Chromium route matrix: **15/15 PASS, 0 FAIL, 0 page errors**. Coverage includes six Song Select workspace intercept destinations, the VNDB special branch, and eight normal routes. Actual extracted Candidate302 navigation scripts were tested with stubbed DOM/API; this is not full-app E2E.
- Completed static caller/writer map for `aniCustomPracticeListsV1`, AMQ recovery snapshots, `aniEmqWorkListsV8254`, and `aniEmqWorkListsSelectedV8254`. Confirmed AMQ/EMQ schemas remain separate; recovery snapshots are required safety data. The anonymous AMQ fallback reader is an integration candidate, not approved for deletion.
- Candidate302 local baseline hash unchanged. Matching `data.js` and `emq-data.js` were not found under `/mnt/data`; full-app E2E, lifecycle runtime monitoring and computed-style checks remain NOT RUN.
- Remote Candidate302 HTML fetch still returns 404; remote artifact/hash verification is BLOCKED. Text reports/docs existing remotely do not establish that the HTML artifact exists.
- No app source edits/deletions; DELETE=0.


## Batch 5 — 2026-10-25
- User agreed to skip remote Candidate302 artifact transfer and full-app E2E attempts for now; those remain BLOCKED/NOT RUN rather than being repeatedly retried.
- Candidate302 reverified locally: 1,720,249 bytes; SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Static lifecycle audit scanned 70 inline script blocks and produced a 14-script high-priority review shortlist. Static call-site counts do not prove leaks.
- Chromium computed-style probe PASS for the static DOM at 1440x900, using real Candidate302 markup/CSS with inline scripts removed; 0 page errors. Dynamic Song Select/workspace elements absent before initialization remain NOT RUN.
- No app source modified or deleted; DELETE=0. Full app E2E, runtime lifecycle pairing, and remote HTML hash verification remain NOT RUN/BLOCKED.
- Batch 5 report and local evidence package are available as deliverables; GitHub report/summary and docs updated separately.


## Batch 6 — 2026-10-25 runtime lifecycle stress probe
- Tested 12 selected Candidate302 inline scripts individually in Chromium with actual static markup/CSS, inline app scripts disabled, synthetic APIs and minimal workspace scaffolding.
- 12/12 selected scripts initialized without uncaught errors; 0 browser page errors.
- Each script received 20 synthetic route/body-class/navigation/resize cycles. No net increase in active listener registrations or active observers was observed in this isolated harness; scheduled RAF/timeouts settled.
- Manual reinjection added registrations for eight scripts, but this is not evidence that normal route changes reinject them or that a production leak exists. Treat as INTEGRATE/NEEDS_CONFIRMATION only.
- Multiplayer UI created two page-level intervals; active-room poll/socket shutdown with synthetic session/fake server remains NOT RUN.
- Full-app E2E NOT RUN; remote Candidate302 HTML remains BLOCKED/NOT_FOUND. No app source changed; DELETE=0.
- Report: `BATCH6_RUNTIME_LIFECYCLE_REPORT_20261025.md`; probe JSON: `BATCH6_RUNTIME_LIFECYCLE_PROBE_RESULTS.json`; summary: `BATCH6_VALIDATION_SUMMARY.json`.


## Batch 7 — multiplayer lifecycle and script-load topology (2026-10-25)
- Actual extracted Candidate302 multiplayer UI tested in isolated Chromium with synthetic storage, fake HTTP responses, and a fake WebSocket.
- Classic/team scenarios: initialization PASS; room polling observed; route-away stopped additional room GETs; team socket closed on route-away; local release cleared synthetic session; 0 page errors.
- A heartbeat POST still occurs after route-away while the room session remains stored. Treat as a design question, not a proven leak.
- Candidate302 has 70 inline scripts, no duplicate script IDs, no duplicate non-empty source hashes. Each of the eight manual-reinjection candidates appears once in static HTML. Runtime eval/reinjection is not ruled out by static topology alone.
- No app source changed; DELETE=0. Full-app E2E NOT RUN; remote HTML remains BLOCKED/NOT_FOUND.
- Report: BATCH7_MULTIPLAYER_LIFECYCLE_REPORT_20261025.md; results: BATCH7_MULTIPLAYER_FAKE_SERVER_RESULTS.json; topology: BATCH7_SCRIPT_LOAD_TOPOLOGY.json.


## Batch 8 — Candidate303 shared OpenCC loader integration (2026-10-25)
- Candidate303 created from immutable Candidate302; baseline SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd` unchanged.
- Candidate: `amq_learning_tool_v82_86_14_candidate303_opencc_shared_loader_20261025.html`, 1,720,527 bytes, SHA-256 `ffb223a37f2ba7f243430c7e0a643f8916ebae13f809d83cc2b8cbd9153df1c8`.
- Root cause: AMQ and EMQ Chinese-title modules each injected the same pinned OpenCC script. Added page-level `window.__aniOpenCCLoaderV1`; EMQ now consumes the shared loader and retains its local 6-second wait limit.
- Only inline script blocks 31 and 41 changed; 68/70 other script blocks and all 109 CSS blocks unchanged. OpenCC URL appears once. No feature deletions.
- Tests: JS syntax 67/67 PASS; isolated Chromium loader tests 3/3 PASS (concurrent consumers one request, graceful CDN failure, preloaded converter path); duplicate DOM IDs 0.
- Full-app E2E NOT RUN. Remote Candidate303 HTML NOT UPLOADED/BLOCKED; remote artifact SHA unverified.
- Report: `BATCH8_CANDIDATE303_REPORT_20261025.md`; manifest: `BATCH8_CANDIDATE303_MANIFEST.json`; test results: `BATCH8_CANDIDATE303_TEST_RESULTS.json`.


## Batch 9 — Bulk triage and first confirmed deletion (2026-10-25)
- Candidate304 created from formal Candidate302 baseline; Candidate302 unchanged.
- Candidate: `amq_learning_tool_v82_86_15_candidate304_opencc_and_diagnostic_cleanup_20261025.html`, 1,720,215 bytes, SHA-256 `afec1555f4e6a56bb39ffac2622d16a148656ee5c4c5c50a3bb5aa7eab254f21`.
- Applied shared OpenCC loader integration to AMQ/EMQ Chinese-title modules; removed `v41-classification-diagnostic` because its only effect was writing `window.__v41LastClassifiedSong` and the formal HTML had no internal reader.
- Only two title scripts modified and one diagnostic script deleted; all 109 CSS blocks unchanged.
- Tests: JS syntax 66/66 PASS; isolated OpenCC Chromium 3/3 PASS; synthetic EMQ loader regression 9/9 PASS; duplicate DOM IDs 0.
- Bulk scan: 109 CSS blocks / 3,637 rules / 651 repeated selector groups / 1,385 extra repeated occurrences. Repeated selectors are not auto-deleted; next batch uses cascade-aware feature clusters.
- Full-app E2E NOT RUN; Candidate304 HTML remote upload BLOCKED; remote SHA unverified.
- Report: `BATCH9_BATCH_CLEANUP_REPORT_20261025.md`; manifest: `BATCH9_CANDIDATE304_MANIFEST.json`; summary: `BATCH9_VALIDATION_SUMMARY.json`.

## Batch 10 — Home / Song Select CSS cascade cleanup (2026-10-25)
- Source Candidate304 verified: 1,720,215 bytes; SHA-256 `afec1555f4e6a56bb39ffac2622d16a148656ee5c4c5c50a3bb5aa7eab254f21`.
- Candidate305 created (not promoted): `amq_learning_tool_v82_86_16_candidate305_home_songselect_css_cleanup_20261025.html`, 1,670,933 bytes; SHA-256 `3bcaaa70fe05b130dd302462a1ef2aa41fbed855f2e12526d526c7675bd07e9f`.
- Removed 1,432 earlier declarations proven superseded by later declarations under the same selector/at-rule and equal-or-higher importance; removed 167 now-empty rules. 38 of 109 style blocks touched; HTML reduced 49,282 bytes.
- PASS: JavaScript syntax 66/66; CSS parse errors 0; duplicate IDs 0; non-style HTML and all 69 script contents unchanged; Chromium computed-style comparison 6/6 (home + Song Select at 1440x900, 768x1024, 390x844; 412 static elements/scenario; zero differences).
- Full-app E2E and dynamic-DOM visual acceptance NOT RUN. Candidate305 remote HTML upload BLOCKED; do not claim remote HTML SHA verification. Formal baseline remains Candidate302.
- Report: `BATCH10_HOME_SONGSELECT_CSS_CLEANUP_REPORT_20261025.md`; summary: `BATCH10_VALIDATION_SUMMARY.json`; detailed local deletion manifest: `BATCH10_CSS_REMOVAL_MANIFEST.json`.

## Batch 11 — Home / Song Select orphan CSS cleanup (2026-10-25)
- Verified Candidate305 source SHA-256: `3bcaaa70fe05b130dd302462a1ef2aa41fbed855f2e12526d526c7675bd07e9f`.
- Created unpromoted Candidate306: `amq_learning_tool_v82_86_17_candidate306_home_songselect_orphan_css_cleanup_20261025.html`, 1,667,280 bytes; SHA-256 `ac39a87d0ebc3c50f89754cae95cd62518a659a7c354075d6d1be6b6edc4de7e`.
- Removed 31 orphan selector branches (124 declarations; 3,653 bytes) from four CSS blocks: v79 design system legacy Home classes, v82-44 and v82-45 Home overrides, and Candidate99's unused dashboard modal.
- PASS: JS syntax 68/68; CSS parse 0 errors; duplicate IDs 0; all 69 script tag contents unchanged; non-style HTML byte-identical; Chromium computed-style regression 6/6 with zero diffs across Home/Song Select at desktop/tablet/mobile.
- Full-app E2E NOT RUN. Candidate306 HTML remote upload BLOCKED; report/summary/manifest summary are published. Formal baseline remains Candidate302.
- Report: `BATCH11_HOME_SONGSELECT_ORPHAN_CSS_CLEANUP_REPORT_20261025.md`; summary: `BATCH11_VALIDATION_SUMMARY.json`.

## Batch 12 — Home / Song Select cross-block CSS consolidation (2026-10-25)
- Source Candidate306 verified: SHA-256 `ac39a87d0ebc3c50f89754cae95cd62518a659a7c354075d6d1be6b6edc4de7e`.
- Created unpromoted Candidate307: `amq_learning_tool_v82_86_18_candidate307_home_songselect_css_consolidation_20261025.html`, 1,665,250 bytes; SHA-256 `f2c080906ef9f2db6367286401dda0fc0181dae6041549402384180724d47aa6`.
- Removed 9 fully superseded CSS rules / 23 declarations across 3 style blocks; HTML reduced by 2,030 bytes. Scope: Home discover layout and Song Select Candidate53/Candidate143 overrides superseded by later owners.
- PASS: JS syntax 68/68; CSS parser 0 errors; duplicate IDs 0; script contents and non-style HTML unchanged; Chromium computed-style regression 6/6 with zero differences, including representative synthetic dynamic Home/Song Select nodes.
- Full-app E2E NOT RUN. Candidate307 HTML remote upload BLOCKED; report, summary and manifest summary published and pending read-back verification. Formal baseline remains Candidate302.
- Report: `BATCH12_HOME_SONGSELECT_CSS_CONSOLIDATION_REPORT_20261025.md`; summary: `BATCH12_VALIDATION_SUMMARY.json`.

## Batch 12 — Home / Song Select CSS consolidation (2026-10-25)
- Candidate307 created from Candidate306: 1,665,250 bytes; SHA-256 `f2c080906ef9f2db6367286401dda0fc0181dae6041549402384180724d47aa6`.
- Removed 9 provably superseded CSS rules / 23 declarations across three style blocks; file reduced 2,030 bytes.
- PASS: JS syntax 68/68; CSS parse 0 errors; duplicate IDs 0; scripts and non-style HTML unchanged; computed-style regression 6/6 with zero diffs.
- Full-app E2E NOT RUN; HTML remote upload BLOCKED. Candidate307 not promoted.

## Batch 13 — Home mobile orphan CSS cleanup (2026-10-25)
- Candidate308 created from Candidate307: 1,665,019 bytes; SHA-256 `89e7829e8228e3b4ed1061657e6c2f7245496e4dd6e158344a6c6c76518b4d67`.
- Removed 7 old mobile rules for `.heroMain`, `.heroMain h2`, `.daily`; 10 declarations, 231 bytes removed.
- PASS: JS syntax 68/68; CSS parse 0 errors; duplicate IDs 0; scripts/non-style HTML unchanged; computed-style regression 6/6 zero diffs.
- Full-app E2E NOT RUN; HTML remote upload BLOCKED. Candidate308 not promoted. Formal baseline remains Candidate302.

## Batch 14 — Home stable-play modal superseded CSS cleanup (2026-10-25)
- Candidate309 created from Candidate308: 1,664,430 bytes; SHA-256 `922b21b30661b81c7dd343a6e09a22a016c166dea0ead9d24ba521742b141c5f`.
- Removed 17 declarations / 589 bytes from four first-occurrence selectors in style block `amq-workspace-osu-composition-v24`; all removed properties are superseded by later same-selector rules and/or the Candidate99 correction block.
- PASS: JS syntax 68/68; CSS parse 0 errors; duplicate IDs 0; scripts and non-style HTML unchanged; Chromium computed style 6/6 with zero diffs, including synthetic stable-play modal nodes.
- Full-app E2E NOT RUN. Candidate309 HTML remote upload BLOCKED. Candidate309 not promoted; formal baseline remains Candidate302.

## Batch 14 — Home stable-play modal superseded CSS cleanup (2026-10-25)
- Candidate309 created from Candidate308: 1,664,430 bytes; SHA-256 `922b21b30661b81c7dd343a6e09a22a016c166dea0ead9d24ba521742b141c5f`.
- Removed 17 superseded declarations / 589 bytes in one Home stable-play modal style block. JS and non-style HTML unchanged.
- PASS: JS syntax 68/68; CSS parse 0 errors; duplicate IDs 0; computed style 6/6 desktop/tablet/mobile Home and Song Select scenarios, zero differences.
- Full-app E2E NOT RUN; Candidate309 HTML remote upload BLOCKED. Candidate309 not promoted; formal baseline remains Candidate302.

## Batch 15 — Home settings-panel superseded layout CSS cleanup (2026-10-25)
- Candidate310 created from Candidate309: 1,664,118 bytes; SHA-256 `34ba5cf818de8984efbf986f53a3c9d5da673fd3fe1cae3ff2e8e67bc7fe65f9`.
- Removed 9 superseded declarations / 312 bytes from the Home settings-panel layout rules. JS/non-style HTML unchanged.
- PASS: JS syntax 68/68; CSS parse 0 errors; duplicate IDs 0; computed style 6/6 desktop/tablet/mobile scenarios, zero differences.
- Full-app E2E NOT RUN. Candidate310 HTML remote upload BLOCKED. Report/summary creation on GitHub also encountered connector errors and remains unverified. Candidate310 not promoted; formal baseline Candidate302 remains unchanged.

## Batch 16 — Home / Song Select theme and stable-play modal CSS cleanup (2026-10-25)
- Candidate311 created from Candidate310: 1,662,516 bytes; SHA-256 `dbfac39ea961af4d761c25cc49d08ebdaea29fbaee0cd9225a720105a31d4996`.
- Removed 55 superseded/duplicate CSS declarations / 1,602 bytes. Targeted duplicate Home/workspace theme variables, Home profile sizing, and stable-play modal declarations overridden by Candidate99 under the same selector/property/media condition.
- PASS: JS syntax 68/68; CSS parse 0 errors; duplicate IDs 0; scripts and non-style HTML unchanged; Chromium computed style 6/6 desktop/tablet/mobile scenarios, zero differences.
- Full-app E2E NOT RUN. Candidate311 HTML remote upload BLOCKED/unverified; report and summary published. Candidate311 not promoted; formal baseline Candidate302 remains unchanged.

## Batch 17 — Cross-module CSS / JS deduplication (2026-10-25)
- Source Candidate311 verified locally: 1,662,516 bytes; SHA-256 dbfac39ea961af4d761c25cc49d08ebdaea29fbaee0cd9225a720105a31d4996.
- Created unpromoted Candidate312: amq_learning_tool_v82_86_23_candidate312_cross_module_css_js_dedup_20261025.html, 1,648,144 bytes; SHA-256 12e8fbc4c00c2459dd3af2d7c1b099893e144958f5171ad9721c7bc01ebd20cb.
- Removed 655 CSS declarations proven superseded under the exact same selector, nested at-rule condition and property across 35 style blocks. CSS rules remain 3,423; declarations 12,080 → 11,425.
- Removed one duplicate quiz answer-mirror input listener from V39; V37 retains the same mirror behavior. Other V39 behavior remains.
- PASS: JS syntax 68/68; CSS parse 0 errors; duplicate IDs 0; Chromium computed-style comparison 5/5 scenarios with zero differences (Home desktop/mobile, Song Select desktop/tablet, quiz desktop).
- Full-app E2E NOT RUN. Real audio, persistence/CRUD, multiplayer server and full route workflow remain unverified.
- Candidate312 is not promoted; formal baseline remains Candidate302. HTML remote upload and remote SHA verification are NOT VERIFIED.
- Report: BATCH17_CROSS_MODULE_CSS_JS_CLEANUP_REPORT_20261025.md; manifest: BATCH17_CANDIDATE312_MANIFEST.json; results: BATCH17_CANDIDATE312_TEST_RESULTS.json; summary: BATCH17_VALIDATION_SUMMARY.json.

## Batch 18 — Workspace route and Song Select event deduplication (2026-10-25)
- Verified source Candidate312: 1,648,144 bytes, SHA-256 12e8fbc4c00c2459dd3af2d7c1b099893e144958f5171ad9721c7bc01ebd20cb.
- Created unpromoted Candidate313: amq_learning_tool_v82_86_24_candidate313_workspace_route_event_dedup_20261025.html, 1,647,687 bytes, SHA-256 bd5d82c6d1a03e3d0e62622ebf22cf63d7636435bed469ed44efd9f8eba21c6a; 457 bytes removed.
- Removed two unreachable workspace dock target click listeners: the existing document capture handler in candidate77 calls stopImmediatePropagation before target phase. In candidate76, also removed the priorFocus restoration branch whose only writer was the unreachable listener. Preserved aria-controls, close/Escape handling, geometry sync and body observer.
- Removed two no-op navigation guard retry timers; the guard installs immediately and the later Song Select route wrapper marks the outer wrapper guarded before either timer can re-install it.
- Only three script blocks changed.
- PASS: JS syntax 68/68; CSS parse 0 errors; duplicate IDs 0; isolated Chromium dock open/close behavior matches before/after; route-wrapper behavior matches across 5 scenarios.
- Full-app E2E NOT RUN. Audio, real data persistence/CRUD, AMQ/EMQ/MIX gameplay and multiplayer server remain unverified.
- Candidate313 not promoted. Formal baseline remains Candidate302 (f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd). Candidate HTML remote upload/hash remain NOT VERIFIED.
- Report: BATCH18_WORKSPACE_ROUTE_EVENT_DEDUP_REPORT_20261025.md; manifest: BATCH18_CANDIDATE313_MANIFEST.json; tests: BATCH18_CANDIDATE313_TEST_RESULTS.json; summary: BATCH18_VALIDATION_SUMMARY.json.

## Batch 19 — Song Select layout-owner conflict cleanup (2026-10-25)
- Verified Candidate313 source SHA-256 bd5d82c6d1a03e3d0e62622ebf22cf63d7636435bed469ed44efd9f8eba21c6a; created unpromoted Candidate314, 1,647,472 bytes, SHA-256 e3e2afb98574aea5db9bc5ac94eaeba809b6ed3416999657463964eefab05d17; 215 bytes removed.
- Root cause: older Candidate103 kept writing catalog bottom/height and its catalog style observer reran the old fix after Candidate106's final layout owner. At 390px this overwrote the final owner's mobile bottom=86px with the old clamp value.
- Removed only the old Candidate103 catalog bottom/height writes and local variable; preserved the observer and legacy audio/video, dock, Back/Home and mode-wrap behavior.
- PASS: JS syntax 68/68; CSS parse 0 errors; duplicate IDs 0; actual Candidate103+Candidate106 scripts in isolated Chromium at 390/768/1440px. Candidate314 keeps mobile bottom=86px and tablet/desktop clamp geometry; audio/video remain hidden.
- Full-app E2E NOT RUN. Candidate314 not promoted; formal baseline Candidate302 unchanged. Candidate HTML remote upload/hash NOT VERIFIED.
- Report: BATCH19_SONGSELECT_LAYOUT_OWNER_CONFLICT_REPORT_20261025.md; manifest: BATCH19_CANDIDATE314_MANIFEST.json; tests: BATCH19_CANDIDATE314_TEST_RESULTS.json; summary: BATCH19_VALIDATION_SUMMARY.json.

## Batch 20 — Workspace dock dead listener cleanup (2026-10-25)
- Candidate315: 1,647,133 bytes, SHA-256 5c92830eeb519105d06b8cf1a71f3717bf8b4c852cd7be4da7c5622265958621; derived from Candidate314 (e3e2afb98574aea5db9bc5ac94eaeba809b6ed3416999657463964eefab05d17); 339 bytes removed.
- Removed Candidate70's dead per-button [data-ws] click listener. Candidate77's document capture handler calls stopImmediatePropagation, so the target listener could never run. Preserved Back button and Escape handler.
- PASS: JS syntax 68/68, CSS parse, duplicate IDs; isolated Chromium dock open, Escape close and toggle behavior identical before/after.
- Full-app E2E NOT RUN. Candidate315 not promoted; formal baseline Candidate302 unchanged. Candidate HTML upload/hash NOT VERIFIED.
- Report/manifest/test/summary: BATCH20_WORKSPACE_DOCK_DEAD_LISTENER_REPORT_20261025.md, BATCH20_CANDIDATE315_MANIFEST.json, BATCH20_CANDIDATE315_TEST_RESULTS.json, BATCH20_VALIDATION_SUMMARY.json.


## Batch 21 — Workspace panel state-owner deduplication (2026-10-25)
- Candidate316: 1,646,612 bytes, SHA-256 4845b950ae4e801aa6c6da2d9d0a23bdbac16a04edaa218396e4c043b17b4317; derived from Candidate315 (5c92830eeb519105d06b8cf1a71f3717bf8b4c852cd7be4da7c5622265958621); 521 bytes removed.
- Removed Candidate72 ranking-frame bootstrap's duplicate panel display/visibility/pointer-events writer and its body-class MutationObserver. Kept the required ranking-frame placeholder; Candidate76/77 remain the panel state owners.
- PASS: JS syntax 68/68, CSS parse, duplicate IDs; isolated Chromium dock open, Escape close and direct class-state scenarios match before/after.
- Full-app E2E NOT RUN. Candidate316 not promoted; formal baseline Candidate302 unchanged. Candidate HTML upload/hash NOT VERIFIED.
- Report/manifest/test/summary: BATCH21_WORKSPACE_PANEL_STATE_OWNER_REPORT_20261025.md, BATCH21_CANDIDATE316_MANIFEST.json, BATCH21_CANDIDATE316_TEST_RESULTS.json, BATCH21_VALIDATION_SUMMARY.json.

## Batch 22 — Redundant ranking-frame bootstrap removal (2026-10-25)
- Candidate317: 1,645,902 bytes, SHA-256 e1373606dcc9717762bfde52636a45431bbb5f7694bf0a59f2f11391b960b2c9; derived from Candidate316 (4845b950ae4e801aa6c6da2d9d0a23bdbac16a04edaa218396e4c043b17b4317); 710 bytes removed.
- Candidate70 creates amqSongSelectRankingPlaceholder at script index 43. Candidate72's bootstrap at index 63 had become an empty no-op after Batch21 removed its observer; deleted the entire script tag. Removed Candidate71's fallback creation branch at index 61 because Candidate70 had already created the same ID.
- PASS: JS syntax 67/67, CSS parse 0 errors, duplicate IDs 0; isolated Chromium confirms one frame, panel opens, Escape closes, before/after behavior identical.
- Full-app E2E NOT RUN; Candidate317 not promoted; formal baseline Candidate302 unchanged. Candidate HTML upload/hash NOT VERIFIED.


## Batch 23 — Duplicate workspace Escape handler removal (2026-10-25)
- Candidate318: 1,645,636 bytes, SHA-256 14ef66a19621fda5798f486d4008a9251625045842d2b96c538890ed21735029; derived from Candidate317 (e1373606dcc9717762bfde52636a45431bbb5f7694bf0a59f2f11391b960b2c9); 266 bytes removed.
- Removed Candidate76's Escape handler because the earlier Candidate70 document-capture handler intercepts the same active+expanded condition and calls stopImmediatePropagation. Preserved Candidate76's close button, state observer and geometry synchronization.
- PASS: JS syntax 67/67, CSS parse 0 errors, duplicate IDs 0; isolated Chromium Escape and close-button behavior identical before/after.
- Full-app E2E NOT RUN; Candidate318 not promoted; formal baseline Candidate302 unchanged. Candidate HTML upload/hash NOT VERIFIED.


## Batch 25 — Remove dead Song Select catalog observer (2026-10-25)
- Source Candidate319 verified: 1,645,652 bytes; SHA-256 `744cca7a6134e454916d46a9a32522e16b80c3f787d8aab4596852421b5b5f54`.
- Created unpromoted Candidate320: `amq_learning_tool_v82_86_31_candidate320_remove_dead_songselect_catalog_observer_20261025.html`, 1,645,470 bytes; SHA-256 `134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`.
- Removed one Candidate103 observer watching catalog style mutations. Its callback only invokes `fix()`, which does not write to the catalog; the body route-class observer already invokes the same fix on route changes. Other Candidate103 behavior retained.
- PASS: JS syntax 67/67, CSS parse 0 errors, duplicate IDs 0, isolated Chromium regression 2/2. Full-app E2E NOT RUN.
- Candidate HTML remote upload/hash NOT VERIFIED. Candidate320 not promoted; formal baseline Candidate302 unchanged.
- Skipped full removal of Candidate103/Candidate114 because they have distinct player/dock/layout side effects; Candidate114 timers remain NEEDS CONFIRMATION.


## 2026-10-25 — Batch26 Round 1 global static candidate inventory
- Scanned Candidate320 read-only: 1,645,470 bytes; SHA-256 `134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`. Candidate302 remains the formal baseline.
- Added `AMQ_GLOBAL_CANDIDATE_SCAN_CANDIDATE320_20261025.md` and companion JSON summary.
- Static counts: 65 executable inline scripts, 109 style blocks, 2,648 CSS rules / 9,693 declarations, CSS parse errors 0, 269 IDs / 0 duplicate IDs, 342 repeated selector strings, 54 observer constructor occurrences, 474 addEventListener / 4 removeEventListener call sites, 134 setTimeout / 10 setInterval / 32 requestAnimationFrame calls.
- New direct-delete approvals: 0. Static inventory is not proof of dead code. Specific lifecycle candidates LC-01..LC-12 are classified for dependency/runtime follow-up.
- SHA/CSS/duplicate-ID static checks PASS; JavaScript syntax PASS is carried forward from handoff, not rerun in this round. Chromium/full-app E2E NOT RUN. No application source edited.
- GitHub report and JSON summary were committed; read-back verification remains the next check.


## 2026-10-25 — Batch26 Round 2 Candidate321 grouped cleanup
- Read-only dependency map completed for Candidate103/106/114/115/137/158/210. Candidate320 remains unchanged; formal baseline remains Candidate302.
- Created local Candidate321: `amq_learning_tool_v82_86_32_candidate321_batch26_round2_songselect_ownership_cleanup_20261025.html`, 1,645,516 bytes, SHA-256 `5b4ac7bdbe92f1b1a1b7056e543b065a0829d266a5f4b4fd2a1e9f7a5347e83a`.
- Grouped edits: (1) removed redundant/conflicting overflow assignments from Candidate106 catalogGeometry; (2) excluded main `#amqSongSelectTracklist` from Candidate115 generic artwork scan and click-selection delegation because Candidate137 creates its artwork placeholders and Candidate210 owns main-list cover/selection behavior.
- Tests: 65 inline JS scripts syntax PASS; 109 CSS blocks / 2,648 rules / 9,693 declarations / 0 parser errors PASS; 269 HTML IDs / 0 duplicates PASS; diff-scope assertions PASS. Chromium BLOCKED (headless timeout 30s, empty DOM dump). Full-app E2E NOT RUN.
- Added `AMQ_BATCH26_ROUND2_DEPENDENCY_CLEANUP_CANDIDATE321_20261025.md/.json` to GitHub. Candidate321 HTML remote upload/hash NOT VERIFIED; do not claim remote artifact upload.
- Candidate321 not promoted. Candidate320 remains rollback checkpoint SHA-256 `134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`.


## 2026-10-25 — Batch26 Round 2 Candidate321 grouped cleanup
- Dependency map completed for Candidate103/106/114/115/137/158/210. Candidate320 remains unchanged; formal baseline remains Candidate302.
- Created local Candidate321: `amq_learning_tool_v82_86_32_candidate321_batch26_round2_songselect_ownership_cleanup_20261025.html`, 1,645,516 bytes, SHA-256 `5b4ac7bdbe92f1b1a1b7056e543b065a0829d266a5f4b4fd2a1e9f7a5347e83a`.
- Grouped edits: removed redundant/conflicting overflow assignments from Candidate106 catalogGeometry; excluded main `#amqSongSelectTracklist` from Candidate115 generic artwork scan and click-selection delegation because Candidate137 creates its artwork placeholders and Candidate210 owns main-list cover/selection behavior.
- Tests: 65 inline JS scripts syntax PASS; 109 CSS blocks / 2,648 rules / 9,693 declarations / 0 parser errors PASS; 269 HTML IDs / 0 duplicates PASS; diff-scope assertions PASS. Chromium BLOCKED (headless timeout 30s, empty DOM dump). Full-app E2E NOT RUN.
- Added `AMQ_BATCH26_ROUND2_DEPENDENCY_CLEANUP_CANDIDATE321_20261025.md/.json` to GitHub. Candidate321 HTML remote upload/hash NOT VERIFIED.
- Candidate321 not promoted. Candidate320 remains rollback checkpoint SHA-256 `134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`.


## Batch26 Round 3 — Candidate321 browser validation (2026-10-25)
- Candidate321 unchanged: 1,645,516 bytes, SHA-256 `5b4ac7bdbe92f1b1a1b7056e543b065a0829d266a5f4b4fd2a1e9f7a5347e83a`; not promoted. Candidate302 remains formal baseline; Candidate320 remains rollback checkpoint.
- Playwright/Chromium launched successfully. Isolated Chromium harness using Candidate106/114/115/137/158 scripts passed synthetic AMQ (3 rows), EMQ (3), MIX (6), search, name sort, artwork placeholder ownership, desktop overflow visible, and route-exit player reset. Zero harness page/console errors.
- Full-app E2E BLOCKED: browser policy blocks `file://` and localhost navigation; full HTML `set_content` lacks `data.js` and `emq-data.js`, which are absent from the current branch (404). Opaque document origin also blocks localStorage. Real cover loading/fallback and real audio playback NOT RUN.
- Candidate114 delayed resets and Candidate158 subtree Observer retained pending full-app evidence. Candidate321 HTML remote upload/hash NOT VERIFIED; no promotion.
- Report: `AMQ_BATCH26_ROUND3_CANDIDATE321_BROWSER_VALIDATION_20261025.md/.json`.


## Batch26 Round 4 — real-data Chromium validation (2026-10-25)
- User supplied `data(1).js` (4,975,244 bytes, SHA-256 `692f69f56079d6cc0b30bd1951ab625f53799b87525c1bd52a27f29274703cf3`) and `emq-data(3).js` (2,684,266 bytes, SHA-256 `88441b4a6090c01db1dae23c970a6fa24d457a54f4b915be3e23c3799b3794cc`). Candidate321 itself was not modified.
- Chromium test copy embedded the actual data scripts in memory and used an in-memory storage shim due opaque `about:blank` origin. Startup PASS in this test copy: DB anime=9,516, songs=38,821, EMQ work count=6,645; 0 page errors, 0 console errors, 0 failed requests.
- Song Select mode API smoke test PASS only: AMQ/EMQ/MIX calls complete without JS errors; visible grid counts 180/180/360 due chunked rendering. This is not UI E2E.
- Formal UI route remains BLOCKED in this origin; search/sort in main song list, real cover loading/fallback, actual playback and route-exit player reset NOT RUN. Candidate114 timers and Candidate158 observer retained.
- Candidate321 not promoted; HTML remote upload/hash NOT VERIFIED. Report: `AMQ_BATCH26_ROUND4_CANDIDATE321_REAL_DATA_BROWSER_TEST_20261025.md/.json`.


## Batch26 Round 4 supplement — Candidate324 initialization race fix (2026-10-25)
- Reproduced Candidate321 Candidate210 init race with actual AMQ/EMQ data: 2/4 runs had tracklist rows but no artwork `<img>` nodes and no Candidate210 selection handler.
- Candidate324 is a new experimental artifact, not promoted: `amq_learning_tool_v82_86_35_candidate324_defer_songselect_init_observer_until_route_20261025.html`, 1,646,101 bytes, SHA-256 `3308f0a97a0a8aaa63a464a0d49bee2dffa5219cb6c59add85cf3d62523d6075`. Candidate321/320/302 remain unchanged.
- Candidate324 defers the Candidate210 stage observer installation until `apply()` runs after route activation. 6/6 Chromium test-copy runs had 180 rows, 180 artwork image nodes, selection handler bound, and row click set currentSong; zero page errors. AMQ/EMQ source modes, MIX cross-source search (`Shiosai no Melody`), Cowboy Bebop search (32 matches), name sort (`_summer` first), 1980s filter, Movie filter, and route-exit player layout all PASS in isolated browser test.
- Static checks: 65 executable inline scripts syntax PASS; 109 style blocks / 2,648 CSS rules / 9,693 declarations, 0 CSS parse errors; 269 IDs / 0 duplicates.
- Real cover load/fallback remains BLOCKED/NOT VERIFIED due unavailable external cover DNS; actual audio/video playback and persistent localStorage NOT RUN because test origin is opaque. Candidate114 timers and Candidate158 observer retained. Candidate324 remote HTML upload/hash NOT VERIFIED; not promoted.
- Report: `AMQ_BATCH26_ROUND4_CANDIDATE324_INIT_RACE_ACCEPTANCE_20261025.md/.json`.


## 2026-10-25 — Candidate320 全域候選盤點（第一輪）
- 核對對象：`amq_learning_tool_v82_86_31_candidate320_remove_dead_songselect_catalog_observer_20261025.html`，1,645,470 bytes，SHA-256 `134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`。Candidate320 本輪未修改；正式基準 Candidate302 未變。
- 全域清單涵蓋 HTML/CSS/JS、DOM ID、selector cascade、listener、Observer、timer/RAF、路由、資料存取、設定及跨模組依賴。
- 靜態測試 PASS：Node syntax 65/65，CSS 109 blocks / 2,648 rules / 9,693 declarations / 0 parse errors，269 HTML IDs / 0 duplicates。
- 逗號分割後 selector 字串 2,450 個，其中 536 組重複；114 個初始 DOM 未找到的字面 ID 引用只列待追蹤候選，不視為死碼。
- 直接刪除候選：0。下一輪按直接刪除／整合後刪除／暫緩分類，先完成 Song Select 與 Workspace ownership/dependency matrix。
- Browser full-app E2E、persistent storage、實際音訊/影片及 cover fallback 本輪 NOT RUN。
- 完整本地交付：`AMQ_GLOBAL_CANDIDATE_LIST_CANDIDATE320_ROUND1_20261025.md` / `.json`。GitHub 摘要：`AMQ_GLOBAL_CANDIDATE_LIST_CANDIDATE320_ROUND1_GITHUB_SUMMARY_20261025.md`。


## 2026-10-25 — Round 2 grouped cleanup: Batch27 / Candidate325
- Source Candidate320 verified unchanged: 1,645,470 bytes; SHA-256 `134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`.
- Candidate325: 1,645,154 bytes; SHA-256 `187cba98e97d48819430a388d959a8dc0d7cbb41156b349de6adc31b58e6dd7d`.
- Deleted five CSS rules proven unreferenced outside styles: `.aniSrsGroupEnroll` normal/mobile, `.mpReadyBar`, `.mpReadyBar span`, `.vn49Checkbox`. No JS or DOM/data logic changed.
- PASS: JS 65/65 syntax; CSS 0 parse errors; 269 IDs / 0 duplicates; Chromium computed styles 3/3 viewport sizes, 412 elements each, 0 differences.
- NOT RUN: full-app E2E, persistent storage, real media playback, external cover fallback. Candidate325 not promoted.

## 2026-10-25 — Round 2 grouped integration: Batch28 / Candidate326
- Candidate326: 1,645,785 bytes; SHA-256 `9fee7d3a68c0833b6e84d6f0a3a3beca1ab09902bdb3ec2f8b76f5e60d5db3ba`; carries Batch27 CSS cleanup and Song Select owner/lifecycle integration.
- Candidate106 removes two conflicting catalog overflow assignments; Candidate115 excludes the main tracklist from the generic artwork scanner; Candidate210 installs its stage subtree observer only after route activation and binds list/artwork handling after tracklist creation.
- PASS: Node syntax 65/65; CSS parse 0 errors; 269 IDs / 0 duplicates. JS hashes match previously tested Candidate324; CSS block hashes match Candidate325.
- PASS (isolated test copy): real data startup (9,516 anime / 38,821 songs), synthetic hidden-control dispatch activates Song Select with 180 rows and 180 artwork image nodes; row selection updates song state to ID 45305; 0 page errors.
- BLOCKED: visible UI click test because the legacy control is inside hidden `#amqHomeOverlay`; external cover requests blocked. NOT RUN: real audio/video playback and persistent storage.
- Candidate326 is experimental and not promoted. Candidate302 remains formal baseline; Candidate320 remains rollback checkpoint. HTML artifact upload and remote SHA verification are BLOCKED because the available GitHub connector writes text content but has no direct local-file upload action.
- Local reports: `AMQ_BATCH27_CANDIDATE325_ORPHAN_CSS_CLEANUP_20261025.md`; `AMQ_BATCH28_CANDIDATE326_SONGSELECT_OWNERSHIP_CLEANUP_20261025.md`. GitHub summaries committed separately.


## 2026-10-25 — Batch29 Candidate326 可見 UI 與路由回歸補充
- 修正前一輪的保守判定：已在 Chromium 隔離測試副本中透過真實可見操作點擊 `#amqMainIcon`，再點擊可見的 `#amqHomePrimaryNav [data-home-action="catalog"]`。Song Select route active、stage visible、180 rows，PASS。
- PASS：AMQ mode 180/180 source=amq；EMQ mode 180/180 source=emq；MIX 搜尋 `Shiosai no Melody` 命中 EMQ row ID 2000000001；Movie filter 顯示 5,137 首，1980 decade filter 顯示 2,813 首；點擊 row 後 currentSong=45305；點擊可見 `#c99Back` 返回 home，route class 移除、audioDock relative/46px、home player slot 46px。
- PASS：0 uncaught page errors。測試副本使用實際資料檔內容，但仍是 opaque about:blank + memory storage shim。
- BLOCKED：ANN/VNDB DNS `ERR_NAME_NOT_RESOLVED`，封面載入/fallback 未能確認；真實音訊/影片播放未驗證；原生持久化未驗證。
- 嘗試 localhost 與 file URL 導航均被瀏覽器政策阻擋 `ERR_BLOCKED_BY_ADMINISTRATOR`，因此無法在本環境完成可信 origin 測試。
- 本輪無應用程式碼修改。Candidate326 不升格；Candidate320 rollback、Candidate302 formal baseline 不變。
- 報告：`AMQ_BATCH29_CANDIDATE326_VISIBLE_UI_PERSISTENCE_PROBE_20261025.md` / `.json`。


## Batch30 — Candidate327 orphan CSS selector cleanup (2026-10-25)
- Candidate327: 1,644,791 bytes; SHA-256 `3e117b68a3fa1f4a57c7ef010477ee18dc12d1327f174765dd44d05f324cb302`; derived from Candidate326 SHA-256 `9fee7d3a68c0833b6e84d6f0a3a3beca1ab09902bdb3ec2f8b76f5e60d5db3ba`.
- Removed 18 unreferenced CSS selector branches and 2 resulting-empty rules; 994 bytes removed. JavaScript and markup unchanged.
- PASS: JS syntax 65/65, CSS parse 0 errors, 269 unique IDs, static computed style 3/3 viewports with zero differences.
- Full E2E, real media, external cover/fallback, native storage: NOT RUN, deferred to user local test. Candidate327 not promoted; Candidate302 baseline and Candidate320 rollback unchanged. HTML upload/hash NOT VERIFIED.
- Summary: `AMQ_BATCH30_CANDIDATE327_GITHUB_SUMMARY_20261025.md`.


## Batch31 — Candidate328 (2026-10-26)
- Candidate328 SHA-256: `985780d07196fc50b8a6f638e84ee131e48edece1c98c6fad86e660b51b68315`; 1,644,505 bytes. Removed two unreachable listeners and integrated stale-overlay cleanup into Candidate82's active Escape owner. Net −286 bytes.
- PASS: 65/65 inline script syntax; 269 unique IDs; CSS unchanged; only three intended scripts changed; targeted ownership checks pass.
- Browser interactions, full E2E, real media, external covers/fallback, native persistence: NOT RUN. Candidate328 not promoted.

## Batch32 — Candidate329 (2026-10-26)
- Latest experimental candidate: `amq_learning_tool_v82_86_40_candidate329_batch32_workspace_action_router_dedup_20261026.html`, 1,635,608 bytes, SHA-256 `d977b7bb8ebdbf190d2bcd163953b5b41c8eb1d7ffdc2d041e4b12d5307cb28d`.
- Removed 8,897 bytes / 97 newline characters of 16 duplicate Candidate15 action branches already owned by Candidate82's capture-phase router. Unique Candidate15 actions retained.
- PASS: 65/65 inline script syntax; 269 unique IDs; 109 CSS blocks parse with 0 errors; 16/16 deleted actions mapped in Candidate82; 12/12 unique actions preserved.
- NOT RUN: browser interactions, full E2E, real media, external covers/fallback, native persistence, HTML upload/hash verification. Candidate329 not promoted.


## Batch33 — Candidate330 Workspace action cleanup (2026-10-26)
- Candidate330: `amq_learning_tool_v82_86_41_candidate330_batch33_workspace_action_event_delegation_20261026.html`, 1,632,703 bytes, SHA-256 `844af7eecaabfe037dbaf4e1cc8dc33cbd9d31123a49456a10518ce27af30309`; parent Candidate329 SHA-256 `d977b7bb8ebdbf190d2bcd163953b5b41c8eb1d7ffdc2d041e4b12d5307cb28d`.
- Net reduction 2,905 bytes. Removed seven unreferenced Candidate15 `runAction` branches (2,897 bytes), replaced per-button listeners with one delegated listener, and removed three unused Candidate16 helpers/temporaries.
- PASS: 65/65 inline JS syntax, 269 unique IDs, 109 CSS blocks with zero parser errors; only Candidate15 and Candidate16 script bodies changed; custom-list storage and membership APIs retained.
- NOT RUN: real browser E2E, media playback, cover/fallback, native persistence. Candidate330 remains experimental; HTML upload/hash verification NOT RUN.
- Report: `AMQ_BATCH33_CANDIDATE330_WORKSPACE_ACTION_CLEANUP_20261026.md` and JSON counterpart.


## Batch34 — Candidate331 (2026-10-26)
- Candidate331: `amq_learning_tool_v82_86_42_candidate331_batch34_remove_unreachable_catalog_fallbacks_20261026.html`, 1,632,034 bytes, SHA-256 `1a17f6a940aa2248a40c56a15d91fe0d63df35da35948f15156fd261dea13565`.
- Derived from Candidate330 SHA-256 `844af7eecaabfe037dbaf4e1cc8dc33cbd9d31123a49456a10518ce27af30309`; removed 669 bytes of unreachable catalog fallback code and the now-unused waitForElement helper.
- PASS: 65/65 JS syntax, 269 unique IDs, 109 CSS blocks / 0 parse errors; only Candidate15 script changed; unique current actions retained.
- NOT RUN: browser E2E, real media, covers/fallback, native storage. Candidate331 remains experimental; HTML upload/hash NOT VERIFIED.
- Report: `AMQ_BATCH34_CANDIDATE331_UNREACHABLE_CATALOG_FALLBACKS_20261026.md` / JSON.


## Batch35 — Candidate332 Candidate16 grid scope cleanup (2026-10-26)
- Parent Candidate331 SHA-256: `1a17f6a940aa2248a40c56a15d91fe0d63df35da35948f15156fd261dea13565`.
- Candidate332: `amq_learning_tool_v82_86_43_candidate332_custom_list_grid_scope_cleanup_20261026.html`, SHA-256 `dd4b9ca46fe3303232f8f455e1461c3e638fc339fa7440819d55df86a737f10d`, 1,631,927 bytes, -107 bytes from Candidate331.
- Only `amq-workspace-prototype-16-custom-list-workflow-script` changed: removed unreachable `getGrid()` fallbacks after static `#grid`, and removed whole-document `.card` scan fallback because `#grid.closest('.view-catalog')` exists in the current HTML.
- Preserved both custom-list paths: legacy `.cardManage`/`#practiceManageBackdrop` and Song Select `.songrow[data-work-id]` using `__aniCustomListMembershipV1`; storage compatibility and session state unchanged.
- Candidate15 visibility Observer and Candidate76/77 lifecycle were retained because current evidence does not prove duplicate ownership.
- Tests: PASS, 65 inline scripts syntax checked with 0 errors; PASS, 109 style blocks raw-brace check; PASS, 729 ID attributes and 17 duplicate-ID kinds unchanged from Candidate331; PASS, key membership/storage code retained. Browser E2E, native persistence, media playback, HTML upload/remote hash remain NOT RUN.
- Experimental only. Candidate302 remains formal baseline; Candidate320 remains rollback checkpoint. Report: `AMQ_BATCH35_CANDIDATE332_CUSTOM_LIST_GRID_SCOPE_CLEANUP_20261026.md`.


## Batch36 — Candidate333 Candidate15 visibility listener cleanup (2026-10-26)
- Parent Candidate332 SHA-256: `dd4b9ca46fe3303232f8f455e1461c3e638fc339fa7440819d55df86a737f10d`.
- Candidate333: `amq_learning_tool_v82_86_44_candidate333_candidate15_visibility_listener_cleanup_20261026.html`, SHA-256 `56308f2c168c8344281ee75e23ce4a87c6a927aa56367448f0140206b81b247d`, 1,631,769 bytes (-158).
- Only Candidate15 changed: removed its `hashchange`/`popstate` visibility listeners and unused observer variable/return value. The existing subtree observer remains because VN views are created dynamically and relevant view switches mutate `hidden`/`class`. Candidate76/77 lifecycle and Candidate16 data paths unchanged.
- Tests: PASS 65 executable inline scripts syntax, 0 errors; PASS only Candidate15 changed; PASS 731 ID attrs/16 duplicate kinds/20 extra and 109 style blocks unchanged. Browser E2E, custom-list persistence, media and HTML remote upload/hash remain NOT RUN.
- Experimental only; Candidate302 formal baseline, Candidate320 rollback checkpoint.


## Batch37 — Candidate334 Candidate15 observer scope reduction (2026-10-26)
- Parent Candidate333 SHA-256: `56308f2c168c8344281ee75e23ce4a87c6a927aa56367448f0140206b81b247d`.
- Candidate334: `amq_learning_tool_v82_86_45_candidate334_candidate15_observer_scope_20261026.html`, SHA-256 `e19b8b6ee79cf988b89f84c4e33a1bbcf83fcc90e9a85d60828db76c01e62eeb`, 1,632,000 bytes (+231). This is an observer ownership/scope change, not a byte-reduction batch.
- Only Candidate15 changed: observer narrowed from `document.body` to `.wrap`; `ani-app-navigation` listener added for primary route transitions. VN dynamic views and custom-list subviews remain covered by `.wrap` subtree observation. Candidate76/77/82/16 unchanged.
- Tests: PASS 65 executable inline scripts syntax, 0 errors; PASS only Candidate15 changed; PASS ID/style counts unchanged. Browser E2E, persistence, media and HTML remote upload/hash remain NOT RUN.
- Experimental only; Candidate302 formal baseline, Candidate320 rollback checkpoint.


## 2026-10-26 — Workspace ownership audit / master checklist
- Audit target: Candidate334 SHA-256 e19b8b6ee79cf988b89f84c4e33a1bbcf83fcc90e9a85d60828db76c01e62eeb. Formal baseline Candidate302 and immutable rollback Candidate320 remain unchanged. No HTML source was modified in this audit.
- Candidate15 workspaceViews: all nine entries have evidence of a live primary route or dynamic subview: catalog, vnCatalog, watchlist, vnList, customLists, explore, practice, learningPlan, dashboard. Keep all nine; vnCatalog/vnList/customLists are visibility-derived subviews, not showView() primary routes. explore is a valid showView() route but workspace-active visual behavior still needs browser regression.
- Candidate15 dead-path candidate: clickHome() and runAction() terminal fallback appear unreachable for the currently generated action set. Candidate82's document capture handler owns dashboard/practice actions and calls stopImmediatePropagation; the five unique Candidate15 action branches for list import/custom manager/VNDB/quiz/multiplayer remain necessary. Not deleted yet; isolate as next small batch and run syntax/action assertions.
- Candidate76/77: Candidate76 owns Song Select sidebar geometry plus ARIA/tabindex reflection; Candidate77 owns dock parent/layout, expanded/mode state and sidebar inline display/visibility. Both write #amqWorkspaceSidebar aria-hidden, so this is an overlapping property-owner candidate, not proof that either whole module is dead. Candidate82 owns a separate content panel and park/restore/Escape/action map. Need state-matrix and browser transition validation before further ownership consolidation.
- Full remaining-checklist artifact: AMQ_WORKSPACE_OWNERSHIP_AUDIT_AND_MASTER_CHECKLIST_20261026.md and .json. It consolidates CSS, JS, Observer, timer, listener, global API, Song Select, workspace, modal, data/storage, core modes, import, multiplayer, build and GitHub verification scopes.
- PASS: static mapping of nine workspaceViews entries; Candidate82 capture ownership for dashboard/practice actions; Candidate76/77 ownership distinction and shared aria-hidden write identified. NOT RUN: browser E2E, Candidate76/77 transition state order, persistence, real media, Candidate334 HTML remote upload/hash. Candidate334 remains experimental.


## Follow-up static checks — 2026-10-26
- PASS: Node `--check` executed against 65 executable inline scripts in Candidate334; 0 syntax errors. One application/json script was correctly excluded from JS syntax checks.
- PASS: static ID scan found 729 id attributes, 708 unique values, and 16 duplicate-ID value kinds. This is a recorded pre-existing risk, not a browser test and not modified in this audit.
- Still NOT RUN: browser E2E, persistence, media, multiplayer E2E, Candidate334 HTML upload and remote SHA verification.


## 2026-10-26 — Batch38 Candidate335
- Candidate335 derived from verified Candidate334 SHA-256 `e19b8b6ee79cf988b89f84c4e33a1bbcf83fcc90e9a85d60828db76c01e62eeb`.
- Removed Candidate15 `clickHome(action)` and its terminal `runAction()` fallback; only inline script `amq-workspace-prototype-15-script` changed.
- Candidate335 SHA-256: `6b06c72d769204f38f836c8c5e9d4d15af798258d4772fb27d72dd820d830331`; size 1,631,485 bytes.
- PASS: parent hash verified; 65 executable inline scripts passed Node syntax checks; all ten currently emitted action IDs remain; only Candidate15 script body changed.
- NOT RUN: browser click-through/E2E, storage persistence, real media, multiplayer E2E, Candidate335 HTML upload and remote hash verification.
- Candidate335 is experimental only. Candidate302 remains formal baseline; Candidate320 remains rollback checkpoint.

## Batch39 / Candidate336（2026-10-26）

- 狀態：實驗候選，未升級正式基準。
- 父候選 Candidate335 SHA-256：`6b06c72d769204f38f836c8c5e9d4d15af798258d4772fb27d72dd820d830331`。
- Candidate336：`amq_learning_tool_v82_86_47_candidate336_batch39_sidebar_state_ownership_20261026.html`；SHA-256 `b38efba9422e81bc160bf7f66f2b4cd487bcfeafb86c6c49c8e6034283c9459a`；1,631,660 bytes。
- 修正 Candidate76 在非 Song Select 路由仍覆寫側欄 ARIA／展開狀態的衝突；一般工作區由 Candidate77 管理，Candidate76 僅處理 Song Select popup。
- PASS：父候選 hash、精確替換、僅單一 script body 改變、65 個 executable inline scripts 語法檢查 0 錯誤；Candidate302／Candidate320 未修改。
- NOT RUN：瀏覽器路由／展開收合／resize 回歸、資料持久化、媒體／多人 E2E、HTML 上傳與遠端 hash 驗證。
- 回滾：Candidate335；正式基準仍 Candidate302，回滾點仍 Candidate320。詳見 `AMQ_BATCH39_CANDIDATE336_SIDEBAR_STATE_OWNERSHIP_20261026.md`。


## Batch40 / Candidate336 瀏覽器驗收（2026-10-26）

- 結果：BLOCKED。Chromium Playwright 導覽本機 file:// 與 http://127.0.0.1 均回傳 `net::ERR_BLOCKED_BY_ADMINISTRATOR`，頁面未載入。
- 因頁面未載入，dock 點擊、路由、Song Select、resize/computed style、持久化、媒體與多人 E2E 均為 NOT RUN；沒有將環境阻擋誤報成應用程式 FAIL 或互動 PASS。
- Batch40 沒有修改 HTML、沒有建立新候選。Candidate336 SHA-256 仍為 `b38efba9422e81bc160bf7f66f2b4cd487bcfeafb86c6c49c8e6034283c9459a`。
- 報告：`AMQ_BATCH40_CANDIDATE336_SIDEBAR_BROWSER_VALIDATION_20261026.md`；JSON：`AMQ_BATCH40_CANDIDATE336_SIDEBAR_BROWSER_VALIDATION_20261026.json`。
- Candidate302 仍為正式基準；Candidate320 仍為回滾點；Candidate336 仍為實驗候選。下一步須在未被政策阻擋的互動瀏覽器執行路由／展開／resize 矩陣。


## 2026-10-26 Batch 41 — Workspace / route ownership audit
- Candidate337 input SHA-256: `901322cb3af2d44f40bdeb9e23fdeb3048003d6d760d3e757bf2d93394d1a39e`.
- Static ownership audit created and uploaded: `AMQ_BATCH41_WORKSPACE_ROUTE_OWNERSHIP_AUDIT_20261026.md` and `.json`.
- Confirmed Candidate76 and Candidate77 have distinct responsibilities; shared panel-state writes need integration, not blind deletion.
- Confirmed Candidate60 and Candidate193 are separate `window.__aniNavigateApp` wrappers with different side effects; consolidate into one dispatcher only after route mapping and static harness validation.
- Candidate70 contains active back/Escape/placeholder/background behavior; deletion is not yet justified.
- No application HTML modified in Batch 41; no new candidate. Browser E2E NOT RUN. Batch 41 report/JSON uploaded and read back from GitHub.
- Candidate302 remains formal baseline; Candidate320 remains rollback checkpoint.


## Batch 43 — Candidate339 confirmed dead-code cleanup (2026-10-26)
- Input Candidate338: 1,629,019 bytes; SHA-256 `30b20c90a766722b87e13b2e506ec0ab313d902c40258e23360249832260d28a`.
- Candidate339 local artifact: `amq_learning_tool_v82_86_50_candidate339_batch43_confirmed_dead_code_cleanup_20261026.html`, 1,628,078 bytes; SHA-256 `8518449cff37050f67e9ae418f376e328f3219c784c179e9d0b178db8ade0bdd`.
- Deleted only the duplicate Candidate186 `#audioDock` MutationObserver and three `#amqWorkspaceDock` CSS rules in Candidate94. Retained Candidate186 modal click/Escape handlers and Candidate94 list-membership filter.
- Scope assertions PASS; 65 inline JavaScript blocks syntax-check PASS (0 errors); ZIP integrity PASS.
- Browser interaction/visual regression NOT RUN. Candidate339 HTML upload and remote hash verification NOT RUN.
- Candidate302 formal baseline and Candidate320 rollback checkpoint remain unchanged. Candidate339 is experimental, not promoted.
- Evidence: `AMQ_BATCH43_CANDIDATE339_CONFIRMED_DEAD_CODE_CLEANUP_20261026.md` and matching JSON.


## Batch44 — Candidate340 workspace sidebar ownership consolidation (2026-10-26)
- Input Candidate339 verified before edit: 1,628,078 bytes; SHA-256 `8518449cff37050f67e9ae418f376e328f3219c784c179e9d0b178db8ade0bdd`.
- Candidate340 local artifact: `amq_learning_tool_v82_86_51_candidate340_batch44_unified_workspace_sidebar_20261026.html`, 1,627,175 bytes; SHA-256 `74e3d7eb0287cb04dcad0caf08d3d640abb32e21faa6fcc3be00e93a1438f158`.
- Candidate76 is now the single sidebar state/geometry controller with one geometry API and explicit Song Select vs general-workspace geometry branches. Candidate77 retains dock relocation/inline-style cleanup only; duplicate show/hide and duplicate [data-ws] click handler removed.
- [data-ws] remains exclusively the sidebar-toggle path; Prototype15 [data-ws-action] dispatcher and Candidate82 content-panel API remain intact. Capture-phase is restricted to [data-ws] to intercept legacy target handlers.
- PASS: 65 executable inline JS blocks checked by Node, 0 syntax errors; all 11 static ownership assertions PASS; handoff ZIP integrity PASS.
- NOT RUN: real-browser state/geometry/ARIA/click/ESC/content-panel/resize regression. GitHub Candidate340 HTML upload and remote SHA-256 read-back NOT RUN; do not treat this candidate as promoted.
- Candidate302 formal baseline and Candidate320 rollback checkpoint remain unchanged. Candidate339 remains available as immediate rollback.
- Report: `AMQ_BATCH44_CANDIDATE340_WORKSPACE_OWNER_MATRIX_AND_SIDEBAR_CONSOLIDATION_20261026.md`; tests: `AMQ_BATCH44_CANDIDATE340_TEST_RESULTS_20261026.json`.


## Candidate340 ownership matrix precheck (2026-10-26)
- Reverified Candidate340 source locally: 1,627,175 bytes; SHA-256 `74e3d7eb0287cb04dcad0caf08d3d640abb32e21faa6fcc3be00e93a1438f158`.
- Created the node-level create/event/geometry ownership matrix: `AMQ_WORKSPACE_OWNER_MATRIX_CANDIDATE340_BATCH45_PRECHECK_20261026.md` and JSON companion. Both were committed to the stage6 branch and read back exactly.
- Static findings: Candidate70 has no current `[data-ws]` binding; Candidate77 has no document click interceptor; Candidate76 still owns the dock capture click handler; Prototype15 has not yet taken over `[data-ws]` clicks. Candidate94 includes a required membership-filter selector, so only its confirmed dock rules can be isolated.
- Candidate193 is a navigation wrapper, not a direct `[data-home-action]` click listener in the inspected source; Candidate60 and Candidate82 contain separate capture-phase event behavior.
- PASS: source hash verification and static source inspection. NOT RUN: browser interaction regression. No app HTML was modified in this matrix-only step.


## 2026-10-26 Batch44 / Batch45 progress
- Candidate340 Batch44 local artifact: 1,627,175 bytes; SHA-256 `74e3d7eb0287cb04dcad0caf08d3d640abb32e21faa6fcc3be00e93a1438f158`. Candidate remains experimental; Candidate302 remains formal baseline.
- Workspace owner matrix created for 12 DOM/API targets; local MD/JSON/ZIP and remote MD/JSON evidence committed in this branch.
- Candidate341 Batch45 created from Candidate340: `amq_learning_tool_v82_86_52_candidate341_batch45_workspace_click_owner_20261026.html`, 1,627,302 bytes; SHA-256 `7abb6635b90254d666620953397c7d56f02e537bde997c523eb163203a15bd1a`.
- Batch45 change: removed Candidate76 capture-phase `[data-ws]` click interception; Prototype15 now owns the delegated bubbling click and calls the existing Candidate76 open/close APIs. `[data-ws-action]` remains a separate action route.
- Static ownership assertions 9/9 PASS; 65 inline JavaScript blocks `node --check` PASS, 0 syntax errors; delivery ZIP integrity PASS.
- NOT RUN: full browser interaction/regression tests. Candidate341 HTML upload/hash verification on GitHub NOT RUN. Candidate84 CSS demotion deferred pending complete selector dependency review; Candidate94 membership filter retained.


## Batch 46 — Candidate342（2026-10-26）
- Candidate302 remains the formal baseline; Candidate320 remains the immutable rollback checkpoint. Candidate342 is experimental and not promoted.
- Candidate342: `amq_learning_tool_v82_86_53_candidate342_batch46_remove_unused_v60_modes_20261026.html`, 1,627,191 bytes; SHA-256 `85651bff600de2a3441aab64fee8d38299872d47a0d76473691334f9aa0fb2fe`.
- Change: removed one confirmed unread `const modes={...}` declaration from `v60-player-quiz-cleanup`; no other source changes intended.
- Static assertions: PASS. 65 executable inline JS blocks `node --check`: PASS, 0 syntax errors. Delivery ZIP integrity: PASS.
- Full-app browser interaction: BLOCKED (`ERR_BLOCKED_BY_ADMINISTRATOR` on file:// and localhost). Full functional regression: NOT RUN.
- Candidate342 HTML remote upload and SHA-256 readback: NOT RUN. Report MD/JSON uploaded and readback verified; these documents do not prove the HTML exists remotely.
- Current assessment: cleanup and end-to-end acceptance are not complete. The latest batches demonstrate small confirmed cleanups and workspace event-owner consolidation, not a completed global refactor.
- Next direction: stop creating new broad inventories where evidence already exists. Execute small, related batches of confirmed dead-code removals; keep uncertain runtime-dependent items in a blocker ledger. Then run focused regression, final residue scan, and formal packaging.


## Batch 47 — Candidate343（2026-10-26）
- Candidate342 input verified: 1,627,191 bytes; SHA-256 `85651bff600de2a3441aab64fee8d38299872d47a0d76473691334f9aa0fb2fe`.
- Candidate343: `amq_learning_tool_v82_86_54_candidate343_batch47_remove_orphan_candidate186_helper_20261026.html`, 1,627,145 bytes; SHA-256 `fd9bf2536cf3aa73767c896040d460a742b3471a8cb3508133267f7c9508ee3f`.
- Actual change: removed the now-unreferenced `const get=(id)=>document.getElementById(id);` helper from `candidate186-cover-recovery-runtime`. Batch42 had already removed its only recovery path, so the helper became orphaned. Modal backdrop and Escape close handlers remain.
- Static evidence: helper identifier occurred once in the target script; only that script body changed. Both modal handlers preserved.
- Tests: 65 executable inline JS blocks `node --check`: PASS, 0 syntax errors. Source-scope assertions: PASS. ZIP integrity: PASS.
- Browser interaction: BLOCKED (`ERR_BLOCKED_BY_ADMINISTRATOR`). Full AMQ/EMQ/MIX regression: NOT RUN. Candidate343 HTML remote upload/hash readback: NOT RUN.
- Candidate343 remains experimental; Candidate302 remains formal baseline and Candidate320 remains rollback checkpoint.
- Next: continue only evidence-backed removals. Keep C103 audio controls/geometry, v47 hero display, Candidate72 inline styles, and v33 `showToast` in NEEDS CONFIRMATION pending runtime/caller evidence.


## Batch 48 — Candidate344（2026-10-26）
- Parent Candidate343: 1,627,145 bytes; SHA-256 `fd9bf2536cf3aa73767c896040d460a742b3471a8cb3508133267f7c9508ee3f`.
- Candidate344: `amq_learning_tool_v82_86_55_candidate344_batch48_remove_dead_quiz_evaluator_20261026.html`, 1,625,750 bytes; SHA-256 `cf3860059b7987838cf0a61b63e943cd480202a01790f556794b62cac05dc1ac`.
- Change: removed the unused local `clean`, `aliasesForCurrent`, and `evaluate` helper chain from `v37-answer-and-layout-fixes`. `evaluate` had no caller; the other two helpers were referenced only by that dead chain.
- Preserved: Enter handler, suggestion selection, `__aniQuizSubmitV47` bridge, answer mirror, and question event handlers.
- Static assertions: PASS; only the target script body changed. 65 executable inline JS blocks `node --check`: PASS, 0 errors. Delivery ZIP integrity: PASS.
- Browser interaction: BLOCKED (`ERR_BLOCKED_BY_ADMINISTRATOR`). Full Quiz / AMQ / EMQ / MIX regression: NOT RUN. Candidate344 HTML remote upload/hash readback: NOT RUN.
- Candidate344 is experimental; Candidate302 remains formal baseline and Candidate320 remains rollback checkpoint.


## Batch 49 — Candidate345（2026-10-26）
- Parent Candidate344 SHA-256: `cf3860059b7987838cf0a61b63e943cd480202a01790f556794b62cac05dc1ac`.
- Candidate345: `amq_learning_tool_v82_86_56_candidate345_batch49_remove_unused_quiz_bindings_20261026.html`, 1,625,630 bytes; SHA-256 `de4b96d355763015e747b72d25f3feabd40e6b2edfec69d2a4a19469bd9414f3`.
- Removed three local bindings that appeared only in their declarations: `input` in `v36-quiz-fixes`, `box` in `v39-enter-and-avatar-fix`, and `settingsBody` in `v40-buffer-setting-and-avatar-alignment`.
- PASS: 65 executable inline JS syntax checks; targeted binding/scope assertions; ZIP integrity. Browser interaction BLOCKED; full functional regression NOT RUN; Candidate345 HTML remote upload/hash readback NOT RUN.
- Candidate345 is experimental. Candidate302 formal baseline and Candidate320 rollback checkpoint remain unchanged.

## Batch 50 — Candidate346（2026-10-26）
- Parent Candidate345 SHA-256: `de4b96d355763015e747b72d25f3feabd40e6b2edfec69d2a4a19469bd9414f3`.
- Candidate346: `amq_learning_tool_v82_86_57_candidate346_batch50_remove_orphaned_local_helpers_20261026.html`, 1,625,225 bytes; SHA-256 `dfef81df1572219d2b96b5f8eeeb50696acfe99a0fced53b6c83371f930c99ca`.
- Removed five declaration-only local helpers/constants from two scripts: `norm` from v60; `getPlanMeta`, `setPlanMeta`, `seasonOrder`, `seasonLabels` from learning-system v72.
- PASS: 65 inline JS syntax checks, targeted reference/scope assertions, ZIP integrity. Browser interaction BLOCKED; full regression NOT RUN; Candidate346 HTML remote upload/hash readback NOT RUN.
- Candidate346 is experimental. Candidate302 formal baseline and Candidate320 rollback checkpoint remain unchanged.


## Core regression static smoke — 2026-10-26
- Candidate346 source-marker smoke passed for 11 groups: AMQ/EMQ/MIX, quiz flow, audio/video, custom lists, backup/restore, workspace APIs/actions, multiplayer markers, and navigation event.
- Report files `AMQ_CANDIDATE346_CORE_REGRESSION_STATIC_SMOKE_20261026.md` and `.json` were uploaded to this branch and readback-verified.
- This is static source-presence evidence only. Browser interaction is BLOCKED (`ERR_BLOCKED_BY_ADMINISTRATOR`); full functional regression is NOT RUN.
- Candidate302 remains formal baseline; Candidate346 remains experimental.

## Core regression matrix — Candidate346 (2026-10-26)
- Consolidated matrix created: `AMQ_CANDIDATE346_CORE_REGRESSION_MATRIX_20261026.md` and `.json`; both uploaded and readback-verified.
- Static source-presence smoke: PASS for 11 marker groups. Inline JS syntax: PASS, 65 scripts, 0 errors.
- Candidate346 functional status remains INCOMPLETE: AMQ/EMQ/MIX E2E, player, custom-list persistence, backup/restore, and multiplayer are NOT RUN; workspace browser interaction BLOCKED by `ERR_BLOCKED_BY_ADMINISTRATOR`.
- Historical isolated tests on Candidate302 remain historical evidence only, not Candidate346 full-app PASS results.
- Candidate302 remains formal baseline; Candidate320 remains rollback checkpoint.

## Final residue scan — Candidate346 (2026-10-26)
- Bounded scan classified 14 remaining/previously handled items using Batch41–50 evidence. Report MD/JSON uploaded and readback-verified.
- Confirmed dead helper/binding cleanup through Candidate346 is recorded. Workspace sidebar ownership is statically consolidated, but runtime acceptance remains open.
- KEEP: Candidate94 membership filter and Candidate186 modal backdrop/Escape handlers.
- NEEDS CONFIRMATION: C103 audio controls/geometry, v47 hero display, Candidate72 inline styles, v33 `showToast`, and Candidate84 dock/sidebar CSS. `amqHomeIconOnly` has zero occurrences in Candidate346 and is not an active deletion item.
- Stage 3 status: items classified with known limitations. Core browser regression remains incomplete; Candidate346 HTML remote upload/hash readback remains NOT RUN.

## Experimental handoff package — 2026-10-26
- Local package created: `AMQ_CANDIDATE346_EXPERIMENTAL_HANDOFF_20261026.zip`, 1,323,411 bytes; SHA-256 `8d9645c1c57a6eb0e940606ca6dadf10a9a12dbe30ed30eeb53e91ecace21cdd`; ZIP integrity PASS.
- Package includes Candidate346, immediate rollback Candidate345, Candidate320 rollback checkpoint, Batch47–50 reports, static smoke, core regression matrix, final residue scan, and manifest.
- This is an experimental handoff only. Candidate302 remains the formal baseline. Candidate346 HTML and ZIP remote upload/readback have not been performed.


## Unattended verification update — 2026-10-26
- Re-verified uploaded Candidate346 handoff package; Candidate346 SHA-256 remains `dfef81df1572219d2b96b5f8eeeb50696acfe99a0fced53b6c83371f930c99ca` (1,625,225 bytes). Candidate345 and Candidate320 rollback hashes also match package contents.
- Independent local check: 65 executable inline JS blocks passed Node syntax check (0 errors); 269 ID attributes / 269 unique values / no duplicate ID values detected.
- Candidate302 remains formal baseline; its expected HTML path returned 404 on this branch, so baseline hash is retained from prior records but not independently verified from a local artifact this session.
- Candidate346 HTML expected path also returned 404. Remote HTML upload/hash readback remains NOT VERIFIED; documentation uploads do not establish HTML availability.
- Full-app AMQ/EMQ/MIX, audio, CRUD/persistence, backup/restore, workspace and multiplayer regression remains NOT RUN; browser path remains BLOCKED by prior `ERR_BLOCKED_BY_ADMINISTRATOR`.
- No application HTML changed and no candidate promoted. Local updated handoff package contains current `CURRENT_STATUS.md`, `BASELINE.md`, `NEXT_TASK.md`, static verification results, Candidate346, and rollback artifacts.
