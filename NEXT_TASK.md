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

## Next: Batch 20 — Song Select runtime lifecycle and duplicate state writers
- Start from Candidate314 SHA-256 e3e2afb98574aea5db9bc5ac94eaeba809b6ed3416999657463964eefab05d17; verify local bytes/hash first. Formal baseline remains Candidate302.
- Continue across a related functional group: trace Song Select resize/navigation handlers and modal/grid/dock observers, including registration, target, mutations, side effects, disconnection and re-entry.
- Prioritize confirmed duplicate state writers or listeners that are blocked by capture-phase handlers; preserve handlers that still perform independent audio/player/accessibility cleanup.
- Compare owner precedence before deleting: Candidate106 owns catalog geometry; Candidate103's obsolete catalog geometry writes were removed in Batch19, but its other player/dock effects remain.
- Mark uncertain lifecycle dependencies NEEDS CONFIRMATION and continue with other safe items. Do not report static inspection as runtime PASS or isolated harness as full-app E2E.
- Publish report, manifest, tests, summary and update CURRENT_STATUS.md, BASELINE.md, NEXT_TASK.md and CHANGELOG_STAGE6.md. Candidate HTML upload/hash must remain NOT VERIFIED unless confirmed remotely.

## Next: Batch 22 — Song Select lifecycle and remaining duplicate state writers
- Start from Candidate316 SHA-256 4845b950ae4e801aa6c6da2d9d0a23bdbac16a04edaa218396e4c043b17b4317; verify local file/hash first. Formal baseline remains Candidate302.
- Continue across Song Select dock, player, modal and grid lifecycle as a functional group. Trace observers, resize/navigation listeners, timers and target handlers against the existing state owners.
- Preserve independent responsibilities such as audio/video cleanup, accessibility state, close/Escape behavior, dynamic data updates and route re-entry. Delete only when the exact event path and side effects are proven redundant.
- Batch20 removed Candidate70's unreachable dock target listener; Batch21 removed Candidate72's duplicate panel-state observer. Candidate76/77 remain the panel-state owners and Candidate106 remains catalog geometry owner.
- Mark uncertain observers/timers NEEDS CONFIRMATION and continue with other safe candidates. Test actual affected scripts in Chromium at desktop/tablet/mobile; full-app E2E remains NOT RUN until genuinely executed.
- Publish reports/manifests/test results/summaries and update all status docs. Candidate HTML remote upload and SHA verification must not be claimed unless confirmed.

## Next: Batch 24 — continue Song Select runtime owner consolidation
- Start from Candidate318 SHA-256 14ef66a19621fda5798f486d4008a9251625045842d2b96c538890ed21735029; verify local bytes/hash first. Formal baseline remains Candidate302.
- Continue beyond CSS cleanup. Review remaining dock/player/modal/grid runtime state writers and lifecycle hooks as one group: event registration order, capture/target propagation, mutation targets, resize/navigation callbacks and route re-entry.
- Candidate70 owns early ranking placeholder creation and Escape handling; Candidate76 owns close-button/state/geometry handling; Candidate77 owns dock click/open/close; Candidate106 owns catalog geometry. Preserve these responsibilities unless runtime evidence proves a safe transfer.
- Search for more unreachable target listeners and fallback branches, but only delete after verifying document order and actual event propagation. Mark uncertain dependencies NEEDS CONFIRMATION and continue with other safe items.
- Test actual affected scripts in isolated Chromium, JS syntax, CSS parse, duplicate IDs and desktop/tablet/mobile layout. Full-app audio/storage/CRUD/AMQ/EMQ/MIX/multiplayer E2E remains NOT RUN unless executed.
- Update all docs and publish reports/manifests/tests/summaries. Do not claim Candidate HTML remote upload/hash without verification.


## Next: Batch 26 — continue runtime cleanup from Candidate320
- Verify local Candidate320 hash before edits; Candidate302 remains formal baseline.
- Continue route/layout owner and lifecycle cleanup, prioritize proven dead observers/listeners and duplicate initializers. Keep Candidate103/114 remaining behavior unless ownership is proven redundant.
- Run JS syntax, CSS parsing, duplicate-ID and affected-script Chromium checks. Full-app E2E remains NOT RUN unless actually executed.
- Report skipped/error items explicitly; do not claim HTML upload or remote SHA verification unless confirmed.


