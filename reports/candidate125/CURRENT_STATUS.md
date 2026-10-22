# CURRENT STATUS — Candidate 125

- Structural correction: canonical Song Select row owner now uses right-aligned staggered viewport-relative widths; cover slot reduced from 78px to 58px; canonical JS catalog mount changed from left=39.5vw/width=60.5vw to left=35.5vw/width=64.5vw.
- HTML size: 9,237,382 bytes.
- SHA-256: `aec14a5d04e643c605770e2923e2755b1f307a5758ddafd281fc4e373ab71178`.
- Static checks: 7 PASS / 0 FAIL; 62 executable inline JS blocks parse; 90 CSS blocks / 2,578 qualified rules parse.
- Parent Candidate 124 preserved: SHA-256 `3dedd925ba75fbaa71ed180ef34d3f6cb9024e205c9da5f6b0a720896c0693a9`.

BLOCKED / NOT RUN: Candidate 125 browser screenshot and hover/selected-state regression (Playwright/system Chromium did not complete in available run window); durable file reload persistence (managed Chromium denies file/localhost navigation); live AniList/MAL/VNDB API requests; GitHub HTML binary upload and remote SHA-256 verification.

Audio playback: user confirms music plays; no independent playback test was run in this environment.

Visual fidelity acceptance remains NOT VERIFIED. Candidate 125 is not a final release.
