# Candidate 190 Validation Report — Workspace Import Route Root Fix

Date: 2026-10-24
Branch: amq-candidate104-songselect-layout-fix
Status: EXPERIMENTAL / NOT ACCEPTED

## Artifact
- File: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_190_workspace_import_route_root_fix.html`
- Parent: Candidate 189
- Size: 9,303,607 bytes
- SHA-256: `6364e31e214e5339165d010d1aa4b673a1e8889aa2c07e9cdd3df330199274db`

## Changes
1. The late capture-phase handler for `list-import-anime` previously called `__aniNavigateApp('watchlist')`, overriding the earlier in-place modal fix. Candidate 190 removes that route call and opens the existing AniList/MAL modal directly.
2. The VNDB workspace action opens `vn-list` through `__amqWorkspaceContentOpen`, instead of calling the route-changing VNDB opener.
3. The VNDB provider helper uses the shared content panel rather than navigating to legacy `watchlist`.
4. Corrected the dock navigation aria-label.

## Tests
- PASS: 65 executable inline script blocks passed `node --check`.
- EXCLUDED: one JSON data block (`aniAnilistIdMapV8237`).
- EXCLUDED FROM JS PARSING: one compressed base64 data block (`emqLibraryGzipBase64V8248`); parsing raw compressed data as JavaScript predictably fails.
- PASS: dispatched AniList/MAL workspace action kept active route at `catalog` and opened the existing `#syncModal`; no import was triggered.
- PASS: dispatched VNDB workspace action kept active route at `catalog` and opened the shared workspace panel titled `VNDB 個人清單`; no import was triggered.
- BLOCKED: localStorage assertions in `page.set_content` because opaque-origin storage raises SecurityError. This harness does not establish persistence.
- BLOCKED: native `file://` navigation due environment-level browser restrictions.
- NOT RUN: four-workspace lifecycle, custom-list CRUD/reload, actual external import/error recovery, cover retries, real audio playback, screenshot pixel comparison, keyboard acceptance, and multiplayer lifecycle.

## Remaining risks
- Larger workspace architecture remains incomplete. Current dock has only two `data-ws` buttons; four workspace destinations are not implemented/verified.
- Other legacy navigation calls remain elsewhere, particularly generic learning actions. They need targeted trace and tests.
- No accepted final HTML exists yet.

## GitHub artifact delivery
- HTML upload: NOT UPLOADED / NOT VERIFIED.
- This report is not proof of artifact upload.
