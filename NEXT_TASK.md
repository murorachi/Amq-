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
