# AMQ Learning Tool Baseline Record

## Verified starting point

- Baseline file: `amq_learning_tool_v82_85_46_workspace_proto44-inline-card-filter_96.html`
- SHA-256: `52cbaa536cc728d202431214cdf1181dbbb1c14fa68279a61a126bfa69181de2`
- Size: 9,154,988 bytes
- Candidate 96 was preserved and not overwritten.

## Candidate 97 local release artifact

- File: `amq_learning_tool_v82_85_46_workspace_proto44-list-removal-catalog_97_release.html`
- SHA-256: `3a94d6e137748f6ba8f836615e9a4c8e5654b915c447b9a3a5029b6501807e6d`
- Size: 9,160,167 bytes
- Parent baseline: Candidate 96 above.
- The standalone HTML is currently local only. It has not been uploaded to this branch, so this record does not claim a remote HTML hash match.

## Change scope

1. Added independent removal controls for AniList and MAL imported anime statuses.
2. Added a VNDB local-list removal control that does not erase anime watch states.
3. Improved import validation, empty-list handling and duplicate-record handling.
4. Removed the obsolete `批次整理` workspace entry and replaced it with `圖鑑`; hid the old batch-organizer panel from the UI. Legacy DOM remains temporarily because old handlers assume those controls exist.
5. Corrected workspace action routes, import modal stacking and stale dock-panel visibility.
6. Restored parked workspace content on route changes.

## Rollback

Use Candidate 96 above. Candidate 97 is separately named and does not overwrite the baseline.
