# Candidate 97 Acceptance Report

## Artifact fingerprint

- Local artifact: `amq_learning_tool_v82_85_46_workspace_proto44-list-removal-catalog_97_release.html`
- SHA-256: `3a94d6e137748f6ba8f836615e9a4c8e5654b915c447b9a3a5029b6501807e6d`
- Size: 9,160,167 bytes
- Baseline Candidate 96 SHA-256: `52cbaa536cc728d202431214cdf1181dbbb1c14fa68279a61a126bfa69181de2`

## Passed

- Static validation: 56 JavaScript blocks, 0 syntax failures; 83 CSS blocks, 0 parse errors; required-control assertions 5/5.
- Main Chromium mock-integration suite: 15/15 passed:
  - startup and four-workspace shape;
  - eight repeated route transitions without duplicate workspace/dashboard nodes;
  - workspace switching and import-modal cleanup;
  - source-specific AniList/MAL/VNDB removal;
  - AniList/MAL/VNDB mocked import success, duplicate, empty and error paths.
- Core route/DOM stability: 4/4 passed.
- Custom-list CRUD/reload carryover: 6/6 passed in an isolated fresh-page suite.
- Independent source-import matrix: 8/8 passed.
- Workspace actions: 5/5 passed.
- Catalog covers and paging: 2/2 passed. VN work expansion and 180-to-360 paging passed with mocked image responses.
- Internal 1440x900 comparison: home screen pixel-identical to Candidate 96; catalog changed-pixel ratio 0.1606% at threshold 12.

## Incomplete / not run

- A monolithic run combining import scenarios and custom-list filtering stalled at the stage transition. The same CRUD/reload cases pass when isolated; long-session acceptance is still open.
- Real `file://` and localhost navigation was blocked. Reload carryover used an in-memory Storage shim, not origin-backed localStorage.
- Live AniList/MAL/VNDB endpoints and live cover hosts were not tested.
- Official osu!stable screenshot comparison was not run because the pinned reference image could not be retrieved.
- Physical-pointer hit-testing of every workspace action is not fully accepted; feature actions used DOM click dispatch.
- The standalone HTML has not been uploaded to this branch. A remote HTML SHA-256 match has not been verified.

## Decision

Grouped static and mocked browser checks pass. This is not full real-origin, live-API or official osu!stable visual acceptance. Candidate 96 remains the rollback baseline.