## Next: Batch26 Round 2 — dependency ownership maps and grouped cleanup
1. Use `AMQ_GLOBAL_CANDIDATE_SCAN_CANDIDATE320_20261025.md` as the Round 1 output; do not repeat the global inventory.
2. Trace Song Select lifecycle candidates LC-01/02/03/04/05/07/09: list observer target, callback effects, CSS/DOM properties written, trigger sources, initialization guard and cleanup.
3. Compare Candidate103/106/114/158/210/71/99/115 ownership. Do not delete an entire module based on overlapping selectors or similar names.
4. Separately inspect CSS repeated selectors with media conditions and source order; produce only evidence-backed obsolete declaration candidates.
5. Batch together candidates proven redundant; skip unresolved items and continue independent work. Keep Candidate320 immutable; new source changes require a unique candidate filename.
6. Run syntax/CSS/duplicate-ID checks, then affected-script browser tests if environment permits. Full-app E2E remains NOT RUN unless executed.
7. Update status, baseline note, next task, changelog and test report; verify GitHub read-back and report remote artifact/hash status accurately.


## Next — Batch26 Round 3 validation and lifecycle cleanup
1. Start from local Candidate321; preserve Candidate320 unchanged as rollback and Candidate302 as formal baseline.
2. Run real browser acceptance for Song Select AMQ/EMQ/MIX modes, filters/sorting, cover loading/fallback, selected-row playback, route exit and home-player reset. Current Chromium attempt is BLOCKED, not PASS.
3. If browser acceptance passes, inspect Candidate114 0/180/500/900ms route resets and internal 80/240ms timers; reduce only after proving later retries add no required state repair.
4. Trace Candidate158 subtree Observer mutations and narrow its target only if mount/catalog clipping remains correct across route and viewport changes.
5. Verify non-main AMQ/EMQ inline-list artwork after Candidate115 selector narrowing.
6. Do not promote Candidate321 until browser validation and remote artifact SHA-256 verification. Candidate321 HTML is not confirmed uploaded to GitHub.
7. Update status/baseline/next-task/changelog and tests with explicit PASS/FAIL/NOT RUN/BLOCKED labels.


## Next — Batch26 Round 3 validation and lifecycle cleanup
1. Start from local Candidate321; preserve Candidate320 unchanged as rollback and Candidate302 as formal baseline.
2. Run real browser acceptance for Song Select AMQ/EMQ/MIX modes, filters/sorting, cover loading/fallback, selected-row playback, route exit and home-player reset. Current Chromium attempt is BLOCKED, not PASS.
3. If browser acceptance passes, inspect Candidate114 delayed route resets and reduce only after proving later retries add no required repair.
4. Trace Candidate158 subtree Observer mutations and narrow its target only if mount/catalog clipping remains correct across route and viewport changes.
5. Verify non-main AMQ/EMQ inline-list artwork after Candidate115 selector narrowing.
6. Do not promote Candidate321 until browser validation and remote artifact SHA-256 verification. Candidate321 HTML is not confirmed uploaded to GitHub.
7. Update status/baseline/next-task/changelog and tests with explicit PASS/FAIL/NOT RUN/BLOCKED labels.


## Batch26 Round 3 handoff — 2026-10-25
1. Highest priority: recover the exact `data.js` and `emq-data.js` dependencies matching Candidate321, or verify the official packaging step that embeds them. Both paths returned 404 on branch `amq-stage6-static-audit-regression-20261025`; do not fabricate substitute production data.
2. Run full browser acceptance in a supported origin with persistent localStorage: real AMQ/EMQ/MIX, filters/search/sort, cover loading/fallback, row selection/playback, and home player reset.
3. Keep Candidate114 timers and Candidate158 subtree Observer unchanged until full-app route/mount tests prove reductions safe.
4. Upload Candidate321 HTML bytes to GitHub and read back the remote file to verify SHA-256 before promotion.
5. Candidate321 is not promoted; Candidate320 remains rollback checkpoint; Candidate302 remains formal baseline.


## Batch26 Round 4 handoff — 2026-10-25
1. Actual AMQ/EMQ data dependencies are now available locally and successfully load in a Chromium test copy. Do not repeat data-file discovery.
2. Resolve a supported browser origin / launch method that allows the real page to use persistent storage and formal navigation; `file://` and localhost navigation were blocked, while `page.set_content()` gives opaque `about:blank` and requires a test-only storage shim.
3. Through formal UI navigation, test AMQ/EMQ/MIX, search/filter/sort, real cover loading/fallback, selected-song audio/video playback, and route-exit player reset.
4. Only after those tests pass, decide whether Candidate114 delayed resets can be reduced and Candidate158 subtree Observer narrowed.
5. Candidate321 HTML upload and remote SHA-256 verification still pending; Candidate321 not promoted. Candidate320 rollback and Candidate302 formal baseline unchanged.


