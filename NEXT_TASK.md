# Next task

Current checkpoint: V82.85.9 multiplayer lifecycle browser contract, accepted.
CI: https://github.com/murorachi/Amq-/actions/runs/39117608560

Architecture decision:
- Do not extract submitQuiz/classifyQuiz wholesale yet. They couple answer normalization, audio-validity gates, history, familiarity, events, timer settlement, and reveal UI.
- Do not extract the multiplayer room/session lifecycle wholesale. Polling, state rendering, REST actions, WebSocket team drafts, and dual audio decks share one mutable state object.
- CSS remains a separate workstream.

Next stage:
1. Extend the quiz browser contract for incorrect answers, anime-target familiarity updates, timer-driven settlement, explicit skip, and auto-next. Preserve the existing successful-answer, no-audio, history, reveal-continuity, and teardown assertions.
2. Run all source/unit and browser gates. Product HTML must remain byte-identical to V82.82.
3. After those branches are covered, choose one narrow helper boundary for extraction; do not combine answer settlement, playback timers, and multiplayer state into one change.

Rollback: v82.85.8-quiz-answer-playback-lifecycle-test-01; product baseline remains V82.82.
