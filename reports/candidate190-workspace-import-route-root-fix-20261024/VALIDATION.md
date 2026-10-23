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
1. The later capture-phase handler for `list-import-anime` previously called `__aniNavigateApp('watchlist')`, overriding the earlier in-place modal fix. Candidate 190 removes that route call and opens the existing AniList/MAL modal directly.
2. The VNDB workspace action now opens `vn-list` through `__amqWorkspaceContentOpen`, instead of calling the route-changing `__aniVnLibraryV8249.openList()`.
3. The VNDB provider helper uses the shared content panel rather than navigating to legacy `watchlist`.
4. Corrected the dock navigation aria-label so it no longer claims there are only two workspaces.

## Tests
- PASS: 65 executable inline script blocks passed `node --check`.
- EXCLUDED: 1 JSON data block (`aniAnilistIdMapV8237`).
- NOT APPLICABLE AS JS: 1 compressed base64 data block (`emqLibraryGzipBase64V8248`); parsing it as JavaScript predictably fails.
- PASS: static assertion confirms the AniList/MAL capture-phase handler opens the existing modal without a `watchlist` route call.
- PASS: static assertion confirms VNDB action invokes the shared content panel.
- NOT RUN: real browser interaction assertions for AniList/MAL and VNDB because native `file://` navigation is blocked by the environment.
- BLOCKED: localStorage tests under `page.set_content` because opaque-origin storage raises SecurityError.
- NOT RUN: four-workspace lifecycle, custom-list CRUD/reload, real external imports/error recovery, cover retries, actual audio playback, screenshot pixel comparison, keyboard acceptance, and multiplayer lifecycle.

## Remaining risks
- The larger workspace architecture remains incomplete. Current dock has only two `data-ws` buttons; four workspace destinations are not implemented/verified.
- Other legacy navigation calls remain elsewhere in the application, especially generic learning actions. They need targeted trace and tests.
- No accepted final HTML exists yet.

## GitHub artifact delivery
- HTML upload: NOT UPLOADED / NOT VERIFIED.
- This report is not proof of artifact upload.