## Batch26 Round 4 supplement — next actions (2026-10-25)
1. Candidate324 fixes the Candidate210 initialization race: 6/6 browser test-copy runs bind artwork nodes and selection handling. Candidate324 is not promoted.
2. Highest priority now: run cover loading/fallback and actual audio/video playback in a trusted origin with external DNS/media URLs available. Current test origin is opaque and external cover DNS failed; do not infer cover correctness from image-node creation alone.
3. Verify persistent localStorage in a supported origin, without the memory-only test shim.
4. After full route/media acceptance, inspect Candidate114 delayed resets and Candidate158 subtree Observer for safe reduction.
5. Upload Candidate324 HTML and read it back to verify SHA-256 before any promotion. Candidate302 formal baseline and Candidate320 rollback remain unchanged.


## Next — AMQ four-round cleanup workflow (2026-10-25)
1. Round 1 inventory is complete for Candidate320; use the full local report/JSON and GitHub summary rather than repeating broad discovery.
2. Round 2: classify each candidate as DIRECT DELETE, INTEGRATE THEN DELETE, or DEFER. Build property/DOM/API/storage ownership maps for Song Select and Workspace; compare CSS declarations only under equivalent conditions.
3. Batch changes by cohesive feature group. Preserve Candidate320 and Candidate302; create unique candidate versions and rollback checkpoints.
4. Round 3: run syntax/CSS/DOM checks after each batch, then focused browser tests and integration regression. A failed batch does not invalidate unrelated verified batches.
5. Round 4: generate single-file HTML from verified source, calculate SHA-256, update CURRENT_STATUS.md / BASELINE.md / NEXT_TASK.md / CHANGELOG_STAGE6.md and test reports, upload where possible, then read back and verify remote content.
6. Direct-delete list from Round 1 is empty. Do not treat 114 unresolved initial-DOM ID references, repeated selectors, duplicate local function names, or raw listener/observer/timer counts as dead-code proof.
7. Browser full-app E2E, persistent storage, real media playback and external cover fallback remain NOT RUN for this inventory.


## Next — Round 3 / Candidate326 concentrated regression
1. Candidate326 is an experimental cumulative candidate only; formal baseline Candidate302 and rollback Candidate320 remain unchanged.
2. Resolve a valid visible UI route into Song Select in a supported browser origin. The current harness can only dispatch a synthetic click on a hidden legacy overlay control, so do not call that visible UI acceptance.
3. Verify real cover network load/fallback, actual audio/video playback, route exit/player reset, and persistent storage in a supported origin. Keep each result PASS / FAIL / NOT RUN / BLOCKED.
4. Re-run focused regression after the combined Batch27/28 changes; the candidate's JS exactly matches the previously tested Candidate324, and CSS exactly matches Candidate325.
5. Next grouped cleanup target after Song Select acceptance: Workspace shell/frame/actions/custom-list workflow (Candidate76/77/82/227, Prototype 15/16, Candidate258). Build unique DOM/class/API owner map before deletion.
6. Candidate114 timers and Candidate158 observer scope remain unchanged. Do not remove storage/recovery paths or merge AMQ/EMQ schemas without data-flow proof.
7. Candidate325/326 HTML remote upload and SHA read-back remain BLOCKED by the available connector's lack of direct local-file upload. Reports/docs are committed; do not claim HTML upload succeeded.


## Batch29 supplement — Candidate326 visible UI path confirmed (2026-10-25)
1. Visible UI entry is now PASS in the isolated browser copy: click `#amqMainIcon`, then visible `#amqHomePrimaryNav [data-home-action="catalog"]`; do not continue to describe this exact path as BLOCKED.
2. Visible `#c99Back` return-to-home path also PASS: route class removed and home player slot returns to 46px.
3. Still highest priority: obtain a trusted browser origin where external DNS/media is available and native localStorage persists. Current test environment blocks both localhost and file URLs; ANN/VNDB requests fail DNS.
4. Recheck cover fallback visual state, actual audio/video playback and persistence across reload. These remain BLOCKED, not PASS.
5. Do not proceed to Candidate114 timer reduction or Candidate158 observer narrowing until media/cover/storage regression is validated. Workspace ownership mapping can be prepared without changing code, but no Workspace cleanup batch should be promoted ahead of this acceptance.
6. Candidate326 remains unpromoted. Candidate302 formal baseline and Candidate320 rollback unchanged. Candidate HTML remote upload/hash verification remains BLOCKED.

## Batch29 supplement — Candidate326 visible UI path confirmed (2026-10-25)
1. Visible UI entry is PASS in the isolated browser copy: click `#amqMainIcon`, then visible `#amqHomePrimaryNav [data-home-action="catalog"]`; do not continue to describe this path as BLOCKED.
2. Visible `#c99Back` return-to-home path also PASS: route class removed and home player slot returns to 46px.
3. Highest priority: obtain a trusted browser origin where external DNS/media works and native localStorage persists. Current environment blocks localhost and file URLs; ANN/VNDB requests fail DNS.
4. Recheck cover fallback visual state, actual audio/video playback and persistence across reload. These remain BLOCKED, not PASS.
5. Do not proceed to Candidate114 timer reduction or Candidate158 observer narrowing until media/cover/storage regression is validated. Workspace ownership mapping may be prepared without code changes, but no Workspace cleanup batch should be promoted ahead of this acceptance.
6. Candidate326 remains unpromoted. Candidate302 formal baseline and Candidate320 rollback unchanged. Candidate HTML remote upload/hash verification remains BLOCKED.


