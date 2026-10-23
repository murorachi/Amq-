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
4. Kept the earlier AniList/MAL modal and VNDB shared-panel fixes.

## Tests
- PASS: 66 executable inline script blocks passed `node --check`.
- EXCLUDED: one JSON data block and one compressed/base64 data block. The compressed-data toggle block was excluded from this JS syntax pass because its source references the non-JS payload.
- PASS: structural assertions: four workspace buttons; four definitions exist; no separate quick quiz button; no batch-organizer button in the dock; legacy custom-list/VN-list aliases call the shared panel.
- PASS: Playwright set_content harness dispatched 12 workspace switches (lists -> learning -> quiz -> multiplayer, repeated 3 times); final DOM retained 4 workspace buttons, one sidebar, one content panel and one action list.
- PASS: six legacy destinations (watchlist, practice, explore, learningPlan, dashboard, vnList) emitted `amq-workspace-route-intercepted` events and displayed their mapped shared-panel titles.
- PASS: shared-panel Back closes panel; Escape closes panel.
- BLOCKED: harness reports two localStorage SecurityErrors because `page.set_content` has an opaque origin.
- BLOCKED: native `file://` navigation is blocked by environment. The set_content harness's active-view state defaults to home, so route class persistence after a delay cannot be asserted there. The interception event and panel mapping were asserted, but native route-state acceptance remains outstanding.
- NOT RUN: original 26-test suite, custom-list CRUD/reload, actual external imports/error handling, cover retry, actual audio playback, keyboard acceptance, fixed-resolution screenshot pixel comparison, multiplayer lifecycle and full data regression.

## Remaining risks
- Route interception is tested through the shared global navigator, but browser-native route state still needs acceptance.
- The workspace content panel's original DOM restoration/focus behavior needs real-browser lifecycle assertions.
- Candidate 193 is experimental, not accepted.
- GitHub HTML upload: NOT UPLOADED / NOT VERIFIED.
