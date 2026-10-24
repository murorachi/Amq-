# NEXT_TASK.md

## Highest-value next work
1. Establish a reliable supported path to publish the exact Candidate283 HTML (9,379,765 bytes) to a browser-accessible URL. Do not substitute older v82.85.30 or v82.85.46 artifacts.
2. Verify the remotely served HTML version marker, exact byte count and SHA-256 `aa1af13d2ff9419968ba92f382c75e0fd65d0ae4b72957331a1b488f65d74a0b`.
3. Use TinyFish cloud browser to test page initialization, Song Select route, Dock visibility/expand/collapse, VNDB import routing, song-batch routing, close/back cleanup, console errors and screenshots.
4. Verify custom-list CRUD and persistence after reload in independent browser contexts.
5. Test AniList/MAL and VNDB import failure recovery and deduplication.
6. Capture fixed-viewport screenshots and computed styles for homepage, Song Select and Dock before any CSS deletion or merge.
7. After browser evidence, refactor Dock display to one owner and remove duplicated rules in small, tested groups.
8. Update status, baseline, test reports and rollback records; commit documentation and then the verified artifact without overwriting immutable baselines.

## Current blockers
- Candidate283 is local-only; current remote branch has only v82.85.30 and v82.85.46 HTML.
- Browser interaction acceptance is BLOCKED until the exact file is available to the cloud browser.
