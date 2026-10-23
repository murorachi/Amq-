# CURRENT STATUS — Candidate 181 Compact Viewport Scroll Fix

- Latest local experimental candidate: Candidate 181.
- HTML: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_181_compact_document_scroll_fix.html`
- Local SHA-256: `3671ec7fb9a276742bc227f7028c1df4f7afb730f27dc099138392640b82ee3a`
- Size: 9,278,478 bytes.
- Candidate 181 adds a compact-viewport document overflow fix, route-scoped to Song Select at widths <=900px. It retains Candidate 180's removal of the 500px stage minimum that forced a page scroll.
- PASS: 65 executable inline JS blocks parsed by Node `--check`, zero syntax errors; HTML/style tag counts balanced.
- PASS: Chromium route/geometry checks at 2555×1438, 1920×1080, 1648×928, 1440×900, 1280×720, 900×700. Document dimensions match viewport at all six sizes; legacy left rail hidden; 180 song rows; keyboard selection; AMQ/EMQ/MIX full-source counts; hover -3px vs selected -7px; 7.5-row affordance confirmed.
- Report: `reports/candidate181-compact-document-scroll-fix-20261023/VALIDATION.md` uploaded and remote read-back pending.
- BLOCKED: native file:// navigation returns ERR_BLOCKED_BY_ADMINISTRATOR. page.set_content has opaque origin, so persistence/CRUD acceptance remains unverified.
- NOT RUN: real APIs/covers, audio playback, full workspace regression, registered pixel-diff.
- Candidate 181 HTML is local only; GitHub HTML upload and remote SHA verification NOT COMPLETED. Candidate is NOT ACCEPTED.

Next: workspace actions should become modal overlays after main Song Select layout is stable; then native-origin persistence and full regression. Preserve Candidate 179/170/169 rollback points.