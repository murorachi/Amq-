# BASELINE.md

## Formal maintenance baseline (promoted 2026-10-25)
- File: `amq_learning_tool_v82_86_13_candidate302_emq_loader_state_validation_20261025.html`
- Version: `v82.86.13-candidate302-emq-loader-state-validation-20261025`
- Size: 1,720,249 bytes
- SHA-256: `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`
- Status: formal baseline by user authorization after local verification. Treat as read-only; all future changes use a unique new candidate.
- Candidate295 remains immutable rollback: 1,720,917 bytes; SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`.

## Candidate302 acceptance evidence
- Static audit PASS: 67 executable inline JS blocks, 109 style blocks, 2,808 top-level CSS rules, 271 unique IDs.
- Source-derived EMQ loader tests 9/9 PASS; prior isolated regression suites 40/40 PASS.
- Real catalog structural audit PASS (prior stage evidence).
- User reports local verification complete. Full automated browser E2E was not independently reproduced in this environment.

## Cleanup work
- Batch 1 feature inventory report: `FEATURE_INVENTORY_BATCH1_CANDIDATE302_20261025.md`.
- Batch 1 identified KEEP / INTEGRATE / DELETE / NEEDS CONFIRMATION categories. No code was deleted in this batch; no item met the direct-delete evidence threshold.
- Batch 2: dependency tracing for route wrappers, storage owners/schema, custom-list APIs, listeners/observers/timers and CSS selector ownership.
- Candidate302 HTML body still needs to be added to the intended remote branch and its downloaded SHA-256 compared. Documents describing the hash are not proof that the HTML itself exists remotely.

## Rollback
Use the preserved Candidate295 file only after verifying SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`. Never overwrite either baseline file.


## 2026-10-25 Batch 2 dependency trace
- Candidate302 remains byte-identical: 1,720,249 bytes; SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Static evidence identifies the core `showView`, generic navigation wrapper, final Song Select route guard, in-place workspace mode, AMQ custom-list canonical store, backup allowlist, separate EMQ list schema, and high-density observer/timer/CSS areas.
- Batch 2 source-evidence assertions: 10/10 PASS. Browser route E2E, computed-style checks, lifecycle instrumentation, and custom-list/backup restore interaction tests remain NOT RUN.
- No application source changes or deletions in Batch 2; DELETE=0.
- Full report and evidence JSON are being delivered as separate artifacts. Candidate302 HTML itself still returns NOT_FOUND on this branch; remote artifact/hash verification remains BLOCKED.


## 2026-10-25 Batch 3
- Formal Candidate302 source unchanged (1,720,249 bytes; SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`).
- Isolated route tests 14/14 PASS; isolated storage repository tests 6/6 PASS. Both use synthetic/stubbed dependencies, not full-app E2E.
- No application code changed/deleted; Candidate295 remains rollback.
- Candidate302 remote HTML still NOT_FOUND; remote artifact verification BLOCKED.


## 2026-10-25 Batch 4
- Candidate302 remains unchanged and is the formal baseline (1,720,249 bytes; SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`).
- Expanded isolated route matrix: 15/15 PASS, 0 page errors; stubbed dependencies, not full-app E2E.
- Storage ownership review: AMQ custom lists remain owned by `v82-25-custom-lists-and-practice-hub`; AMQ recovery snapshots remain required; EMQ lists and selected scope remain owned/written by the EMQ module. AMQ and EMQ schemas must not be merged.
- No application source changes/deletions. Candidate302 HTML remains NOT_FOUND remotely; remote hash is unverified.


## 2026-10-25 Batch 5
- Candidate302 remains immutable and locally verified at 1,720,249 bytes, SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Static lifecycle inventory covered 70 inline script blocks; 14 high-priority scripts were shortlisted for future runtime instrumentation. No leak is claimed from counts alone.
- Chromium computed-style probe PASS for present static DOM and CSS at 1440x900, with inline scripts removed; dynamic nodes and full-app behavior were not tested.
- No app source changes/deletions. Remote artifact verification remains BLOCKED; full-app E2E remains NOT RUN.


