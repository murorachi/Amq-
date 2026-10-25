# NEXT_TASK.md — Batch 4 canonical reader/writer audit + browser evidence

## Current baseline
Candidate302 remains formal baseline:
- `amq_learning_tool_v82_86_13_candidate302_emq_loader_state_validation_20261025.html`
- 1,720,249 bytes; SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Candidate295 rollback SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`.

## Batch 3 completed
- Isolated Chromium route harness: 14/14 PASS, 0 page errors; Candidate302 scripts 3/62/70 with stubbed dependencies.
- Isolated Chromium storage repository harness: 6/6 PASS, 0 page errors; synthetic in-memory storage only.
- Confirmed route guard early-return side effects and storage import/rollback behavior.
- No application source edits/deletions; DELETE=0.
- Full-app E2E, runtime lifecycle instrumentation and computed-style checks NOT RUN.
- Candidate302 remote HTML remains NOT_FOUND; remote hash verification BLOCKED.

## Batch 4 actions
1. Resolve remote Candidate302 HTML artifact gap; verify exact remote contents/hash.
2. Trace every read/write/mutate path for `aniCustomPracticeListsV1`, recovery snapshots and `aniEmqWorkListsSelectedV8254`; document caller and dynamic references.
3. Obtain/run the complete HTML with matching `data.js` and `emq-data.js` in isolated browser environment; do not replace production data with stubs for full E2E.
4. Run browser smoke for home/catalog/watchlist/quiz/skip/next/Solo EMQ list and safe import/export/restore using synthetic profile only.
5. Add runtime observer/timer/listener lifecycle instrumentation for modal/grid/dock/route hot spots.
6. Compare high-impact repeated CSS candidates against actual computed style and media/route context.
7. Produce consolidation/deletion ledger only when the dependency and runtime evidence supports it; no deletion by count alone.

## Known limits
- User-reported Candidate302 local verification has no case-by-case manual log.
- 495 AMQ songs lack media values in extractor slots 9/10/11; do not patch without upstream schema evidence.
- Never overwrite Candidate302 or Candidate295.


## Batch 4 completed / Batch 5 next
- Expanded isolated Chromium route matrix: 15/15 PASS, 0 page errors.
- Static caller/writer map created for AMQ custom-list data, recovery snapshots, EMQ list data and selected EMQ scope.
- Local report: `BATCH4_CANONICAL_STORAGE_ROUTE_REPORT_20261025.md`; detailed map: `BATCH4_CANONICAL_STORAGE_CALLER_WRITER_MAP.json`; test results: `BATCH4_EXPANDED_ROUTE_TEST_RESULTS.json`; ZIP: `AMQ_Batch4_Canonical_Storage_Route_Candidate302_20261025.zip`.
- Candidate302 HTML remains 404 on the target branch. Do not claim remote upload/hash verification.

## Batch 5 priority
1. Resolve the remote binary artifact upload path or obtain an explicit user-provided repository upload route; keep the baseline local and immutable meanwhile.
2. Locate the exact hash-matching `data.js` and `emq-data.js`; otherwise keep full-app E2E BLOCKED.
3. Run lifecycle pairing/runtime checks for the highest-risk modal/grid/dock/route scripts.
4. Run CSS computed-style comparisons for a small high-impact shortlist.
5. Continue only evidence-backed consolidation; no deletions approved yet.


## Batch 5 completed / Batch 6 next
- User-directed skip: remote HTML upload/hash and full-app E2E were not retried; remain BLOCKED/NOT RUN.
- Static lifecycle scan: 70 inline scripts; 14 high-priority candidates documented. Counts are not proof of leaks.
- Chromium computed-style probe passed on present static DOM/CSS at 1440x900, scripts removed, zero page errors. Dynamic Song Select/workspace elements remain untested.
- Local artifacts: `BATCH5_LIFECYCLE_COMPUTED_STYLE_REPORT_20261025.md`, `BATCH5_LIFECYCLE_STATIC_AUDIT_20261025.json`, `BATCH5_COMPUTED_STYLE_RESULTS.json`, `AMQ_Batch5_Lifecycle_ComputedStyle_Candidate302_20261025.zip`.

## Batch 6 priority
1. Build a non-destructive runtime instrumentation harness for observer/listener/timer creation and cleanup around the highest-risk scripts; exercise repeated route toggles and detect duplicate initialization.
2. Inspect actual lifecycle branches for multiplayer global intervals, Candidate210 observers, Candidate71 init polling, modal guard observers and Candidate99 document/media listeners.
3. Safely mount only the required dynamic DOM fragments to extend computed-style checks, keeping all production data and user storage out of scope.
4. Continue evidence-backed integration/deletion ledger; no deletion approved yet.
5. Remote HTML and full-app data-asset blockers remain skipped until a viable transfer/input path is available.


## Batch 6 completed / Batch 7 next
- Isolated lifecycle stress probe: 12/12 scripts initialized; 0 page errors; 20 synthetic route cycles per script; no net active listener/observer growth in the harness.
- Manual reinjection duplicates observed in eight scripts; route/load topology must be confirmed before any consolidation or deletion.
- Active multiplayer session poll/WebSocket shutdown remains NOT RUN. Full-app E2E remains NOT RUN; Candidate302 remote HTML still 404.

## Batch 7 priority
1. Build a deterministic fake-server and synthetic-session harness for multiplayer join/poll/leave/route-away; verify poll interval and socket cleanup without real credentials or production storage.
2. Trace whether the eight manual-reinjection candidates can actually be loaded more than once in the formal single-file build; classify each KEEP/INTEGRATE/DELETE/NEEDS_CONFIRMATION.
3. Only then select one minimal, evidence-backed integration/deletion candidate. Preserve Candidate302/Candidate295 and test rollback.


## Batch 7 completed / Batch 8 next
- Fake-server Chromium test: classic/team sessions initialized, room polling started and stopped after route-away, team WebSocket closed, local release cleared synthetic session; 0 page errors.
- Found heartbeat POST after route-away while the session remains stored. Do not change until expected background-presence behavior is established.
- Static topology: 70 inline scripts, no duplicate IDs or repeated non-empty source hashes. The eight manual-reinjection candidates each appear once in formal HTML; no static evidence of duplicate tags.

## Batch 8 priority
1. Trace runtime script loading and dynamic execution paths (eval, Function, script creation, append/replace, import) for the eight reinjection candidates and classify reachability.
2. Map page-level heartbeat lifecycle and room-presence semantics. Preserve current behavior until expected product behavior is clear.
3. Use evidence to choose one minimal integration/deletion candidate; do not delete based only on one-time static occurrence or manual reinjection.
4. Continue marking full-app E2E and remote Candidate302 HTML verification BLOCKED until matching assets/upload capability are available.


## Batch 8 completed / Batch 9 next
- Created Candidate303 shared OpenCC loader integration; only script blocks 31 and 41 changed. Candidate303 SHA-256 `ffb223a37f2ba7f243430c7e0a643f8916ebae13f809d83cc2b8cbd9153df1c8`.
- Syntax 67/67 PASS; isolated Chromium loader tests 3/3 PASS. Full-app E2E NOT RUN. Candidate303 remote HTML is not uploaded and remote hash remains unverified.

## Batch 9 priority
1. Expand synthetic tests for AMQ Chinese-title map loading and EMQ title conversion using the shared loader, including cache hit/miss, converter failure, concurrent callers and fallback behavior.
2. Confirm no regression in AMQ/EMQ title APIs and that only one OpenCC script element is ever injected.
3. Then continue evidence-backed old-feature cleanup. Do not promote Candidate303 to formal baseline until full-app/browser validation is available.


## Batch 9 completed / Batch 10 next
- Candidate304 integrates the shared OpenCC loader and deletes the confirmed diagnostic-only `v41-classification-diagnostic` script. Candidate SHA-256 `afec1555f4e6a56bb39ffac2622d16a148656ee5c4c5c50a3bb5aa7eab254f21`.
- Syntax 66/66 PASS; OpenCC isolated browser 3/3 PASS; EMQ synthetic regression 9/9 PASS; 109 CSS blocks unchanged.
- Scan found 3,637 CSS rules, 651 repeated-selector groups, and 1,385 extra occurrences. These are audit groups, not automatic deletions.

## Batch 10 priority — batch CSS cascade cleanup
1. Partition Song Select/home CSS by feature owner and state (home, active Song Select, workspace dock, player, mobile).
2. Find declarations fully superseded by later rules with same applicable media/state, specificity/importance and selector; include JS-created DOM/class references.
3. Produce a grouped delete list, then remove only high-confidence declarations in one candidate; compare computed styles and DOM assertions at desktop/mobile widths.
4. Keep uncertain rules as NEEDS_CONFIRMATION and continue other groups instead of blocking the batch.

## Next: Batch 11 — continue CSS cleanup by functional cluster
- Use Candidate305 as the working parent only; Candidate302 remains the formal baseline.
- Do not repeat the whole-file selector count. Analyze the remaining Home/Song Select declarations by style block and functional cluster.
- Next targets: declarations with same visual intent but selector variants; historical overrides that are demonstrably unreachable; duplicated declarations across blocks with matching media/state conditions.
- Before deleting, check selector specificity, `!important`, at-rule conditions, JS-created DOM/classes, and state transitions. Preserve uncertain items and move to another high-confidence cluster.
- Run before/after computed-style comparisons at desktop/tablet/mobile for home, Song Select, workspace dock, and player; run syntax/duplicate-ID checks. Full-app E2E remains NOT RUN until data assets/runtime are available.
- Candidate305 SHA-256: `3bcaaa70fe05b130dd302462a1ef2aa41fbed855f2e12526d526c7675bd07e9f`. Candidate HTML remote upload is BLOCKED; never infer it from report uploads.

## Next: Batch 12 — remaining Home / Song Select CSS clusters
- Working parent: Candidate306 (SHA-256 `ac39a87d0ebc3c50f89754cae95cd62518a659a7c354075d6d1be6b6edc4de7e`); formal baseline remains Candidate302.
- Do not repeat whole-file selector counts. Continue by cluster: old Home/landing classes, obsolete Song Select modal/rail selectors, and selector branches whose tokens occur only in CSS.
- Before deleting, verify markup + all inline JS references, dynamic class creation, selector branch grouping, at-rule/media scope, and state classes.
- Preserve uncertain selectors and unrelated multiplayer/learning-system styles. Remove only high-confidence branches in one candidate.
- Regression: JS syntax, CSS parsing, duplicate IDs, non-style HTML unchanged, and Chromium computed styles at desktop/tablet/mobile for Home/Song Select and relevant static workspace/player elements.
- Full-app E2E remains NOT RUN unless the required data assets/runtime can be supplied by the existing environment. Candidate HTML remote upload remains BLOCKED until the binary itself and its SHA can be verified remotely.

## Next: Batch 13 — remaining Home / Song Select cascade cleanup
- Working parent: Candidate307 (SHA-256 `f2c080906ef9f2db6367286401dda0fc0181dae6041549402384180724d47aa6`); formal baseline remains Candidate302.
- Do not repeat whole-file selector counts. Continue with same-selector duplicates in Home/Song Select, then historical route-specific style blocks whose class/ID tokens have no markup or script creator evidence.
- Verify same selector, cascade order, importance, media/at-rule conditions, dynamic DOM creation and state transitions before deleting. Avoid global player/workspace, multiplayer, quiz and learning-system CSS unless separately proven safe.
- Regression: JS syntax, CSS parsing, duplicate IDs, exact non-style HTML/script preservation, Chromium computed styles at desktop/tablet/mobile including representative dynamic Home/Song Select nodes.
- Full-app E2E remains NOT RUN. Candidate HTML remote upload remains BLOCKED until the binary itself and SHA are remotely verified.

## Next: Batch 14 — continue route-scoped Home / Song Select cleanup
- Latest working candidate: Candidate308, SHA-256 `89e7829e8228e3b4ed1061657e6c2f7245496e4dd6e158344a6c6c76518b4d67` (1,665,019 bytes). Formal baseline remains Candidate302.
- Do not repeat whole-file selector counts. Inspect remaining legacy Home and Song Select style blocks for exact unreferenced selector branches and superseded same-condition declarations.
- Verify every candidate against HTML tokens and all inline JS, including dynamic class/ID creation. Keep shared/global, quiz relationCanvas, multiplayer, learning-system, and uncertain workspace selectors untouched.
- Batch confirmed deletions; test JS syntax, CSS parsing, duplicate IDs, unchanged scripts/non-style HTML, and computed styles at desktop/tablet/mobile for Home and Song Select.
- Full-app E2E remains NOT RUN. Candidate HTML remote upload remains BLOCKED until the binary itself and its SHA are verified remotely.

## Next: Batch 15 — continue from Candidate309
- Latest working candidate: Candidate309, SHA-256 `922b21b30661b81c7dd343a6e09a22a016c166dea0ead9d24ba521742b141c5f` (1,664,430 bytes). Formal baseline remains Candidate302.
- Continue route-scoped Home / Song Select cleanup; do not repeat full-file selector counts. Inspect exact unreferenced selector groups and same-condition repeated declarations.
- For each removal, trace static HTML and all inline JS including dynamic class/ID generation. Keep uncertain selectors and shared styles untouched.
- Test JS syntax, CSS parse, duplicate IDs, unchanged scripts/non-style HTML, and desktop/tablet/mobile computed styles. Full-app E2E remains NOT RUN.
- Candidate HTML remote upload remains BLOCKED until the binary is uploaded and the remote SHA-256 verified.

## Next: Batch 15 — continue route-scoped Home / Song Select cleanup
- Latest working candidate: Candidate309, SHA-256 `922b21b30661b81c7dd343a6e09a22a016c166dea0ead9d24ba521742b141c5f` (1,664,430 bytes). Formal baseline remains Candidate302.
- Continue exact orphan-selector and same-condition superseded-declaration analysis without repeating whole-file selector counts.
- Trace dynamic HTML/JS references before deleting; preserve uncertain selectors and all shared/global, multiplayer, learning-system and route-guard behavior.
- Batch confirmed deletions, then run JS syntax, CSS parse, duplicate IDs, script/non-style HTML unchanged checks and Chromium desktop/tablet/mobile computed-style regression for Home and Song Select.
- Full-app E2E NOT RUN; candidate HTML remote upload remains BLOCKED until binary and remote SHA can be verified.

## Next: Batch 16 — continue Home / Song Select CSS cleanup
- Latest working candidate: Candidate310, SHA-256 `34ba5cf818de8984efbf986f53a3c9d5da673fd3fe1cae3ff2e8e67bc7fe65f9` (1,664,118 bytes). Formal baseline remains Candidate302.
- Continue exact orphan selector and same-condition superseded declaration analysis; do not repeat whole-file counts.
- Static orphan scan returned only `.relationCanvas` and `.mpReadyBar` branches, which are unrelated/dynamic and MUST be preserved. Do not delete without dependency proof.
- Skip quiz/learning, multiplayer, route guard, and shared workspace styles unless direct evidence proves a scoped Home/Song Select orphan.
- Candidate HTML upload and Batch15 report/summary publication remain unverified/blocked; full-app E2E NOT RUN.

## Next: Batch 17 — continue Home / Song Select CSS cleanup
- Latest working candidate: Candidate311, SHA-256 `dbfac39ea961af4d761c25cc49d08ebdaea29fbaee0cd9225a720105a31d4996` (1,662,516 bytes). Formal baseline remains Candidate302.
- Continue same-selector/same-condition superseded declaration cleanup and historical Home/Song Select style review. Do not repeat whole-file selector counts.
- Preserve uncertain dynamic selectors, including `.relationCanvas` and `.mpReadyBar`; do not expand into quiz, multiplayer, learning-system or route-guard code.
- Candidate311 has 55 declarations removed; six isolated Chromium computed-style scenarios pass with zero differences. Full-app E2E NOT RUN.
- Candidate HTML remote upload and remote SHA verification remain BLOCKED/unverified; report and summary are published.

## Next: Batch 18 — route/workspace and Song Select runtime deduplication
- Start from Candidate312 (SHA-256 12e8fbc4c00c2459dd3af2d7c1b099893e144958f5171ad9721c7bc01ebd20cb) after rechecking the local file/hash. Formal baseline remains Candidate302.
- Move beyond CSS-only work. Inspect route/workspace wrappers, Song Select initialization and event/listener ownership as one functional group. Use the existing Batch 2–7 caller/side-effect and lifecycle evidence.
- Integrate only when behavior and side effects are equivalent; preserve the route guard's intentional early-return behavior and required ani-app-navigation consumers.
- Batch confirmed duplicate wrappers/listeners and any additional high-confidence obsolete diagnostics together. Keep uncertain observer/timer/storage fallback candidates marked NEEDS CONFIRMATION and continue with other safe items.
- Test JS syntax, CSS parsing, duplicate IDs, targeted route transition matrix, event counts/rebinding and relevant Home/Song Select/quiz regressions. Full-app E2E must remain NOT RUN unless actually executed.
- Update all status/baseline/next-task/changelog documents and publish reports. Do not claim Candidate HTML remote upload until the actual remote artifact and SHA-256 are verified.

## Next: Batch 19 — Song Select observer/listener lifecycle deduplication
- Start from Candidate313 SHA-256 bd5d82c6d1a03e3d0e62622ebf22cf63d7636435bed469ed44efd9f8eba21c6a; verify local bytes/hash before editing. Formal baseline remains Candidate302.
- Continue functional batch deletion, not CSS-only micro-cleanup. Prioritize observer/resize/navigation handlers in Song Select layout, dock and modal runtime.
- For each candidate, trace registration point, observed target/attributes, triggering mutations, duplicate side effects, cleanup/disconnect and re-entry behavior. Do not delete based on repeated names alone.
- Candidate76/77/72 workspace click listeners addressed in Batch18; preserve candidate77's document capture handler and candidate76 close/Escape/geometry behavior.
- Mark uncertain observers/timers NEEDS CONFIRMATION and continue with other safe candidates. Do not treat isolated harnesses as full-app E2E.
- Required tests: JS syntax, CSS parse, duplicate IDs, observer/listener lifecycle instrumentation in isolated Chromium, desktop/tablet/mobile route and dock regressions. Full app audio/storage/CRUD/multiplayer E2E remains outstanding until actually run.
- Publish report, manifest, test results, summary and update all status docs. Candidate HTML remote upload remains unverified until actual remote artifact and SHA-256 are confirmed.
