# NEXT TASK — Proto25 UI Refactor

1. Confirm stage-02 Actions build, browser acceptance, screenshots, candidate HTML and SHA-256 manifest. Repair CI wiring if no run or artifact exists.
2. Review the main menu and workspaces at the same viewport as the pinned official Wiki references; record visual deltas and avoid unsupported similarity percentages.
3. Reconstruct the Play menu using the existing AMQ route handlers. Required labels: Single Player, Multiplayer, Back. Do not create dead buttons.
4. Restyle the existing song/catalog view to match osu!Stable Song Select composition while preserving AMQ/EMQ/MIX/Singer filtering, search, sorting, selection, details and playback.
5. Align Profile and Settings panels, including current account/stats, light mode, scene/background, database update and backup import/export.
6. Add browser acceptance for Play, Song Select, Profile, Settings, keyboard focus, mobile layout, and console errors.
7. Run audio output, full quiz-answer lifecycle and multiplayer lifecycle regressions. Record PASS / FAIL / NOT RUN precisely.
8. At each completed stage, publish a separate candidate and report to an isolated GitHub checkpoint, verify remote files and SHA-256, and retain rollback to Proto24. No production promotion without explicit final acceptance.
