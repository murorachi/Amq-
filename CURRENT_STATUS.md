# Current Status

## Proto26: Song Select integration

Status: **Stage 1 audit in progress; no UI implementation changes have been made yet.**

### Verified baseline
- Branch: `v82.85.30-proto25-ui-refactor-stage-24`
- Tested source commit: `3aea33e7137b7e3e3105c76ed896a515a335c2a3`
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`
- Candidate size and SHA-256 are recorded in `BASELINE.md`.

### Confirmed existing behavior and gaps
- Catalog view currently has a top statistics panel, a batch-management panel, search/filter controls, catalog tabs, and a grid/list view.
- Selecting a catalog card opens a separate full-screen drawer/overlay containing song rows. This is not yet the requested integrated osu!stable Song Select workspace.
- Existing player dock and actual song rows are present in the candidate.
- Existing Learning Center and Analysis workspaces are separate and use the existing workspace dock; their controls must be reused and extended, not replaced with empty mock buttons.
- The previous Playwright acceptance tests cover navigation, basic catalog layout, mobile overflow, workspace styling, settings visibility, and browser console errors. They do not establish the requested integrated Song Select layout or verify all four workspace buttons within that Song Select space.
- Baseline UI tests explicitly did not run real audio output, full quiz-answer lifecycle, or multiplayer server lifecycle.

### Next actions
1. Inspect the actual song data structures, current catalog filtering/sorting, song selection/detail drawer, and workspace dock event handlers.
2. Build Song Select acceptance tests around real data and existing player/state APIs.
3. Implement the integrated Song Select layout on this isolated branch, retaining original data and event logic.
