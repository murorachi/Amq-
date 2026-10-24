# NEXT_TASK.md

## Highest-value next work
1. Obtain a supported binary upload path or a public HTTPS URL for the exact Candidate283 HTML; the existing workflow only downloads from a URL.
2. Verify remote file version, size and SHA-256 before running browser tests.
3. Use TinyFish cloud browser to test page initialization, Song Select route, Dock visibility/expand/collapse, VNDB import routing, song-batch routing, close/back cleanup, console errors and screenshots.
4. Verify custom-list CRUD and persistence after reload in independent browser contexts.
5. Test AniList/MAL and VNDB import failure recovery and deduplication.
6. Capture fixed-viewport screenshots and computed styles for homepage, Song Select and Dock before any CSS deletion or merge.
7. After browser evidence, refactor Dock display to one owner and remove duplicated rules in small, tested groups.
8. Update status, baseline, test reports and rollback records; commit documentation and then the verified artifact without overwriting immutable baselines.

## Current blockers
- Candidate283 is local-only; remote branch currently has only v82.85.30 and v82.85.46 HTML.
- `.github/workflows/download-file-for-chatgpt.yml` requires a public HTTPS download URL; none is available for Candidate283 yet.
- Chromium file navigation in the current environment returns `net::ERR_BLOCKED_BY_ADMINISTRATOR`.
- The uploaded Candidate283 root `data-amq-candidate="280"` marker is not referenced by inline runtime source, but external/tooling semantics are NOT VERIFIED; preserve the artifact until clarified by evidence.
- Browser interaction acceptance is BLOCKED until the exact file is available to the cloud browser.
