# NEXT TASK — Proto25 UI Refactor

1. Verify that the isolated stage build workflow executes and publishes the Proto25 candidate and manifest to `v82.85.30-proto25-ui-refactor-stage-01`; if not, repair the workflow without touching Proto24 accepted-delivery.
2. Retrieve screenshots and test report; verify HTML parsing, inline JavaScript syntax, mobile overflow, home navigation, storage, and console errors.
3. Refine the home shell against the pinned official osu!-wiki main-menu screenshot at a matching viewport, recording differences rather than claiming an unsupported percentage.
4. Reconstruct Play navigation and map Single Player / Multiplayer / Back to real AMQ flows.
5. Rework the existing catalog as the Song Select surface, preserving search, sort, mode/source filters, song details, and playback handlers.
6. Align profile and Settings UI, including light mode, scene background, database update, and backup import/export.
7. Add per-screen browser acceptance and run audio-output, full quiz lifecycle, and multiplayer regressions before final delivery.
8. Keep every stage on isolated branches with a remote checkpoint, test report, SHA-256 manifest, and rollback reference. Do not promote to production automatically.
