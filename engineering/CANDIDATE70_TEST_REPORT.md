# Candidate 70 Test Report

Artifact: `amq_learning_tool_v82_85_30_workspace_proto27_song_select_70-toolbar-inline-catalog.html`

SHA-256: `78f2ed58756ff64e1f22f583cc5a9396a549d4eb373a83bbdb50d185ba6f81a0`

Parent: Candidate 69, SHA-256 `84440ee44f5451df94853a4e66d7c02f00b5d39a330fb8752f66c384015131de`.

## Static checks: 11/11 PASS
- Artifact exists and is non-empty.
- Candidate 69 baseline content retained and Candidate 70 patch present.
- AMQ/EMQ inline expansion path exists; legacy EMQ detail-drawer click path removed from work cards.
- Compact numbered dock, Back control, no start-practice dock action, empty ranking placeholder, hidden Song Select audio dock, direct background control, and three scene scopes present.
- No duplicate HTML IDs.
- 45 inline JavaScript blocks pass `node --check`.
- CSS parses with no top-level parser errors.

## Browser interaction checks: 20/20 PASS
Executed Chromium `page.set_content()` with a test-only in-memory localStorage shim. Verified initialization, Song Select route, initial upper-left song metadata, Back button, removal of start-practice dock control, audio dock hidden, empty ranking frame, header settings/search hidden, numbered toolbox expansion, compact dock geometry, Escape behavior, populated catalog, inline song expansion below the work card without opening the legacy detail drawer, top-left song metadata update, inline row selection, Escape returning Home, direct background control, zero page errors, and zero console errors.

## Viewport checks: 8/8 PASS
- 1280×720: no horizontal overflow; dock remains inside viewport; all four numbered controls select the corresponding workspace; background dialog opens and offers only Home, Multiplayer, and Song Select.
- 390×844: no horizontal overflow; dock remains inside viewport; all four numbered controls select the corresponding workspace.

## Not run / blocked
- Real `file://` double-click launch: BLOCKED by environment browser policy (`ERR_BLOCKED_BY_ADMINISTRATOR`).
- Real-origin IndexedDB background save/reload: NOT VERIFIED because both file and localhost browser navigation are blocked by environment policy. The dialog reports this limitation correctly.
- Actual audio playback: NOT RUN.
- Human pixel-level acceptance against a real osu!stable client screenshot: NOT ACCEPTED. Current screenshot still shows custom rectangular work cards and a different central preview composition.
- GitHub HTML upload and remote SHA-256 verification: NOT COMPLETED; the available GitHub connector exposes UTF-8 text writes but no local-byte/binary upload route for this 9 MB artifact.

Automated interaction checks use `page.set_content()` and a test-only storage shim, so they are not evidence of real-origin persistence or actual audio playback.
