# Baseline checkpoint: V82.85.17 extraction; historical technical-debt inventory is next

- Branch: `v82.85.13-real-audio-acceptance-gate-01`.
- Latest full acceptance run: [39189657895](https://github.com/murorachi/Amq-/actions/runs/39189657895), source commit `4652a97c6e358710bbe9584cdc2147764e06d5a7`.
- Source/unit: PASS, including source fingerprints, deterministic baseline build, V82.85.12 candidate build and all registered contracts.
- Firefox responsive: PASS.
- Chromium native storage/custom-list, isolated custom-list UI regression, IndexedDB/quiz input, quiz suggestions and answer/playback lifecycle: PASS.
- Multiplayer room/phase/live-draft/reconnect: PASS.
- Only failed check: real-browser audio monitor PCM threshold. PulseAudio self-test was non-silent, browser decode/playback lifecycle was valid, but monitor capture remained peak=0 / RMS=0.0. Leave as a deferred CI capture/routing issue; do not lower threshold or claim product playback failure from this alone.
- V82.85.17 extracted `quizAnswerAliasTooltipTextV8239()` to `src/modules/quiz_answer_alias_tooltip_text.htmlpart`. No standalone product HTML was replaced.
- V82.85.12 candidate: 8,787,574 bytes / SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`. Immutable V82.82: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Next: stop routine extraction; begin a read-only technical-debt inventory and rank evidence-backed duplication/patch cleanup candidates.
- Rollback V82.85.17 extraction independently if necessary. Keep V82.82 immutable.
