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


## Stage59 handoff — continue from Candidate279 UI V1
1. Keep Candidate277 immutable; do not use Candidate278.
2. Candidate279 local SHA-256: `dec9a2ae140ba8482804f4df3986c60a7e790b1ab009fb4f2de3756c13692038`.
3. Next highest value: obtain permitted browser runtime; record fixed-state screenshots and computed styles for homepage, Song Select, workspace dock and quiz; then migrate one CSS responsibility group at a time into the existing canonical design-system/page modules.
4. Do not delete repeated selectors without checking media/state order and computed-style impact.
5. Run route/workspace switching, custom-list CRUD+reload persistence, keyboard/game/audio/multiplayer, mobile viewport and pixel comparisons when browser is available.
6. GitHub HTML artifact upload/readback/SHA verification remains blocked; the local deliverable is available separately. Full Stage59 report is `reports/STAGE_59_GLOBAL_UI_DESIGN_SYSTEM_V1_CANDIDATE279_20261025.md`.
