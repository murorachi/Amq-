# Candidate 210 Working Checkpoint — 2026-10-24

**Status: EXPERIMENTAL / NOT ACCEPTED / NOT FOR USER DELIVERY.** Rebuilt directly from Candidate 207. Candidate 209 already exists as a rejected experimental artifact, so this checkpoint uses the next unique candidate number rather than overwriting it.

## Baseline and integrity
- Parent: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_207_home_menu_initial_state_fix.html`
- Parent size: 9,310,496 bytes.
- Parent SHA-256: `2f3a092a139628daa48bc113d2a192f41e2d7474182471ed926de3de49fd6100`.
- Working artifact: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_210_songselect_rebuild_from_207.html`
- Working size: 9,345,508 bytes.
- Working SHA-256: `d91fc25f1fd0f65214412483dca7c697a12f88675d57b2186575ac3be81369f9`.
- Candidate 207 remains unchanged. Candidate 208 and Candidate 209 were not used as sources.

## Changes in this checkpoint
- Added a dark blue-edged song-information/filter frame and retained the existing search input node, with placeholder `打字即可搜尋!`.
- Removed Song Select's works-catalog toggle creation and the Singer mode button from the primary mode row.
- Replaced the Song Select row factory with a compact information row; row-level song operation clutter and the `更多` disclosure were removed in favor of dock actions.
- Added dock actions for play/pause, queue, familiarity, tags, and blacklist, plus a layered white-outline AMQ-style bottom-right icon.
- Added wheel-centered row selection, keyboard selection handling, autoplay hooks, and random seek after media metadata is available.
- Added an asynchronous row-cover attempt using the existing AMQ cover queue / VN cover API.
- Added a shared AniList/MAL/VNDB import hub and repurposed the former VNDB rail entry as a batch-organizing workspace.
- Batch operations cover familiarity, tags, blacklist, and custom-list membership. Membership remains work-level because the existing persisted schema stores `animeIds`.
- Scoped the new cover observer to the tracklist rather than rescanning the whole document for each child mutation.

## Validation
- **PASS, static JavaScript syntax:** 68 executable inline JavaScript blocks checked with `node --check`; 68 passed, 0 failed. Two embedded data/payload blocks were excluded.
- **PASS, CSS syntax:** 107 style blocks, 2,745 qualified rules; `tinycss2` reported 0 parse errors.
- **PASS, static artifact checks:** doctype is first; one `</body>` and one `</html>` closing tag; Candidate 210 metadata is present; the new row factory does not emit the `更多` disclosure.
- **FAIL, recoverable HTML parser check:** `lxml` reports two structural errors at the inherited `</head><body>` boundary around source line 324. Candidate 207 reports the same errors. This legacy document-structure issue has not been root-cause corrected in this checkpoint.
- **BLOCKED, browser acceptance:** Chromium did not complete even `about:blank` within 15 seconds in the current execution environment; Candidate 207 and 210 file-navigation attempts also timed out. This does not prove the application itself is frozen.
- **NOT RUN:** actual click-through, localStorage persistence after reload, four-workspace lifecycle regression, live API/import tests, audio playback, cover failure recovery, fixed-resolution screenshots, pixel/geometry comparison, and narrow viewport behavior.

## Incomplete / risks
- EMQ/MIX slow activation and the hidden-background-modal issue have not been reproduced and fixed at their root cause.
- Visual similarity has not been measured against the 2555×1438 reference. No percentage is claimed.
- Full workspace lifecycle and existing import/list-removal paths still require real-browser verification.
- Candidate 210 HTML is not uploaded to GitHub; remote HTML SHA-256 readback is NOT VERIFIED.
- No acceptance or production-ready claim is made.

## Rollback
Return to the unchanged Candidate 207 file with SHA-256 `2f3a092a139628daa48bc113d2a192f41e2d7474182471ed926de3de49fd6100`. Candidate 210 does not overwrite Candidate 207.

## Next highest-value task
Run Candidate 210 in a usable desktop browser and test the row factory, dock controls, cover requests, import hub, batch actions, and workspace close/Escape lifecycle. Fix runtime errors before visual refinement or formal HTML delivery.
