# Candidate 184 — Song Select Viewport Overflow Fix

- Date: 2026-10-24
- Status: Experimental checkpoint, **not accepted**.
- User-designated recovery baseline: Candidate 178; Candidate 205 was unavailable to the user and was not used as the source.
- Immediate parent Candidate 183 SHA-256: `c733057a3e7fce2ce0dd772729f296dae59e829675c10890a8ae8d6221a1b8cd`.
- Output: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_184_songselect_viewport_overflow_fix.html`
- Size: 9,279,948 bytes
- SHA-256: `f3032d62cc22a5fb6272b14671f356daad3bb1503447813083fe434b5576a870`

## Change
Added a narrowly scoped Song Select route CSS rule to remove the legacy body bottom-padding reservation while the workspace is active and set the wrapper minimum height to `calc(100vh - 22px)`. The fixed dock already occupies the viewport bottom; the legacy wrapper offset and body reservation caused document-height overflow even though visible dock/catalog geometry fit. No song data, player logic, import logic, or custom-list logic changed.

## Tests

### PASS — Static JavaScript syntax
- 66 script tags inspected.
- 64 executable inline JavaScript blocks checked with `node --check`.
- 2 non-JavaScript payloads skipped (`application/json`, `application/octet-stream`).
- 0 syntax failures.

### PASS — Chromium viewport geometry (shimmed `page.set_content` harness)
At all six viewports, document width/height matched viewport, rail was visible, catalog ended above the dock, and no console/page errors were captured:
- 2555×1438
- 1648×928
- 1440×900
- 1280×720
- 900×928
- 390×844

The 900×928 and 390×844 document overflow seen in Candidate 183 no longer reproduced. This is a shimmed harness, not native-origin acceptance.

### PASS — Workspace route smoke test (shimmed harness)
- Enter Song Select: rail visible, four action entries visible.
- Open custom-list management: panel visible and custom mode tab exists.
- Back: home menu visible.
- Re-enter Song Select and open learning plan: learning panel exists and is visible.
- Captured console/page errors: none.

### NOT RUN / BLOCKED
- Full custom-list create/add/remove/filter/reload persistence: NOT RUN.
- Native `file://` and local HTTP browser acceptance: BLOCKED in earlier attempts by `ERR_BLOCKED_BY_ADMINISTRATOR`.
- Persistent browser storage: NOT VERIFIED; opaque-origin `page.set_content` is not evidence of persistence correctness.
- Live AniList/MAL/VNDB APIs, cover failure recovery, real audio playback: NOT RUN.
- Pixel-difference/SSIM against official osu!stable reference: NOT RUN. Geometry is not visual-fidelity acceptance.

## GitHub
- Repository access confirmed: `murorachi/Amq-`; push permission reported true.
- Inspected branch: `amq-candidate104-songselect-layout-fix`.
- Candidate 184 HTML upload and remote SHA-256 verification: NOT COMPLETED. The 9.28 MB HTML has not been published. This is not a GitHub HTML delivery or accepted version.

## Rollback
Keep Candidate 183 unchanged. Reopen the exact Candidate 183 file; do not overwrite it with Candidate 184.

## Next
1. Revalidate native-origin route when browser restrictions permit.
2. Measure against the fixed 2555×1438 osu!stable screenshot and perform pixel/region comparison.
3. Obtain evidence for native storage, list CRUD/persistence, APIs and audio before acceptance.