## 2026-10-25 Batch 6
- Candidate302 remains unchanged: 1,720,249 bytes; SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Isolated lifecycle stress probe: 12/12 selected scripts initialized without uncaught errors; 0 browser page errors; 20 synthetic route cycles per script showed no net active listener/observer growth in the harness.
- Manual reinjection duplicates were observed for eight scripts; this is a controlled reinjection finding, not proof of a production leak. No deletion is approved from this evidence alone.
- Active multiplayer session poll/socket cleanup and full-app E2E remain NOT RUN. No app source changed/deleted.


## 2026-10-25 Batch 7
- Candidate302 unchanged: 1,720,249 bytes; SHA-256 f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd.
- Isolated Chromium fake-server test passed for classic/team initialization, polling start, route-away poll stop, team WebSocket close, and local session release; 0 page errors.
- Heartbeat continues after route-away while the session is retained; pending design question, not classified as a defect.
- Static topology: 70 inline scripts; no duplicate IDs or duplicated non-empty source hashes; all eight manual-reinjection candidates appear once.
- No application code modified or deleted. Full-app E2E NOT RUN; remote HTML hash verification BLOCKED/NOT_FOUND.


## Batch 8 candidate (not promoted as formal baseline)
- Formal baseline remains Candidate302: `amq_learning_tool_v82_86_13_candidate302_emq_loader_state_validation_20261025.html`, 1,720,249 bytes, SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Candidate303: `amq_learning_tool_v82_86_14_candidate303_opencc_shared_loader_20261025.html`, 1,720,527 bytes, SHA-256 `ffb223a37f2ba7f243430c7e0a643f8916ebae13f809d83cc2b8cbd9153df1c8`.
- Candidate303 changes only script blocks 31 and 41 to consolidate duplicate OpenCC injection. Tests: 67/67 script syntax PASS, 3/3 isolated Chromium tests PASS. Full-app E2E NOT RUN; do not promote until broader AMQ/EMQ workflow tests and user browser verification.
- Candidate302 and Candidate295 remain immutable rollback points.


## Batch 9 candidate (not promoted)
- Formal baseline remains Candidate302, 1,720,249 bytes, SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Candidate304: `amq_learning_tool_v82_86_15_candidate304_opencc_and_diagnostic_cleanup_20261025.html`, 1,720,215 bytes, SHA-256 `afec1555f4e6a56bb39ffac2622d16a148656ee5c4c5c50a3bb5aa7eab254f21`.
- Changes: shared OpenCC loader for AMQ/EMQ title services; remove diagnostic-only `v41-classification-diagnostic` with no internal readers. 2 scripts modified, 1 deleted, CSS unchanged.
- Tests: JS syntax 66/66 PASS; OpenCC isolated Chromium 3/3 PASS; synthetic EMQ loader 9/9 PASS. Full-app E2E NOT RUN; do not promote until broader/browser verification.

## Candidate chain update — Batch 10
- Formal baseline is unchanged: Candidate302, SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Candidate305 is an unpromoted child of Candidate304. Candidate305 SHA-256: `3bcaaa70fe05b130dd302462a1ef2aa41fbed855f2e12526d526c7675bd07e9f`, 1,670,933 bytes.
- Batch10 removed 1,432 provably superseded CSS declarations and 167 empty rules. Static CSS/JS and computed-style checks passed; full-app E2E is NOT RUN.
- Rollback: use immutable Candidate302 formal baseline, or recreate Candidate305 from Candidate304 (`afec1555f4e6a56bb39ffac2622d16a148656ee5c4c5c50a3bb5aa7eab254f21`). Do not promote Candidate305 without user acceptance.

## Candidate chain update — Batch 11
- Formal baseline remains Candidate302: SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Candidate306 is an unpromoted child of Candidate305 (`3bcaaa70fe05b130dd302462a1ef2aa41fbed855f2e12526d526c7675bd07e9f`).
- Candidate306 SHA-256: `ac39a87d0ebc3c50f89754cae95cd62518a659a7c354075d6d1be6b6edc4de7e`, 1,667,280 bytes.
- Batch11 removed 31 unreferenced Home/Song Select selector branches. Static checks and six Chromium computed-style scenarios PASS; full-app E2E NOT RUN.
- Rollback to Candidate305 or formal Candidate302. Candidate306 HTML is not verified remotely and is not promoted.

