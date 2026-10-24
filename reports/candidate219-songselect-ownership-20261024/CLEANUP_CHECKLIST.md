# Candidate219 cleanup checklist

- [x] Verify Candidate212 original size/SHA and preserve an identical rollback HTML.
- [x] Remove Candidate84 relabel-only script and Candidate105 no-reader marker.
- [x] Remove duplicate list-level keyboard listener and retain delegated owner.
- [x] Make row checkbox checked state derive from batch-selection Set.
- [x] Move the Set to the owning IIFE scope; Candidate214 scope regression caught and fixed in Candidate215.
- [x] Route Enter through the canonical row-selection/playback function.
- [x] Static validation: JS 66/66 PASS; CSS 108 blocks / zero parser errors.
- [x] Runtime mock validation: 180 rows, ArrowDown delta 1, Enter calls playback once, batch checked state persists through search rerender, zero page/console errors.
- [x] Update and read back BASELINE.md, CURRENT_STATUS.md, NEXT_TASK.md on this branch.
- [ ] Upload local HTML and verify remote size/SHA; BLOCKED because connector has no local-file upload action.
- [ ] Native file launch, persistent storage reload, real audio, IndexedDB Blob, live API, multiplayer and pixel tests.
- [ ] Integrate unique batch actions into list management before deleting the old batch workspace/runtime.
- [ ] Complete owner/caller map for remaining duplicate CSS, observers, timers, storage and route logic.
