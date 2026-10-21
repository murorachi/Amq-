# Candidate 75 Test Report

Artifact: `amq_learning_tool_v82_85_30_workspace_proto28_song_select_75-mobile-catalog-clearance.html`

SHA-256: `4ad5a0d50bb072f36c936640c14b3744bf2a91c50b79b653392880ce8084a6dd`
Size: 9,094,014 bytes.

## Passed
- JavaScript syntax: 50/50 executable inline scripts passed `node --check`.
- CSS parsing: 75/75 inline style blocks parsed without parser errors.
- HTML IDs: 0 duplicates across 243 IDs.
- Targeted source assertions: 6/6 passed, covering mobile catalog bottom geometry, runtime normalization value, mobile frame state, expanded sidebar state and desktop rule preservation.
- Chromium + Playwright route checks at 390x844 and 1440x900:
  - Entered Song Select through the Home icon and visible `歌曲選擇` menu action.
  - All four workspace controls set `aria-pressed=true`, displayed the frame and sidebar, and kept sidebar bounds within the frame.
  - Re-clicking each active control collapsed the panel; mobile frame returned to hidden state.
  - Mobile catalog bottom = 674px, audio dock top = 676px; no overlap.
  - Mobile expanded frame bottom = 674px, audio dock top = 676px; no overlap.
- Route-driven screenshots captured for mobile/desktop collapsed and expanded states.

## Failures / limitations
- Browser console recorded two `localStorage` access errors because `page.set_content` uses an opaque origin. Navigation to `file://`, `data:` and local HTTP URLs is blocked by this environment.
- Workspace control tests use DOM click events, not full pointer-based manual interaction.
- Persistent storage, external cover requests, real audio playback and normal-origin startup remain unverified.
- Pixel-level comparison against a running osu!stable client has not been performed.
- GitHub HTML binary upload and remote size/SHA-256 verification have not been completed.

## Visual evidence correction
`CANDIDATE72_SONGSELECT_PANEL_1440x900.png` was mislabeled and shows Home. It is excluded from Song Select acceptance evidence.
