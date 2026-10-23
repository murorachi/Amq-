# Candidate 193 — Import Modal Route, Focus, Escape and State Restoration

Date: 2026-10-24

## Candidate identity
- Working source chain: Candidate 186 → Candidate 187 import actions → Candidate 190 legacy event-handler root fix → Candidate 192 modal focus-stack fix → Candidate 193 Escape/focus restoration.
- Candidate 193 file: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_193_modal_escape_focus_restore.html`
- Local SHA-256: `40592745dd85e41ba8af3bfa3ab56ae34b7f1d698652418b65dfd7d0a3246083`
- Status: experimental; not accepted.
- Candidate HTML GitHub upload and remote SHA verification: NOT COMPLETED.

## Root cause
The older document-level capture listener for `list-import-anime` ran before Candidate 187's later listener and called `__aniNavigateApp('watchlist')` before opening `syncModal`. This removed `amq-songselect-route-active`; the newer listener could not prevent a listener that had already run. Candidate 190 fixes the existing listener directly, opening the existing sync modal without navigating away. Candidate 192 marks the underlying workspace sidebar aria-hidden while the sync modal is active, so the modal focus trap wins over the still-open workspace panel. Candidate 193 makes Escape close the sync modal first, then collapse the dock and restore focus to the dock control.

## Tests

### PASS
- HTML tag pairs: 1/1 HTML, 71/71 script, 106/106 style.
- 69 executable inline JavaScript blocks individually checked with Node `--check`: 0 syntax errors.
- Chromium `page.set_content`, viewport 1648×928: Song Select route opens, 180 rows present, legacy rail computed display is `none`.
- AniList/MAL modal opens without leaving Song Select; `syncModal.open` is true; `aniListUsername` receives focus; 180 rows remain present behind the overlay.
- Escape closes the topmost sync modal first, preserves Song Select, collapses the dock, and returns focus to the first workspace dock control.
- Explicit close button closes the sync modal, preserves Song Select, collapses the dock, and returns focus to the dock control.
- Search/selection/scroll restoration: before modal open, search=`a`, selected song ID=`46495`, scrollTop=200; after close, all three values match.
- VNDB workspace overlay opens while the Song Select route remains active; Escape closes the third-stage panel first and leaves the parent workspace layer available, matching the existing layered-modal behavior.
- Custom-list workspace overlay opens while remaining on Song Select and closes with Escape.
- At 390×844, the import modal opens and closes with document dimensions exactly matching the viewport (390×844), with no document overflow.
- Responsive route geometry checks completed at 2555×1438, 1920×1080, 1648×928, 1440×900, 1280×720 and 900×700: 180 rows, legacy rail hidden, document dimensions matched the viewport. The compact 900×700 list geometry showed inconsistent snapshots across runtime timing; exact 7.5-row acceptance at that viewport is NOT claimed.
- AMQ and EMQ source filters rechecked at 1648×928: AMQ source count 38,821; EMQ source count 16,839.

### BLOCKED / NOT RUN
- Two page errors remain in `page.set_content`: existing localStorage access-denied errors on the opaque origin. No other page errors were observed in the modal acceptance script. This mode cannot verify durable storage.
- Native `file://` and local HTTP navigation remain blocked by `ERR_BLOCKED_BY_ADMINISTRATOR`.
- MIX source-count assertion was not completed in the latest rerun because the browser process timed out during the MIX switch. Earlier Candidate 185 recorded MIX as both sources; Candidate 193 MIX is not independently re-certified.
- Custom-list create/add/remove/filter/reload persistence, live APIs/covers and recovery, real audio playback, full workspace regression, and registered pixel-diff remain NOT RUN.
- Candidate HTML upload/remote SHA verification NOT COMPLETED.

## Visual / functional interpretation
The main P0 event-order bug is corrected: AniList/MAL opens over Song Select without navigating to the watchlist route. Focus order is also corrected so the workspace-panel focus trap does not steal focus from the import modal. The modal backdrop is intentionally darkened like the existing import dialog. This is not a full osu!stable pixel-match and does not fabricate ranking or cover data.

## Rollback
- Candidate 193 parent Candidate 192 SHA-256: `ab6787c6cd298ae7c5f224a26714a0ad141ec4d344ff9cd4e5296511f211297f`.
- Candidate 186 SHA-256: `c07d82988c898b228cc891783ed4b351c4bdc2c87952583f6c68f15e209e66db`.
- Candidate 185 SHA-256: `3d9e174580557d89860d40804e89f42ba99c14e291f69079f406af15aa30ea19`.
- Candidate 179 SHA-256: `05d8c65734759441c3cb61387f138ede4cb99323794105dca9aa5fe3f354ba96`.
- Candidate 170 SHA-256: `089d8cb9f6e63178a9726dbfce9485c8691e81d3600ce5669458a26c7a9d5662`.
- Candidate 169 rollback checkpoint SHA-256: `5913ad864a8841b144de7c72c4deeede765ec5675117667c13f9eb5fe89a7d66f`.

## Next
1. Inspect and correct compact 900×700 catalog runtime geometry so the 7.5-row affordance is deterministic across runtime timing.
2. Re-run MIX mode assertion and the full six/seven viewport geometry suite without timing out.
3. Test all workspace close paths and state restoration on a native-origin browser when available.
4. Implement or verify the actual left-side record overlay only if suitable existing data exists; never invent osu! leaderboard scores.
5. Continue scene-background/catalog visual fidelity, then finish native-origin persistence, API, audio and full CRUD regression.
6. Upload the candidate HTML and verify remote SHA-256; report files alone do not constitute HTML delivery.
