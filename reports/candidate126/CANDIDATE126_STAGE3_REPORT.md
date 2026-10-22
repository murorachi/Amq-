# Candidate 126 — fix catalog layout primitive

## Baseline and artifact
- Parent Candidate 125: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_125.html`
- Parent size: 9,237,370 bytes.
- Parent SHA-256: `6dfe4ddc2b48e3a1c5ee7c12ae42f371877d1b30aae6abf99f68caebf3221145`
- Candidate 126: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_126.html`
- Size: 9,237,739 bytes.
- SHA-256: `15e8644ec1ea079b6784fdeb8ac399aeecfc57ba00bd2b13b4d8b9b0a6a286a4`

## Reference screenshot inspected first
- File: `/mnt/data/files/image.png`
- Dimensions: 2555 × 1438.
- SHA-256: `f0fd3ab5ec11e87632d95aac0ab7b9df3595c96e20bb03c5201d012d613b99a4`.
- Prior normalized comparison viewport: 1648 × 928.

## Root cause and change
The reference has a vertical stack of song cards whose right edges align, with varying left edges. Candidate 125 set varying widths and `align-self:flex-end` on card items, but did not change the parent `#grid` from CSS Grid to a single-column layout. In a multi-column grid, item width changes do not reliably produce the intended common right edge and row sequence.

Candidate 126 changes the canonical `#grid` layout owner to `display:flex; flex-direction:column; align-items:flex-end`, then retains the existing per-row widths and height rules. This is a targeted correction to the layout primitive, not an appended stylesheet. No song data, ranking stats, artwork, or app behavior was fabricated.

## Tests
- Parent SHA-256 verified before editing: PASS.
- Executable inline JavaScript syntax: PASS, 62 blocks, 0 parse errors. Data-only script blocks were excluded from JS syntax parsing.
- CSS syntax: PASS, 90 style blocks, 2,579 qualified rules, 0 parse errors.
- Layout-owner, candidate marker, and parent fingerprint assertions: PASS.
- Browser screenshot, computed geometry, hover/selected-state behavior: BLOCKED / NOT RUN. No Candidate 126 visual score is claimed.
- Durable reload persistence and live AniList/MAL/VNDB requests: NOT RUN.

## Acceptance status
**NOT ACCEPTED as final.** This fixes a source-level layout-owner mismatch, but Stage 3 still requires a real browser screenshot and geometry/interaction verification. The main remaining visual gap is that the app's left rail and central background do not yet reproduce the reference composition.

## Rollback
Candidate 125 remains unchanged at SHA-256 `6dfe4ddc2b48e3a1c5ee7c12ae42f371877d1b30aae6abf99f68caebf3221145`.
