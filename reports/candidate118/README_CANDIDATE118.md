# AMQ 學習工具 Candidate 118

- HTML: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_118.html`
- Size: 9,235,643 bytes
- SHA-256: `bb1536744bea764ecf9cb010a6cb1f23fcea2ab69f809193125c695ba9404163`
- Source Candidate 117 SHA-256: `c5542b9769c70e4fb8b74044c7bf09bbe76121df1418321bef803d55bc9b5b8b`

## Change
Fixed the existing Candidate 114 player-layout reset's route race. `ani-app-navigation` can fire before the Song Select body class is updated. The old reset could reapply the homepage player class/styles after the player had moved out of the homepage slot. The reset now checks the app's active view and re-checks it before delayed callbacks.

## Verification
- Browser assertions: 16 PASS / 0 FAIL.
- Inline JavaScript syntax: 62 scripts, 0 errors.
- CSS: 90 style blocks, 2,569 qualified rules, 0 parse errors.
- ZIP integrity: PASS.
- Home ↔ Song Select: 4 complete cycles; player uses `amqHomeDock` only on Home and restores correctly.
- Home main icon opens exactly 開始遊戲、歌曲選擇、設定.
- Song Select search, sort, six filter controls, four mode toggles, selected-song info, batch selection, list management and learning plan entry detected.
- Dashboard entry opens populated dashboard and exits Song Select route.

Not verified: live AniList/MAL/VNDB imports, real audio playback, durable persistence after an actual browser reload, full osu!stable pixel comparison, HTML binary upload and remote SHA-256 verification.

Rollback: Candidate 117, SHA-256 `c5542b9769c70e4fb8b74044c7bf09bbe76121df1418321bef803d55bc9b5b8b`.