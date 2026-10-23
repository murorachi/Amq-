# NEXT TASK — Root-cause workspace integration

1. Keep Candidate 189 experimental and preserve all earlier candidate artifacts.
2. Fix the workspace architecture before polishing isolated buttons: the current dock contains only `lists` and `learning`, while the sidebar action map still invokes legacy `watchlist` and `practice` routes in some paths.
3. Define the intended four workspace destinations from existing real UI nodes and route all actions through the shared Song Select content panel. Do not add placeholder workspaces or revive the removed batch-organization workspace.
4. Test each workspace open/switch/close, Escape, focus restoration, repeated switching, and confirm the Song Select stage remains active without duplicate panels or event handlers.
5. Then verify custom-list CRUD/reload persistence, AniList/MAL and VNDB import errors, cover recovery, player placement/playback, keyboard Enter, and screenshot geometry.
6. Run native browser acceptance when the environment permits. Mark opaque-origin localStorage and blocked file navigation as BLOCKED, not PASS.
7. Only after the route tests pass, create a uniquely named candidate, update the validation report and these handoff docs, upload the HTML, then read back and compare remote version, size, and SHA-256.
