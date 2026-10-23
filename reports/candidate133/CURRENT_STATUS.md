# CURRENT STATUS — Candidate 133

- Candidate: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_133.html`
- SHA-256: `92507a86af95b556733664510dc5727e40c34398c86f8932ca212e08f7d9edfe`
- Size: 9,242,471 bytes.
- Changes: CSS-only no-custom-background fallback; top-level catalog capped to eight visible cards at 1648×928; proximity tiers; 3px hover / 7px selected-row movement; inline song list returned to normal flow.
- Static checks PASS: 62 executable JS blocks / 0 syntax errors; 90 CSS blocks / 2,582 rules / 0 parse errors.
- Playwright set_content PASS at 1648×928, 1440×900, 1280×720; 180 catalog items; 8 top-level cards visible at 1648×928; selection and hover transforms measured.
- Pixel metrics full-screen at 1648×928: SSIM 0.306571, MAE 65.2708, RMSE 85.9472. Not a visual acceptance pass.
- BLOCKED: direct `file://` navigation.
- NOT RUN: true reload persistence, live APIs, audio, full custom-list CRUD and other-workspace regression.
- Status: NOT ACCEPTED as final.
