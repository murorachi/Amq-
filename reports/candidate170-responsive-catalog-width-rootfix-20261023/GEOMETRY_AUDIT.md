# Candidate 170 Geometry Audit

Status: experimental, not accepted as baseline.

Reference image dimensions: 2555 x 1438 px. This is the supplied image size, not proof of the user's physical monitor resolution.

Candidate 169 measured .p32-catalog at x=1366.9, y=44, width=762, height=1286 on a 2555 x 1438 viewport. Its runtime style owner used left:53.5vw and width:46.5vw but also max-width:762px, leaving about 426 px unused on the right.

Candidate 170 makes two exact replacements only:
- Runtime owner: maxWidth:'762px' -> maxWidth:'none'
- CSS fallback: max-width:762px!important -> max-width:none!important

Candidate 170 measured approximately x=1366.9, y=44, width=1188.1, height=1286, right edge 2555.

Focused Playwright page.set_content checks: 6/6 viewport cases passed (2555, 1920, 1648, 1440, 1280, 900 px wide) for route activation, catalog dimensions, width/right-edge geometry above 900 px, catalog entry presence, and toolbar horizontal geometry. Two localStorage access warnings were observed from the opaque about:blank harness and recorded separately.

At 2555 x 1438, the visible song-list scroll region measured x≈1367, y=93, width≈1183 and height≈1231. Eight staggered song rows intersect the viewport; the last row starts at y≈1239 and is clipped at y≈1324, leaving about 85 px of its 169 px row visible (approximately half a card). This confirms the intended half-card scroll cue in this captured state. Exact pixel correspondence to the osu!stable reference remains NOT VERIFIED.

The existing 26-test suite was NOT RUN on Candidate 170 because its original test harness was not found in the current workspace. Actual file:// launch, durable storage, live API/audio and full CRUD lifecycle were NOT RUN.

Before/after screenshots at 2555 x 1438 differ across 24.755% of pixels, expected from the catalog width change. This is not a pixel comparison against the original osu!stable screenshot and does not prove 1:1 fidelity.

Rollback: Candidate 169 SHA-256 5913ad864a8841b144de7c72c4deeede765ec5675117667c13f9eb5fe89a7d66f.
