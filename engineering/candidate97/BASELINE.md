# AMQ Learning Tool Baseline Record

## Verified starting point

- Baseline file: `amq_learning_tool_v82_85_46_workspace_proto44-inline-card-filter_96.html`
- SHA-256: `52cbaa536cc728d202431214cdf1181dbbb1c14fa68279a61a126bfa69181de2`
- Size: 9,154,988 bytes
- Candidate 96 was preserved and not overwritten.

## Candidate 97 local release artifact

- File: `amq_learning_tool_v82_85_46_workspace_proto44-list-removal-catalog_97_release.html`
- SHA-256: `38a298083e5c32fe15b6aeed98eceddb3fce9990e651aabaaac0124fc80e9540`
- Size: 9,160,008 bytes
- Parent baseline: Candidate 96 above.
- The HTML is currently a local release artifact. It has not yet been uploaded to this branch, so this commit does not claim a remote HTML hash match.

## Change scope

1. Added independent removal controls for AniList and MAL imported anime statuses.
2. Added a VNDB local-list removal control that does not erase anime watch states.
3. Improved import validation, empty-list handling and duplicate-record handling.
4. Replaced the obsolete `批次整理` workspace with `圖鑑`.
5. Corrected import modal stacking, workspace route actions and stale dock-panel visibility.
6. Restored parked workspace content on route changes.

## Rollback

Use Candidate 96 above. Candidate 97 is separately named and does not overwrite the baseline.
