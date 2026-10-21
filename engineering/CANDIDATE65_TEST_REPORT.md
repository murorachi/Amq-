# Candidate 65 Test Report: Song Select Mobile Layout

## Identity
- Artifact: `amq_learning_tool_v82_85_30_workspace_proto26_song_select_65-mobile-layout-verified.html`
- Local SHA-256: `df9e1f3a53d2fabc97c7aad0341465202a24e2589ae663a89ad15d9fc8ec973d`
- Size: 9,027,302 bytes
- Parent local candidate: Candidate 61, SHA-256 `0d76a3411705496d7077421aba89bad58192f453349b1ea2cfbae00262c4a142`
- Candidate 52 immutable user-designated baseline remains unchanged: `c0cbe21ac3ef9f5b116d9e65ea5dad731d6c22d81dad365a4fb3da1797abef48`.

## Reference review
Reviewed the official osu!stable interface guide: https://osu.ppy.sh/wiki/en/Client/Interface. The Song Select page describes beatmap information, a searchable/sortable/groupable catalog, mode controls, and main-menu navigation. Candidate 65 is not claimed to be pixel-perfect or visually accepted.

## Findings and changes
Browser inspection at 390×844 found the mobile header controls absolutely positioned and compressed into vertical text, and the catalog grid extended beneath the fixed audio/workspace docks. Candidate 65:
1. Preserves Candidate 59's scene-background storage fallback. The IndexedDB limitation is reported inside the scene-background dialog rather than as a global startup toast.
2. Reflows the mobile header; Settings and Back Home remain visible while other settings controls stay collapsed until Settings opens.
3. Reduces the mobile scene and catalog grid height so the first catalog card remains visible above the fixed audio dock at 390×844.
4. Leaves desktop Song Select layout rules unchanged in this patch.

## Test results

### Static: 12/12 PASS
- Candidate file exists, size and SHA-256 recorded.
- Scene-storage fallback, mobile header fixes and responsive catalog dimensions retained.
- No global startup IndexedDB warning string; contextual warning remains in the dialog.
- Home routes and Song Select selectors retained.
- No duplicate IDs.
- 44 executable inline JavaScript blocks passed `node --check`; JSON/gzip data blocks were excluded.
- Inline CSS parsed without top-level errors.

### Browser route/responsive: 11/11 PASS
Run with system Chromium using `page.set_content()` and a test-only in-memory localStorage shim because navigation to `file://` and localhost is blocked by the execution environment.
- Application initialization and no global IndexedDB startup warning.
- Six home actions render.
- Play submenu opens.
- Single Player routes to quiz workspace.
- Dedicated Song Select action exists and opens the catalog.
- No horizontal overflow at 390×844.
- Mobile header fits viewport and settings controls collapse by default.
- Catalog grid ends above the fixed audio dock in the initial 390×844 viewport.
- Settings controls expand on demand.

### Additional browser: 6/6 PASS
- Desktop Song Select route visible.
- Selecting a different work updates the scene title (`The Hare and The Tortoise` → `Chameko's Day`).
- Scene-background dialog opens.
- IndexedDB restriction is contextual to the dialog; no global startup toast.
- 1280×720 Song Select stage fits viewport bounds.
- No console or page errors observed.

## Not tested / limitations
- Direct double-click/`file://` launch: BLOCKED by `ERR_BLOCKED_BY_ADMINISTRATOR`; browser testing used `page.set_content()`.
- Real IndexedDB persistence and custom background saving: NOT RUN in the restricted `about:blank` context.
- Real audio/video playback, long-session behavior, and human pixel-level comparison against osu!stable: NOT RUN.
- Catalog song-row selection was not validated; selecting a different work was validated.
- Overall visual acceptance remains NOT ACCEPTED.

## GitHub
This handoff branch contains engineering records and test reports, not the generated HTML. HTML upload and remote SHA-256 verification remain NOT COMPLETED because the available connector does not expose a local-path/binary upload route for this 9 MB artifact, and direct container network access is unavailable. The local hash is not evidence of remote delivery.

## Rollback
Rollback Candidate 65's final mobile catalog-height adjustments to Candidate 61, SHA-256 `0d76a3411705496d7077421aba89bad58192f453349b1ea2cfbae00262c4a142`. Candidate 52 remains the immutable baseline.

## Next task
Transfer the exact Candidate 65 HTML bytes through a supported route, verify the remote hash, and run direct-file/manual acceptance in an environment that permits local HTML navigation.