## Candidate chain update — Batch 12
- Formal baseline remains Candidate302: SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Candidate307 is an unpromoted child of Candidate306 (`ac39a87d0ebc3c50f89754cae95cd62518a659a7c354075d6d1be6b6edc4de7e`).
- Candidate307 SHA-256: `f2c080906ef9f2db6367286401dda0fc0181dae6041549402384180724d47aa6`, 1,665,250 bytes.
- Batch12 removed 9 superseded rules / 23 declarations. Static checks and six Chromium CSS scenarios (including representative synthetic dynamic elements) PASS; full-app E2E NOT RUN.
- Rollback to Candidate306 or formal Candidate302. Candidate307 HTML is not verified remotely and is not promoted.

## Candidate chain update — Batches 12–13
- Formal baseline remains Candidate302 SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Candidate307: 1,665,250 bytes, SHA-256 `f2c080906ef9f2db6367286401dda0fc0181dae6041549402384180724d47aa6`; Batch12 removed 9 superseded rules / 23 declarations.
- Candidate308: 1,665,019 bytes, SHA-256 `89e7829e8228e3b4ed1061657e6c2f7245496e4dd6e158344a6c6c76518b4d67`; Batch13 removed 7 orphan mobile rules / 10 declarations.
- Both candidates passed JS/CSS/ID checks and six isolated Chromium computed-style scenarios. Full-app E2E NOT RUN. Neither candidate is promoted; HTML remote upload is BLOCKED.
- Rollback chain: Candidate308 → Candidate307 → Candidate306; formal baseline Candidate302 remains immutable.

## Candidate chain update — Batch 14
- Formal baseline remains Candidate302 SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Candidate309: 1,664,430 bytes, SHA-256 `922b21b30661b81c7dd343a6e09a22a016c166dea0ead9d24ba521742b141c5f`; Batch14 removed 17 superseded declarations / 589 bytes.
- Tests: JS syntax 68/68 PASS; CSS parse PASS; duplicate IDs 0; script/non-style HTML unchanged; six isolated Chromium style scenarios PASS with zero diffs. Full-app E2E NOT RUN.
- Candidate309 is not promoted. HTML remote upload BLOCKED. Rollback is Candidate308 SHA-256 `89e7829e8228e3b4ed1061657e6c2f7245496e4dd6e158344a6c6c76518b4d67`.

## Candidate chain update — Batch 14
- Candidate309: 1,664,430 bytes, SHA-256 `922b21b30661b81c7dd343a6e09a22a016c166dea0ead9d24ba521742b141c5f`, derived from Candidate308.
- Batch14 removed 17 superseded declarations / 589 bytes from the Home stable-play modal CSS. JS/non-style HTML unchanged; JS syntax, CSS parse, duplicate IDs and six isolated Chromium style scenarios PASS.
- Full-app E2E NOT RUN; candidate HTML remote upload BLOCKED. Candidate309 not promoted.
- Formal baseline remains Candidate302 SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`. Rollback from Candidate309 to Candidate308.

## Candidate chain update — Batch 15
- Candidate310: 1,664,118 bytes, SHA-256 `34ba5cf818de8984efbf986f53a3c9d5da673fd3fe1cae3ff2e8e67bc7fe65f9`, derived from Candidate309.
- Batch15 removed 9 superseded Home settings-panel declarations / 312 bytes. JS syntax, CSS parse, duplicate IDs, unchanged script/non-style HTML and six isolated Chromium style scenarios PASS.
- Full-app E2E NOT RUN. Candidate HTML upload and Batch15 report/summary publication are BLOCKED/unverified. Candidate310 not promoted.
- Formal baseline remains Candidate302 SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`. Rollback from Candidate310 to Candidate309.

