# CURRENT STATUS — Candidate 123

- Candidate 123 HTML size: 9,236,297 bytes.
- SHA-256: `cf800068783be96805b858a99b79c8a81b63089fc43189f3d40f15894239a53e`.
- Stage 2 route regression: 17 PASS / 0 FAIL.
- Static validation: 5 PASS / 0 FAIL; 62 inline scripts parse; 90 CSS blocks / 2,572 qualified rules parse.
- Stage 3 fixed-viewport capture: 2 PASS / 0 FAIL; interaction-state checks: 4 PASS / 0 FAIL.
- Geometry improvements: catalog x=650.95, first row y=63, row height 60px, pitch 63px; left rail x=7, y=91, width≈297px.
- Stage 3 pixel acceptance: FAIL; full-frame SSIM 0.29145, MAE 69.096/255. Structural mismatches remain in scene/background, list composition, and lower player/profile region.
- Audio: user-confirmed playable; not independently tested by this automated run.

BLOCKED: actual durable reload persistence due managed Chromium `ERR_BLOCKED_BY_ADMINISTRATOR` for file/localhost navigation.
NOT RUN: live AniList/MAL/VNDB API requests.
NOT VERIFIED: remote GitHub HTML binary and remote HTML SHA-256.

Stage 3 measurement pass is complete as a report/checkpoint; visual fidelity acceptance is not passed. Candidate 123 is not final release.
