# NEXT_TASK.md

## Current next highest-value task — Candidate351 targeted regression
**Run the targeted regression for the five latest cleanup batches before starting another cleanup batch.** Candidate351 removes 11 confirmed unreferenced functions; static checks pass, but the latest candidate has not yet been exercised in the browser.

Use `AMQ_Candidate351_Targeted_Regression_Tool.html`, select Candidate351, and confirm SHA-256 `52a7760d042260a14c31392c885b2dc6a31129f00663798514f968141f65dd55`. Test only the eight changed areas: EMQ work-list controls, VN catalog/home navigation, Chinese title conversion, SRS rating entry, multiplayer settings/start entry, scene-background overlay, favorites persistence, and EMQ work-detail/Escape behavior. This avoids repeating all 24 core checks already reported PASS for Candidate346.

If a targeted item FAILs, stop cleanup in that subsystem and fix the concrete regression in a new unique candidate, with Candidate350 as direct rollback. If all targeted checks PASS, use `AMQ_CANDIDATE351_FINAL_RESIDUE_SCAN_20261026.md` to select the next high-risk NEEDS CONFIRMATION item. Do not delete runtime-dependent CSS/audio/route code without new evidence. Keep `renderDashboardV10` as KEEP because the document has five references to the top-level global function.

Known blockers remain: full-app browser E2E previously hit `ERR_BLOCKED_BY_ADMINISTRATOR` for file/localhost paths; Candidate351 HTML upload/readback to GitHub is NOT VERIFIED. Do not repeat blocked browser routes or treat docs upload as HTML upload.

---


Updated: 2026-10-26

## Previous next-task record (superseded by Candidate351 update)\n
**Close the release-evidence gap without repeating blocked browser experiments.** The alternate `page.set_content` probe was attempted and is not a valid application-origin test; direct `file://` navigation remains administrator-blocked. Stop repeating those routes.

The connected GitHub tools expose text content create/update operations but no local-file/binary upload action. Supplying the 1.6 MB HTML as a base64 tool argument is not a practical supported path in this session. Therefore remote HTML publication is **BLOCKED** unless a supported binary upload route becomes available. Preserve the verified local handoff package and do not claim a release. Full-app functional acceptance still requires a permitted real-origin browser environment.

### Scope
1. Preserve Candidate346 as experimental and Candidate302 as formal baseline.
2. Do not retry `file://`, localhost, or opaque-origin `set_content` as though they were valid full-app tests.
3. **BLOCKED:** no supported local-file/binary upload action is exposed by the connected GitHub tools. Do not keep retrying text-content writes for a 1.6 MB HTML file. Resume only if a genuine binary upload route is available.
4. Keep full-app AMQ/EMQ/MIX, player, custom-list, backup/restore, workspace, and multiplayer cases BLOCKED/NOT RUN until a real-origin browser is available.
5. Preserve Candidate302 as formal baseline and Candidate345/Candidate320 as rollback checkpoints.
6. Keep the verified local handoff package and manifest consistent; only mark remote HTML publication PASS after exact content/path and SHA-256 readback.

### Acceptance criteria
- Every required regression case has PASS, FAIL, NOT RUN, or BLOCKED with evidence.
- No unsupported claim of full-app acceptance.
- Candidate302 baseline remains unchanged.
- Candidate HTML remote upload is only marked PASS after exact content/path and SHA-256 readback are verified.
- `CURRENT_STATUS.md`, `BASELINE.md`, and `NEXT_TASK.md` reflect actual outcomes.

### Current blockers
- Browser: `ERR_BLOCKED_BY_ADMINISTRATOR` for direct local-file navigation; opaque-origin `set_content` does not support valid full-app acceptance.
- Remote HTML: Candidate302 and Candidate346 were not found at their expected paths on the specified GitHub branch.
- Runtime-dependent residue: C103 audio geometry, v47 hero display, Candidate72 icon inline styles, v33 `showToast`, Candidate84 CSS, and workspace transitions.

### Rollback
No application code was changed in the latest verification step. For Candidate346, immediate rollback is Candidate345; secondary checkpoint is Candidate320. Formal baseline remains Candidate302.

## GitHub results — 2026-10-26
- PASS: updated progress documents and read them back.
- PASS: uploaded and read back independent static verification MD/JSON, browser probe report, and handoff manifest.
- BLOCKED / NOT VERIFIED: HTML artifacts. Candidate302 and Candidate346 expected paths returned 404; no claim of HTML upload or remote SHA verification is permitted.

## Continuation rule — 2026-10-26
- Browser-probe alternatives already attempted: direct local-file navigation and Playwright `page.set_content` in system Chromium. Do not spend another batch repeating them.
- A bounded tool-capability check found no supported local-file/binary upload action; remote HTML publication remains BLOCKED. No per-batch approval is needed for safe, scoped work. Continue only when a real-origin browser or binary-upload route becomes available; otherwise retain the local verified handoff and do not claim formal release.


## Updated next task after manual acceptance — 2026-10-26
1. Manual acceptance report received: exact Candidate346 hash confirmed; 24/24 items are user-recorded PASS. Per-item notes are blank, but do not ask the user to repeat all tests without new failure evidence.
2. Static checks have now been executed locally and passed: 65 inline JS syntax checks, 269 unique IDs, required HTML structure present.
3. Do not generate another candidate or repeat completed audits absent new failure evidence.
4. Remaining formal release blocker: remote HTML publication/readback. Connected GitHub tools do not expose a supported binary upload route for the 1.6 MB HTML. Resume only if a genuine binary upload route becomes available; otherwise preserve local artifacts and mark remote publication BLOCKED.
5. Candidate302 remains formal baseline; Candidate346 remains an accepted-for-manual-testing experimental candidate; Candidate345/Candidate320 remain rollback points.
