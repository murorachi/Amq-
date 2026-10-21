# Proto26 Stage 1 — Song Select audit

Date: 2026-10-21

## Verified artifact

- Candidate branch: `v82.85.30-proto25-ui-refactor-stage-24`
- Candidate path: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`
- Candidate size: 8,926,248 bytes
- Candidate SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`
- Tested source commit: `3aea33e7137b7e3e3105c76ed896a515a335c2a3`
- CI run: https://github.com/murorachi/Amq-/actions/runs/39541057705
- Artifact ZIP SHA-256: `e1162c4de164a2a9474d2e052436cebeabd57e4a30bac3e3dc500a719ba3fd7f`
- Artifact was downloaded and extracted. Local SHA-256 and byte size match the report exactly.

## Existing implementation confirmed from HTML and Playwright source

- Catalog data is real, embedded in `DB.anime` and `DB.songs`; `rebuild()` creates `byAnime` and `songMap`.
- Existing work card selection calls `openAnime(id)`; artist cards call `openArtist(g)`.
- `openAnime` and `openArtist` populate `#detailTitle`, `#detailSub`, `#detailStats`, and `#songlist`, then open `#overlay`.
- `makeSongRow(s)` preserves real song actions: play, blacklist, and familiarity state changes.
- Existing search input `#search`, decade `#decade`, type `#type`, sort `#sort`, tabs `[data-tab]`, and grid/list mode `[data-mode]` are wired to the existing render path.
- Existing bottom audio dock `#audioDock` and `#audioPlayer` must be preserved.
- Existing workspace dock/sidebar and buttons are present. The previous browser test confirms Learning Center and Analysis render as distinct views and tests the dock buttons via `[data-ws]`.

## Confirmed gap

The existing acceptance test clicks the first catalog card and asserts that `#overlay` opens, that `.drawer` spans at least 1400 pixels at desktop width, and that its grid has two columns. Therefore the current Song Select/song detail path is still a full-screen overlay/drawer, not an integrated Song Select workspace.

The existing catalog screenshot also shows the general catalog layout with a large progress panel, a batch-management panel, filter rows, catalog tabs, and a vertical cover grid. It does not match the requested osu!stable composition of a persistent left work-area navigation, selected-song information, horizontal work rows, mode controls, and a bottom-aligned player.

The existing four workspace buttons are visible in a fixed bottom dock on the Learning Center/Analysis views; they have not yet been proven to operate as four panels inside the integrated Song Select workspace.

## Baseline tests and limitations

The existing CI run passed static HTML/duplicate-ID/inline-JavaScript checks and Playwright assertions, with no page errors or console errors. The Playwright source also asserts navigation, catalog display, mobile overflow, basic settings visibility, workspace separation, and persistence APIs.

The run explicitly did not test real audio output, the full quiz-answer lifecycle, or multiplayer server connectivity/lifecycle. It is not evidence that those flows have passed.

## Change scope for Stage 2

1. Preserve current data and event handlers.
2. Reuse the existing work index, song map, song-row actions, and audio dock.
3. Move song selection into the main workspace instead of opening a separate full-screen drawer.
4. Integrate the four existing work areas inside that same workspace.
5. Add focused acceptance assertions for real interactions and fixed-size screenshots before claiming completion.

No production HTML has been changed by this audit commit.
