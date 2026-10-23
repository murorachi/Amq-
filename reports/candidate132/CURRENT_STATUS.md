# CURRENT STATUS — Candidate 132

- Working candidate: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_132.html`.
- Size: 9,243,399 bytes.
- SHA-256: `1de08a187020d1818a9f752ba565a04deea576d8bb6d59673af002df9bbd6cce`.
- Parent / rollback Candidate 130 SHA-256: `9085754d5b6d8b1463709c25a97402a217e8ddb07afb9e4beb5d14dd1fbc3916`.
- PASS: 62 executable JS blocks parsed; 0 errors.
- PASS: 90 CSS blocks / 2,591 qualified rules parsed; 0 CSS errors.
- PASS: browser screenshots and geometry at 1648×928, 1440×900, and 1280×720, DPR 1.
- PASS: 7 full cards plus 50% of the eighth at all three tested viewport sizes.
- PASS: selected row centered, selected transform -7px, hover transform -3px, selected margin 2px top/bottom, distance-based opacity.
- PASS: simple fallback background when no custom background is active; custom background image layer preserved in a browser probe.
- Visual metrics at 1648×928: SSIM 0.314905, MAE 65.1377, RMSE 86.3097. Overall fidelity remains low.
- Version identity: remote Candidate 131 has SHA-256 `f5e475819810a9b71101e3e70ab073815f12b5dd1e073ecf81631451ced897d3`; Candidate 132 is based directly on Candidate 130 and does not overwrite it.

BLOCKED / NOT RUN:
- Direct `file://` navigation is blocked by the environment; browser probes used Playwright `set_content`.
- `localStorage` is denied for the opaque test origin; reload persistence NOT RUN.
- Live import APIs, audio playback, complete list persistence regression, and other workspace regression NOT RUN.
- Stage 1 overall incomplete; Stages 2 and 3 incomplete. Candidate 132 is NOT ACCEPTED as final.
- GitHub text reports can be uploaded/read back; HTML binary upload and remote HTML SHA-256 verification remain unconfirmed.
