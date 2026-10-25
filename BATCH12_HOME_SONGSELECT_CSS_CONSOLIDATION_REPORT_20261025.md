# Batch 12 — Home / Song Select cross-block CSS consolidation

Date: 2026-10-25

## Baseline and candidate
- Source Candidate306: `amq_learning_tool_v82_86_17_candidate306_home_songselect_orphan_css_cleanup_20261025.html`
- Source SHA-256: `ac39a87d0ebc3c50f89754cae95cd62518a659a7c354075d6d1be6b6edc4de7e` (1,667,280 bytes)
- Candidate307: `amq_learning_tool_v82_86_18_candidate307_home_songselect_css_consolidation_20261025.html`
- Candidate SHA-256: `f2c080906ef9f2db6367286401dda0fc0181dae6041549402384180724d47aa6` (1,665,250 bytes)
- Formal baseline remains Candidate302. Candidate307 is not promoted.

## Actual cleanup
- Removed two fully superseded Home rules: `.discoverTop` and `.discoverTop h3` from the original base style block; later `v47-home-redesign` rules define the same properties and additional flex wrapping.
- Removed three superseded declarations from `.discoverCard`: `margin-top`, `border`, `border-radius`; retained grid layout, spacing, padding, background and mobile layout.
- Removed two Candidate143 Song Select card-row rules for base and hover styling because Candidate99 later defines the same selector groups and overrides the declarations.
- Removed superseded declarations from Candidate53 Song Select layout: old grid-card min-height/padding/gap; old cover flex-basis/width/height; old subtitle font size; old filter control font size; old panel-head margin-bottom.
- Style blocks changed: 3 (`style-0`, `candidate143-measured-reference-alignment`, `candidate53-songselect-layout-correction`). No JavaScript, route, storage, multiplayer, or learning-system code changed.

## Size and structure
- HTML reduction: 2,030 bytes (0.122%).
- CSS rules: 3,439 → 3,430 (-9).
- CSS declarations: 12,194 → 12,171 (-23).

## Tests
- JavaScript syntax: **PASS 68/68**.
- CSS parsing: **PASS**, 0 errors.
- Duplicate DOM IDs: **PASS**, 0.
- Script contents unchanged: **PASS**.
- Non-style HTML exactly unchanged: **PASS**.
- Chromium computed-style comparison: **PASS 6/6**, zero differences. Home and Song Select at 1440×900, 768×1024 and 390×844. Synthetic dynamic Home/Song Select elements were injected into both versions to exercise changed selectors; scripts were disabled for this CSS-isolation test.
- Full application E2E: **NOT RUN**. This is isolated CSS regression, not full app/browser acceptance.

## Rollback and risks
- Roll back to Candidate306 SHA-256 `ac39a87d0ebc3c50f89754cae95cd62518a659a7c354075d6d1be6b6edc4de7e`.
- Formal baseline Candidate302 remains immutable and unchanged.
- This batch did not consolidate global player, multiplayer, quiz or learning-system styles. Similar-looking declarations with different selector specificity, conditions or dynamic state dependencies remain untouched.
- Candidate307 HTML remote upload is **BLOCKED** with current tools; report/status files can be published, but that does not establish the HTML is on GitHub.

## Next batch
Continue Home/Song Select by looking for same-selector duplicate declarations and legacy blocks with verified no-longer-used tokens. Do not repeat full selector counts. Keep scope on route-specific styles; leave global workspace/player and other modules alone unless dependency evidence is separately established.