## Candidate chain update — Batch 16
- Candidate311: 1,662,516 bytes, SHA-256 `dbfac39ea961af4d761c25cc49d08ebdaea29fbaee0cd9225a720105a31d4996`, derived from Candidate310.
- Batch16 removed 55 superseded/duplicate declarations / 1,602 bytes from Home and stable-play modal theme/layout CSS. JS syntax, CSS parse, duplicate IDs, unchanged scripts/non-style HTML and six isolated Chromium style scenarios PASS.
- Full-app E2E NOT RUN. Candidate HTML remote upload remains BLOCKED/unverified. Candidate311 not promoted.
- Formal baseline remains Candidate302 SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`. Rollback from Candidate311 to Candidate310.

## Candidate312 — unpromoted working candidate
- Source: Candidate311, SHA-256 dbfac39ea961af4d761c25cc49d08ebdaea29fbaee0cd9225a720105a31d4996.
- Candidate: amq_learning_tool_v82_86_23_candidate312_cross_module_css_js_dedup_20261025.html, 1,648,144 bytes; SHA-256 12e8fbc4c00c2459dd3af2d7c1b099893e144958f5171ad9721c7bc01ebd20cb.
- Candidate312 is NOT the formal baseline. Formal baseline remains Candidate302: f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd.
- Rollback: use immutable Candidate302; immediate pre-batch rollback is Candidate311.
- Candidate HTML upload and remote SHA verification are NOT VERIFIED.

## Candidate313 — unpromoted working candidate
- Source: Candidate312, SHA-256 12e8fbc4c00c2459dd3af2d7c1b099893e144958f5171ad9721c7bc01ebd20cb.
- Candidate: amq_learning_tool_v82_86_24_candidate313_workspace_route_event_dedup_20261025.html, 1,647,687 bytes; SHA-256 bd5d82c6d1a03e3d0e62622ebf22cf63d7636435bed469ed44efd9f8eba21c6a.
- Batch18 removed unreachable dock click listeners and no-op route guard retry timers; only three script blocks changed.
- Isolated Chromium workspace dock and route wrapper checks PASS; JS syntax 68/68, CSS parse 0 errors, duplicate IDs 0. Full-app E2E NOT RUN.
- Candidate313 is not the formal baseline. Formal baseline remains Candidate302: f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd.
- Immediate rollback: Candidate312 SHA-256 12e8fbc4c00c2459dd3af2d7c1b099893e144958f5171ad9721c7bc01ebd20cb; formal rollback: Candidate302.
- Candidate313 HTML upload and remote SHA verification are NOT VERIFIED.

## Candidate314 — unpromoted working candidate
- Source Candidate313 SHA-256 bd5d82c6d1a03e3d0e62622ebf22cf63d7636435bed469ed44efd9f8eba21c6a.
- Candidate: amq_learning_tool_v82_86_25_candidate314_songselect_layout_owner_conflict_cleanup_20261025.html, 1,647,472 bytes; SHA-256 e3e2afb98574aea5db9bc5ac94eaeba809b6ed3416999657463964eefab05d17.
- Batch19 removes old Candidate103 catalog bottom/height writes that were overwriting Candidate106's final responsive geometry, while preserving its observer and other player/dock behavior.
- PASS: JS syntax 68/68, CSS parse, duplicate IDs; targeted Chromium at 390/768/1440px confirms mobile bottom=86px and tablet/desktop clamp geometry. Full-app E2E NOT RUN.
- Candidate314 not promoted. Formal baseline remains Candidate302 SHA-256 f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd. Immediate rollback Candidate313 SHA-256 bd5d82c6d1a03e3d0e62622ebf22cf63d7636435bed469ed44efd9f8eba21c6a. Candidate HTML remote upload/hash NOT VERIFIED.

## Candidate315 — unpromoted working candidate
- Source Candidate314 SHA-256 e3e2afb98574aea5db9bc5ac94eaeba809b6ed3416999657463964eefab05d17; Candidate315 1,647,133 bytes, SHA-256 5c92830eeb519105d06b8cf1a71f3717bf8b4c852cd7be4da7c5622265958621.
- Batch20 removed Candidate70's unreachable dock button click listener; isolated Chromium open/Escape-close/toggle regression PASS; JS 68/68, CSS PASS, IDs PASS. Full-app E2E NOT RUN.
- Not promoted; formal baseline Candidate302 remains unchanged. Rollback Candidate314.

## Candidate316 — latest unpromoted working candidate
- Source Candidate315 SHA-256 5c92830eeb519105d06b8cf1a71f3717bf8b4c852cd7be4da7c5622265958621; Candidate316 1,646,612 bytes, SHA-256 4845b950ae4e801aa6c6da2d9d0a23bdbac16a04edaa218396e4c043b17b4317.
- Batch21 removed Candidate72's duplicate panel-state MutationObserver/writer while preserving the required ranking-frame placeholder. Candidate76/77 own panel state.
- PASS: JS 68/68, CSS parse, duplicate IDs; isolated Chromium open, Escape close and direct class state match before/after. Full-app E2E NOT RUN.
- Not promoted; formal baseline Candidate302 remains SHA-256 f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd. Rollback Candidate315. Candidate HTML remote upload/hash NOT VERIFIED.

## Candidate317 — unpromoted working candidate
- Source Candidate316 SHA-256 4845b950ae4e801aa6c6da2d9d0a23bdbac16a04edaa218396e4c043b17b4317; Candidate317 1,645,902 bytes, SHA-256 e1373606dcc9717762bfde52636a45431bbb5f7694bf0a59f2f11391b960b2c9.
- Batch22 deleted the now-empty Candidate72 ranking-frame bootstrap and Candidate71's unreachable fallback creation branch. PASS: JS syntax 67/67, CSS, IDs and isolated Chromium frame/dock checks. Full-app E2E NOT RUN.
- Rollback Candidate316; formal baseline Candidate302 unchanged.

## Candidate318 — latest unpromoted working candidate
- Source Candidate317 SHA-256 e1373606dcc9717762bfde52636a45431bbb5f7694bf0a59f2f11391b960b2c9; Candidate318 1,645,636 bytes, SHA-256 14ef66a19621fda5798f486d4008a9251625045842d2b96c538890ed21735029.
- Batch23 removed Candidate76's unreachable Escape handler, already intercepted by earlier Candidate70 capture handler. PASS: JS syntax 67/67, CSS, IDs and isolated Chromium Escape/close-button regression. Full-app E2E NOT RUN.
- Not promoted. Formal baseline remains Candidate302 SHA-256 f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd. Rollback Candidate317. Candidate HTML upload/hash NOT VERIFIED.


## Latest candidate (not promoted)
- Candidate320 SHA-256 `134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`, 1,645,470 bytes. Candidate302 remains the formal baseline.


## 2026-10-25 — Candidate320 global scan checkpoint (not a promotion)
- Candidate320 remains an unpromoted working candidate: 1,645,470 bytes; SHA-256 `134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`.
- Formal maintenance baseline remains Candidate302: SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`. Candidate295 remains immutable rollback: `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`.
- Batch26 Round 1 produced a read-only static candidate inventory. No app source was modified and no new deletion was approved. See `AMQ_GLOBAL_CANDIDATE_SCAN_CANDIDATE320_20261025.md`.


