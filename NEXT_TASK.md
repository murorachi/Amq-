# NEXT_TASK.md

Updated: 2026-10-26 (Candidate354)

## Highest-value next task
Continue cleaning the Song Select UI and its style/geometry ownership. Do not restart a whole-project audit and do not request user testing after every batch.

## Current candidate
- Candidate354: `amq_learning_tool_v82_86_65_candidate354_songselect_css_cascade_cleanup_20261026.html`
- Size: 1615575 bytes
- SHA-256: `af827b231836f66d3bb3925de8e132d70ffd2d299dd404b4ff353e7dfd74e123`
- Immediate rollback Candidate353: SHA-256 `1494f03e39e6b39b97d34746eb5a0d2a5957e128c15764529003e5dee954ffa3`
- Formal baseline Candidate302 remains immutable.

## Completed this batch
- Removed 132 CSS selector/declaration pairs that were superseded by later declarations with the same selector, property, importance and nested at-rule context.
- Removed 11 rules with no surviving declarations.
- Merged 33 adjacent static Song Select-related style blocks into 11, removing 22 style tags; preserved CSS rule order; no JavaScript or DOM behavior intentionally changed.
- Static CSS winner-map comparison: 13,050 keys before/after, 0 mismatches. CSS parse 0 errors; 65 executable inline JS blocks pass syntax; 247 IDs unique.
- Real-browser visual/route regression: NOT RUN.

## Next bounded work
1. Map active style owners for desktop/mobile header, filter/mode row, song-row hover/selection, dock controls, left rail/workspace overlays, cover/metadata and modals.
2. Trace dynamic style writers: `amq-proto26-song-select-css`, `amq-proto32-song-select-css`, Candidate51 route styles, Candidate76 workspace shell, Candidate99 and Candidate137.
3. Classify each remaining style as KEEP / INTEGRATE / DELETE / NEEDS CONFIRMATION. Delete cascade-dead or unreferenced rules only with evidence; integrate overlapping geometry/visibility ownership when a single behavior is established.
4. Do not touch unrelated application modules unless directly required by Song Select dependencies.
5. Once the cleanup scope is closed, run one consolidated real-browser Song Select regression: desktop/mobile layout, filters/mode switching, selection/hover, row actions, dock playback, workspace/sidebar, back/home, modals, resize.

## Risks / blockers
- Runtime-generated DOM, viewport queries, route state and inline style writes mean static search alone cannot establish that every remaining rule is invisible.
- Candidate99/Candidate137 and the dynamic styles above remain potential active owners; do not delete them based on age or name.
- Browser E2E previously hit `ERR_BLOCKED_BY_ADMINISTRATOR` on file:// and localhost; do not repeat those routes.
- Candidate354 HTML GitHub upload and remote SHA-256 readback remain NOT VERIFIED. Documentation commits are not HTML publication.
- Do not promote Candidate354 until release criteria are met.
