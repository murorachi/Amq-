# AMQ Learning Tool Current Status

## Candidate

- File: `amq_learning_tool_v82_85_46_workspace_proto44-list-removal-catalog_97_release.html`
- SHA-256: `38a298083e5c32fe15b6aeed98eceddb3fce9990e651aabaaac0124fc80e9540`
- Size: 9,160,008 bytes
- Baseline: Candidate 96, SHA-256 `52cbaa536cc728d202431214cdf1181dbbb1c14fa68279a61a126bfa69181de2`

## Implemented

- AniList and MAL each have an explicit removal action for imported anime statuses.
- VNDB local imported list has an explicit removal action.
- Removing one imported source preserves other sources and manual statuses.
- Missing AniList collections are reported as errors rather than successful empty imports.
- MAL empty lists are non-destructive; malformed and permission-denied responses are handled.
- Duplicate anime IDs in AniList/MAL imports and duplicate VNDB IDs are skipped.
- The obsolete `批次整理` workspace is replaced by `圖鑑`.
- Workspace actions open the existing custom-list manager, import controls, anime catalog and VN catalog.
- Import modal stacking, stale dock visibility and parked-view route cleanup were corrected.

## Test results

- Static checks: 56 JavaScript blocks checked, 0 syntax failures; 83 CSS blocks checked, 0 parse errors; required-control assertions 5/5.
- Main Chromium integration suite: 20/20 passed, 0 uncaught page errors.
- Workspace action suite: 5/5 passed.
- Catalog cover/expansion suite: 2/2 passed.
- Internal screenshot comparison at 1440x900: home screen pixel-identical to Candidate 96; catalog changed-pixel ratio 0.1606%, mainly the dock label/width change.

## Limitations

- `file://` and localhost navigation are blocked in the current browser environment. Fresh-page persistence used an in-memory Storage shim, not origin-backed browser localStorage.
- AniList, MAL and VNDB responses were mocked. Live API behavior and real third-party availability are not claimed.
- Cover pipelines were exercised with mocked API/image responses.
- Official osu!stable reference screenshot comparison remains unverified because the pinned reference image could not be retrieved.
- Workspace feature-action tests used DOM click dispatch; physical pointer hit-testing of every action control is not fully accepted.
- The 9.16 MB HTML has not been uploaded to this branch; remote artifact/hash verification is pending.