## Batch30 next task
- Continue from Candidate327, but do not promote it. The user will perform real local-browser checks for cover/fallback, media playback, and native persistence.
- Next cleanup focus: Workspace shell/frame/actions/custom-list workflow. Build a single-owner map for DOM subtrees, route interception, handlers, observers, timers, and persistence; then integrate duplicate responsibility and delete the superseded implementation in grouped batches.
- Preserve Candidate302 and Candidate320 unchanged. Full E2E and remote candidate HTML hash verification remain NOT RUN / NOT VERIFIED.


## Batch32 next task (2026-10-26)
- Continue from Candidate329; Candidate302 formal baseline and Candidate320 rollback checkpoint remain unchanged.
- Inspect Candidate15's remaining setWorkspace/init/visibility Observer responsibilities against Candidate76/77/82. Preserve unique action routes that Candidate82 does not map.
- Next inspect Candidate16 custom-list workflow for duplicate event delegation, observers and timers. Preserve `customListsStoreV1`, member toggling, recovery, and persistence semantics.
- Browser interaction, real media, external covers/fallback, native storage, and Candidate HTML upload/hash remain NOT RUN / NOT VERIFIED. User will test locally; do not keep chasing the blocked browser origin/DNS environment.


## Batch33 update — next task
- Continue from Candidate330. Do not modify Candidate302 or Candidate320.
- Audit Candidate16 custom-list workflow against the formal CRUD/membership API. Check whether legacy-manager fallback and dual catalog-grid/Song Select card support are still required before deleting any large block. Preserve `customListsStoreV1`, member toggle, error handling and persistence semantics.
- Then map Candidate15 visibility Observer against Candidate76/77 shell/frame lifecycle. Do not delete route sync based only on similar names or broad observer overlap.
- Browser E2E/media/covers/native persistence remain NOT RUN for local user acceptance. Candidate330 HTML upload/hash remains NOT VERIFIED.


## Batch34 next task
- Continue from Candidate331; Candidate302 formal baseline and Candidate320 rollback remain unchanged.
- Inspect Candidate16 custom-list legacy-manager fallback against current card types and the official membership API. Keep both legacy catalog cards and Song Select rows unless actual dependency evidence proves one is obsolete.
- Then verify Candidate15 visibility Observer ownership against Candidate76/77 route/shell lifecycle. Do not infer redundancy from broad observer overlap.
- Full browser E2E/media/covers/native persistence remain NOT RUN for user local acceptance; Candidate331 HTML upload/hash NOT VERIFIED.


## Batch35 — Candidate332 Candidate16 grid scope cleanup (2026-10-26)
- Parent Candidate331 SHA-256: `1a17f6a940aa2248a40c56a15d91fe0d63df35da35948f15156fd261dea13565`.
- Candidate332: `amq_learning_tool_v82_86_43_candidate332_custom_list_grid_scope_cleanup_20261026.html`, SHA-256 `dd4b9ca46fe3303232f8f455e1461c3e638fc339fa7440819d55df86a737f10d`, 1,631,927 bytes, -107 bytes from Candidate331.
- Only `amq-workspace-prototype-16-custom-list-workflow-script` changed: removed unreachable `getGrid()` fallbacks after static `#grid`, and removed whole-document `.card` scan fallback because `#grid.closest('.view-catalog')` exists in the current HTML.
- Preserved both custom-list paths: legacy `.cardManage`/`#practiceManageBackdrop` and Song Select `.songrow[data-work-id]` using `__aniCustomListMembershipV1`; storage compatibility and session state unchanged.
- Candidate15 visibility Observer and Candidate76/77 lifecycle were retained because current evidence does not prove duplicate ownership.
- Tests: PASS, 65 inline scripts syntax checked with 0 errors; PASS, 109 style blocks raw-brace check; PASS, 729 ID attributes and 17 duplicate-ID kinds unchanged from Candidate331; PASS, key membership/storage code retained. Browser E2E, native persistence, media playback, HTML upload/remote hash remain NOT RUN.
- Experimental only. Candidate302 remains formal baseline; Candidate320 remains rollback checkpoint. Report: `AMQ_BATCH35_CANDIDATE332_CUSTOM_LIST_GRID_SCOPE_CLEANUP_20261026.md`.


