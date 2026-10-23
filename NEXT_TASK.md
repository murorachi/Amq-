# NEXT TASK — Continue Candidate 187 Work

1. Keep Candidate 187 experimental; retain Candidates 178, 183, 184, 185 and 186 unchanged.
2. Trace and fix remaining workspace actions that navigate to legacy pages instead of staying in the Song Select workspace. Audit each action's dependencies before altering behavior.
3. Complete the shared in-place modal/workspace architecture for the four left-rail actions; verify close, Escape, backdrop, back navigation, and no stale overlay.
4. Move the audio player to the user's specified position between left-side learning statistics and the back control; verify desktop and narrow viewport geometry.
5. Reproduce and fix the reported top-right freeze, with a functioning browser if available. Current environment's native Chromium navigation was blocked with ERR_BLOCKED_BY_ADMINISTRATOR.
6. Verify cover fetch, failure/retry, keyboard selection, custom-list create/add/remove/filter/reload persistence, live AniList/MAL/VNDB APIs and real audio in a persistent browser origin.
7. Measure against the 2555×1438 osu!stable reference with geometry and pixel/region comparison. Do not claim a visual-fidelity percentage without measurements.
8. Run dependency inventory before deleting legacy controls/handlers. Keep redundant batch organization removed; do not restore old navigation.
9. Run script syntax checks and applicable functional tests; report PASS / FAIL / NOT RUN / BLOCKED separately.
10. Upload the final single-file HTML and updated docs to GitHub, then fetch the remote artifact and verify exact version and SHA-256. No HTML upload or remote hash verification has been completed yet.
11. Candidate 187 local SHA-256: fd0c20698f7251f351aceecf8051d1a8784d91aac9232f5573c1316f8fa7cf83. Rollback to Candidate 186 if this narrow change causes regressions.
