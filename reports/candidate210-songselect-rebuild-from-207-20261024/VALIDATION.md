# Candidate 210 Working Checkpoint — 2026-10-24

**Status: EXPERIMENTAL / NOT ACCEPTED / NOT FOR USER DELIVERY.** Rebuilt directly from Candidate 207. Candidates 208/209 remain preserved rejected experiments.

## Integrity
- Parent Candidate 207: 9,310,496 bytes; SHA-256 2f3a092a139628daa48bc113d2a192f41e2d7474182471ed926de3de49fd6100.
- Current local artifact: amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_210_songselect_rebuild_from_207.html
- Current size: 9,347,587 bytes.
- Current SHA-256: fea29371f6a94cc21a4ccfba9b98c1f4d76a9ae4727d54a269e6b79e1f65a036.

## Changes in this iteration
- Corrected Song Select row grid placement so titles no longer fall under/behind the cover column.
- Normalized row widths and reduced row height to about 84 px at 2555×1438.
- Fixed EMQ/MIX default-category performance: getSongsForWork was being called for every EMQ work even when category was “all”. That unnecessary scan was removed from the default path.
- Changed row-cover handling so existing image nodes with no src are not silently skipped; added viewport-scoped retry, timeout, API/queue fallback, MAL fallback and a fallback marker.

## Tests

### PASS
- System Chromium launches.
- Playwright set_content loads the HTML and reaches readyState complete.
- Startup produced no captured pageerror exceptions.
- Song Select navigation creates stage, tracklist and 180 rows.
- Search: “Usagi to Kame” returns one row; unmatched query returns zero; clearing restores rows.
- Repeated AMQ→EMQ→MIX→AMQ→EMQ→MIX→AMQ normal clicks complete after the render-cost fix and update API mode/aria-pressed state.
- Import, batch organizer and custom-list workspace each open; one Escape closes the panel and retains the Song Select route.
- Back returns home.

### Corrected defects
- Initial screenshot showed titles hidden behind the cover column and oversized/stair-stepped rows; grid placement and geometry were corrected.
- EMQ/MIX activation exceeded the interaction timeout; root cause was unnecessary per-work song retrieval for category “all”. Repeated switches now complete without page errors.

### NOT RUN / BLOCKED
- Native file:// and localhost navigation return ERR_BLOCKED_BY_ADMINISTRATOR. Tests use set_content with an in-memory localStorage shim, so native double-click behavior and durable persistence are not verified.
- External DNS requests fail in this environment. Successful cover loads, real CDN timeout/retry, import APIs and actual audio URLs are not verified.
- Full repeated lifecycle for all four workspaces is incomplete; learning workspace requires targeted verification.
- Real audio playback, random seek after actual metadata, autoplay policy and true mouse-wheel-centered selection are not proven.
- Custom-list create/add/remove/filter/reload persistence is not verified.
- Pixel/region comparison against osu!stable reference is incomplete. Screenshot capture at 2555×1438 is available, but no similarity percentage is claimed.
- Inherited HTML structure warning from Candidate 207 still needs investigation.

## GitHub
- Documentation is updated on branch amq-candidate104-songselect-layout-fix.
- HTML upload and remote SHA-256 readback are BLOCKED: available connector accepts UTF-8 text, not a local-file byte stream; container git/curl cannot resolve github.com. No remote HTML hash is claimed.
- Do not deliver Candidate 210 as a finished candidate.

## Rollback
Discard Candidate 210 and return to unchanged Candidate 207. Do not overwrite prior candidates.