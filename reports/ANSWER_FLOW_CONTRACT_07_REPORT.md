# Answer-flow contract — checkpoint 07

Added `tests/unit/answer_flow_contract.test.cjs`, executing exact `skipUnplayedQuizQuestionV80`, `classifyQuiz`, and `submitQuiz` source with synthetic DOM/audio/history/familiarity dependencies.

Cases: pre-play submission gate; timer expiry before playback; correct anime answer; title-target answer without familiarity mutation; EMQ song/work ID handoff; duplicate settlement prevention; wrong answer; manual skip after playback.

Result: 8 passed, 0 failed. Existing `history_status_isolation.test.cjs` separately executes the actual history-record function and verifies EMQ source/work metadata and song-ID familiarity.

Isolation: no real browser profile, LocalStorage, IndexedDB, network, audio device, or multiplayer server is accessed. This is not browser/audio end-to-end coverage.
