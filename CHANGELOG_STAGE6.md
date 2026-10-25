# CHANGELOG_STAGE6.md

## 2026-10-25 — Batch 1 feature inventory
- Re-verified local Candidate302: 1,720,249 bytes; SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Re-ran Candidate302 static audit: 67 executable inline JS blocks with 0 syntax errors; 109 style blocks; 2,808 top-level CSS rules; 271 unique HTML IDs.
- Added `FEATURE_INVENTORY_BATCH1_CANDIDATE302_20261025.md` with KEEP / INTEGRATE / DELETE / NEEDS CONFIRMATION classifications.
- Local companion JSON records each script/style block, storage keys, DOM references, repeated selectors and static counts.
- Scanned 30 literal local/session storage keys; 383 repeated CSS selector strings (665 extra occurrences); 480 addEventListener, 4 removeEventListener, 54 MutationObserver, 3 ResizeObserver, 5 IntersectionObserver, 137 setTimeout, 10 setInterval and 35 requestAnimationFrame text occurrences.
- These are static text counts, not runtime instance counts. No application HTML/CSS/JS was modified; no direct deletion met the evidence threshold.
- Next work is Batch 2 dependency tracing: route wrappers, storage ownership, custom-list boundaries, event/observer/timer lifecycle and CSS-to-DOM ownership.
- Candidate302 HTML itself remains NOT_FOUND on this branch; remote artifact/hash verification is still BLOCKED.

