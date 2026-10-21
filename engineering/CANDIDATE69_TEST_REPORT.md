# Candidate 69 Test Report

## Artifact identity
- File: `amq_learning_tool_v82_85_30_workspace_proto26_song_select_69-desktop-overflow-fix.html`
- Size: 9,029,397 bytes
- SHA-256: `84440ee44f5451df94853a4e66d7c02f00b5d39a330fb8752f66c384015131de`
- Parent Candidate 68 SHA-256: `c43c5d67069db076321834415cfc3431fc7a06b16c80b94844750b2cad39b209`
- Immutable Candidate 52 SHA-256 remains `c0cbe21ac3ef9f5b116d9e65ea5dad731d6c22d81dad365a4fb3da1797abef48`.

## osu!stable reference review and observed gap
Reviewed the official stable client guide: https://osu.ppy.sh/wiki/en/Client/Interface. It documents the upper-left beatmap metadata, a navigable beatmap carousel with distinct selection states, group/sort/search, and bottom-left gameplay toolbox. Candidate 69 retains the project’s current three-zone scene/catalog structure and bottom docks, but its screenshot is not a pixel-faithful osu!stable reproduction. On first entry, the upper-left pane still says `尚未選取歌曲` while a work is merely previewed, unlike stable’s default selected beatmap. The catalog cards and central work preview also differ materially from the stable carousel. These are visual/behavioral gaps, not hidden PASSes; installed-client pixel comparison remains pending.

## Changes in Candidate 69
The previous desktop page had scrollHeight 1004 at a 900px viewport and 824 at 720px. Root cause was inherited workspace active bottom padding (82px) plus a wrapper minimum height of 100vh while the wrapper already had a 22px top margin. Candidate 69 scopes the fix to desktop Song Select: body bottom padding 0 and wrapper min-height `calc(100vh - 22px)`. Mobile spacing rules remain unchanged.

## Test results
- Static checks: 13/13 PASS. Covers artifact identity, scene fallback/contextual warning, responsive patches, catalog width rule, Candidate 69 overflow fix, routes/selectors, duplicate IDs, JavaScript syntax (44 executable inline blocks), and CSS parsing.
- Browser interaction checks: 15/15 PASS; 0 console errors; 0 page errors. Includes route visibility, desktop catalog geometry, work selection, auto-select first song after opening a work, metadata, explicit song selection, search, four workspace controls, mobile no-horizontal-overflow and dock clearance, and contextual storage warning.
- Viewport checks: 3/3 PASS. At 1440×900 document scrollHeight is 900; at 1280×720 it is 720; at 390×844 no horizontal overflow and both docks remain in viewport. Desktop stage geometry unchanged (1440×900 stage y=34/h=790; 1280×720 stage y=34/h=610).
- Additional real-origin smoke test: BLOCKED. Chromium navigation to local HTTP origin `http://127.0.0.1:8765/` also returned `ERR_BLOCKED_BY_ADMINISTRATOR`; therefore the IndexedDB write/read and scene background save workflow could not be exercised in a normal origin in this environment.

## Not run / blocked
- Direct `file://` / double-click acceptance: BLOCKED by environment `ERR_BLOCKED_BY_ADMINISTRATOR`; browser interaction tests used `page.set_content()`.
- Real IndexedDB custom-background persistence: NOT RUN in a usable application origin.
- Real audio playback: NOT RUN. The test confirms an audio element exists and codec capability may be queried, but that is not proof of audible playback.
- Human pixel-perfect acceptance against an installed osu!stable client: NOT ACCEPTED; no installed-client reference capture was available, and the current screenshot shows material visual differences.
- GitHub HTML upload and remote SHA-256 verification: NOT COMPLETED. The available connector exposes text-content GitHub writes but no local-path/binary upload action for the ~9 MB HTML. The local file SHA is known; remote identity is not verified.

## Rollback
Rollback to Candidate 68, SHA-256 `c43c5d67069db076321834415cfc3431fc7a06b16c80b94844750b2cad39b209`. Candidate 52 remains immutable.
