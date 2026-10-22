# Candidate 80 Test Report

Date: 2026-10-22

## Artifact identity

- File: `amq_learning_tool_v82_85_30_workspace_proto28_song_select_80-frame-controls-stability.html`
- Size: 9,113,277 bytes
- SHA-256: `a5bed040a84c8314ac79ebd91357e579b967ff4fced7bd7b285b06dc0f97df1e`
- Immutable rollback checkpoint: Candidate 76, SHA-256 `2586036ce96d4c3fc0be6df2fb482a280936465e0ec51f45ed97c7a7475e136d`

## Change scope

- Moved the existing four workspace controls into the left-middle frame instead of leaving them in a separate bottom-left dock.
- Preserved the existing `#amqWorkspaceSidebar` as the popup. On desktop it opens 8px to the right of the frame, with the same height and 88%-opaque black background.
- Added a visible frame label and changed the frame from decorative/aria-hidden to an accessible group.
- Added a single capture-phase workspace control path for mode switching and close-on-second-click, and a style-ownership observer to correct later legacy inline dock styles that previously narrowed/repositioned the dock.
- Left existing action renderers and data logic in place. This stage does not claim every action in the popup is migrated or functional.

## Static tests

- Executable inline JavaScript: 52/52 pass via `node --check`.
- Non-executable embedded data payloads excluded from JS parsing: 2 (`application/json`, `application/octet-stream`).
- CSS blocks parsed by `tinycss2`: 77/77 pass.
- IDs scanned: 247; duplicate IDs: 0.

## Browser interaction tests

Chromium + Playwright using `page.set_content`:

- PASS: Dock is inside left-middle frame. Frame = 12,225,317,597; dock = 13,226,315,595.
- PASS: Popup opens 8px to right of frame. Frame right = 329; popup left = 337.
- PASS: Popup height matches frame. Both 597px.
- PASS: Popup does not overlap desktop catalog. Popup right = 757; catalog left = 864.
- PASS: All four workspace modes switch title and pressed state; exactly one workspace is active at a time.
- PASS: Clicking active workspace again closes popup.
- PASS: Escape closes popup and preserves Song Select route.
- PASS: Dock bounding box remains stable through repeated desktop mode switches at 1440x900.
- PASS: Resizing to 1280x720 keeps dock inside frame.
- PASS: At 390x844 the popup remains within viewport bounds.

Result: 10/10 assertions passed, 0 failed.

## Limitations / not run

- `file://` navigation is blocked by the test environment, so the test loaded the HTML through `page.set_content`. This opaque origin triggers two `localStorage` access errors. Normal-origin storage persistence is not verified.
- Audio playback and remote cover loading were not verified.
- Every action inside the popup was not exhaustively tested. Functional migration and removal of legacy interfaces remain separate work.
- At 390x844, side-by-side placement is not possible; the popup is viewport-constrained and overlays the frame while open. It closes via the close button or Escape.
- Visual review is based on generated Chromium screenshots, not a pixel-diff against a running osu!stable client.

## Rollback

Use the immutable Candidate 76 file and SHA-256 listed above. Candidate 80 is a new file and does not overwrite Candidate 76.
