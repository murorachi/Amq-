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


## Reference image identity check (2026-10-23)

The supplied `image.png` at 2555 x 1438 was opened for direct inspection. It shows an osu! interface with a left-side multiplayer ranking/player-score list and large character background, plus staggered pink score/player panels on the right; it does not show the osu!stable song-selection beatmap list or its song-row layout. Therefore it cannot serve as direct ground truth for song-select row height, song-row stagger offsets, or the 7.5-song-card cue. The earlier 7.5-row target coordinates in legacy test reports belong to the 1648 x 928 song-select geometry test and must not be represented as measurements extracted from this 2555 x 1438 image. Pixel-accurate song-select comparison is now unblocked at the source-identification level: the official osu-wiki Song select image has been fetched from the pinned commit below. The local image pixels have not yet been compared against Candidate 170, so visual pass/fail remains NOT RUN.

## Browser navigation attempt (2026-10-23)

Chromium navigation was attempted both with `file://` and with a local HTTP server (`http://127.0.0.1:8765/...`). Both were blocked by `net::ERR_BLOCKED_BY_ADMINISTRATOR` before DOMContentLoaded. The local HTTP attempt also did not produce a DOM, catalog, or interaction result. This is an environment-level block, not a passing browser acceptance test and not proof of an application defect.


## Official osu!stable Song Select reference (2026-10-23)

- Repository: `ppy/osu-wiki`
- Pinned commit: `8c585eea35455a4bd255f93b5d59ccaf807e6bdd`
- Source page: `wiki/Client/Interface/en.md`, blob SHA `de13d6eb6473199116211b878e847858194791c4`, which explicitly labels `img/song-selection.jpg` as “Song select”.
- Image path: `wiki/Client/Interface/img/song-selection.jpg`
- Image dimensions parsed from JPEG SOF marker: 1280 x 720 px.
- GitHub image blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`.
- Image bytes retrieved via GitHub file connector: 178,047 bytes after Base64 decoding. This is not the file's SHA-256; do not confuse Git blob SHA with SHA-256.
- Visual inspection confirms the reference shows the Stable song-select screen: metadata/filter toolbar at top, staggered beatmap cards on the right, ranking/player panel at left, and mode/player controls along the bottom. It is a valid source for layout measurement, unlike the separately supplied multiplayer score-screen image.
- Source URL: `https://github.com/ppy/osu-wiki/blob/8c585eea35455a4bd255f93b5d59ccaf807e6bdd/wiki/Client/Interface/img/song-selection.jpg`
- Raw image URL: `https://raw.githubusercontent.com/ppy/osu-wiki/8c585eea35455a4bd255f93b5d59ccaf807e6bdd/wiki/Client/Interface/img/song-selection.jpg`
- NOT YET DONE: extract precise card edge coordinates/row heights/stagger offsets and compare to Candidate 170 at equivalent 16:9 viewports. The 1280 x 720 source screenshot is the measurement baseline; scaling to 2555 x 1438 must account for near-16:9 ratio and UI scaling rather than assuming identical pixel sizes.
