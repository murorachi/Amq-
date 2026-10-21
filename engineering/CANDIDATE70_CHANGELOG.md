# Candidate 70 Change Log

Parent: Candidate 69 (`84440ee44f5451df94853a4e66d7c02f00b5d39a330fb8752f66c384015131de`).

## Changes
- Replaced the persistent audio bar on Song Select with an empty ranking placeholder.
- Removed the visible `開始練習` dock button; the homepage remains the practice entry point.
- Reduced the 1–4 dock controls to compact numbered buttons and added a left-side `Back` control. Selecting a number reveals its corresponding toolbox actions. Escape closes that toolbox first, then returns to Home when pressed again.
- Removed header Settings and Settings Search controls from the visible UI; added a direct `背景` shortcut so background editing remains reachable.
- Limited scene background choices to Home, Multiplayer, and Song Select (`catalog`).
- Changed AMQ and EMQ work selection from a full detail drawer to expandable inline song rows. Selecting a row updates the upper-left song metadata.
- Initialized upper-left metadata to the first available song on entering Song Select, without automatically opening a work's song list.
- Added translucent top-header styling and increased the visible homepage music icon scale on desktop.

## Known limits
- Song Select is closer to the requested interaction model but is not a pixel-perfect osu!stable carousel yet. Work cards remain custom rectangular cards and the center preview differs from osu!stable.
- Direct `file://` browser launch is blocked by the current execution environment. IndexedDB persistence and real audio playback were not verified.
- Candidate 70 HTML has not been uploaded to GitHub; remote artifact SHA-256 is therefore unverified.
