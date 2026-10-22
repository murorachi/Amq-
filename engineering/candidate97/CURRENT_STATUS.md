# AMQ Learning Tool Current Status

## Candidate

- File: `amq_learning_tool_v82_85_46_workspace_proto44-list-removal-catalog_97_release.html`
- SHA-256: `3a94d6e137748f6ba8f836615e9a4c8e5654b915c447b9a3a5029b6501807e6d`
- Size: 9,160,167 bytes
- Baseline: Candidate 96, SHA-256 `52cbaa536cc728d202431214cdf1181dbbb1c14fa68279a61a126bfa69181de2`

## Implemented

- AniList and MAL each have an explicit removal action for imported anime statuses.
- VNDB local imported list has an explicit removal action.
- Removing one imported source preserves other sources and manual statuses.
- Missing AniList collections are errors rather than successful empty imports.
- MAL empty lists are non-destructive; malformed and permission-denied responses are handled.
- Duplicate anime IDs in AniList/MAL imports and duplicate VNDB IDs are skipped.
- The obsolete `批次整理` workspace is replaced by `圖鑑`.
- The old batch-organizer panel is hidden. Its legacy DOM is retained temporarily because unguarded handlers still assume those controls exist; physical source-code removal is a follow-up cleanup.
- Workspace actions open the existing custom-list manager, import controls, anime catalog and VN catalog.
- Import modal stacking, stale dock visibility and parked-view route cleanup were corrected.

## Verification evidence

- Static checks: 56 JavaScript blocks, 0 syntax failures; 83 CSS blocks, 0 parse errors; 5/5 required-control assertions.
- Main Chromium mock-integration suite: 15/15 passed, 0 uncaught page errors.
- Core route/DOM suite: 4/4 passed, including eight route transitions and a quiet-window mutation check.
- Custom-list CRUD/reload suite: 6/6 passed in isolated fresh pages.
- Independent AniList/MAL/VNDB import suite: 8/8 passed.
- Workspace action suite: 5/5 passed.
- Catalog cover/expansion/paging suite: 2/2 passed, including 180-to-360 paging.
- Internal screenshot comparison at 1440x900: home screen pixel-identical to Candidate 96; catalog changed-pixel ratio 0.1606%.

## Remaining gaps

- A monolithic test run stalled when transitioning from importer tests to custom-list filtering. The same CRUD/reload cases pass in an isolated context. Long-session acceptance remains open.
- Real `file://` execution and origin-backed browser localStorage persistence were blocked by the current environment; reload carryover used an in-memory Storage shim.
- Live AniList/MAL/VNDB APIs and live cover hosts were not tested.
- Official osu!stable reference screenshot comparison was not run.
- Workspace action handlers were dispatched through DOM click events; physical-pointer hit-testing of every action control is not fully accepted.
- The standalone HTML is not uploaded to this branch yet. Remote HTML size/SHA verification remains pending.
