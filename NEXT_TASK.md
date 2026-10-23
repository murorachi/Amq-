# NEXT TASK — Modal Workspace and Native-Origin Acceptance

1. Current local experimental candidate: Candidate 178, SHA-256 `b91109c7c660be064cedf76b20e473b12ca415be8e0650f16d8086339c2a9f80`. Not accepted; HTML not remotely uploaded.
2. Candidate 178 passes static JS syntax checks (64 blocks, zero errors) and Chromium set_content checks at 2555×1438, 1920×1080, 1648×928, 1440×900, 1280×720 and 900×700 with a test-only in-document storage shim. No horizontal overflow, 180 rows, rail hidden, dock/catalog in viewport, ArrowDown selection and hover-vs-selected offsets pass.
3. Test-only storage shim suppresses opaque-origin localStorage errors but does NOT prove durable persistence. Native file:// navigation remains blocked with ERR_BLOCKED_BY_ADMINISTRATOR.
4. Preserve the 7.5-row affordance and current selected row placement. Do not overwrite Candidate 175, 173, 170, or Candidate 169 rollback checkpoints.
5. Next implementation: add an in-scene workspace launcher/modal, since the legacy rail is hidden. Dim the Song Select scene behind it, keep modal focus/close/Escape behavior, and restore selected song, scroll position and filter on close.
6. Connect existing AniList/MAL, VNDB, custom-list, learning-plan and statistics functionality without duplicating or deleting their underlying handlers. Existing import modal behavior should remain functional.
7. Before implementation, inspect each current action and its side effects. For list/learning/statistics, ensure the workspace opens as a modal panel rather than navigating away; avoid creating a parallel replacement data store.
8. Verify background click/escape/close, focus return, keyboard navigation and state restoration in browser tests.
9. Then verify scene-background persistence, real covers/APIs and failure recovery, real audio, custom-list CRUD/reload, imports/dedup/error handling, and full workspace routing regression in a supported native-origin environment.
10. Pixel-diff is NOT a pass until reference and candidate scene state/artwork are aligned. Candidate HTML upload/remote SHA verification remains NOT COMPLETED.