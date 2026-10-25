# Batch 6 — Runtime lifecycle stress probe

Date: 2026-10-25

## Baseline protection
- Candidate302: 1,720,249 bytes; SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Source modified/deleted: NO / 0 deletions.

## Method and results
- Tested 12 selected inline scripts individually in Chromium, using Candidate302 static markup/CSS, with inline app scripts disabled and synthetic APIs/minimal workspace scaffolding.
- Wrapped listener, observer, timer and RAF APIs; each script received 20 synthetic route/body-class/navigation/resize cycles.
- 12/12 initialized without uncaught errors; 0 browser page errors.
- No net increase in active listeners or active observers was observed across synthetic route cycles in this harness. Scheduled RAF/timeouts settled.
- Manual reinjection added resources for eight scripts: v77 interval repetition, workspace prototype 15, Candidate76 workspace shell, Candidate77 frame-owned workspace, workspace prototype 16, Candidate185 modal guard, Candidate258 import workspace, and Candidate99 Song Select runtime. This proves only that manually re-evaluating those source blocks can add registrations. It does not prove ordinary route changes re-execute scripts or that a production leak exists.
- Multiplayer UI has two page-level intervals. Active-room poll/WebSocket cleanup with a synthetic session and fake server remains NOT RUN.

## Limits
- Isolated harness, not full-app E2E. Matching catalog data assets are unavailable in this work directory.
- Remote Candidate302 HTML remains BLOCKED/NOT_FOUND; remote SHA-256 not verified.

## Decision
No code deletion or application modification. Keep the eight reinjection candidates at INTEGRATE/NEEDS_CONFIRMATION until the single-file script load topology is proven.

## Next
Build a fake-server multiplayer session harness and verify poll/socket cleanup on leave/route-away, then confirm script load topology before selecting any cleanup target.
