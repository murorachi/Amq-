# Candidate 83 Change Log

## Goal
Function-first follow-up to Candidate 82. Visual styling is intentionally not a target for this stage.

## Changes
- VN personal-list action now targets the dedicated `#vnListView` only; it no longer falls back to the anime catalog if that node is missing.
- After the VN list is mounted, invoke the existing local-list reload control (or dispatch a search input event as fallback) so the view refreshes using its existing data/rendering path.
- Catalog/batch panel mounting dispatches an input refresh event to the existing catalog search control after portal setup.
- Custom-list and watch-status panels finish switching the existing mode tab before focusing/refreshing the corresponding controls.
- No data-apply button is auto-clicked; batch changes remain explicit user actions.

## Artifact
- File: `amq_learning_tool_v82_85_33_workspace_proto31_function-first_83.html`
- Size: 9,126,730 bytes
- SHA-256: `f6f10c5a0e9dceadf3618b3db94daac1f6d5c4e737048fda98f21177c69451bd`
- Parent: Candidate 82 (`amq-candidate82-function-first`)
- Rollback: Candidate 82 or immutable Candidate 76.

## Scope limitation
This is an activation/lifecycle fix, not completion of all eight feature modules. Data mutation end-to-end and real-origin tests remain outstanding.