## Next task after Batch35
- Continue from Candidate332 (SHA-256 `dd4b9ca46fe3303232f8f455e1461c3e638fc339fa7440819d55df86a737f10d`). Map every source of `__aniGetActiveViewV82()`, body class changes, and `hidden`/class mutations used by Candidate15 `syncWorkspaceVisibility()`; compare with Candidate76/77 route/shell lifecycle before considering Observer changes.
- Do not delete Candidate16 legacy-manager path: current `#grid` catalog cards are rendered live, lack direct work IDs, and use `.cardManage`/`#practiceManageBackdrop`; Song Select rows use the canonical membership API. Keep both paths until product behavior explicitly changes.
- Candidate302 remains formal baseline; Candidate320 remains immutable rollback checkpoint. Candidate332 is experimental. Browser E2E/media/native persistence and Candidate332 HTML upload/remote hash remain NOT RUN.


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

## 下一項：Batch40（從 Candidate336 開始，先驗證再修改）

1. 在真實瀏覽器驗證 Candidate76／77 側欄矩陣：一般工作區收合／展開、Home、其他路由、Song Select 收合／展開，以及桌面／窄視窗 resize。
2. 記錄 display、visibility、pointer-events、position、left/right/top/bottom、尺寸、aria-hidden、dock aria-pressed／aria-expanded、computed style 與點擊結果。
3. 若瀏覽器回歸通過，再測工作區內容面板、Escape、park/restore 與 Home 導航；語法檢查不等於互動驗收。
4. Candidate302 正式基準與 Candidate320 回滾點保持不變。Candidate336 仍是實驗候選。
5. Candidate HTML GitHub 上傳與遠端 SHA-256 核對仍未完成；上傳前核對分支、檔名及版本。


## Batch40 結果與下一步（2026-10-26）

- 嘗試用 Chromium Playwright 載入 Candidate336 的 file:// 與本機 HTTP URL，兩者都被執行環境回傳 `net::ERR_BLOCKED_BY_ADMINISTRATOR`；頁面未載入。
- 因此 dock 開啟／收合、一般路由／Home、Song Select、桌面／窄視窗 computed style、資料持久化、媒體／多人 E2E 全部維持 NOT RUN。Batch40 不得標記互動驗收 PASS。
- 本批沒有修改 HTML 或建立新候選。Candidate336 SHA-256：`b38efba9422e81bc160bf7f66f2b4cd487bcfeafb86c6c49c8e6034283c9459a`。
- 下一步：在未被政策阻擋的互動瀏覽器中執行本報告 `AMQ_BATCH40_CANDIDATE336_SIDEBAR_BROWSER_VALIDATION_20261026.md` 列出的 1440×900 與 390×844 狀態矩陣，記錄 computed style、rect、ARIA、實際點擊與 console errors；取得證據前不再修改側欄邏輯。
- Candidate302 正式基準與 Candidate320 回滾點保持不變；Candidate336 仍是實驗候選。


## Batch 41 complete — next: Batch 42 navigation dispatcher consolidation
- Ownership audit uploaded: `AMQ_BATCH41_WORKSPACE_ROUTE_OWNERSHIP_AUDIT_20261026.md` and `.json`.
- Candidate60 and Candidate193 route wrappers have distinct behavior; merge into one dispatcher preserving Song Select interception, VNDB opening, base navigation, and standalone-route side effects.
- First create static route-map/harness assertions for all destinations and wrapper side effects. Only then replace wrappers in a new candidate.
- Separately consolidate Candidate76/77 sidebar state writes behind a single panel-state API, preserving Candidate76 geometry/ARIA and Candidate77 dock click/navigation behavior.
- Do not delete Candidate70, Candidate82, or Candidate99 based on CSS visibility alone.
- Browser runtime remains BLOCKED in this environment; label browser behavior NOT RUN, not PASS. Keep Candidate302 baseline and Candidate320 rollback unchanged.


## Batch 43 completed / Batch 44 next
- Candidate339 local artifact: `amq_learning_tool_v82_86_50_candidate339_batch43_confirmed_dead_code_cleanup_20261026.html`; SHA-256 `8518449cff37050f67e9ae418f376e328f3219c784c179e9d0b178db8ade0bdd`.
- Removed the duplicate Candidate186 audioDock MutationObserver and Candidate94's three #amqWorkspaceDock rules; retained modal handlers and list-membership filter.
- 65 inline JS syntax checks PASS; browser E2E NOT RUN.
- Next: consolidate Candidate76/77 geometry/state ownership only after tracing every read/write and event path; then consolidate Candidate60/Candidate193 navigation wrappers into one dispatcher while preserving standalone route/body-class effects, Song Select panel interception, VNDB route behavior, and base navigation. Do not delete Candidate70/82/Prototype15 active behaviors. Candidate302 and Candidate320 remain untouched.
- GitHub report/JSON created on branch; Candidate339 HTML upload and remote SHA-256 verification remain NOT RUN.


