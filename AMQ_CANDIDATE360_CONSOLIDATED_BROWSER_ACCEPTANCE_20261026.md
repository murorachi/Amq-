# Candidate360 consolidated browser acceptance

- Candidate: Candidate360
- Exact file: `amq_learning_tool_v82_86_71_candidate360_remove_redundant_arc_route_observer_20261026.html`
- File size: 1,610,053 bytes
- SHA-256: `9ac93c28ba456cfd4f5b7b1694d8178da9505c119fb52fff9fe8ae5bff31b923`
- Formal baseline: Candidate302 (immutable)
- Purpose: one final browser validation after bounded source-side cleanup.
- Current browser status: **NOT RUN**. Do not mark PASS without actually performing the interaction.

## Song Select route and layout
- [ ] NOT RUN: Enter/leave Song Select; no stale overlays or broken navigation. Notes: ______
- [ ] NOT RUN: Desktop stage, curved frame, catalog, filters and mode row align correctly. Notes: ______
- [ ] NOT RUN: Resize wide/narrow desktop and back; no duplicate geometry or horizontal overflow. Notes: ______
- [ ] NOT RUN: Mobile/narrow layout remains usable; curved frame follows responsive geometry. Notes: ______
- [ ] NOT RUN: Selected and hovered rows remain distinct; selected row remains visible. Notes: ______
- [ ] NOT RUN: Row actions, titles/metadata, cover art and inline AMQ/EMQ lists work. Notes: ______
- [ ] NOT RUN: Playback dock, play/pause, current C99 Back/Home controls work. Notes: ______
- [ ] NOT RUN: Workspace/sidebar/overlay behavior is correct; arc hides in workspace-active state. Notes: ______
- [ ] NOT RUN: Escape closes the expected settings/modal layer without accidental navigation. Notes: ______
- [ ] NOT RUN: Scene background settings remain accessible; removed quick-open shortcut does not reappear. Notes: ______
- [ ] NOT RUN: No duplicate legacy Back button or duplicate quick-open shortcut appears. Notes: ______

## Core regression
- [ ] NOT RUN: AMQ mode starts and questions load from the expected source. Notes: ______
- [ ] NOT RUN: EMQ mode starts and uses its expected source. Notes: ______
- [ ] NOT RUN: MIX mode starts and respects its source configuration. Notes: ______
- [ ] NOT RUN: Playback, pause/resume, skip/next and answer submit/reveal work. Notes: ______
- [ ] NOT RUN: Custom-list create/rename/delete/add/remove and reload persistence work. Notes: ______
- [ ] NOT RUN: Backup export, valid restore and invalid-restore data protection work. Notes: ______
- [ ] NOT RUN: Workspace switching and route/event state remain correct. Notes: ______
- [ ] NOT RUN: Multiplayer lifecycle works; if server/test room unavailable, mark BLOCKED and explain. Notes: ______

## Result summary
- PASS: ___
- FAIL: ___
- BLOCKED: ___
- NOT RUN: ___
- Browser/OS: ______
- Date: ______
- Exact file hash confirmed before testing: YES / NO
- Overall: PASS / FAIL / BLOCKED / NOT RUN

## Scope notes
- Candidate346's earlier user-reported 24/24 result does not validate Candidate360.
- Static JS/CSS checks are not browser acceptance.
- Candidate72 curved frame remains; only its redundant route observer and inline display writes were removed.
- Candidate115 artwork behavior remains for non-primary AMQ/EMQ inline lists.
- If any defect appears, record the step and observed behavior; do not promote Candidate360 until triaged.
