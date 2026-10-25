# CURRENT_STATUS — Candidate277 adopted as working baseline (2026-10-25)

## Current status
- Baseline decision: PASS. User explicitly authorized Candidate277 as the working baseline, replacing the previous hold pending Candidate212 recovery. This does not assert byte identity with Candidate212.
- File: `amq_learning_tool_v82_85_91_candidate277_custom_list_name_normalization_20261025.html`
- Version: `v82.85.91-candidate277-custom-list-name-normalization-20261025`
- Bytes: 9,373,238
- SHA-256: `b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371`
- Batch 2 static dependency inventory completed for Candidate277; dynamic/runtime dependency edges remain to be audited before broad deletion.
- Batch 3 browser acceptance remains incomplete. Browser checks are BLOCKED/NOT RUN under the managed browser restrictions.
- No HTML/CSS/JS or application data was modified during this baseline decision. Candidate277 and Candidate276 remain immutable.

## Static checks previously executed
- PASS: 67/67 executable inline JavaScript blocks passed `node --check`.
- PASS: 109 CSS blocks parsed with zero stylesheet/declaration parse errors.
- PASS: 272 initial DOM IDs were unique.
- PASS: local SHA-256 and byte size match the Candidate277 record.
- NOT RUN/BLOCKED: browser interactions, reload persistence, live APIs, audio, multiplayer, IndexedDB Blob restore and osu!stable pixel comparison.

## Next
1. Continue Batch 2 dependency mapping: workspace/router lifecycle, custom-list selector and storage ownership, CSS cascade groups, observer/timer teardown.
2. Fix title/data-amq-candidate metadata only in a uniquely named child candidate.
3. Attempt isolated Candidate277 artifact upload/readback/hash verification when feasible.


## Stage57 update — Batch2 targeted gap audit (2026-10-25)
- Batch2 static dependency inventory is closed within its declared scope: Stage55 remains the main inventory; Stage57 adds targeted workspace/route, custom-list selector/storage, CSS cascade, dynamic-template, observer/timer evidence without repeating the full inventory.
- PASS (static only): workspace/controller layering and dynamic entry points identified; `syncListSelectors()` has 7 literal references; custom-list data key and selected-list state key are distinct responsibilities; representative observer/timer patterns mapped.
- No HTML/CSS/JS modified. Candidate277 size/SHA remain unchanged.
- Browser/runtime dependency verification and P0 acceptance remain BLOCKED/NOT RUN; do not claim Batch3 complete.
- Report: `reports/stage57-batch2-targeted-gap-audit-20261025/STAGE_57_BATCH2_TARGETED_GAP_AUDIT_CANDIDATE277_20261025.md`.


## Stage58 update — Candidate278 homepage shell and in-place Play menu (2026-10-25)
- Child candidate: `amq_learning_tool_v82_85_92_candidate278_homepage_shell_inplace_play_menu_20261025.html`
- Version: `v82.85.92-candidate278-homepage-shell-inplace-play-menu-20261025`
- Bytes: 9361163
- SHA-256: `cd2fdb8f1f762c4a30f64f54e64ab530607a3a3fb1866f9275804c507df08bf1`
- Parent Candidate277 remains immutable: 9,373,238 bytes, SHA-256 `b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371`.
- PASS (static): initial legacy menu removed from shell; old floating SOLO/MULTI/BACK modal and CSS/observer removed; in-place SOLO/MULTI actions wired; profile card removed from homepage while profile storage key remains; bottom player slot, single viewport CSS authority and original synthesized click sound present; 271 static IDs unique; 67/67 executable inline JS blocks pass `node --check`; 108 CSS blocks parse with zero stylesheet errors.
- BLOCKED: Chromium headless smoke test timed out on `about:blank` after 15 seconds. Browser interaction, mobile viewport fit, route transitions, audio and click-sound runtime checks are NOT RUN.
- NOT IMPLEMENTED: BPM-synchronized visualizer. No verified BPM field/source was found; current ICON hover bounce is only playback-state animation, not BPM sync.
- NOT COMPLETE: GitHub HTML artifact upload/readback and remote SHA verification.
- Full report: `reports/stage58-candidate278-homepage-20261025/STAGE_58_CANDIDATE278_HOMEPAGE_SHELL_AND_INPLACE_PLAY_MENU_20261025.md`.


## Stage 1 — Candidate277 raw-byte retrieval recheck (2026-10-25)
- Status: BLOCKED. Candidate277 Library indexes exist and record 9,373,238 bytes, but raw-byte materialization returned “This Project file does not have an authorized raw-byte materialization path.”
- GitHub checks: the Candidate277 filename returned HTTP 404 on Candidate278, Candidate280, Candidate282, Candidate284, and Candidate287 branches. Commit search by recorded SHA and filename returned no usable results. Candidate278 tree does not contain the Candidate277 HTML artifact.
- The recorded SHA-256 remains historical evidence only; it was NOT recomputed in this execution. Do not promote Candidate295, Candidate283, or any reconstructed/indexed excerpt to Candidate277 baseline.
- Candidate295 HTML and its original smoke/Coverage/recovery attachments were not mounted in this execution environment. No application code, HTML, data, or storage schema was modified. Browser acceptance and single-file build were NOT RUN.
- Test-oracle work is documented in `reports/stage1-candidate295-baseline-retrieval-20261025/STAGE_1_BASELINE_RETRIEVAL_AND_SAFE_CONTINUATION_20261025.md`.


## Stage 2 — Uploaded Candidate295 HTML verification (2026-10-25)
- User supplied raw `index-old.html`; actual size 1,720,917 bytes and recomputed SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`, matching the recorded Candidate295 identity.
- PASS (static): 271 DOM IDs, zero duplicate IDs; all 68 inline executable JS blocks passed individual `node --check` checks.
- Candidate295 references external `data.js` and `emq-data.js`, neither is present beside the uploaded HTML in the current workspace. Single-file portability and data-dependent runtime behavior are not verified.
- BLOCKED: Playwright navigation to both file:// and local HTTP URL returned `net::ERR_BLOCKED_BY_ADMINISTRATOR`; this is an environment blocker, not an application pass/fail result.
- Candidate277 raw HTML remains BLOCKED. The uploaded file is Candidate295, not Candidate277. Candidate277's recorded size/SHA remain historical records and were not recomputed in this stage. Do not promote Candidate295 or reconstruct Candidate277 from excerpts.
- No application HTML/CSS/JS/data/storage changes. Stage report: `reports/stage2-candidate295-uploaded-html-audit-20261025/STAGE_2_UPLOADED_CANDIDATE295_STATIC_AND_RUNTIME_GATE_20261025.md`.
- Rollback: revert the documentation-only Stage 2 commit; preserve Candidate277 and Candidate276 unchanged.


## Stage 2 recovery follow-up (2026-10-25)
- Re-searched Library for the exact Candidate277 filename: two indexed records report 9,373,238 bytes, but raw-byte materialization of both failed with `This Project file does not have an authorized raw-byte materialization path`.
- Found indexed `Coverage-20261025T094140.json` (10,050,921 bytes); its raw-byte materialization failed with the same blocker. Data files described inside the handoff/coverage records are not locally recovered or hash-reverified in this stage.
- Candidate277 remains BLOCKED for raw-byte SHA verification. Search/index presence is not proof of byte recovery. No application files were changed.
