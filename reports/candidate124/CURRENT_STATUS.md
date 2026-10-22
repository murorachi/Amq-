# CURRENT STATUS — Candidate 124

- HTML size: 9,236,297 bytes.
- SHA-256: `3dedd925ba75fbaa71ed180ef34d3f6cb9024e205c9da5f6b0a720896c0693a9`.
- Stage 2 route regression: 17 PASS / 0 FAIL.
- Static validation: 5 PASS / 0 FAIL; 62 inline scripts parse; 90 CSS blocks / 2,572 qualified rules parse.
- Stage 3 fixed-viewport capture: 2 PASS / 0 FAIL; interaction checks: 4 PASS / 0 FAIL.
- Geometry checks: 6 PASS / 0 FAIL. Catalog x=650.95, first row y=63, card height 60px, pitch 63px, catalog bottom y=820, left rail x=7/y=91/width≈297px.
- Pixel acceptance: FAIL; full-frame SSIM 0.29483, MAE 67.495/255. Central scene/background, osu!stable artwork-led rows, and header content still differ structurally.
- Audio: user-confirmed playable; not independently tested in this automated run.

BLOCKED: durable reload persistence (managed Chromium denies file/localhost navigation).
NOT RUN: live AniList/MAL/VNDB API requests.
NOT VERIFIED: remote GitHub HTML binary and remote HTML SHA-256.

Stage 3 geometry/interaction measurement pass is complete; visual fidelity acceptance is not passed. Candidate 124 is not final release.