## Next task — Batch45 event interception verification (2026-10-26)
1. Start from Candidate340 only as an experimental candidate; preserve Candidate302 and Candidate320.
2. Audit listener registration order and propagation for Candidate70/76/77/82 and Prototype15. Prove whether capture-phase [data-ws] interception is required; do not merge [data-ws-action] into the same handler.
3. Verify one click produces one state transition, close button calls the single close API, ESC does not trigger conflicting close handlers, and Candidate82 content-panel park/restore remains intact.
4. Run browser tests if the environment permits. Static syntax/ownership assertions are not browser interaction tests; if blocked, record BLOCKED/NOT RUN and continue with static event-path evidence only.
5. After Batch45, Batch46 can consolidate Candidate60/Candidate193 navigation wrappers and then inspect Candidate99/Candidate137 song-selection subscriptions.
6. Candidate340 HTML GitHub upload and remote SHA read-back remain NOT RUN. Candidate302 formal baseline and Candidate320 rollback remain unchanged.


## Batch45 — ownership handoff implementation (2026-10-26)
1. Use `AMQ_WORKSPACE_OWNER_MATRIX_CANDIDATE340_BATCH45_PRECHECK_20261026.md` as the verified source map. Parent Candidate340 SHA-256: `74e3d7eb0287cb04dcad0caf08d3d640abb32e21faa6fcc3be00e93a1438f158`.
2. Transfer `[data-ws]` click ownership from Candidate76 to Prototype15; coordinate the open/close API so `amq-dock-expanded` is not toggled twice. Candidate70 and Candidate77 have no such current click bindings, so do not delete non-existent handlers.
3. Isolate only confirmed dock selectors from Candidate84 and Candidate94 into `style#legacy-dock-regression[media="not all"]`; keep Candidate94's `#grid .card.amqListNotMember85` membership filter in the formal cascade.
4. Verify Candidate60/Candidate82/Candidate193 route and click-capture conditions independently; Candidate193's navigation wrapper must not be mislabeled as a click listener.
5. Run static syntax and propagation assertions, then browser regression if the environment permits. Preserve Candidate302 formal baseline and Candidate320 rollback; Candidate340 is the immediate rollback.


## Batch45 completed / next Batch45 continuation
- Candidate341 local candidate and report: `AMQ_CANDIDATE341_BATCH45_REPORT_20261026.md`, `AMQ_CANDIDATE341_BATCH45_REPORT_20261026.json`.
- Source Candidate340 verified before edit; Candidate302 formal baseline unchanged.
- Event ownership consolidation is static-validated only; do not promote until real browser click/keyboard/route regression.
- Next: (1) browser-test workspace selector toggling in Song Select and normal workspace, verify close/ESC and `[data-ws-action]`; (2) audit Candidate84 dock CSS selector-by-selector and only isolate confirmed obsolete selectors into non-cascading regression storage; preserve Candidate94 `#grid .card.amqListNotMember85`; (3) inspect Candidate82 `[data-home-action]` capture owner and Candidate60 standalone-route owner, keeping route-class conditions distinct; (4) then Batch46 navigation/Song Select.
- Candidate341 SHA-256: `7abb6635b90254d666620953397c7d56f02e537bde997c523eb163203a15bd1a`. Rollback to Candidate340 SHA-256 `74e3d7eb0287cb04dcad0caf08d3d640abb32e21faa6fcc3be00e93a1438f158`.


## Updated next task — after Candidate343 Batch47 (2026-10-26)
### Four closure stages
1. Safe cleanup: implement only source-evidenced dead code / duplicate ownership changes; do not repeat established inventories without new evidence.
2. Core regression: AMQ/EMQ/MIX, player controls, custom-list CRUD/persistence, backup/restore, workspace routing/actions, and required multiplayer lifecycle.
3. Final residue scan: classify each remaining item KEEP / INTEGRATE / DELETE / NEEDS CONFIRMATION; no unbounded new stages.
4. Formal release: unique single-file HTML, update all three status docs, upload HTML to GitHub, read back bytes/hash, and preserve rollback.

### Immediate task
- Continue from Candidate343, SHA-256 `fd9bf2536cf3aa73767c896040d460a742b3471a8cb3508133267f7c9508ee3f`; do not change Candidate302 formal baseline.
- Candidate343 Batch47 removed the orphaned Candidate186 `get` helper left after Batch42's recovery-path removal. Only Candidate186 script body changed; 65 executable inline JS syntax checks PASS.
- Browser interaction remains BLOCKED by `ERR_BLOCKED_BY_ADMINISTRATOR`; full regression NOT RUN.
- Do not delete C103 audio controls/geometry, v47 hero display, Candidate72 inline styles, or v33 `showToast` until runtime or complete caller evidence supports it.
- Next engineering work: perform a bounded source audit for additional *local declarations/helpers with zero reads* in the already shortlisted scripts; only if exact references are proven absent, remove a small related set and run syntax + scope assertions. Otherwise move directly to core regression planning and record browser blocker without retry loops.
- Candidate343 HTML GitHub upload/readback remains NOT RUN. Do not claim remote delivery until verified.


