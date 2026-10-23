# Candidate 170 Visual Audit — 2026-10-23

## Basis
- Primary reference: user-provided `image.png`, 2555×1438, showing osu!stable Song Select.
- Official cross-check: `ppy/osu-wiki` pinned at `8c585eea35455a4bd255f93b5d59ccaf807e6bdd`, `wiki/Client/Interface/img/song-selection.jpg`, Git Blob SHA-1 `1e927a00a1984a5ba20fa5efec639410f349607a`.
- Candidate: Candidate 170, local SHA-256 `089d8cb9f6e63178a9726dbfce9485c8691e81d3600ce5669458a26c7a9d5662`.
- Candidate screenshot: `candidate170_1280x720_acceptance_rerun.png`, 1280×720. This is a structural/geometry audit, not a registered pixel-perfect diff because the reference and candidate are captured at different viewport sizes and display conditions.

## Findings

### P0 — Overall Song Select composition does not match the reference
The reference uses a full-screen beatmap-background scene. Ranking/player records overlay the left side, song/difficulty rows overlay the right side, metadata occupies the upper-left edge, and controls occupy a shallow bottom dock.

Candidate 170 instead shows a legacy AMQ navigation/workspace panel on the left, a largely empty central region, and a separate catalog column on the right. The central background-scene composition and overlay relationship are absent. Widening the catalog cannot correct this structural mismatch.

### P0 — Left column is the wrong content
Candidate screenshot exposes profile, AniList/MAL import, VNDB import, custom-list management, study-plan, and statistics panels. These are legacy workspace/navigation content, not the reference's ranking/player-record overlay. Song Select's main screen should not be consumed by the old navigation stack.

### P1 — Right catalog geometry is only partially corrected
Candidate 170's catalog reaches the viewport's right edge and uses stacked rows, but the catalog is still laid out as a distinct right-hand pane. The reference's list visually overlays the background and overlaps the central scene; its selected row, surrounding rows, and horizontal offsets are part of the composition. Width alone is not sufficient.

### P1 — Header/control hierarchy differs
Candidate has search and filter controls at the top of the catalog and an AMQ player dock at the bottom. The reference has song metadata at the top-left, list-category/sort controls at the top-right, and the game controls/player information arranged across a shallow bottom bar. These areas need to be placed within one Song Select scene rather than independently positioned panes.

### P1 — Interaction-state visual audit still incomplete
Existing automated checks established that ArrowDown changes the selected inline song and AMQ/EMQ switching changes the records. They did not verify reference-matched hover displacement, selected-row treatment, keyboard Enter behavior, scroll affordance, or bottom control alignment. Do not treat these as passed.

## Root cause assessment
The next fix should target the Song Select route's parent layout/ownership and stage composition, not append another catalog-width override. Inspect which legacy sidebar/workspace shell remains visible when `amq-songselect-route-active` is set, and make the Song Select scene own the viewport background, left ranking overlay, right catalog overlay, metadata, and bottom dock. Preserve existing list/import/study functionality behind the appropriate internal workspace controls; do not delete features as a side effect of the visual refactor.

## Test status
- PASS: Existing Candidate 170 static syntax checks and `page.set_content` interaction checks recorded in the Candidate 170 local acceptance JSON.
- PASS: Screenshot inspected at 1280×720; primary reference inspected at 2555×1438.
- NOT RUN: Registered pixel-diff score. Different viewport sizes and unregistered scene/layout mean a raw pixel metric would be misleading without first aligning capture dimensions and scene state.
- BLOCKED: Native `file://` and local HTTP navigation both returned `ERR_BLOCKED_BY_ADMINISTRATOR` in the browser environment.
- NOT RUN/BLOCKED: Persistence/custom-list reload, live API/cover loading and recovery, real audio playback, and full CRUD lifecycle.
- Candidate 170 remains experimental and is not an accepted baseline.

## Next action
Fix the root Song Select parent composition in a new uniquely named candidate. Do not overwrite Candidate 170. Re-run responsive geometry and interaction checks, then capture at the reference's 2555×1438 viewport before reporting pixel/geometry comparison.
