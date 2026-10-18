# Next task

Current checkpoint: **V82.85.8 quiz answer/playback lifecycle browser contract, accepted**.
CI: https://github.com/murorachi/Amq-/actions/runs/39116682422

1. Build a separate real-browser multiplayer lifecycle acceptance harness with a controlled mock API/WebSocket. Cover waiting → preparing → running → paused → reveal → finished → leave/reconnect, including team-draft synchronization and dual audio-deck teardown.
2. Before extracting quiz lifecycle code, extend the current quiz browser contract to cover incorrect answers, anime-target familiarity updates, timer-driven settlement, explicit skip, and auto-next. Existing V82.85.8 coverage is a baseline, not complete coverage of every branch.
3. After quiz and multiplayer browser contracts are reliable, evaluate extraction boundaries for answer settlement, playback timers/media selection, and multiplayer room/session lifecycle. Do not mix those extractions together.
4. Keep CSS as a separate workstream.

Rollback: `v82.85.7-quiz-browser-acceptance-gate-01`; product baseline remains V82.82.