## Updated next task — after Candidate344 Batch48 (2026-10-26)
- Current experimental descendant: Candidate344 `amq_learning_tool_v82_86_55_candidate344_batch48_remove_dead_quiz_evaluator_20261026.html`, 1,625,750 bytes, SHA-256 `cf3860059b7987838cf0a61b63e943cd480202a01790f556794b62cac05dc1ac`. Formal baseline remains Candidate302; rollback checkpoint Candidate320 remains immutable.
- Batch47 removed the orphaned Candidate186 `get` helper after its only recovery path was removed. Batch48 removed the uncalled local Quiz evaluator helper chain from `v37-answer-and-layout-fixes`.
- Tests: static assertions PASS; 65 executable inline JS syntax checks PASS; ZIP integrity PASS. Browser interaction BLOCKED by `ERR_BLOCKED_BY_ADMINISTRATOR`; full functional regression NOT RUN; Candidate344 HTML remote upload/hash readback NOT RUN.
- Next bounded task: review remaining already-shortlisted scripts only for declarations with zero live references. Do not delete C103 audio controls/geometry, v47 hero display, Candidate72 inline styles, or v33 `showToast` without new runtime/caller evidence. If no additional safely removable items are found, stop cleanup-only batches and move to core regression / explicit blocker ledger.
- Closure remains four stages: safe cleanup → core regression → final residue/dependency scan → formal single-file release with remote HTML readback and SHA-256. Do not add stages.


## Updated next task — after Candidate345 Batch49 (2026-10-26)
- Current experiment: Candidate345, `amq_learning_tool_v82_86_56_candidate345_batch49_remove_unused_quiz_bindings_20261026.html`, SHA-256 `de4b96d355763015e747b72d25f3feabd40e6b2edfec69d2a4a19469bd9414f3`. Candidate302 remains formal baseline; Candidate320 remains rollback checkpoint.
- Batch48 removed an uncalled Quiz evaluator helper chain. Batch49 removed three unreferenced local DOM bindings from related Quiz scripts.
- PASS: 65 inline JS syntax checks, targeted assertions, ZIP integrity. Browser interaction BLOCKED; full regression NOT RUN; Candidate345 HTML remote upload/readback NOT RUN.
- Next bounded source audit: check already-shortlisted scripts for local declarations with zero reads. Do not remove C103 audio controls/geometry, v47 hero display, Candidate72 inline styles, or v33 `showToast` without new evidence. Stop cleanup-only batches when no further low-risk candidates remain; move to core regression and blocker handling.
- Four closure stages remain: safe cleanup → core regression → final residue/dependency scan → formal release with remote HTML SHA readback. Do not add stages.

## Updated next task — after Candidate346 Batch50 (2026-10-26)
- Current experiment: Candidate346 `amq_learning_tool_v82_86_57_candidate346_batch50_remove_orphaned_local_helpers_20261026.html`, 1,625,225 bytes; SHA-256 `dfef81df1572219d2b96b5f8eeeb50696acfe99a0fced53b6c83371f930c99ca`. Formal baseline Candidate302 and rollback checkpoint Candidate320 unchanged.
- Batches 47–50 removed confirmed unreferenced helpers/bindings from Candidate186, Quiz scripts, v60, and learning-system v72. 65 inline JS syntax checks PASS in each recent batch.
- Browser interaction is BLOCKED by `ERR_BLOCKED_BY_ADMINISTRATOR`; full core regression NOT RUN. Candidate346 HTML remote upload/hash readback NOT RUN.
- **Stop cleanup-only batches unless new, high-value dead code is proven.** Move to core regression and final dependency scan. Use existing isolated route/storage/multiplayer evidence rather than rerunning identical audits. Record the browser blocker once and proceed with available non-browser checks; do not invent PASS results.
- Remaining runtime-dependent items: C103 audio controls/geometry, v47 hero display, Candidate72 inline styles, v33 `showToast`; retain as NEEDS CONFIRMATION until evidence is available.
- Four closure stages only: safe cleanup → core regression → final residue/dependency scan → formal release. No extra stages.


