# Candidate 71 Test Report

Artifact: `amq_learning_tool_v82_85_30_workspace_proto28_song_select_71-background-ranking-audio-infinite-scroll.html`

SHA-256: `dbea057c20f4cb6de1bacce1fde5a6a57d3194a86b46c25ebc1a324bcac3e08b`

Size: 9,068,098 bytes. Parent artifact: Candidate 70 (`amq_learning_tool_v82_85_30_workspace_proto27_song_select_70-toolbar-inline-catalog.html`).

## Static checks: PASS
- 46 executable inline JavaScript blocks checked with `node --check`: 0 syntax errors.
- 71 inline CSS blocks parsed with `tinycss2`: 0 top-level parse errors.
- Duplicate HTML IDs: 0.
- Required Candidate 71 hooks verified: page-size selector, category selector, ranking placeholder, auto-scroll sentinels, batched VN cover API, 180-item VN batch size, audio restoration, and transparent scene surfaces.

## Targeted browser interaction checks: 20/20 PASS
Run with Chromium `page.set_content()` and external VNDB requests aborted to avoid hanging network calls:
1. Song Select route initializes with 180 AMQ cards.
2. Category selector exists.
3. Page-size selector exists.
4. Ranking placeholder exists and is positioned in the bottom-right region.
5. Central scene text is hidden.
6. Song metadata panel background is transparent.
7. Audio dock is visible on Song Select.
8. Four workspace controls are displayed as readable labels and the dock is compact.
9. The `180 / total` counter and manual load-more UI are hidden.
10. Selecting page size 60 renders 60 AMQ cards.
11. Selecting 未探索作品 updates the category and keeps the selected batch at 60 cards.
12. Scrolling to the AMQ grid bottom automatically loads the next batch (60 → 120).
13. EMQ mode renders 60 work cards, each with a cover-image element, and the batched VN cover API is connected.
14. Scrolling to the EMQ grid bottom automatically loads the next batch (60 → 120).
15. Selecting 未探索作品 in EMQ filters the visible result batch to 60.
16. Clicking 學習中心 updates the workspace mode and pressed state.
17. Back returns to Home and removes the Song Select route state.
18. At 390×844, document width remains 390px with no horizontal overflow; ranking, audio dock, and toolbox fit within the viewport.
19. Clicking an EMQ work expands its songs inline; 2 song rows were rendered in the sample; the legacy detail overlay remained closed.
20. Selecting an EMQ song updates the upper-left song title; the central helper/title content remains hidden.

## Visual check
- Desktop screenshot reviewed at 1440×900.
- Mobile screenshot reviewed at 390×844.
- Home background-layer screenshot uses a synthetic gradient to verify transparency/layer order. It proves the interface surface does not cover a background image at the CSS layer level; it is not evidence that a real saved IndexedDB background survives a reload.

## Blocked / not verified
- Direct double-click / `file://` launch: BLOCKED by the environment (`ERR_BLOCKED_BY_ADMINISTRATOR`).
- Real IndexedDB background persistence and reload: NOT VERIFIED because file navigation is blocked.
- VNDB cover downloads: NOT VERIFIED. The API request was made in the test, but external VNDB responses were unavailable in this environment; 0 of 60 visible EMQ cover images were confirmed loaded during this run. The card image elements and batched lookup path are present, but this does not prove actual remote images load in the user's browser.
- Actual audio playback: NOT RUN. The existing player dock is visible; audio output was not validated.
- Pixel-level osu!stable acceptance: NOT ACCEPTED. The catalog remains a custom work-card list rather than the exact stable carousel.
- GitHub upload of HTML bytes and remote SHA-256 verification: NOT COMPLETED. The branch has engineering text files only.

## Test environment warnings
- `page.set_content()` uses an opaque document origin. The application emitted localStorage `SecurityError` messages in that harness; those errors are environment-related and make this run unsuitable for validating persistent storage.
- External VNDB requests were intentionally blocked for deterministic interaction tests. Image-load success must be tested in a normal browser with network access.