## 2026-10-25 — Candidate302 promotion
- User explicitly reported local verification complete and authorized Candidate302 promotion.
- Formal maintenance baseline: Candidate302, 1,720,249 bytes, SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Candidate295 preserved as immutable rollback baseline, SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`.
- Baseline, status and next-task docs updated. Promotion does not imply six-goal cleanup completion.


## 2026-10-25 — Batch 2 dependency trace
- Added static trace of route wrappers, workspace state, storage keys, AMQ custom-list canonical store, EMQ schema boundary, event listeners, observers, timers and CSS selectors.
- Confirmed Candidate193 route interception intentionally bypasses core `showView`/`ani-app-navigation` for selected destinations while Song Select is active.
- Identified canonical AMQ custom-list writer/store and compatibility/backup consumers. AMQ and EMQ schemas remain separate.
- Source-evidence assertions: 10/10 PASS; Candidate302 static audit PASS.
- No app source changes/deletions; DELETE=0. Browser E2E and runtime lifecycle checks NOT RUN. Candidate302 remote HTML remains NOT_FOUND.


## 2026-10-25 — Batch 3 route/storage/lifecycle verification
- Isolated Chromium route tests passed 14/14 with zero page errors; actual Candidate302 scripts 3, 62, 70; dependencies stubbed.
- Isolated Chromium storage repository tests passed 6/6 with zero page errors; actual Candidate302 script 28 and synthetic in-memory storage only.
- Confirmed Song Select route guard early-return behavior bypasses core navigation event and generic standalone-class side effect.
- Confirmed malformed legacy JSON and non-allowlisted import are rejected; successful synthetic import preserves source; injected write failure rolls back.
- No application source edits/deletions; DELETE=0. Full-app E2E, runtime lifecycle and computed-style tests remain NOT RUN.
- Candidate302 HTML remote artifact remains NOT_FOUND; remote hash verification BLOCKED.


## 2026-10-25 — Batch 4 route expansion and storage ownership
- Expanded isolated Chromium route coverage to 15/15 PASS, 0 FAIL, 0 page errors. This uses actual extracted navigation scripts and stubbed dependencies, not full-app E2E.
- Added static caller/writer map for AMQ custom-list key, recovery snapshots, EMQ list store and selected EMQ scope. Confirmed recovery data must be retained and AMQ/EMQ schemas remain separate.
- Rechecked target branch: Candidate302 HTML still returns 404. Remote SHA-256 verification remains BLOCKED.
- Matching data.js/emq-data.js not found locally; full-app E2E, runtime lifecycle and computed-style checks remain NOT RUN.
- No application code changed or deleted; DELETE=0.


## 2026-10-25 — Batch 5 lifecycle and computed-style probe
- Scanned 70 inline scripts from Candidate302 and generated a lifecycle inventory plus 14-script review shortlist.
- Identified explicit cleanup patterns in multiplayer polling/socket lifecycle and unified import status observers; other observer/listener candidates remain unconfirmed, not declared leaks.
- Chromium computed-style probe PASS on actual static markup/CSS at 1440x900 with inline scripts removed; zero page errors. Dynamic nodes are absent before initialization and were not falsely treated as unused.
- Per user direction, remote artifact transfer and full-app E2E were skipped; status remains BLOCKED/NOT RUN.
- No application source changes/deletions; DELETE=0.


## 2026-10-25 — Batch 6 runtime lifecycle stress probe
- Ran 12 selected Candidate302 inline scripts individually in Chromium with synthetic APIs and actual static markup/CSS; 12/12 initialized without uncaught errors, 0 page errors.
- Applied 20 synthetic route/body-class/navigation/resize cycles per script; no net active listener/observer growth was observed in this harness.
- Manual reinjection added registrations for eight scripts. This is not proof of production route reinjection or a memory leak; these remain integration candidates pending load-topology evidence.
- Active multiplayer session poll/socket cleanup and full-app E2E remain NOT RUN. Candidate302 unchanged; no deletions.


## 2026-10-25 — Batch 7 multiplayer lifecycle and script topology
- Actual extracted multiplayer UI script tested in Chromium with synthetic session/fake HTTP/fake WebSocket. Classic/team initialization, poll start/stop, team socket closure, and local session release passed; 0 page errors.
- A heartbeat request continued after route-away while session remained stored. Recorded as a design question, not a confirmed bug.
- Candidate302 static topology: 70 inline script tags, no duplicate IDs or duplicate non-empty script hashes; eight Batch 6 candidates each appear once.
- No app source changes/deletions. Full-app E2E NOT RUN; remote HTML remains BLOCKED/NOT_FOUND.


## 2026-10-25 — Batch 8 Candidate303 shared OpenCC loader
- Created `amq_learning_tool_v82_86_14_candidate303_opencc_shared_loader_20261025.html` from Candidate302; Candidate302 preserved unchanged.
- Consolidated duplicate OpenCC script injection between AMQ and EMQ Chinese-title modules via `window.__aniOpenCCLoaderV1`.
- Only script blocks 31 and 41 changed; 68 other script blocks and 109 CSS blocks unchanged; no feature deletion.
- JS syntax 67/67 PASS; isolated Chromium tests 3/3 PASS; full-app E2E NOT RUN. Candidate303 remote HTML/hash BLOCKED.


## 2026-10-25 — Batch 9 bulk triage / Candidate304
- Created Candidate304 from Candidate302 without overwriting baseline.
- Consolidated AMQ/EMQ OpenCC loader and deleted diagnostic-only `v41-classification-diagnostic` after confirming no internal reader for its global marker.
- Only two title scripts changed and one diagnostic script removed; all 109 CSS blocks unchanged.
- JS syntax 66/66 PASS; OpenCC isolated Chromium 3/3 PASS; synthetic EMQ regression 9/9 PASS. Full-app E2E NOT RUN.
- Bulk CSS audit: 3,637 rules, 651 repeated-selector groups, 1,385 extra occurrences; no CSS auto-deletion based solely on repetition counts.

## 2026-10-25 — Batch 10: Home / Song Select CSS cascade cleanup
- From Candidate304 (`afec1555f4e6a56bb39ffac2622d16a148656ee5c4c5c50a3bb5aa7eab254f21)), created Candidate305 (`3bcaaa70fe05b130dd302462a1ef2aa41fbed855f2e12526d526c7675bd07e9f`).
- Removed 1,432 older declarations proven superseded by later declarations with the same selector and applicable at-rule/importance; removed 167 empty rules. Touched 38 style blocks; reduced HTML by 49,282 bytes.
- PASS: JS syntax 66/66, CSS parse 0 errors, duplicate IDs 0, script content unchanged, Chromium computed-style regression 6/6 with zero differences across home/Song Select desktop/tablet/mobile static DOM.
- NOT RUN: full-app E2E and dynamic DOM visual acceptance. Candidate305 is not promoted; formal baseline remains Candidate302. Candidate HTML remote upload BLOCKED.

## 2026-10-25 — Batch 11: Home / Song Select orphan CSS cleanup
- Source Candidate305 SHA-256 `3bcaaa70fe05b130dd302462a1ef2aa41fbed855f2e12526d526c7675bd07e9f`; created Candidate306 SHA-256 `ac39a87d0ebc3c50f89754cae95cd62518a659a7c354075d6d1be6b6edc4de7e` (1,667,280 bytes).
- Removed 31 orphan selector branches / 124 declarations across four style blocks, reducing HTML by 3,653 bytes. No JavaScript or non-style HTML changed.
- PASS: JS syntax 68/68, CSS parse 0 errors, duplicate IDs 0, Chromium computed style 6/6 with zero differences. Full-app E2E NOT RUN.
- Candidate306 not promoted; formal baseline remains Candidate302. Candidate HTML remote upload BLOCKED.

