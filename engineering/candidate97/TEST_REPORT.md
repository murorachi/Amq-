# Candidate 97 Acceptance Report

## Artifact fingerprint

- Local artifact: `amq_learning_tool_v82_85_46_workspace_proto44-list-removal-catalog_97_release.html`
- SHA-256: `38a298083e5c32fe15b6aeed98eceddb3fce9990e651aabaaac0124fc80e9540`
- Size: 9,160,008 bytes
- Baseline Candidate 96 SHA-256: `52cbaa536cc728d202431214cdf1181dbbb1c14fa68279a61a126bfa69181de2`

## Passed

- Static validation: 56 JavaScript blocks, 0 syntax failures; 83 CSS blocks, 0 parse errors; required control assertions 5/5.
- Main Chromium suite: 20/20:
  - startup/workspace shape;
  - repeated routes without duplicate components;
  - workspace switching and import-modal cleanup;
  - DOM stability after route/workspace transitions;
  - anime catalog work expansion, song selection and paging;
  - independent AniList/MAL and VNDB list removal;
  - AniList/MAL/VNDB mocked success, duplicate handling, empty-list and permission/error cases;
  - custom-list create/add, fresh-page storage carryover, filter, member removal and list deletion;
  - post-CRUD DOM quiet-window observation.
- Workspace action suite: 5/5. The five actions opened the expected import, custom-list, VNDB-list, VN-catalog and anime-catalog views.
- Catalog suite: 2/2. Mocked image elements reached naturalWidth 100; VN work expansion and 180-to-360 card paging passed.
- Internal visual comparison at 1440x900: home screenshot had no pixel differences from Candidate 96; catalog changed-pixel ratio at threshold 12 was 0.1606%, largely attributable to the dock label/width change.

## Not run / limitations

- Real `file://` and localhost navigation was blocked by the environment.
- Origin-backed localStorage persistence was not tested; the reload carryover used an in-memory Storage shim.
- Live AniList/MAL/VNDB endpoints and live cover hosts were not tested; deterministic API/image responses were mocked.
- Official osu!stable screenshot comparison was not run because the pinned reference image could not be retrieved.
- Physical-pointer hit-testing of every workspace action control is not fully accepted; action handlers were dispatched through DOM click events.
- The standalone HTML is not present in this GitHub branch yet. A remote HTML SHA-256 match has not been verified.

## Decision

The mocked static/browser integration checks pass. This is not a full real-origin or official osu!stable visual acceptance. Candidate 96 remains the rollback baseline.