## 2026-10-25 — Candidate321 Batch26 Round 2 checkpoint (not promoted)
- Formal maintenance baseline remains Candidate302 SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Candidate320 remains unchanged rollback checkpoint SHA-256 `134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`.
- Candidate321 local artifact: `amq_learning_tool_v82_86_32_candidate321_batch26_round2_songselect_ownership_cleanup_20261025.html`, 1,645,516 bytes, SHA-256 `5b4ac7bdbe92f1b1a1b7056e543b065a0829d266a5f4b4fd2a1e9f7a5347e83a`. Not promoted; remote HTML upload/hash NOT VERIFIED; Chromium BLOCKED and full-app E2E NOT RUN.
- See `AMQ_BATCH26_ROUND2_DEPENDENCY_CLEANUP_CANDIDATE321_20261025.md` for the exact grouped changes and test evidence.


## 2026-10-25 — Candidate321 Batch26 Round 2 checkpoint (not promoted)
- Formal maintenance baseline remains Candidate302 SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Candidate320 remains unchanged rollback checkpoint SHA-256 `134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`.
- Candidate321 local artifact: `amq_learning_tool_v82_86_32_candidate321_batch26_round2_songselect_ownership_cleanup_20261025.html`, 1,645,516 bytes, SHA-256 `5b4ac7bdbe92f1b1a1b7056e543b065a0829d266a5f4b4fd2a1e9f7a5347e83a`. Not promoted; remote HTML upload/hash NOT VERIFIED; Chromium BLOCKED and full-app E2E NOT RUN.
- See `AMQ_BATCH26_ROUND2_DEPENDENCY_CLEANUP_CANDIDATE321_20261025.md` for grouped changes and test evidence.


