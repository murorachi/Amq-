# Baseline checkpoint: V82.85.17 extraction; technical-debt audit is next

- Branch: `v82.85.13-real-audio-acceptance-gate-01`.
- Latest inspected result: run [39189090958](https://github.com/murorachi/Amq-/actions/runs/39189090958), head `4796e2a387542d6b4534589577035c6da4aa7041`.
- Source/unit and Firefox jobs passed. Native storage/custom-list, IndexedDB/quiz input, quiz suggestion and answer/playback lifecycle checks passed. Only the real-browser PCM output assertion failed: self-test signal was non-silent (peak 6999 / RMS 4103.6), while browser capture was zero (peak 0 / RMS 0.0). This is an unresolved CI capture/routing gate, not proof that product playback is broken.
- Multiplayer test was skipped due to earlier audio-step failure; follow-up workflow changes it to run regardless so the test has an independent result.
- V82.85.17 exact-source extraction: `quizAnswerAliasTooltipTextV8239()` -> `src/modules/quiz_answer_alias_tooltip_text.htmlpart`; new contract is included in CI.
- V82.85.12 candidate: 8,787,574 bytes / SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`. Immutable V82.82: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Work direction: stop extracting small helpers merely to increase module count. Proceed to historical-code duplication/patch debt audit, then bounded refactors with regression coverage.
- Rollback extraction commit `96f949b43a9168c499d8f8600ffec8efcadd78e8` if necessary; keep V82.82 immutable.
