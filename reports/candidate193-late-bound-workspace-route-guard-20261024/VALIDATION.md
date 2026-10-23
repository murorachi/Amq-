# Candidate 193 Validation Report — Late-bound Workspace Route Guard

Date: 2026-10-24
Branch: amq-candidate104-songselect-layout-fix
Status: EXPERIMENTAL / NOT ACCEPTED

## Artifact
- File: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_193_late_bound_route_guard.html`
- Parent: Candidate 192 (derived from Candidate 191 and Candidate 190)
- Size: 9,307,474 bytes
- SHA-256: `3896685f3abd97c16e730b29b9b398650d28b8a67cdb394e4b1e5337b51febdc`

## Changes
1. Added four actual workspace destinations backed by existing application UI: 清單管理, 學習中心, 猜歌練習, 多人模式.
2. Removed the redundant standalone quick-start button and did not restore a batch-organization workspace.
3. Added a final, late-bound wrapper around `window.__aniNavigateApp`. While `amq-songselect-route-active` is present, legacy destinations `watchlist`, `practice`, `explore`, `learningPlan`, `dashboard`, and `vnList` open corresponding existing panels through `__amqWorkspaceContentOpen`. Outside Song Select, the original navigator is preserved.
4. Kept earlier AniList/MAL modal and VNDB shared-panel fixes.

## Tests
- PASS: 66 executable inline script blocks passed `node --check`.
- EXCLUDED: one JSON data block and one compressed/base64 data block. The compressed-data toggle block was excluded from this JS syntax pass because its source references the non-JS payload.
- PASS: structural assertions for four workspace buttons and definitions, no separate quick quiz button, no batch-organizer button in dock, and shared-panel routing for custom-list/VN-list aliases.
- PASS: 12 workspace switches (lists -> learning -> quiz -> multiplayer, repeated 3 times); final DOM retained four workspace buttons, one sidebar, one shared content panel and one action list.
- PASS: 18 route-intercepted open/close cycles across six legacy destinations; each emitted the interception event, showed the mapped panel title, and closed without accumulating panels. Shared content was empty after close.
- PASS: existing watchlist, learning plan, dashboard, quiz and multiplayer DOM nodes were moved into the shared panel and restored to their original parent after close. VNDB parent restoration also passed; the initial in-panel assertion used the wrong key casing and is not counted.
- PASS: Back and Escape close the shared panel.
- PASS: custom practice list creation and deletion via existing UI using an in-memory localStorage shim.
- BLOCKED: reload persistence. The shim is in-memory and native `file://` navigation is blocked by the environment; this does not establish persistence.
- BLOCKED: browser harness cannot establish stable native route state because its active-view source defaults to home, although it does verify the route-interception event and panel mapping.
- NOT RUN: list member add/remove, reload persistence, real AniList/MAL/VNDB imports and failure/retry paths, cover retry, actual audio playback, keyboard acceptance, fixed-resolution screenshot pixel comparison, original 26-test suite, and full multiplayer lifecycle regression.

## Remaining risks
- Need real-browser verification that route state remains Song Select during intercepted legacy navigation.
- Need real persistence tests and actual external API/audio/image tests.
- Candidate 193 is experimental, not accepted.
- GitHub HTML upload: NOT UPLOADED / NOT VERIFIED.
