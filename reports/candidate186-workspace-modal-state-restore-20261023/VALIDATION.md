# Candidate 186 — Workspace Modal State Restoration

Date: 2026-10-23

## Candidate identity
- Local HTML: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_186_workspace_modal_state_restore.html`
- SHA-256: `c07d82988c898b228cc891783ed4b351c4bdc2c87952583f6c68f15e209e66db`
- Size: 9,289,249 bytes.
- Parent Candidate 185 SHA-256: `3d9e174580557d89860d40804e89f42ba99c14e291f69079f406af15aa30ea19`
- Status: experimental; not accepted. HTML upload/remote SHA verification NOT COMPLETED.

## Implemented in the Candidate 181→186 chain
- Candidate 181: compact viewport document scroll fix.
- Candidate 182/183: centered workspace modal, dimmed and blurred background, close button, Escape close, focus trap and corrected inline geometry.
- Candidate 184/185: workspace triggers moved beside the main back control; the audio dock's empty full-width surface no longer intercepts pointer events, while actual audio controls retain pointer interaction.
- Candidate 186: snapshot and restore selected song ID, song-list scroll position, search, decade, type, sort, familiarity and tag filters when the workspace modal closes.

## Test evidence

### PASS
- Candidate 185 base regression: 65 executable inline JS blocks passed Node `--check`, zero syntax errors; balanced HTML/style tags.
- Candidate 185 Chromium `page.set_content` checks at 2555×1438, 1920×1080, 1648×928, 1440×900, 1280×720 and 900×700. Document dimensions match viewport, legacy rail hidden, 180 initial song rows, keyboard ArrowDown selection, AMQ/EMQ/MIX full dataset counts, hover -3px versus selected -7px, and 7.5-row affordance.
- Candidate 185 workspace dock buttons are visible at x=126..214 and x=218..306 at 1648×928; click opens the centered modal after the audio dock pointer-interception fix.
- Candidate 186 added state-restore runtime independently passed Node `--check`; HTML, style and script tag pairs are balanced (1/1 HTML, 106/106 style, 70/70 script).
- Candidate 186 modal regression: clicking 清單管理 opens the centered workspace dialog; Escape closes it without leaving Song Select. Learning Center action opens the existing third-stage panel centered above the dimmed scene; Escape closes the third-stage panel, and a second Escape closes the workspace dialog.
- Candidate 186 state test: search `Boku no Haru`, selected song ID `46495`, and one-row filtered result were unchanged after opening/closing the modal.
- Candidate 186 compact viewport test at 900×700 and 390×844: document dimensions matched viewport; modal centered within viewport; scrollTop 250 was restored to 250 after close at both sizes.
- Existing two localStorage SecurityErrors are from the opaque-origin test method, not new uncaught application errors.

### BLOCKED / NOT RUN
- Native `file://` and attempted intercepted virtual-origin navigation both return `ERR_BLOCKED_BY_ADMINISTRATOR`; durable storage and reload acceptance remain blocked.
- Full native-origin custom-list CRUD/reload persistence, live APIs/covers, audio playback and full workspace regression are NOT RUN.
- Reference-registered pixel-difference score is NOT RUN; candidate scene uses the no-custom-background fallback while the reference screenshot has a game background and real leaderboard data.
- Candidate HTML has not been uploaded to GitHub. Only the report/status documents can be committed through the current available connector path.

## Visual/behavior assessment
The requested interaction is now prototyped: the Song Select screen dims and blurs behind a centered workspace dialog; workspace functions open a second centered panel; Escape closes the top layer first; selected song/search/filter/scroll state is restored on close. The workspace dock buttons are positioned separately from the main back button and are no longer hidden beneath the audio dock.

This is not a final release. Some import actions retain their older navigation behavior, and the native-origin data/persistence acceptance is still outstanding.

## Rollback
- Candidate 185: `3d9e174580557d89860d40804e89f42ba99c14e291f69079f406af15aa30ea19`
- Candidate 181: `3671ec7fb9a276742bc227f7028c1df4f7afb730f27dc099138392640b82ee3a`
- Candidate 179: `05d8c65734759441c3cb61387f138ede4cb99323794105dca9aa5fe3f354ba96`
- Candidate 170: `089d8cb9f6e63178a9726dbfce9485c8691e81d3600ce5669458a26c7a9d5662`
- Candidate 169 rollback checkpoint: `5913ad864a8841b144de7c72c4deeede765ec5675117667c13f9eb5fe89a7d66f`

## Next
1. Correct import actions that currently navigate away from Song Select so the existing AniList/MAL import modal can be opened directly above Song Select when appropriate; inspect VNDB/custom-list paths separately to avoid breaking their data workflows.
2. Complete native-origin persistence, CRUD, API, cover and audio tests in a supported browser environment.
3. Upload Candidate 186 HTML and verify remote identity; the report upload is not the HTML delivery.
