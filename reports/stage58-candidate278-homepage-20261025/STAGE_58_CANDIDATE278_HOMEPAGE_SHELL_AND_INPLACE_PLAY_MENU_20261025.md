# Stage58 — Candidate278 Homepage Shell and In-place Play Menu

Date: 2026-10-25
Status: static checks passed; browser interaction acceptance remains blocked.

## Baseline and output identity
- Immutable parent baseline: `amq_learning_tool_v82_85_91_candidate277_custom_list_name_normalization_20261025.html`
- Parent SHA-256: `b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371` (9,373,238 bytes)
- Child artifact: `amq_learning_tool_v82_85_92_candidate278_homepage_shell_inplace_play_menu_20261025.html`
- Child version: `v82.85.92-candidate278-homepage-shell-inplace-play-menu-20261025`
- Child bytes: 9360487
- Child SHA-256: `28b5056e801a3ff63e9483149444a657186fef19a55f62ef4830db000160fe6a`
- Candidate277 was not modified. Candidate278 is a child candidate, not a browser-accepted release.

## Implemented
1. Removed six legacy buttons from initial `#homeMenu` markup, leaving an empty shell for `setupHome()` to populate.
2. Removed the profile card from generated homepage markup while preserving profile storage keys and profile logic.
3. Moved the audio dock slot to a fixed bottom rail; added a black top frame with blue bottom edge and black bottom rail with blue top edge.
4. Removed the old conflicting homepage geometry block and inline runtime script that repeatedly forced ICON dimensions; replaced them with one `candidate278-home-layout-authority` CSS block.
5. Constrained the homepage to a single viewport and centered the ICON in the available stage.
6. Removed the floating `amqStablePlayShade` modal and its CSS/observer dependencies. Clicking Start Game replaces the first two menu entries in-place with Single Player (SOLO) and Multiplayer (MULTI); Settings remains. SOLO routes to `quiz`; MULTI routes to `multiplayer`. The old Back control is removed.
7. Added a short, low-volume synthesized UI click sound using Web Audio. No copyrighted audio file was copied.
8. The ICON bounces on hover while audio is playing. This is playback-state animation, **not** BPM synchronization.

## Test results
### PASS (static checks)
- Parent Candidate277 SHA-256 recomputed and matched the recorded baseline.
- Candidate278 title and `data-amq-candidate="278"` match the child version.
- Initial static `#homeMenu` shell contains no legacy buttons.
- Old floating play modal markup, handlers and CSS references removed (`amqStablePlay*` reference count: 0).
- In-place SOLO/MULTI actions and route targets are present.
- Old `candidate72-layer-order-runtime` ICON size mutator and `candidate72-home-geometry-refinement` block removed.
- One authoritative homepage layout block exists; bottom player rail and `#amqHomePlayerSlot` exist.
- Homepage profile card markup removed; profile storage key `aniAmqProfileV1` remains.
- Synthesized click sound code exists and has graceful failure handling.
- 271 static HTML IDs parsed outside script/style contents; no duplicates.
- 67/67 executable inline JavaScript blocks passed `node --check`.
- 108 CSS style blocks parsed with zero stylesheet parse errors.
- Candidate byte size and SHA-256 recomputed.

### BLOCKED / NOT RUN
- Browser interaction, mobile rendering, exact viewport overflow, menu geometry, real audio playback, click sound audibility and route transition were not runtime-verified.
- Chromium headless smoke test of `about:blank` timed out after 15 seconds, so browser environment itself is unusable for acceptance testing.
- BPM-synchronized visualizer is **not implemented**: inspected song model does not provide verified BPM data, and cross-origin audio analysis has not been validated. Hover bounce is not a BPM visualizer.
- osu!stable pixel comparison was not run.
- GitHub HTML upload/readback and remote SHA-256 verification are not complete.

## Risks / follow-up
- Verify responsive placement of bottom player rail and menu in a permitted browser.
- Verify Start Game replaces the first and second menu entries exactly; Settings remains usable; SOLO/MULTI route correctly; returning Home resets the menu.
- Verify audio dock remains attached and controls work after navigating away from Home and back.
- Add a genuine BPM source or reliable beat analysis before implementing the requested BPM visualizer.
- Profile editing controls were removed from the homepage with the card; saved profile data remains, but a new settings location for editing profile is not yet implemented.

## Rollback
Use the untouched Candidate277 file listed above. Candidate278 does not overwrite Candidate277. Candidate276 remains Candidate277's direct parent, not the direct parent of this homepage work.
