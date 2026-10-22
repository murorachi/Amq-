# Candidate 125 — Stage 3 structural row-layout correction

## Baseline and artifact
- Parent Candidate 124 SHA-256: `3dedd925ba75fbaa71ed180ef34d3f6cb9024e205c9da5f6b0a720896c0693a9`
- Candidate 125 file: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_125.html`
- Candidate 125 size: 9,237,382 bytes
- Candidate 125 SHA-256: `aec14a5d04e643c605770e2923e2755b1f307a5758ddafd281fc4e373ab71178`
- Candidate 124 remains unchanged and is available for rollback.

## Changes
1. Replaced the canonical existing Song Select card styling block rather than appending another stylesheet.
2. Kept the measured 60px row height and used six viewport-relative card widths (64.5vw focus preview, then 42vw, 40vw, 46vw, 38vw, 41vw) to restore osu!stable-like right-aligned staggered composition.
3. Updated the actual Candidate 106 JavaScript layout owner from `left:39.5vw / width:60.5vw` to `left:35.5vw / width:64.5vw`, allowing the widest row to fit without relying on clipped overflow.
4. Reduced the canonical cover slot from 78px to 58px to match the viewport-normalized reference cover size.
5. No song data, ranking values, or external artwork were invented. The existing scene-background tool remains the intended source for user-selected backgrounds.

## Tests
- PASS 7 / FAIL 0 static checks (`CANDIDATE125_STATIC_REPORT.json`).
- PASS: 62 executable inline JavaScript blocks parsed by Node with zero syntax errors.
- PASS: 90 CSS blocks parsed with zero parse errors; 2,578 top-level qualified rules.
- BLOCKED / NOT RUN: full browser screenshot, geometry, hover and selected-state regression. Playwright with system Chromium did not complete within the available run window; no Candidate 125 screenshot or visual score is claimed.
- NOT RUN: true file:// reload persistence and live AniList/MAL/VNDB API requests.
- Audio playback: user-confirmed playable; not independently tested in this run.

## Known risks
- Staggered card widths are based on the supplied single osu!stable screenshot normalized to 1648×928. A live Candidate 125 capture is still required to confirm computed layout and hover/selected behavior.
- Default anime background cannot be faithfully reproduced without a real user-selected scene asset or separately sourced/authorized artwork. No screenshot crop or fake ranking data was substituted.
- Visual fidelity acceptance remains NOT VERIFIED, not PASS. Candidate 125 is a structural correction candidate, not a final release.

## Rollback
Use Candidate 124, SHA-256 `3dedd925ba75fbaa71ed180ef34d3f6cb9024e205c9da5f6b0a720896c0693a9`.
