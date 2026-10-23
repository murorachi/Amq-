# Candidate 171 — Song Select Root Composition

Date: 2026-10-23

## Input and identity
- Parent Candidate 170 SHA-256: `089d8cb9f6e63178a9726dbfce9485c8691e81d3600ce5669458a26c7a9d5662`
- Candidate 171 local HTML: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_171_songselect_root_composition.html`
- Size: 9,270,964 bytes
- SHA-256: `0c54a57cb359ac1549d9d4558102fc6757e5aab6fb3577d680a521384c219fed`
- Candidate 171 is experimental, not accepted.

## Changes
Added one route-scoped CSS block:
- Resets the inherited workspace left padding and wrapper width only while the Song Select route is active.
- Hides home dashboard/discovery sections and the legacy quicktools/batch organization section while Song Select is active.
- Hides the legacy workspace sidebar on Song Select.
- Retains the compact workspace dock for now. Modal-style workspace panels are explicitly deferred to a later stage as requested.
- No data, import logic, list CRUD logic, or learning behavior was changed.

## Validation
- PASS: HTML contains the unique Candidate 171 style block and route-scoped selectors.
- PASS: 66 script tags found; 64 executable inline JavaScript blocks parsed with Node `--check`; zero syntax errors.
- NOT RUN: browser layout/DOM acceptance. Playwright is installed but its Chromium executable is missing in this environment; browser launch failed before loading the page.
- NOT RUN: screenshot/pixel diff, native file navigation, persistence, custom-list CRUD/reload, live APIs/covers, audio playback, full workspace regression.
- BLOCKED: browser launch due missing Playwright Chromium binary. This is an environment limitation, not a candidate pass.
- GitHub HTML upload/remote SHA verification: NOT COMPLETED. Candidate file exists locally, but the current connector path was not used to publish the 9.27 MB HTML; do not treat the source as remotely delivered.

## Risk / interpretation
This is a minimal root-composition correction, not a complete osu!stable scene reconstruction. It suppresses legacy home/quicktools/sidebar content that leaks into Song Select and releases inherited left padding. It does not create a genuine ranking overlay or the future modal workspace panels, and it does not claim pixel fidelity. Visual acceptance is pending a working browser runtime.

## Rollback
Return to Candidate 170, SHA-256 `089d8cb9f6e63178a9726dbfce9485c8691e81d3600ce5669458a26c7a9d5662`. Candidate 170 remains preserved.

## Next
1. Obtain a supported browser runtime and inspect Candidate 171 at 2555×1438 plus responsive sizes.
2. If the root layout is stable, refine Song Select scene composition and catalog geometry against the user's reference.
3. Only after that, implement modal workspace panels with background dimming and restoration of selected song/scroll/filter state.
