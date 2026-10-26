# NEXT_TASK.md

Updated: 2026-10-26

## Next highest-value task
**Close the release-evidence gap without repeating blocked browser experiments.** The alternate `page.set_content` probe was attempted and is not a valid application-origin test; direct `file://` navigation remains administrator-blocked. Stop repeating those routes.

The next actionable work is to verify whether the connected GitHub workflow can publish the 1.6 MB HTML as a binary artifact. The currently available GitHub content write path is text-oriented; if no supported binary path is available, record HTML publication as BLOCKED, preserve the verified local handoff package, and do not claim a release. Full-app functional acceptance still requires a permitted real-origin browser environment.

### Scope
1. Preserve Candidate346 as experimental and Candidate302 as formal baseline.
2. Do not retry `file://`, localhost, or opaque-origin `set_content` as though they were valid full-app tests.
3. Check for a supported binary-upload path to publish the exact Candidate346 HTML to the specified branch; if unavailable, mark it BLOCKED after a bounded attempt.
4. Keep full-app AMQ/EMQ/MIX, player, custom-list, backup/restore, workspace, and multiplayer cases BLOCKED/NOT RUN until a real-origin browser is available.
5. Preserve Candidate302 as formal baseline and Candidate345/Candidate320 as rollback checkpoints.
6. Keep the verified local handoff package and manifest consistent; only mark remote HTML publication PASS after exact content and SHA-256 readback.

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
- Next work should be a bounded check for a supported binary publication path, then continue packaging/closure if unavailable. No per-batch approval is needed for safe, scoped work.
