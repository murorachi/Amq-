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
