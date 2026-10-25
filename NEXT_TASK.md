# NEXT_TASK — Continue from user-authorized Candidate277 baseline

## Active baseline
- File: `amq_learning_tool_v82_85_91_candidate277_custom_list_name_normalization_20261025.html`
- Version: `v82.85.91-candidate277-custom-list-name-normalization-20261025`
- Size: 9,373,238 bytes
- SHA-256: `b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371`
- Direct rollback parent Candidate276 SHA-256: `7a604c1d2d604b928d2ccb51dbb55d58ead2d34f73abfcba27693c794a4ddbd5`
- User explicitly authorized Candidate277 as the working baseline on 2026-10-25. Do not block work on recovering Candidate212. Do not claim Candidate277 is byte-identical to Candidate212.

## Execution order
1. Continue Batch 2 dependency mapping: workspace/router lifecycle; custom-list create/select/delete and selector sync; storage key readers/writers; CSS cascade groups; observer/timer teardown.
2. Distinguish confirmed dead code from uncertain dynamic references. Delete only after caller, indirect-reference and data-compatibility checks.
3. Every source edit creates a new uniquely named child candidate. Never overwrite Candidate277 or Candidate276.
4. Run static tests and relevant regressions; browser-only checks remain NOT RUN/BLOCKED until a permitted browser runtime exists.
5. Update CURRENT_STATUS.md, BASELINE.md, NEXT_TASK.md, test report and handoff after each stage.
6. Attempt isolated GitHub artifact upload and verify remote version, byte size and SHA-256 before claiming success.

## Guardrails
- Do not infer runtime success from static inspection.
- Do not remove CSS solely because selectors repeat.
- Do not merge AMQ/EMQ storage schemas without migration and rollback proof.


## Stage57 handoff: Batch2 static inventory closed, Batch3 remains
1. Keep Candidate277 immutable as the user-authorized baseline. Stage55 is the main dependency inventory; Stage57 is targeted gap coverage, not a full AST/runtime call graph.
2. Batch3 begins with a uniquely named child candidate to correct `<title>` and `data-amq-candidate` metadata only after preserving the baseline and running static checks.
3. Then prioritize P0 acceptance where an allowed browser runtime exists: route/workspace repeat switching and cleanup; custom-list create/select/delete/filter/reload persistence; Song Select keyboard/DOM stability. Mark unavailable browser checks BLOCKED/NOT RUN.
4. User wants to discuss new features in Batch3; do not expand scope in Batch2. Capture requirements before implementation, but do not block this handoff on them.
5. Isolated GitHub delivery of Stage57 report and status/handoff docs is attempted separately from HTML delivery. Do not claim HTML binary upload or remote hash verification unless verified.


## Stage58 handoff — continue from Candidate278 (2026-10-25)
- Immutable parent baseline: Candidate277 SHA-256 `b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371`.
- Current child artifact: `amq_learning_tool_v82_85_92_candidate278_homepage_shell_inplace_play_menu_20261025.html`; SHA-256 `cd2fdb8f1f762c4a30f64f54e64ab530607a3a3fb1866f9275804c507df08bf1`.
- First priority when a permitted browser is available: verify one-viewport fit and exact desktop/mobile geometry; Start Game must replace only the first two menu entries with SOLO/MULTI in-place; verify Settings remains usable; verify route changes and reset-on-return.
- Verify audio dock playback/control after navigating away and returning Home; test synthesized click sound volume and browser gesture handling.
- BPM visualizer remains pending until verified BPM metadata or a reliable audio beat-detection path is established. Do not fake BPM sync.
- Profile editing UI was removed with the homepage card but profile storage remains; a non-home settings location for editing profile is not yet implemented.
- Browser testing is BLOCKED: Chromium timed out on `about:blank` after 15 seconds. Do not claim runtime acceptance.
- GitHub HTML artifact upload/readback/hash verification remains pending.


