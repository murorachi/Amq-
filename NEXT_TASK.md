# Next task

Current checkpoint: **V82.86.04 critical cross-fragment ownership audit**. Branch `v82.86.04-critical-cross-fragment-ownership-01`.

## Verified scope
- Mapped the quiz answer globals and state/player bridge, AMQ custom-list adapter, EMQ list membership/combinePool wrapper, and the parallel storage-repository/direct-localStorage paths.
- Added `tests/unit/critical_cross_fragment_dependency_contract.py` to lock the explicit source boundaries.
- No product source or generated HTML was changed.
- CI acceptance for this stage is pending until the branch run is inspected.

## Backlog
- AMQ-TODO-007 In Progress: selected critical cross-fragment calls mapped; not all 75 cross-fragment edges are resolved.
- AMQ-TODO-008 In Progress: high-impact quiz/list/storage interfaces classified; not all 577 unresolved/global records are resolved.
- AMQ-TODO-010 In Progress: AMQ animeIds and EMQ work/VNDB/song ID path mapped through selection/pool adapters; full CRUD/reload/backup matrix remains open.

## Next bounded work
1. Build a dedicated AMQ/EMQ ID boundary matrix across create/edit/delete, persistence, reload, backup/restore and invalid-scope handling.
2. Keep real audio-provider timing/failure/pause/resume acceptance separate from mocked playback tests.
3. Do not broadly refactor, change storage formats, or remove compatibility paths until these tests pass.

## Rollback
Revert the V82.86.04 report, contract, backlog/status updates and workflow change. Product rollback is not required.
