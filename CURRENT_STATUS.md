# CURRENT STATUS — Candidate 187 (experimental)

- Recovery baseline remains Candidate 178, per the user's explicit choice; Candidate 205 was unavailable.
- Preserved lineage: Candidate 178 -> Candidate 183 -> Candidate 184 -> Candidate 185 -> Candidate 186 -> Candidate 187.
- Candidate 187 is an experimental, non-accepted local artifact: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_187_import_overlay_route_fix.html`.
- Candidate 186 remains unchanged: SHA-256 `cedf5ee3ff107a04443a899b3e92ede5daf2c513d083b93fb622caca1c9843aa`.
- Candidate 187 size: 9,301,631 bytes. SHA-256: `fd0c20698f7251f351aceecf8051d1a8784d91aac9232f5573c1316f8fa7cf83`.
- Change: the AniList/MAL action in the workspace no longer calls `__aniNavigateApp('watchlist')` before opening the existing `syncModal`. It now opens the existing import modal in place and focuses the username field. This addresses one concrete cause of leaving the Song Select workspace when invoking that action; it does not complete the shared workspace architecture.
- PASS: 66 executable inline JavaScript blocks checked with `node --check`; 0 syntax errors. Script-tag balance checked (68 opening / 68 closing). Local artifact SHA-256 and byte size recorded.
- NOT RUN: native browser route/modal interaction test; live API import; player positioning; freeze reproduction; cover fetch/retry; keyboard behavior; persistent custom-list CRUD/reload; osu!stable geometry/pixel comparison.
- BLOCKED in this environment previously: Chromium navigation to `file://` and local HTTP returned `ERR_BLOCKED_BY_ADMINISTRATOR`. No claim of browser acceptance is made.
- NOT COMPLETED: full shared in-place modal workspaces, requested player position, full freeze fix/acceptance, live API/audio checks, pixel comparison, HTML upload and remote SHA-256 verification.
- Rollback: use unchanged Candidate 186. Candidate 187 is not accepted and must not replace the baseline.
