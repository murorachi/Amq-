# CURRENT STATUS — Candidate 180 Hover Displacement Root Fix

- Current local experimental candidate: Candidate 180.
- HTML: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_180_hover_displacement_rootfix.html`
- Local SHA-256: `4858d816a4b7fa0583d2d883bab2acb066d51f25f4023344b6667bdf44db9b83`
- Size: 9,277,240 bytes.
- Candidate 179 restored translucent distance-tier rows; Candidate 180 fixes the actual hover movement. Candidate 179's hover width growth caused a measured 6 px shift even though transform was -3 px. Candidate 180 removes width growth, producing an actual 3 px left shift. Selected row remains stronger.
- PASS: 64 executable inline JS blocks checked by Node `--check`, 0 syntax errors.
- PASS: Chromium set_content route checks at 2555×1438, 1920×1080, 1648×928, 1440×900, 1280×720, 900×700. 180 rows, legacy rail hidden, zero horizontal overflow, dock within viewport, eighth row clipped ~50%.
- PASS: actual hover bounding-box shift -3px; ArrowDown selection change; AMQ→EMQ→AMQ changes/restores song data; screenshot at 2555×1438.
- Report: `reports/candidate180-hover-displacement-rootfix-20261023/VALIDATION.md`, uploaded and read-back verification pending.
- BLOCKED: native file:// navigation ERR_BLOCKED_BY_ADMINISTRATOR; page.set_content opaque origin has two existing localStorage errors, so persistence is not verified.
- NOT RUN: full CRUD/reload persistence, live API/covers, audio, full workspace regression, registered pixel diff.
- Candidate 180 HTML is local only. GitHub upload/remote HTML SHA verification NOT COMPLETED. Candidate is NOT ACCEPTED.

Next: review scene/background and metadata proportions against the user's reference, then implement modal workspace panels after the Song Select scene is stable. Preserve all earlier candidates and Candidate 169 rollback checkpoint.