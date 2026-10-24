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


## Stage59 update — 全站 UI 設計系統 V1（2026-10-25）
- Candidate277 remains the immutable baseline; Candidate278 is explicitly not adopted.
- Candidate279 local artifact: `amq_learning_tool_v82_85_93_candidate279_global_ui_design_system_v1_20261025.html`, 9,374,351 bytes, SHA-256 `dec9a2ae140ba8482804f4df3986c60a7e790b1ab009fb4f2de3756c13692038`.
- PASS: 109 CSS style blocks inventoried; 3,629 parsed qualified rules; zero stylesheet/declaration parse errors; 67/67 executable inline JS blocks pass node --check; 272 DOM IDs unique.
- Changes: update existing v79-design-system in place with V1 tokens, shared Active/focus-invalid states, version metadata, and remove one proven adjacent duplicate declaration. No business/data/router changes.
- BLOCKED: browser acceptance due missing Playwright Chromium executable; GitHub HTML binary upload/readback/hash verification unavailable. NOT RUN: routing/workspace, list persistence, game/audio/multiplayer, mobile and pixel checks.
- Full local report: `reports/STAGE_59_GLOBAL_UI_DESIGN_SYSTEM_V1_CANDIDATE279_20261025.md`. CSS cascade cleanup remains incomplete; do not treat repeated selectors alone as dead code.
