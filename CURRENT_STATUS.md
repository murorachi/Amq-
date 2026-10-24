# CURRENT STATUS — Candidate 209 (experimental, not accepted)

- Recovery baseline remains Candidate 178 because Candidate 205 was unavailable. Candidate 208 was explicitly rejected as a source; Candidate 209 was rebuilt directly from Candidate 207.
- Candidate 207 remains unchanged: 9,310,496 bytes; SHA-256 `2f3a092a139628daa48bc113d2a192f41e2d7474182471ed926de3de49fd6100`.
- Latest local artifact: `/mnt/data/amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_209_rebuilt_songselect_from_207.html`.
- Candidate 209 size: 9,324,855 bytes. SHA-256: `8a38e08cfb904703c02b7911b7974c8c3d6fc3617bacc6b6b85ef29e8d90ded1`.
- Rebuilt features: osu!stable-inspired dark/blue top filter frame with existing search control moved into it; removed works-catalog toggle; removed actual row-level “更多” disclosure markup; added inline tag/reset/blacklist actions; added bottom player positioning and a nearby tag/blacklist action bar; added row-centering/autoplay/random-seek hooks.
- Static validation PASS: 68 executable inline JavaScript blocks pass `node --check`, zero syntax failures; 105 style blocks / 2,722 CSS qualified rules parsed with zero CSS errors. Static assertions confirm the row-level “更多” disclosure and works-toggle creation are absent.
- Browser acceptance BLOCKED: headless Chromium file navigation did not finish within 45 seconds. No actual UI behavior is counted as passed.
- NOT VERIFIED: actual search, layout against IMAGE1–IMAGE5, row wheel centering/autoplay/random seek, dock action wiring, persistence, live imports, real covers, EMQ/MIX delay/hidden modal.
- NOT DONE: unified AniList/MAL/VNDB import workspace, efficient batch organization, app icon redesign, cover-loading fix and EMQ/MIX root-cause fix.
- Candidate 209 is experimental and not accepted. HTML upload to GitHub and remote HTML SHA-256 readback are NOT VERIFIED.
- Report: `reports/candidate209-rebuilt-from-207-20261024/VALIDATION.md`.
