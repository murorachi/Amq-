# AMQ Learning Tool — Batch 3 handoff (2026-10-24)

Current status: Batch 3 is NOT complete. Do not start Batch 4.

## Candidate260
- File: `amq_learning_tool_v82_85_74_candidate260_workspace_css_and_batch_routing_fix_20261024.html`
- Size: 9,358,373 bytes
- SHA-256: `a19be956afdf10b50dc15bbc10b3c69408e42c8751a838fb8e61313d0d98ed1f`
- Static JavaScript, CSS, actual HTML ID, legacy CSS removal and import/batch routing checks: PASS.
- Browser acceptance: BLOCKED.
- Real import/remove API and data-scope tests: NOT RUN.
- GitHub HTML upload and remote SHA readback: BLOCKED; no remote HTML upload is claimed.

## Root causes repaired
- The import capture handler used to intercept `data-c99-action="vndb"`, which the left rail had repurposed for song-batch organization. It now intercepts only the actual import action.
- Removed obsolete `.amq210-import-choice` CSS and duplicate legacy import UI construction.
- Edited the existing workspace panel CSS and geometry function in place instead of adding another override.

## Required remaining Batch 3 work
1. Open Candidate260 in a native browser. Verify import opens the shared sync panel and song-batch opens the actual song-batch workspace.
2. Check desktop/narrow viewport geometry, four workspace switching/back behavior, DOM stability and stale-panel cleanup.
3. Verify batch search preserves selected IDs/checkbox state through filtering, close/reopen and workspace switching. It currently filters loaded/rendered rows only.
4. Verify custom-list create/add/remove/filter/persistence.
5. Test AniList/MAL/VNDB import/remove, invalid/private/empty usernames, cancellation, deduplication and API errors. AniList/MAL removal must affect only matching source-imported statuses; VNDB removal only its own local data.
6. Upload exact HTML to a unique `dist/` path on this branch; read it back and verify version, size and SHA-256. If unsupported, mark BLOCKED.
7. Update CURRENT_STATUS.md, BASELINE.md, NEXT_TASK.md, test report and handoff. Keep Candidate256/258/259 untouched. Do not start Batch 4 before Batch 3 acceptance.
