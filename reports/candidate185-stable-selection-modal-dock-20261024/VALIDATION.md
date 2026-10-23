# Candidate 185 — osu!stable Selection, Workspace Modal, and Dock Pass

- Date: 2026-10-24
- Status: Experimental checkpoint, **not accepted**.
- Recovery lineage: user-designated Candidate 178 -> Candidate 183 -> Candidate 184 -> Candidate 185.
- Candidate 184 source SHA-256: `f3032d62cc22a5fb6272b14671f356daad3bb1503447813083fe434b5576a870`.
- Output filename: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_185_stable_selection_modal_dock.html`
- Size: 9,292,914 bytes
- SHA-256: `f255cb00232298d12d63179dd35d807255a7ce72440311dfc4dbfbce4b5fab86`

## Changes

1. Corrected the selected-work cover callback, which previously ignored its card/image arguments and cleared the selected-work visual. It now uses the actual image when available and falls back to the existing work-card cover gradient until the image loads.
2. Removed Singer from the visible primary Song Select mode buttons without deleting underlying data or APIs.
3. Changed mouse-selected song rows and keyboard ArrowUp/ArrowDown selection to scroll the selected row toward the vertical center using smooth scrolling.
4. Routed VNDB import and custom-list management actions into the existing in-place workspace panel instead of navigating away from Song Select.
5. Re-skinned the workspace panel and AniList/MAL dialog to a compact dark osu!-stable-inspired window. Added stale-overlay cleanup/close handling.
6. Reduced the playback dock to a compact centered control strip; it is re-applied after legacy runtime scripts overwrite inline important styles.
7. Hid the redundant bottom workspace dock and added a decorative lower-right circle plus a blue bottom rule over a black strip. Underlying old navigation code remains for rollback.

## Tests

### PASS — JavaScript static syntax
- 67 script tags inspected.
- 65 executable inline JavaScript blocks checked using `node --check`.
- 2 empty/non-JavaScript payloads skipped.
- 0 syntax failures.

### PASS — Chromium shimmed browser checks
Tested at 1440×900 and 390×844 using `page.set_content` (not native file origin):
- Song Select route activated.
- Document width and height matched viewport.
- Playback dock fit inside viewport: 440×46 at 1440×900; 220×46 at 390×844.
- Redundant workspace dock computed to `display:none` at both sizes.
- Clicking a work card updated selected-work title and set a non-empty fallback visual background.
- Workspace panel opened and closed while the Song Select route remained active.

### BLOCKED / NOT RUN
- Native `file://` acceptance: BLOCKED by Chromium `ERR_BLOCKED_BY_ADMINISTRATOR`.
- Persistent storage, full custom-list create/add/remove/filter/reload: NOT RUN; opaque `page.set_content` origin denies localStorage, producing two known storage SecurityErrors.
- Actual external cover image download and fallback/retry: NOT VERIFIED in this environment. The selected-work gradient fallback was verified, not a successful real cover fetch.
- AniList/MAL/VNDB live APIs, real audio, and real browser focus/keyboard acceptance: NOT RUN.
- Pixel-difference/SSIM against the osu!stable reference screenshot: NOT RUN.
- Full dependency/dead-code cleanup: NOT completed. Only the visibly redundant bottom workspace dock was hidden; its implementation is retained because deleting it safely requires a broader dependency inventory.

## GitHub

- Branch: `amq-candidate104-songselect-layout-fix`.
- Candidate 185 HTML remote upload and remote SHA-256 verification: **NOT COMPLETED**. The report and handoff docs do not constitute HTML delivery.
- Do not mark Candidate 185 accepted until the HTML is uploaded and its remote bytes/hash are verified, then complete real-browser and data persistence acceptance.

## Rollback

Use Candidate 184 with SHA-256 `f3032d62cc22a5fb6272b14671f356daad3bb1503447813083fe434b5576a870`. Candidate 178, 183, and 184 must remain unchanged.

## Next

1. Verify the real cover-fetch pipeline and repair its actual failure path if reproducible.
2. Test the four requested workspace actions through their actual visible buttons, including close/Escape/back and overlay stacking.
3. Verify selected-song centering for real mouse and keyboard input with a loaded song list.
4. Complete dependency inventory before deleting hidden legacy controls.
5. Upload Candidate 185 HTML and verify remote content/hash; then run native-origin CRUD/persistence and reference-image comparisons.
