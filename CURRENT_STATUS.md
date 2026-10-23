# CURRENT STATUS — Candidate 173 Left Rail Root Fix

- Current local experimental candidate: Candidate 173.
- HTML: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_173_left_rail_specificity_fix.html`
- Local SHA-256: `282edb78e91de4c4f65f1c917d6edf333b52efef11de7c6b65256404e4101b27`
- Size: 9,271,506 bytes.
- Root cause fixed: the actual legacy rail is `#c99LeftRail`, and its later-injected Candidate 99 `!important` rule beat the prior equal-specificity hide rule. Candidate 173 raises selector specificity and hides the rail plus its curved-frame decoration on the Song Select route.
- PASS: 64 executable inline JS blocks checked with Node `--check`, 0 syntax errors.
- PASS: Chromium `page.set_content` route/geometry checks at 2555×1438, 1920×1080, 1648×928, 1440×900, 1280×720, 900×700. Legacy rail hidden, 180 rows present, no horizontal overflow, dock in viewport.
- PASS: ArrowDown changes selected row; hover displacement (-3px) is smaller than selected-row displacement (-7px); desktop list shows a partial eighth row.
- Report: `reports/candidate173-left-rail-root-fix-20261023/VALIDATION.md`, created on GitHub.
- BLOCKED: native file:// navigation returns ERR_BLOCKED_BY_ADMINISTRATOR. page.set_content has opaque origin and localStorage access errors, so durable persistence is not verified.
- NOT RUN: full pixel-diff, native-origin CRUD persistence, live APIs/covers, audio playback, full workspace regression.
- Candidate 173 HTML remains local; GitHub upload and remote hash verification NOT COMPLETED. Candidate is NOT ACCEPTED.

Next: improve row/background visual treatment against the user reference without breaking the scene-background manager, then modal workspace panels in a later stage. Preserve Candidate 170/169 rollback points.