## Stage 1 — Candidate277 raw-byte retrieval recheck (2026-10-25)
- Status: BLOCKED. Candidate277 Library indexes exist and record 9,373,238 bytes, but raw-byte materialization returned “This Project file does not have an authorized raw-byte materialization path.”
- GitHub checks: the Candidate277 filename returned HTTP 404 on Candidate278, Candidate280, Candidate282, Candidate284, and Candidate287 branches. Commit search by recorded SHA and filename returned no usable results. Candidate278 tree does not contain the Candidate277 HTML artifact.
- The recorded SHA-256 remains historical evidence only; it was NOT recomputed in this execution. Do not promote Candidate295, Candidate283, or any reconstructed/indexed excerpt to Candidate277 baseline.
- Candidate295 HTML and its original smoke/Coverage/recovery attachments were not mounted in this execution environment. No application code, HTML, data, or storage schema was modified. Browser acceptance and single-file build were NOT RUN.
- Test-oracle work is documented in `reports/stage1-candidate295-baseline-retrieval-20261025/STAGE_1_BASELINE_RETRIEVAL_AND_SAFE_CONTINUATION_20261025.md`.


## Stage 2 handoff — uploaded Candidate295 checked (2026-10-25)
1. Candidate295 `index-old.html` is available locally and byte-verified: 1,720,917 bytes, SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`.
2. Do not confuse it with Candidate277. Candidate277 original remains BLOCKED pending raw-byte recovery; do not promote Candidate295 or reconstruct Candidate277 from indexed excerpts.
3. Candidate295 external data dependencies `data.js` and `emq-data.js` are missing from the current workspace. Recover matching versions before attempting a portable build or data-dependent runtime tests.
4. Static PASS: 271 unique DOM IDs; 68 inline executable JS blocks pass `node --check`. Browser checks are BLOCKED because both file and local HTTP navigation returned `net::ERR_BLOCKED_BY_ADMINISTRATOR`.
5. No app code/data modified. Continue by searching for verified Candidate277 raw bytes and matching data assets. Report: `reports/stage2-candidate295-uploaded-html-audit-20261025/STAGE_2_UPLOADED_CANDIDATE295_STATIC_AND_RUNTIME_GATE_20261025.md`.


## Stage 2 recovery follow-up (2026-10-25)
- Re-searched Library for the exact Candidate277 filename: two indexed records report 9,373,238 bytes, but raw-byte materialization of both failed with `This Project file does not have an authorized raw-byte materialization path`.
- Found indexed `Coverage-20261025T094140.json` (10,050,921 bytes); its raw-byte materialization failed with the same blocker. Data files described inside the handoff/coverage records are not locally recovered or hash-reverified in this stage.
- Candidate277 remains BLOCKED for raw-byte SHA verification. Search/index presence is not proof of byte recovery. No application files were changed.

## Stage 3 — Candidate295 acceptance is next (2026-10-25)
1. Treat Candidate295 as the working candidate baseline; do not block progress on recovering Candidate277, and do not yet mark Candidate295 as formally accepted.
2. Recover the matching `data.js` and `emq-data.js` assets and verify their raw bytes/hashes against the recorded versions where possible.
3. Obtain a usable browser runtime and run initialization, AMQ/EMQ/MIX switching, search/song selection, custom-list create/rename/delete/add/remove, and reload-persistence tests in isolated contexts.
4. Fix smoke-test parent/child consistency and validate workspace panel visibility/content, back/close, repeated switching, and DOM cleanup.
5. Keep destructive cleanup on hold until the core acceptance gates pass. Generate a unique single-file build only after confirming the build inputs and verifying the resulting artifact.
6. Keep Candidate295 rollback snapshot immutable; size 1,720,917 bytes, SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`.
Report: `reports/stage3-candidate295-candidate-baseline-freeze-20261025/STAGE_3_CANDIDATE295_BASELINE_FREEZE_AND_ACCEPTANCE_GATE_20261025.md`.


## Stage 4 handoff — continue Candidate295 acceptance (2026-10-25)
1. Obtain the matching data.js and emq-data.js assets from the user's local files; verify filenames, embedded version markers and SHA-256 before testing. Do not guess or substitute data assets from another candidate.
2. In the user's local browser acceptance tool, validate main DB initialization and EMQ ready/count/workCount/getRows results; assert IDs are valid, unique and cross-source conflicts are rejected.
3. Test AMQ, EMQ and MIX candidate source membership and filter behavior; then audio success/failure recovery.
4. In isolated test storage, test custom-list create, rename, delete, add/remove membership, filter and reload persistence.
5. Exercise Song Select route guards with repeated workspace switching/back navigation and inspect stale DOM/listeners before deciding whether any guard is redundant.
6. Continue marking browser-only checks NOT RUN or BLOCKED until actual execution evidence exists. Do not delete route guards or Candidate210 behavior based only on names/markers.
7. Candidate295 supplied HTML remains unchanged at 1,720,917 bytes, SHA-256 aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81. Do not promote to release baseline until core runtime gates pass and the user accepts it.


