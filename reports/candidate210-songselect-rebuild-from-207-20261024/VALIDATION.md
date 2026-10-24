# Candidate 210 Working Checkpoint — 2026-10-24

**Status: EXPERIMENTAL / NOT ACCEPTED / NOT FOR USER DELIVERY.** Rebuilt directly from Candidate 207. Candidates 208/209 remain preserved rejected experiments.

## Integrity
- Parent Candidate 207: 9,310,496 bytes; SHA-256 2f3a092a139628daa48bc113d2a192f41e2d7474182471ed926de3de49fd6100.
- Current local artifact: amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_210_songselect_rebuild_from_207.html
- Current size: 9,347,601 bytes.
- Current SHA-256: 92f3e6353bd9e9d72d148037cd710818e25d514ce6c2ed57642e2ab248f6ec5f.

## Changes
- Corrected Song Select row grid placement so titles no longer fall under/behind the cover column.
- Normalized row widths and aligned catalog to x≈1571 px / width≈984 px at 2555×1438.
- Set row height to about 151 px at 2555×1438; measured 8 intersecting rows with the last partial, matching the approximately 7.5-row target.
- Fixed EMQ/MIX default-category performance: getSongsForWork was being called for every EMQ work even when category was “all”. Removed that unnecessary scan from the default path.
- Changed row-cover handling so existing image nodes with no src are not silently skipped; added viewport-scoped retry, timeout, API/queue fallback, MAL fallback and visible fallback marker.

## PASS
- System Chromium launches. Playwright set_content loads the HTML and reaches readyState complete.
- Startup produced no captured pageerror exceptions.
- Song Select navigation creates stage, tracklist and 180 rows.
- Search: “Usagi to Kame” returns one row; unmatched query returns zero; clearing restores rows.
- Repeated AMQ→EMQ→MIX→AMQ→EMQ→MIX→AMQ normal clicks complete and update API mode/aria-pressed state.
- Import, batch organizer, custom lists and learning plan each opened and Escape-closed in 3 consecutive cycles. After every close, route remained Song Select, one rail/stage remained, and no modal overlay remained open.
- Back returns home.
- Row click updates selected row and invokes the autoplay path. A spy was used to avoid claiming external audio playback.
- Actual mouse-wheel input changes scroll position and selected row.
- Previous/play/next controls accept clicks without captured JS errors.
- Synthetic loadedmetadata event exercised random-seek hook and set a seek value within a synthetic 100-second duration. This is not real media validation.
- Geometry at 2555×1438: list viewport x≈1571, width≈979, height≈1108, row height≈151; 8 rows intersect viewport with final row partial. At 1920×1080: list x≈1181, width≈734, row height≈130, 7 rows intersect.
- Cover failure fallback was observed as a visible ♫ marker after external cover requests failed.

## Corrected defects
- Initial screenshot showed titles hidden behind the cover column; corrected grid placement.
- EMQ/MIX activation exceeded the interaction timeout; root cause was unnecessary per-work song retrieval for category “all”. Repeated switches now complete without page errors.

## NOT RUN / BLOCKED
- Native file:// and localhost navigation return ERR_BLOCKED_BY_ADMINISTRATOR. Tests use set_content with an in-memory localStorage shim, so native double-click behavior and durable persistence are not verified.
- External DNS requests fail. Successful cover loads, real CDN timeout/retry, importer APIs and actual audio URLs are not verified.
- Real audio playback and random seek after real metadata are not proven. Player button clickability is not proof of playback.
- Exhaustive Back navigation from every workspace and no-stale-component assertions across route changes remain incomplete.
- Custom-list create/add/remove/filter/reload persistence is not verified.
- Pixel/region comparison against osu!stable reference is incomplete. Screenshots captured at 2555×1438 and 1920×1080; no similarity percentage is claimed.
- HTML parser reports two inherited structural warnings at the </head><body> boundary near line 324, also present in Candidate 207.

## GitHub
- Documentation is updated and read back from branch amq-candidate104-songselect-layout-fix.
- HTML upload and remote SHA-256 readback are BLOCKED: available connector accepts UTF-8 text, not a local-file byte stream; container git/curl cannot resolve github.com. Remote search found no Candidate 210 HTML file. No remote HTML hash is claimed.
- Do not deliver Candidate 210 as a finished candidate.

## Rollback
Discard Candidate 210 and return to unchanged Candidate 207. Do not overwrite prior candidates.