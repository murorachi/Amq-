# Next task — Candidate 97

1. Reproduce and isolate the combined Playwright/Node `EPIPE` with a minimal failing test and ensure test processes/browser contexts close cleanly. Keep isolated suites as the current verified checkpoints.
2. Run a real browser session in an environment that permits `file://` or localhost and verify page initialization, mutation stability, and origin-backed custom-list persistence.
3. Verify live AniList/MAL/VNDB APIs and actual cover hosts, including missing user, empty list, permission failure, network failure, deduplication, and recovery.
4. Pin an osu!stable reference version and exact screenshot/state/viewport; capture the candidate in the same state and compare geometry and interactions. Do not declare visual acceptance until discrepancies are measured and fixed.
5. Upload the final HTML plus engineering records to this Candidate 97 branch. Verify the remote file path, artifact version, file size, and SHA-256; keep upload verification separate from test status.
6. If any fix changes the HTML, create a new unique artifact name and rerun the affected isolated tests plus necessary regression tests. Never overwrite Candidate 96.