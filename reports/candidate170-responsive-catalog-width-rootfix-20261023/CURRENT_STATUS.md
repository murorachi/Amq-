# CURRENT_STATUS.md

- Candidate 170 is experimental and not accepted as the formal baseline.
- HTML SHA-256: 089d8cb9f6e63178a9726dbfce9485c8691e81d3600ce5669458a26c7a9d5662 (9,269,850 bytes).
- Root cause: runtime and CSS capped .p32-catalog at 762px despite intended 46.5vw width. Both caps were removed.
- Supplied image dimensions: 2555 x 1438 px; it depicts a multiplayer ranking/score screen and is not the Song Select geometry reference. Official osu!stable Song Select image is now pinned at osu-wiki commit `8c585eea35455a4bd255f93b5d59ccaf807e6bdd`, path `wiki/Client/Interface/img/song-selection.jpg`, dimensions 1280 x 720, GitHub blob SHA `1e927a00a1984a5ba20fa5efec639410f349607a`.
- Focused geometry checks: 6 PASS / 0 FAIL at 2555, 1920, 1648, 1440, 1280 and 900 px widths. Additional 1280 x 720 `page.set_content` precheck recorded catalog x=684.8, width=595.2; last song row is approximately half visible. This is preliminary geometry evidence, not pixel-diff acceptance.
- Existing 26-test suite: NOT RUN on Candidate 170; its executable runner remains unrecovered. Real browser navigation via local Chromium is BLOCKED by environment (`ERR_BLOCKED_BY_ADMINISTRATOR`). Durable storage, live API/audio and full CRUD: NOT RUN. A separate Proto25 GitHub Actions browser run succeeded, and its test entry point `tests/proto24_workspace_acceptance.py` was identified, but it is not the missing 26-case suite and has not been run against Candidate 170. The 1280 x 720 precheck produced two opaque-origin localStorage warnings, recorded separately.
- Rollback checkpoint Candidate 169 SHA-256: 5913ad864a8841b144de7c72c4deeede765ec5675117667c13f9eb5fe89a7d66f.


## Candidate 170 local Playwright rerun (2026-10-23)

- Report: `CANDIDATE170_LOCAL_ACCEPTANCE_RERUN.json`, GitHub blob SHA `373ed9c55cebb0a64ba092eb0ed2338e042c5aaa`.
- Tested Candidate 170 HTML SHA-256 `089d8cb9f6e63178a9726dbfce9485c8691e81d3600ce5669458a26c7a9d5662` using system Chromium + Playwright `page.set_content`; navigated via the home icon and Song Select menu.
- PASS: document reaches complete; Song Select route activated through UI; 180 catalog records populated; catalog remains within document width at 1280x720, 1440x900, 1648x928, 1920x1080, 2555x1438, 900x700; ArrowDown changes selected song ID (45305 to 13404); no non-storage uncaught page errors.
- 7.5-card cue: preliminary geometry remains consistent at the main 16:9 sizes. At 1280x720 the final row shows 41.4/70.5 px; at 2555x1438 it shows 90.7/169.3 px. Pixel-perfect source comparison remains NOT RUN.
- WARN: two localStorage access-denied errors and one console warning are caused by opaque `about:blank` origin under `page.set_content`. They were recorded and not counted as non-storage application errors.
- NOT RUN/BLOCKED: native file/http navigation (Chromium returns `ERR_BLOCKED_BY_ADMINISTRATOR`), durable storage, live API/audio, full CRUD, original historical 26-case suite, registered pixel-diff.
- Screenshot: `candidate170_1280x720_acceptance_rerun.png`, local SHA-256 `40d4503587e5e99934468621c4336432aa92ebf7adc45c93f924840cb5094ce0`.
- Acceptance status remains experimental. Candidate 169 is still the rollback point; Candidate 170 is not promoted to formal baseline.