### Batch26 Round 3 browser validation — 2026-10-25
- Formal baseline unchanged: Candidate302 SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Candidate320 rollback checkpoint unchanged: SHA-256 `134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`.
- Candidate321 unchanged and not promoted: SHA-256 `5b4ac7bdbe92f1b1a1b7056e543b065a0829d266a5f4b4fd2a1e9f7a5347e83a`.
- Isolated Chromium module tests PASS with synthetic records; full-app tests BLOCKED because `data.js` and `emq-data.js` are missing from the branch and localStorage is inaccessible in the permitted test origin. Candidate321 remote HTML hash remains NOT VERIFIED.
- See `AMQ_BATCH26_ROUND3_CANDIDATE321_BROWSER_VALIDATION_20261025.md`.


### Batch26 Round 4 real-data browser test — 2026-10-25
- Candidate302 remains formal baseline SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Candidate320 remains rollback checkpoint SHA-256 `134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`.
- Candidate321 remains unchanged/not promoted; SHA-256 `5b4ac7bdbe92f1b1a1b7056e543b065a0829d266a5f4b4fd2a1e9f7a5347e83a`.
- Actual user-provided AMQ/EMQ data scripts load in a Chromium test copy (DB anime=9,516, songs=38,821, EMQ works=6,645; startup has no JS errors). Formal UI navigation remains blocked in opaque `about:blank` origin; full UI E2E remains incomplete.
- See `AMQ_BATCH26_ROUND4_CANDIDATE321_REAL_DATA_BROWSER_TEST_20261025.md`.


### Batch26 Round 4 supplement — Candidate324 init race candidate (2026-10-25)
- Formal baseline remains Candidate302 SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Candidate321 remains unchanged SHA-256 `5b4ac7bdbe92f1b1a1b7056e543b065a0829d266a5f4b4fd2a1e9f7a5347e83a`; Candidate320 remains rollback checkpoint SHA-256 `134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`.
- Candidate324 experimental artifact SHA-256 `3308f0a97a0a8aaa63a464a0d49bee2dffa5219cb6c59add85cf3d62523d6075`; not promoted. Fixes Candidate210 route-time initialization race; repeated browser test 6/6 passed row/image binding and selection.
- Cover load/fallback, real media playback, persistent storage, Candidate114 timer reduction and Candidate158 observer narrowing remain unverified/not run. See `AMQ_BATCH26_ROUND4_CANDIDATE324_INIT_RACE_ACCEPTANCE_20261025.md`.


## 2026-10-25 — Candidate320 全域候選盤點基準記錄
- Formal maintenance baseline remains Candidate302 SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Candidate320 audit target/rollback checkpoint remains unchanged: `amq_learning_tool_v82_86_31_candidate320_remove_dead_songselect_catalog_observer_20261025.html`, 1,645,470 bytes, SHA-256 `134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`.
- Round 1 created a global candidate list only; no application source was modified and no candidate was promoted.
- Full local report: `AMQ_GLOBAL_CANDIDATE_LIST_CANDIDATE320_ROUND1_20261025.md`; JSON: `AMQ_GLOBAL_CANDIDATE_LIST_CANDIDATE320_ROUND1_20261025.json`; GitHub summary: `AMQ_GLOBAL_CANDIDATE_LIST_CANDIDATE320_ROUND1_GITHUB_SUMMARY_20261025.md`.


## 2026-10-25 — Batch27/28 experimental candidates (not promoted)
- Formal baseline remains Candidate302 SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Candidate320 remains unchanged rollback checkpoint SHA-256 `134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`.
- Candidate325 Batch27 orphan CSS cleanup: 1,645,154 bytes; SHA-256 `187cba98e97d48819430a388d959a8dc0d7cbb41156b349de6adc31b58e6dd7d`; unpromoted.
- Candidate326 Batch28 combined Song Select lifecycle integration: 1,645,785 bytes; SHA-256 `9fee7d3a68c0833b6e84d6f0a3a3beca1ab09902bdb3ec2f8b76f5e60d5db3ba`; unpromoted.
- Candidate326 browser evidence is isolated: real data startup and synthetic route/list/selection PASS; visible UI navigation is BLOCKED by hidden legacy control; external cover, actual media playback and persistent storage are not verified.
- Candidate325/326 HTML remote SHA verification has not occurred; do not promote either.


