# Candidate 185 — osu!stable Selection, Workspace Modal, and Dock Pass

- Date: 2026-10-24
- Status: Experimental checkpoint, **not accepted**.
- Recovery lineage: user-designated Candidate 178 -> Candidate 183 -> Candidate 184 -> Candidate 185.
- Candidate 184 source SHA-256: `f3032d62cc22a5fb6272b14671f356daad3bb1503447813083fe434b5576a870`.
- Output filename: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_185_stable_selection_modal_dock.html`
- Size: 9,294,470 bytes
- SHA-256: `2d0b9e6c5d69d6d5d0d799cbbc44c3787a6956da7e73111ba8facc6300d882a8`

## Changes

1. Fixed selected-work visual handling. The previous callback ignored its card/image arguments and cleared the visual; it now uses the image when available and displays the existing work-card gradient until the image loads.
2. Removed Singer from the visible primary Song Select mode buttons without deleting underlying data or APIs.
3. Added centered smooth scrolling for mouse-selected song rows, keyboard-driven selection, and programmatic song-selection events. The current carousel positions rows with top/transform animation, so the implementation preserves its transform and uses a separate translate offset.
4. Routed the visible VNDB import, custom-list management, and learning-plan rail buttons to the shared in-place Song Select workspace panel. Added a non-navigating VNDB list mount entry point.
5. Re-skinned the workspace panel and AniList/MAL dialog to a compact dark osu!-stable-inspired window; added close/Escape handling and stale-overlay cleanup.
6. Reduced the playback dock to a compact centered strip and re-applies it after legacy runtime scripts overwrite inline important styles.
7. Hid the redundant bottom workspace dock at desktop and mobile sizes; added the decorative lower-right circle and blue bottom rule over a black strip. The hidden navigation implementation is retained for rollback pending dependency cleanup.

## Tests

### PASS — JavaScript static syntax
- 67 script tags inspected.
- 65 executable inline JavaScript blocks checked using `node --check`.
- 2 empty/non-JavaScript payloads skipped.
- 0 syntax failures.

### PASS — Chromium shimmed browser checks
Using `page.set_content` (not native file origin):
- 1440×900 and 390×844: document dimensions matched viewport; playback dock fit inside viewport (440×46 and 220×46); redundant bottom workspace dock computed to `display:none`.
- Selecting a work card updated the selected-work title and produced a non-empty fallback visual background.
- Song-row selection centering: first selected row was within 2 px of viewport center; a middle selected row was centered within 0 px after animation.
- Actual visible rail action buttons: AniList/MAL opened the sync dialog; VNDB import, custom-list management, and learning plan opened the shared panel. Song Select route remained active throughout. Panel close returned to Song Select without leaving a visible panel.
- The tests were performed in an opaque-origin shim; they are not native file-origin acceptance.

### BLOCKED / NOT RUN
- Native `file://` acceptance: BLOCKED by Chromium `ERR_BLOCKED_BY_ADMINISTRATOR`.
- Persistent storage and full custom-list create/add/remove/filter/reload: NOT RUN. Opaque `page.set_content` origin denies localStorage, producing two known storage SecurityErrors.
- Real external cover-image download and failure/retry: NOT VERIFIED. Only the selected-work gradient fallback was verified.
- Live AniList/MAL/VNDB APIs and real audio: NOT RUN.
- Keyboard ArrowUp/ArrowDown end-to-end browser test: NOT RUN; the harness run timed out before returning results.
- Pixel-difference/SSIM against the osu!stable reference screenshot: NOT RUN.
- Full dependency/dead-code cleanup: NOT completed. The redundant bottom dock is hidden, but its code remains because removing it safely requires dependency verification.

## GitHub

- Branch: `amq-candidate104-songselect-layout-fix`.
- Validation report and handoff documents are committed and were re-fetched for verification.
- Candidate 185 HTML upload and remote SHA-256 verification: **NOT COMPLETED**. The available GitHub connector accepts text content but this runtime has no network access to transfer the mounted 9.29 MB local HTML file. No HTML upload is claimed.
- Candidate 185 remains experimental and must not be marked accepted until HTML bytes/hash are verified remotely and native-origin tests pass.

## Rollback

Use Candidate 184 with SHA-256 `f3032d62cc22a5fb6272b14671f356daad3bb1503447813083fe434b5576a870`. Candidate 178, 183, and 184 remain preserved and unchanged.

## Next

1. Verify the real cover-fetch pipeline and failure/retry behavior in a browser with network access.
2. Re-run keyboard navigation, CRUD/persistence, live APIs, and real audio in native-origin browser.
3. Measure against the 2555×1438 osu!stable reference with geometry and pixel/region comparison.
4. Complete dependency inventory before deleting legacy controls or handlers.
5. Upload Candidate 185 HTML and verify remote content and SHA-256; then decide acceptance.
