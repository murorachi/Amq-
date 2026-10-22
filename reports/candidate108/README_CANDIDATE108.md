# Candidate 108 visual-refinement package

- HTML: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_108.html`
- Size: 9,218,491 bytes
- SHA-256: `5252758b935b01e528fef28ea58523666520bac2bcb41f8de512c93b1e9d5a26`
- Parent: Candidate 107
- Previous tested checkpoint retained: Candidate 104

## Main changes
- Song-list x≈651 and first row y=94 at a 1648×928 viewport.
- Search and filter controls share one top row.
- 64 px row height; 106 px bottom player dock; list stops at y=820.

## Test limitations
JavaScript syntax, CSS parsing, route, custom-list wiring, source switching, hover geometry, and pixel metrics are tested. Durable localStorage across reload is BLOCKED by this environment; real audible playback and state-matched pixel comparison remain unverified.

The HTML binary itself has not been uploaded in this step.