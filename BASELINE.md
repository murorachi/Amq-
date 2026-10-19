# Engineering overlay: V82.85.17 quiz answer alias tooltip text extraction (CI pending; audio gate yellow)

- Parent: `57a65b5d572896e7ff458ce2794895e2d715af8d`; implementation commit: `96f949b43a9168c499d8f8600ffec8efcadd78e8` on `v82.85.13-real-audio-acceptance-gate-01`.
- Exact-source extraction of `quizAnswerAliasTooltipTextV8239()` into `src/modules/quiz_answer_alias_tooltip_text.htmlpart` at the original IIFE position.
- The helper reads current song/catalog/name APIs and assembles text only; it does not write application state or access DOM/storage/timers. AMQ related-work and EMQ policy behavior are preserved byte-for-byte.
- Focused contract is wired into the full runner and CI. Acceptance is pending.
- Prior run 39187359907: source/unit and Firefox responsive passed. Native-origin passed storage/custom-list and quiz lifecycle checks; PCM capture failed at peak=0 / RMS=0.0 despite non-silent PulseAudio self-test. Audio remains deferred; threshold unchanged.
- V82.85.12 candidate: 8,787,574 bytes / SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`. Immutable V82.82: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Rollback: revert implementation commit `96f949b43a9168c499d8f8600ffec8efcadd78e8` and its documentation checkpoint; do not overwrite V82.82.