## Stage 4.1 handoff — run Candidate295 local tool v1.1
1. Use AMQ_Local_Acceptance_Tool_v1_1_Candidate295.html (SHA-256 8272523986420abef4f1820856fc2c81021941d28b67178b3130687e9f5e2b06) or its ZIP package (SHA-256 285dac12c163a55ef1ed08213fc02743d6c4b60d4bfdeea09635aa2f0368bb37).
2. Select the exact Candidate295 HTML and its matching data.js and emq-data.js; do not mix versions. Export the generated JSON report and preserve the three file hashes.
3. Inspect actual EMQ ready/count/workCount/getRows and AMQ/EMQ/MIX pool sizes. Treat BLOCKED as unverified, not as failure or success; report unexpected counts and console errors.
4. Then manually test custom-list create/rename/delete/add/remove/filter/reload and repeat Song Select workspace routing. Do not treat the harness's read-only API checks as CRUD acceptance.
5. Keep Candidate295 unchanged and do not promote it to formal release until core runtime gates are executed and accepted.


## Stage 4.2 handoff — run symbol-aware Candidate295 tool v1.2
1. Run AMQ_Local_Acceptance_Tool_v1_2_Candidate295.html with the exact Candidate295 HTML and matching data.js/emq-data.js; export the JSON report.
2. Review quiz/answer/audio API presence, quiz history/target summary API presence, Song Select module/route-guard flags, and AMQ/EMQ/MIX pool diagnostics. Presence checks are not behavioral proof.
3. If a symbol is BLOCKED, check whether it is a global property or a lexical binding before calling it missing. Do not invoke destructive functions merely to test visibility.
4. Run separate manual acceptance for answer submission/next-song, audio failure recovery, quiz history persistence, custom-list CRUD/reload and repeated Song Select routing.
5. Keep both route guards and Candidate210 behavior until call paths and runtime behavior prove redundancy. Keep Candidate295 unpromoted until core runtime gates pass.


## Stage 5 handoff — continue from the feature/dependency inventory (2026-10-25)
1. Keep the four confirmed functional groups: data core; AMQ/EMQ/MIX gameplay; Song Select/custom lists/workspace routing; quiz history/target summaries and persistence.
2. Next highest-value audit: trace the two `__aniNavigateApp` wrappers in install order, including original-function capture, route mapping, side effects, repeat initialization and return navigation. Do not delete either guard on naming or overlap alone.
3. Trace history/target-summary storage keys and every initializer, reader, writer, scheduler, flush and invalid-data preservation path. Determine whether duplicate persistence responsibilities exist before integrating.
4. Trace custom-list store/membership APIs, UI selection state, selector refresh, batch actions and all storage readers/writers.
5. For each symbol, record direct references, indirect/dynamic references, event entry points and initialization ownership. “No direct text match” is not sufficient evidence for deletion.
6. No app source edits until the dependency map identifies a minimal, reversible change. Candidate295 remains a validation target; preserve Candidate277/Candidate276 baseline history.
7. Browser/data tests remain NOT RUN/BLOCKED until matching data assets and an allowed browser runtime are available.


## Stage 5.1 handoff — next dependency audit actions (2026-10-25)
1. Route wrappers: inspect all three layers in source order; map install guards, captured original functions, each route destination and body-class side effects. Design one explicit router owner only after proving behavior parity.
2. AMQ custom-list fallbacks: enumerate every direct read of `aniCustomPracticeListsV1` and test whether execution can occur before `__aniCustomListsStoreV1` is installed. If not, route reads through the canonical API; preserve safe fallback only where needed.
3. Preserve AMQ and EMQ list schemas separately; do not merge `animeIds` with `workIds/vndbIds/songIds`.
4. Treat detailed quiz history, history summary and target summary as separate products until data lineage proves redundant work. Investigate duplicate scans and save scheduling without changing stored schemas.
5. Continue no-deletion policy until direct/indirect/dynamic references and event/init ownership are evidenced. All browser-only behavior remains NOT RUN/BLOCKED.


