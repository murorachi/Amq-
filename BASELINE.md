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
