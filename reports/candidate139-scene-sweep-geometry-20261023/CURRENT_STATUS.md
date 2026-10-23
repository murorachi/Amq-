# Current status — Candidate 139 (2026-10-23)

## Change
Edited the existing `#amqSongSelectCurvedFrame` rule in place, not by adding another override. Desktop width changed from 58vw/820px to 29vw/480px; top to 10.2vh; height to 9vh; corner radius from 62% to 10%; border changed from black to blue.

## Evidence
- Actual browser geometry at 1648×928: x=0, y=94.64, width=477.91, height=83.52, bottom=178.16; blue 4px border.
- Reference estimate: top y≈95, horizontal border y≈178, curve end x≈478.
- 14 browser assertions PASS, 0 FAIL across 1648×928, 1440×900, 1280×720.
- Static checks: 63 executable inline scripts, 0 JS syntax errors; 91 style blocks, 0 CSS parse errors.
- Compared with Candidate 138 screenshot, 80,751 pixels changed (5.2801%), bounding box [0,90,827,217], mean absolute channel delta 0.344213.
- Full-frame reference metrics: SSIM 0.299502, MAE 58.4068, RMSE 81.8178. These are descriptive, not an acceptance threshold.

## Limitations
- Direct file:// and localhost navigation BLOCKED by ERR_BLOCKED_BY_ADMINISTRATOR.
- Durable persistence, real audio, live APIs, full list CRUD and other-workspace regressions NOT RUN.
- Left player/ranking panel, real scene image, top metadata and bottom controls still materially differ. Song Select is NOT ACCEPTED.
- Candidate HTML binary is not uploaded; available GitHub connector has no verified binary upload path. Text docs and test script are uploaded/read back.