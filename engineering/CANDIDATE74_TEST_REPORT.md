# Candidate 74 Test Report

Artifact: `amq_learning_tool_v82_85_30_workspace_proto28_song_select_74-mobile-frame-state-fix.html`

SHA-256: `69191737e6dcfba22c8018c4a5020959f28e39f923e45fa2b4b46b8a8c08b721`
Size: 9,094,018 bytes.

## Passed
- JavaScript syntax: 50/50 executable inline scripts passed `node --check`.
- CSS parsing: 75/75 inline style blocks parsed without parser errors.
- HTML IDs: 0 duplicates across 243 IDs.
- Targeted source assertions: 4/4 passed, covering collapsed mobile hide, expanded mobile show, sidebar rule presence and desktop route rule preservation.
- Chromium + Playwright route checks at 390x844 and 1440x900:
  - Entered Song Select via the Home icon and visible `歌曲選擇` menu action.
  - Confirmed mobile frame is hidden when collapsed; desktop frame remains visible.
  - Activated all four workspace controls at both viewport sizes using DOM click events.
  - Confirmed each control sets `aria-pressed=true`, shows the frame and sidebar, and keeps the sidebar bounds within the frame bounds.
  - Re-clicked each active control and confirmed it collapses; the mobile frame returns to hidden state.
- Screenshots captured for mobile/desktop collapsed and expanded states.

## Failures / limitations
- Browser console recorded two `localStorage` access errors because `page.set_content` uses an opaque origin. The environment blocks navigation to `file://`, `data:` and local HTTP URLs with `ERR_BLOCKED_BY_ADMINISTRATOR`.
- The browser test uses DOM click events rather than full pointer-based manual interaction for the four workspace buttons. It verifies event handlers and resulting state, but is not a full manual usability test.
- Persistent storage, external cover requests, real audio playback and full normal-origin startup remain unverified.
- Pixel-level comparison against a running osu!stable client has not been performed.
- GitHub HTML binary upload and remote size/SHA-256 verification have not been completed.

## Visual evidence correction
`CANDIDATE72_SONGSELECT_PANEL_1440x900.png` was mislabeled: its pixels show the Home screen, not Song Select. It is excluded from Song Select acceptance evidence.
