# Next Task

**Priority 1: complete and validate the Proto26 Song Select integration.**

Current checkpoint:
- Draft PR: https://github.com/murorachi/Amq-/pull/10
- Branch: `v82.85.30-proto26-song-select-integration-01`
- EMQ asynchronous readiness fix: `9e2a09bb365ae80d8e234ffb6f70f6767816ef97`.
- Proto26.4 persistent detail pane and catalog-scoped source controls are in `engineering/proto26-song-select/song-select-integration.js`.
- Passing GitHub Actions run: https://github.com/murorachi/Amq-/actions/runs/39549067049 (run #46); static and browser acceptance passed, and the artifact/report commit succeeded.
- Accepted Proto26.4 HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_02.html`, 8,937,515 bytes, SHA-256 `9d052a0557a021309a596bf0fcdb127389107dc9b08878e63d13b31c4d6d15af`.
- Proto26.3 HTML remains the previous rollback checkpoint. Current scope is still not a final osu!stable replica.

Next actions:
1. Integrate the four existing workspaces (list management, batch organize, learning center, analysis) into the same Song Select workspace without fake controls or duplicated state.
2. Retrieve official osu!stable reference images and compare fixed-viewport screenshots; do not claim visual parity before evidence.
3. Preserve Proto26.4 and Proto26.3 as immutable rollback checkpoints. Any next artifact must use a new versioned filename and pass static/browser acceptance before its hash is recorded.
4. Keep PR #10 draft and unmerged until workspace acceptance and visual comparison pass.