## Next task — 2026-10-26
- Continue from Candidate346, SHA-256 `dfef81df1572219d2b96b5f8eeeb50696acfe99a0fced53b6c83371f930c99ca`. Candidate302 remains the formal baseline and Candidate320 remains the rollback checkpoint.
- Static source-presence smoke passed for 11 groups; report files are committed and readback-verified. This is not functional validation.
- Full browser regression remains unavailable in the current environment; full core regression is NOT RUN.
- Consolidate existing isolated route/storage/multiplayer evidence into one core regression matrix. Run available targeted checks, mark each domain PASS/FAIL/NOT RUN/BLOCKED, then do the final high-risk residue scan and prepare formal release if no unresolved critical risk remains.
- Keep the four closure stages unchanged. Do not add new stages or repeat blocked browser attempts.

## Current task — core regression / final residue scan (2026-10-26)
- Current experimental artifact: Candidate346, SHA-256 `dfef81df1572219d2b96b5f8eeeb50696acfe99a0fced53b6c83371f930c99ca`. Candidate302 formal baseline and Candidate320 rollback checkpoint remain unchanged.
- Static marker smoke PASS for 11 groups; inline JS syntax PASS for 65 scripts. Core regression matrix is committed and readback-verified.
- Full-app functional regression remains INCOMPLETE. AMQ/EMQ/MIX, player, custom-list persistence, backup/restore and multiplayer are NOT RUN on Candidate346. Workspace browser interaction is BLOCKED.
- Do not repeat the same blocked browser attempt. Proceed with the final high-risk dependency/residue scan using existing evidence. Keep C103, v47 hero, Candidate72 inline styles and v33 `showToast` as NEEDS CONFIRMATION unless new runtime evidence becomes available.
- If no critical unresolved source risks remain, proceed to formal packaging with explicit known limitations. Do not claim full functional acceptance or remote HTML upload until those are actually verified.

## Next task — formal release preparation (2026-10-26)
- Final residue scan classified 14 items; report MD/JSON are committed and readback-verified. No additional application code was changed during the scan.
- Current artifact Candidate346 SHA-256: `dfef81df1572219d2b96b5f8eeeb50696acfe99a0fced53b6c83371f930c99ca`. Candidate302 remains formal baseline; Candidate320 remains rollback checkpoint.
- Core regression remains INCOMPLETE: browser interaction BLOCKED; full AMQ/EMQ/MIX, player, custom-list persistence, backup/restore and multiplayer regression NOT RUN on Candidate346.
- Remaining browser-dependent items are classified in the residue scan. Do not start more cleanup batches unless new high-value, low-risk evidence appears.
- Prepare the formal release handoff only after resolving the browser validation and remote HTML transfer/readback blockers. If those remain unavailable, deliver Candidate346 as an experimental package with explicit limitations, not as a fully accepted official baseline.

## Release preparation result — 2026-10-26
- Experimental handoff package created locally: `AMQ_CANDIDATE346_EXPERIMENTAL_HANDOFF_20261026.zip`; SHA-256 `8d9645c1c57a6eb0e940606ca6dadf10a9a12dbe30ed30eeb53e91ecace21cdd`; ZIP integrity PASS.
- Included Candidate346, Candidate345 immediate rollback, Candidate320 checkpoint, cleanup reports, regression matrix, residue scan, and manifest.
- Stage 4 is still BLOCKED for formal release: full core browser regression remains incomplete and the HTML remote upload/hash readback is not done. Do not promote Candidate346.


## 2026-10-26 next-step refinement
1. Do not create another deletion batch from the already classified low-confidence residues. Existing scan says runtime-dependent items need confirmation.
2. Try one materially different permitted browser execution route for the required Candidate346 interaction matrix. If blocked, record the exact error and stop retrying that class of method.
3. Resolve release evidence: Candidate302 and Candidate346 HTML expected paths both returned 404 on the specified branch. Upload and read back the actual HTML only if the connector supports it reliably; otherwise mark BLOCKED and keep the local package.
4. Complete the required test matrix honestly. Full app regression is NOT RUN, not PASS. Candidate302 remains the formal baseline; Candidate346 remains experimental.
5. Current local handoff package: `UNATTENDED_SESSION_HANDOFF_20261026.zip`; manifest includes file sizes and SHA-256 values.

- Latest remote evidence: progress docs and independent static verification MD/JSON are committed and read back. The actual Candidate346 HTML is still not uploaded or hash-verified; handle that as a distinct task only if a reliable large-file path is available.


## Browser probe follow-up — 2026-10-26
- Tried Playwright `page.set_content` using system Chromium as a materially different route. It built a DOM but opaque-origin storage and missing execution context/dependencies produced runtime errors, so this is not a valid end-to-end test route.
- **BLOCKED:** `file://` navigation returns `net::ERR_BLOCKED_BY_ADMINISTRATOR`. Stop repeating this class of attempts. Next, only try a permitted origin/runtime that supplies localStorage and expected dependencies; if unavailable, mark full-app tests BLOCKED and proceed with local packaging/remote HTML publication evidence.
- Evidence: `AMQ_CANDIDATE346_BROWSER_PROBE_20261026.md`.
