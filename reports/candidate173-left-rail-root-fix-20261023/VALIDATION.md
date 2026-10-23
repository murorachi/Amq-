# Candidate 173 — Left Rail Root Fix and Browser Geometry Checks

Date: 2026-10-23

## Candidate identity
- Parent Candidate 172 SHA-256: `251501181f35756a15962d967a65659a672c577c010aec628017ed4b6270f07e`
- Candidate 173 local HTML: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_173_left_rail_specificity_fix.html`
- Size: 9,271,506 bytes
- SHA-256: `282edb78e91de4c4f65f1c917d6edf333b52efef11de7c6b65256404e4101b27`
- Status: experimental; not accepted.
- Candidate 173 HTML itself is local only. GitHub upload/remote hash verification was not completed.

## Root cause and change
Candidate 171 attempted to hide `#amqWorkspaceSidebar`, but the actual Song Select legacy navigation is `#c99LeftRail`. Candidate 172 targeted the correct element but lost to a later-injected Candidate 99 `display:flex!important` rule with equal specificity. Candidate 173 raises selector specificity for the route-scoped hide rule, so it wins over the dynamically injected legacy rule.

On the Song Select route, Candidate 173 hides `#c99LeftRail` and its associated `#amqSongSelectCurvedFrame`. This removes import/list/study action buttons from the main scene. Those functions are not deleted; the requested modal workspace pattern remains a later stage.

## Automated checks

### PASS
- HTML structure count: one opening/closing HTML tag pair; 98 opening/closing style tag pairs.
- 64 executable inline JavaScript blocks checked individually with Node `--check`: 0 syntax errors.
- Chromium was launched using the system executable and `page.set_content` was used to render the candidate.
- At 2555×1438, 1920×1080, 1648×928, 1440×900, 1280×720 and 900×700:
  - Song Select route activated.
  - `#c99LeftRail` computed display = `none`.
  - `#amqSongSelectCurvedFrame` computed display = `none`.
  - Catalog/list rendered with 180 song rows.
  - No horizontal document overflow.
  - Dock remained within the viewport.
- At desktop sizes, the selected row remains centered around the list's middle region; at 2555×1438 the selected row bounds are x=1408.5, y=570.5, w=1134.5, h=176.1.
- At 2555×1438 the eighth row is partially clipped at the tracklist bottom, yielding the intended visible scroll affordance (approximately half of that row is visible).
- Keyboard ArrowDown changed selected song from “Boku no Haru” to “Oyuu no Uta”.
- Hovered row CSS transform is -3px versus selected row -7px, preserving the smaller hover displacement rule.
- Screenshot captured: `candidate173_songselect_2555x1438.png`.

### BLOCKED / NOT RUN
- Native `file://` navigation still returns `ERR_BLOCKED_BY_ADMINISTRATOR`.
- A `page.set_content` document has an opaque origin. Two localStorage access errors are raised by existing app code; durable persistence cannot be verified in this test mode.
- EMQ button click was exercised, but a complete source-data assertion for every mode was not repeated in this stage.
- Pixel-perfect regional comparison and live cover/API/audio validation were not run.
- Custom-list create/add/remove/filter/reload persistence and full workspace regression were not run.

## Visual assessment
The root navigation leak is corrected in the rendered Song Select route. The screen now has an unobstructed left/central scene area, upper-left song metadata, right-side catalog, and bottom dock. It remains a structural approximation, not a full visual match: the current test environment has no persisted custom scene background and does not load external artwork. The scene-background manager and the existing no-custom-background fallback are retained; no artwork or ranking data was fabricated.

## Rollback
- Candidate 172: `251501181f35756a15962d967a65659a672c577c010aec628017ed4b6270f07e` (has ineffective equal-specificity hide rule; not recommended).
- Candidate 171: `0c54a57cb359ac1549d9d4558102fc6757e5aab6fb3577d680a521384c219fed`.
- Candidate 170: `089d8cb9f6e63178a9726dbfce9485c8691e81d3600ce5669458a26c7a9d5662`.
- Candidate 169 rollback checkpoint: `5913ad864a8841b144de7c72c4deeede765ec5675117667c13f9eb5fe89a7d66f`.

## Next stage
1. Keep Candidate 173 as the current local working candidate.
2. Verify selected/hover row behavior and the 7.5-row clipping at smaller viewports.
3. Align row background/cover treatment and metadata/control hierarchy without breaking the scene-background manager.
4. Only after main Song Select structure is stable, implement modal workspace panels with background dimming and state restoration.
5. Complete native-origin persistence, CRUD, API/cover recovery, audio and workspace regression tests in an environment that supports them.
