# Candidate 68 Test Report

## Artifact identity
- File: `amq_learning_tool_v82_85_30_workspace_proto26_song_select_68-auto-select-first-song.html`
- Size: 9,028,785 bytes
- Local SHA-256: `c43c5d67069db076321834415cfc3431fc7a06b16c80b94844750b2cad39b209`
- Parent Candidate 67 SHA-256: `e3f17f2e32c51c6093c41f6269cdb236231e9bfbcb3b1ce615f01b50073debc2`
- Immutable user-designated Candidate 52 remains unchanged: `c0cbe21ac3ef9f5b116d9e65ea5dad731d6c22d81dad365a4fb3da1797abef48`.

## Reference review and findings
Reviewed the official osu!stable interface guide: https://osu.ppy.sh/wiki/en/Client/Interface. Relevant reference elements include selected beatmap information at upper left, a catalog/carousel with search and sort controls, and mode/navigation controls.

Candidate 65 visual review identified an oversized catalog overlay (effective width 64% because of a later legacy CSS rule) and a functional regression: clicking a work populated its song list, but the upper-left metadata remained “尚未選取歌曲” until a second user click. Candidate 68 addresses both:
1. Appends a desktop-only last-in-cascade rule setting the catalog width to 40%, leaving mobile layout rules untouched.
2. Adds a MutationObserver to the existing song-list flow. After the legacy work-click handler rebuilds song rows, the first available row is selected automatically and the top-left song metadata is populated.
3. Preserves the contextual IndexedDB warning and existing mobile layout patches.

## Test results

### Static checks: 12/12 PASS
- File exists; exact local SHA-256 recorded.
- Scene-background fallback and contextual warning retained.
- Responsive header/mobile settings patches retained.
- Desktop catalog width rule present.
- Home routes and Song Select selectors retained.
- No duplicate IDs.
- 44 executable inline JavaScript blocks passed `node --check` with zero syntax errors.
- Inline CSS parsed with zero top-level errors.

### Browser interaction: 14/14 PASS
Executed with system Chromium via `page.set_content()` and a test-only in-memory `localStorage` shim.
- Application initializes; no global IndexedDB startup warning.
- Song Select route renders.
- Desktop catalog width is 40% (1440px => 576px).
- Clicking a different work updates the scene title and populates song rows.
- First song auto-selects after rows render; upper-left metadata updates to `Chameko no Ichinichi`, source `AMQ`.
- Explicit song selection continues to update metadata.
- Search filters the catalog (`The Black Cat` excludes `Chameko's Day` from visible results).
- All four workspace buttons preserve the Song Select route.
- At 390×844 there is no horizontal overflow; header stays within viewport; first catalog row ends at y=721.2 before the audio dock begins at y=722.
- Scene-background storage warning remains contextual.
- Console errors: 0. Page errors: 0.

### Viewport geometry
- 1440×900: stage y=34, h=790; catalog x=864, w=576; fixed docks fit viewport.
- 1280×720: stage y=34, h=610; catalog x=768, w=512; fixed docks fit viewport.
- 390×844: stage x=8, y=68, w=374, h=704; catalog grid ends at y=721, audio dock begins at y=722, workspace dock ends at y=836.
- Document scrollHeight is 1004 at 900px viewport and 824 at 720px viewport; mobile scrollHeight is 1084. Horizontal overflow is absent, but desktop document-level vertical overflow remains a known risk.

## Not tested / limitations
- Direct double-click/`file://` acceptance: BLOCKED by `ERR_BLOCKED_BY_ADMINISTRATOR`; tests used `page.set_content()`.
- Real IndexedDB persistence/custom background saving: NOT RUN.
- Real audio playback and long-session behavior: NOT RUN.
- Pixel-perfect human acceptance against an installed osu!stable client: NOT ACCEPTED. The official wiki is contextual reference, not a pixel-diff capture.
- GitHub HTML upload and remote SHA-256 verification: NOT COMPLETED. Available GitHub connector tools support text-content writes but no local-path/binary upload route for this ~9 MB artifact; direct container network access is unavailable. This report being present on GitHub does not mean the HTML is uploaded.

## Rollback
Candidate 67 SHA-256: `e3f17f2e32c51c6093c41f6269cdb236231e9bfbcb3b1ce615f01b50073debc2`. Candidate 52 remains the immutable baseline.

## Next task
Transfer exact Candidate 68 HTML bytes through a supported artifact route, verify remote hash, then run direct-file acceptance. Investigate remaining desktop document-level vertical overflow and test real audio/background persistence.