## 2026-10-25 — Batch 12: Home / Song Select cross-block CSS consolidation
- Source Candidate306 SHA-256 `ac39a87d0ebc3c50f89754cae95cd62518a659a7c354075d6d1be6b6edc4de7e`; created Candidate307 SHA-256 `f2c080906ef9f2db6367286401dda0fc0181dae6041549402384180724d47aa6` (1,665,250 bytes).
- Removed 9 superseded CSS rules / 23 declarations from three style blocks, reducing HTML by 2,030 bytes. JavaScript and non-style HTML unchanged.
- PASS: JS syntax 68/68, CSS parser 0 errors, duplicate IDs 0, Chromium computed style 6/6 with zero differences including synthetic dynamic Home/Song Select nodes. Full-app E2E NOT RUN.
- Candidate307 not promoted; formal baseline remains Candidate302. Candidate HTML remote upload BLOCKED.

## 2026-10-25 — Batch 12: Home / Song Select CSS consolidation
- Candidate307 SHA-256 `f2c080906ef9f2db6367286401dda0fc0181dae6041549402384180724d47aa6`, 1,665,250 bytes.
- Removed 9 superseded rules / 23 declarations across three style blocks. JS syntax 68/68, CSS parse, duplicate IDs and six Chromium style scenarios PASS; full-app E2E NOT RUN.
- Candidate307 not promoted; formal baseline Candidate302 unchanged.

## 2026-10-25 — Batch 13: Home mobile orphan CSS cleanup
- Candidate308 SHA-256 `89e7829e8228e3b4ed1061657e6c2f7245496e4dd6e158344a6c6c76518b4d67`, 1,665,019 bytes.
- Removed 7 old mobile rules / 10 declarations for `.heroMain`, `.heroMain h2`, and `.daily`; 231 bytes removed.
- JS syntax 68/68, CSS parse, duplicate IDs and six Chromium style scenarios PASS; full-app E2E NOT RUN.
- Candidate308 not promoted; HTML remote upload BLOCKED; formal baseline Candidate302 unchanged.

## 2026-10-25 — Batch 14: Home stable-play modal superseded CSS cleanup
- Candidate309 SHA-256 `922b21b30661b81c7dd343a6e09a22a016c166dea0ead9d24ba521742b141c5f`, 1,664,430 bytes.
- Removed 17 superseded declarations / 589 bytes from the Home stable-play modal base rules in style block `amq-workspace-osu-composition-v24`.
- JS syntax 68/68, CSS parse, duplicate IDs, script/non-style HTML invariance and six Chromium style scenarios PASS; full-app E2E NOT RUN.
- Candidate309 not promoted; HTML upload BLOCKED; formal baseline Candidate302 unchanged.

## 2026-10-25 — Batch 14: Home stable-play modal superseded CSS cleanup
- Candidate309 SHA-256 `922b21b30661b81c7dd343a6e09a22a016c166dea0ead9d24ba521742b141c5f`, 1,664,430 bytes.
- Removed 17 superseded declarations / 589 bytes. JS syntax 68/68, CSS parse, duplicate IDs, unchanged source and six Chromium style scenarios PASS; full-app E2E NOT RUN.
- Candidate309 not promoted; HTML upload BLOCKED; formal baseline Candidate302 unchanged.

## 2026-10-25 — Batch 15: Home settings-panel superseded layout CSS cleanup
- Candidate310 SHA-256 `34ba5cf818de8984efbf986f53a3c9d5da673fd3fe1cae3ff2e8e67bc7fe65f9`, 1,664,118 bytes.
- Removed 9 superseded declarations / 312 bytes. JS syntax 68/68, CSS parse, duplicate IDs, unchanged source and six Chromium style scenarios PASS; full-app E2E NOT RUN.
- Candidate310 not promoted; HTML upload and report/summary publication BLOCKED/unverified; formal baseline Candidate302 unchanged.

## 2026-10-25 — Batch 16: Home / Song Select theme and stable-play modal CSS cleanup
- Candidate311 SHA-256 `dbfac39ea961af4d761c25cc49d08ebdaea29fbaee0cd9225a720105a31d4996`, 1,662,516 bytes.
- Removed 55 superseded/duplicate declarations / 1,602 bytes. JS syntax 68/68, CSS parse, duplicate IDs, unchanged source and six Chromium style scenarios PASS; full-app E2E NOT RUN.
- Candidate311 not promoted; HTML upload BLOCKED/unverified; report/summary published; formal baseline Candidate302 unchanged.