## 2026-10-25 — Batch29 Candidate326 visible UI regression
- Candidate302 remains formal baseline; Candidate320 remains rollback checkpoint; Candidate326 remains experimental.
- Visible Song Select entry and return path PASS in an isolated browser test copy using visible menu clicks and visible `#c99Back`.
- AMQ/EMQ modes, MIX search, type/decade filters and row selection PASS in that same test copy.
- External cover/fallback, real media playback and native persistent storage remain BLOCKED by DNS/origin restrictions. Do not promote Candidate326 based on this partial acceptance.
- Report files: `AMQ_BATCH29_CANDIDATE326_VISIBLE_UI_PERSISTENCE_PROBE_20261025.md` / `.json`.

## 2026-10-25 — Batch29 Candidate326 visible UI regression
- Candidate302 remains formal baseline; Candidate320 remains rollback checkpoint; Candidate326 remains experimental.
- Visible Song Select entry and return path PASS in an isolated browser test copy using visible menu clicks and visible `#c99Back`.
- AMQ/EMQ modes, MIX search, type/decade filters and row selection PASS in that test copy.
- External cover/fallback, real media playback and native persistent storage remain BLOCKED by DNS/origin restrictions. Do not promote Candidate326 based on partial acceptance.
- Report: `AMQ_BATCH29_CANDIDATE326_VISIBLE_UI_PERSISTENCE_PROBE_20261025.md` / `.json`.


## Candidate327 Batch30 (2026-10-25)
- Experimental only: `amq_learning_tool_v82_86_38_candidate327_batch30_orphan_css_selector_cleanup_20261025.html`, 1,644,791 bytes, SHA-256 `3e117b68a3fa1f4a57c7ef010477ee18dc12d1327f174765dd44d05f324cb302`.
- Derived from Candidate326 SHA-256 `9fee7d3a68c0833b6e84d6f0a3a3beca1ab09902bdb3ec2f8b76f5e60d5db3ba`. Candidate302 remains the formal baseline; Candidate320 remains the immutable rollback checkpoint. Candidate327 is not promoted.
- Batch30 is CSS-only: 18 selector branches removed; 994 bytes reduced; JS bodies and HTML markup unchanged. Static style equivalence passed at three viewport sizes; full-app acceptance remains open.


## Candidate328 / Candidate329 — experimental only (2026-10-26)
- Candidate328 SHA-256 `985780d07196fc50b8a6f638e84ee131e48edece1c98c6fad86e660b51b68315`, 1,644,505 bytes. Derived from Candidate327.
- Candidate329 SHA-256 `d977b7bb8ebdbf190d2bcd163953b5b41c8eb1d7ffdc2d041e4b12d5307cb28d`, 1,635,608 bytes. Derived from Candidate328; removes 16 duplicate Workspace action branches (8,897 bytes).
- Neither candidate is promoted. Candidate302 remains the formal baseline (`f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`); Candidate320 remains the immutable rollback checkpoint (`134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`).


## Candidate330 Batch33 (2026-10-26) — experimental only
- `amq_learning_tool_v82_86_41_candidate330_batch33_workspace_action_event_delegation_20261026.html`: 1,632,703 bytes; SHA-256 `844af7eecaabfe037dbaf4e1cc8dc33cbd9d31123a49456a10518ce27af30309`. Derived from Candidate329 SHA-256 `d977b7bb8ebdbf190d2bcd163953b5b41c8eb1d7ffdc2d041e4b12d5307cb28d`.
- Removed seven Candidate15 action branches absent from current action definitions; consolidated per-button handlers to delegated #wsActions handling; removed unused Candidate16 helpers/temporary.
- Candidate330 is not promoted. Candidate302 remains the formal baseline (SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`); Candidate320 remains immutable rollback (SHA-256 `134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`).


## Candidate331 Batch34 — experimental only (2026-10-26)
- `amq_learning_tool_v82_86_42_candidate331_batch34_remove_unreachable_catalog_fallbacks_20261026.html`, 1,632,034 bytes; SHA-256 `1a17f6a940aa2248a40c56a15d91fe0d63df35da35948f15156fd261dea13565`.
- Derived from Candidate330 SHA-256 `844af7eecaabfe037dbaf4e1cc8dc33cbd9d31123a49456a10518ce27af30309`. Removed 669 bytes of unreachable catalog-only fallback and unused helper.
- Candidate302 remains formal baseline; Candidate320 remains immutable rollback. Candidate331 is not promoted.


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