## Stage 5.2 handoff — next minimal-change design (2026-10-25)
1. Design a single explicit route owner preserving three responsibilities: Song Select panel interception, generic route/body-class synchronization, and home-menu closing for non-intercepted routes. Regression destinations: watchlist, practice, explore, learningPlan, dashboard, vnList, plus home/quiz/multiplayer and repeated initialization.
2. Evaluate consolidation of AMQ custom-list read fallbacks at source lines ~2359, ~4983, ~7410, ~11492. Keep backup import/export direct access. Prove store is initialized before callbacks and ensure refresh/restore updates consumers before removing fallback behavior.
3. Review summary startup reconstruction cost. Test cases: no history/no summaries; history with missing summaries; valid summary behind recent history; invalid summary quarantined; processed-ID duplicate at dedupe boundary. Do not alter schema or dedupe semantics.
4. Do not edit application HTML/CSS/JS until the above dependency map and regression cases are complete. If browser is unavailable, document behavior checks as NOT RUN/BLOCKED and continue static work without repeated environment troubleshooting.
5. Candidate295 remains a validation target only; preserve the Candidate277/Candidate276 baseline history and do not promote or overwrite them.


## Stage 5.3 route contract requirement (2026-10-25)
- Before integrating Song Select route guards, explicitly decide and test whether intercepted panel routes should run generic body-class post-processing. The existing inner and outer guard placement produces different behavior despite identical destination maps.
- Use the Stage 5 report regression matrix; all browser-only cases are currently NOT RUN. Do not delete a guard until the desired behavior is encoded in one owner and regression cases pass.


## Stage 5.4 static check note (2026-10-25)
- Accurate syntax result for Candidate295: Node.js `--check` PASS for 67/67 executable inline JavaScript blocks. The inline JSON block `aniAnilistIdMapV8237` is data, not JavaScript. Keep browser behavior checks separate as NOT RUN/BLOCKED.


## Stage 5.5 — Next execution checkpoint (2026-10-25)
1. Recover and verify the formal Candidate277 source in the active workspace. Do not substitute Candidate295 or infer equivalence from feature overlap.
2. Against the actual formal baseline, trace initialization order for the four AMQ custom-list direct-storage fallback consumers. Keep backup import/export direct storage access.
3. Implement a single explicit route owner only after baseline verification; preserve six panel mappings, dashboard special class behavior, menu closing, idempotence, and exactly-one interception event.
4. Run route/back/return, custom-list CRUD/membership/selectors, reload persistence and backup/restore regression tests. Browser-only tests must remain NOT RUN/BLOCKED until actually executed.
5. Create a uniquely named child candidate, verify its source/HTML hash and build consistency, then update all state docs and attempt remote readback.
6. Do not delete any route guard or fallback branch until the regression matrix demonstrates equivalent behavior.


## Stage 5.6 — Blocking dependency and safe continuation (2026-10-25)
- BLOCKED: do not edit the formal Candidate277 baseline until its actual HTML is recovered and its SHA-256 is verified. GitHub search did not locate it and the expected path returned 404.
- Continue source-independent inventory work on Candidate295 only. It remains a validation target, not the formal baseline.
- Custom-list fallback readers appear not to be needed for normal script order, but may be degraded-read behavior if the canonical store fails. Keep them until explicit tests decide otherwise; eventual preferred integration is one compatibility adapter, not four separate fallback branches.
- Route guards remain untouched until a single owner explicitly preserves body-class behavior and the regression matrix can be executed.
- If Candidate277 remains unavailable, report the block rather than fabricating a replacement or silently switching baselines.


## Stage 5.7 — Continue from formal Candidate295 baseline (2026-10-25)
1. Treat Candidate295 as the sole formal working baseline; do not search for Candidate277 or re-open the prior baseline decision.
2. Preserve the exact baseline file and SHA-256; every code edit must create a uniquely named child candidate.
3. Continue the static dependency inventory and regression planning from Candidate295, prioritizing route-owner consolidation design and custom-list store fallback analysis.
4. Before deleting any route guard or fallback, trace direct and indirect references, initialization, events, body classes, storage compatibility, and runtime behavior.
5. Run available static tests; mark browser-only tests NOT RUN/BLOCKED until actually executed. Do not claim unverified functionality passes.
6. Keep AMQ and EMQ schemas distinct. Verify data.js and emq-data.js separately when they become available; do not infer their contents.
7. Update BASELINE.md, CURRENT_STATUS.md, NEXT_TASK.md, reports, and GitHub remote readback for each accepted stage.
