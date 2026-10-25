# Candidate346 Core Regression: Static Preservation Smoke

- Artifact: `amq_learning_tool_v82_86_57_candidate346_batch50_remove_orphaned_local_helpers_20261026.html`
- Size: 1,625,225 bytes
- SHA-256: `dfef81df1572219d2b96b5f8eeeb50696acfe99a0fced53b6c83371f930c99ca`
- Overall result: **PASS for static marker presence only**.
- Browser interaction: **BLOCKED** (`ERR_BLOCKED_BY_ADMINISTRATOR`).
- Full core regression: **NOT RUN**.

## Results
- PASS AMQ mode/source markers: `AMQ`=3843, `aniCustomPracticeListsV1`=9
- PASS EMQ loader/API markers: `emq-data.js`=1, `__aniEmqAPI`=70, `aniEmqWorkListsV8254`=3
- PASS MIX mode marker: `MIX`=142
- PASS quiz submit and question flow: `__aniQuizSubmitV47`=5, `ani-quiz-new-question`=19
- PASS audio/video player: `audioPlayer`=30, `videoPlayer`=17, `nextQuiz`=19
- PASS custom list store: `customListsStoreV1`=13, `aniCustomPracticeListsV1`=9
- PASS backup/restore paths: `backup`=67, `restore`=54
- PASS workspace state/content APIs: `__amqWorkspaceSidebarOpen`=2, `__amqWorkspaceContentOpen`=16
- PASS workspace action routing: `data-ws-action`=16, `data-ws`=42
- PASS multiplayer lifecycle: `WebSocket`=6, `heartbeat`=7
- PASS main navigation event: `ani-app-navigation`=32

## Scope limitation
This is a static source-presence smoke test, not a functional test. Marker presence does not prove that AMQ/EMQ/MIX, custom-list persistence, backup/restore, playback, workspace routing, or multiplayer behavior works.

## Required next validation
Run the browser interaction matrix in a usable browser environment. Until then, keep corresponding functional tests marked BLOCKED or NOT RUN and do not promote Candidate346.
