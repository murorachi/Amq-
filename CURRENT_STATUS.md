# CURRENT STATUS — Candidate 205 Responsive Root Fix

- Current local experimental candidate: Candidate 205.
- HTML: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_205_tablet_layout_runtime_rootfix.html`
- Local SHA-256: `e7003bc154bb74fcd89a8d5f0694200ff2ffb849026cce23416c4fe90fc8bd02`
- Size: 9,303,985 bytes.
- Candidate 202 corrected the left local-history panel geometry to match the user's reference proportions: top `clamp(132px,15.5vh,225px)`, width `clamp(300px,28vw,720px)`.
- Candidate 205 fixes the actual tablet root cause: a later Candidate 180 runtime overwrote earlier responsive CSS with an inline `calc(100dvh - 220px)` height. Tablet stage height now reserves dock space and row/artwork sizes adapt to the available list height.
- PASS: 70 executable inline JS blocks checked with Node `--check`; 0 syntax errors.
- PASS: AMQ 38,821; EMQ 16,839; MIX 55,660 with exact source counts; 180 rows per mode.
- PASS: no document overflow at 2555×1438, 1920×1080, 1648×928, 1440×900, 1280×720, 1000×928, 900×700, 900×928, and 390×844.
- PASS: eighth row ~46% visible on standard desktop viewports and 50% at 900×700, 900×928, and 390×844.
- PASS: keyboard ArrowDown changes selection; history rendering filters out other-song records; workspace modal dim/Escape/state restoration passes at 1648×928.
- BLOCKED: native file:// and local HTTP return ERR_BLOCKED_BY_ADMINISTRATOR. Opaque-origin page.set_content emits two localStorage access-denied errors; persistent reload/stored history not verified.
- NOT RUN: custom-list CRUD/persistence, live APIs/covers/recovery, audio, full workspace regression, registered pixel-diff.
- GitHub report: `reports/candidate205-tablet-layout-runtime-rootfix-20261024/VALIDATION.md`; remote read-back verification pending.
- Candidate 205 HTML is local only; GitHub HTML upload/remote hash verification NOT COMPLETED. Candidate is NOT ACCEPTED.

Next: correct top controls and bottom-dock hierarchy against the 2555×1438 user reference, then recalculate regional visual metrics. Preserve the scene-background manager and fallback.