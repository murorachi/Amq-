# Answer-flow contract — checkpoint 07

## Scope

Added `tests/unit/answer_flow_contract.test.cjs`, which executes the exact `skipUnplayedQuizQuestionV80`, `classifyQuiz`, and `submitQuiz` function source from `src/scripts/script_004.htmlpart` with synthetic DOM, audio state, history, and familiarity dependencies.

## Cases and assertions

1. Ordinary answer before successful playback: no answer-submitted event, no history record, no familiarity mutation.
2. Timer expiry before playback: follows the unplayed path, emits one unplayed event, and does not create answer history or familiarity state.
3. Correct anime-target answer after playback: history is recorded once after the question is marked finished; song ID is used for familiarity; answer event indicates valid audio and familiarity update.
4. Title-target answer: history is recorded but work-recognition familiarity is unchanged.
5. EMQ answer: the handoff preserves EMQ song/work IDs and uses the EMQ song ID for familiarity. Existing `history_status_isolation.test.cjs` separately executes the real history-record function and verifies `source='emq'`, `workKind='visual_novel_game'`, work title, and aliases.
6. Finished question cannot be recorded twice.
7. Wrong answer after playback records an incorrect result and sets familiarity to heard.
8. Manual skip after playback records the supported incorrect/skip result.

## Result

`node tests/unit/answer_flow_contract.test.cjs`: 8 passed, 0 failed.

## Isolation and limitations

The test uses an in-memory VM and synthetic dependencies. It does not access a real browser profile, LocalStorage, IndexedDB, network, audio device, or multiplayer server. It is an exact-source contract test, not a browser/audio end-to-end test.
