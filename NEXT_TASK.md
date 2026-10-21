# Next Task

**Priority 1: complete and validate the Proto26 Song Select integration.**

Current checkpoint:
- Draft PR: https://github.com/murorachi/Amq-/pull/10
- Branch: `v82.85.30-proto26-song-select-integration-01`
- EMQ asynchronous readiness fix: `9e2a09bb365ae80d8e234ffb6f70f6767816ef97`.
- Proto26.5 keeps the four-workspace sidebar/dock visible and functional beside Song Select. Browser acceptance verifies all four panel selections.
- Passing GitHub Actions run: https://github.com/murorachi/Amq-/actions/runs/39550068389 (run #72); static and browser acceptance passed, and artifact/report commit succeeded.
- Accepted Proto26.5 HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_03.html`, 8,938,405 bytes, SHA-256 `aa7da030b6324526cbdd0497b71b1607b8c832497940f5041a1dad559f6e7d06`.
- Proto26.4 and Proto26.3 HTML remain previous rollback checkpoints. Current scope is still not a final osu!stable replica.

Next actions:
1. Keep workspace actions inside the Song Select view where feasible; currently the sidebar/dock and panel selections are integrated, but some existing actions still navigate to their original views. Reuse existing action handlers and data; do not fake or duplicate them.
2. Retrieve official osu!stable reference images and compare fixed-viewport screenshots, including the workspace sidebar, song list, and detail pane. Do not claim visual parity before evidence.
3. Preserve Proto26.5, Proto26.4, and Proto26.3 as immutable rollback checkpoints. Any next artifact must use a new versioned filename and pass static/browser acceptance before its hash is recorded.
4. Keep PR #10 draft and unmerged until in-place workspace action integration and visual comparison pass.
