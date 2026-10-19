# V82.85.32 non-audio mirror-listener dedup candidate audit

## Decision

**Rejected for production consolidation. Documentation-only stage.** The input-mirror handlers in `src/scripts/script_008.htmlpart` and `src/scripts/script_009.htmlpart` look redundant at first glance, but the surrounding event contracts are not identical.

## Baseline and source evidence

- Branch: `v82.85.28-next-audio-state-reset-dedup-01`.
- Audit baseline HEAD: `78ded6791e9591c4b4cce1529f10bb0f474a03bc`.
- CI for the baseline documentation commit [39296906101](https://github.com/murorachi/Amq-/actions/runs/39296906101): **PASS**, all three jobs completed successfully.
- `script_008.htmlpart` blob SHA: `e4326ea74be7809eddbde1c8b641b17582365c28`.
- `script_009.htmlpart` blob SHA: `f75ba7631e11386a37788de8614ae589b3573904`.

## Candidate behavior

Both modules attach an `input` listener to `#quizAnswer` that copies `input.value` into `#v36Answer`. That line of work is duplicated.

However, the surrounding ownership and event behavior diverge:

1. `script_008.htmlpart` owns the authoritative Enter submission capture handler, the submitted-state flag, and the `quiz-v35-answered` listener. On `ani-quiz-new-question`, it clears the mirror unconditionally and resets the local submitted state.
2. `script_009.htmlpart` is a later layout/legacy cleanup module. On `ani-quiz-new-question`, it clears the mirror and then immediately calls `sync()`, restoring the current input value. It also handles `ani-quiz-answer-submitted` separately.
3. The two new-question listeners therefore have observably different outcomes if the input still contains text when the event fires. Removing either listener or merging their responsibilities could change what is shown in the answer mirror.
4. Both listeners are installed by separate self-executing modules and have no shared lifecycle owner. A helper extraction alone would not remove the duplicated event registration without changing ownership or event timing.

## Test and validation record

- Static source inspection: **PASS** for identifying both input listeners and tracing their neighboring event handlers.
- Focused regression test: **NOT RUN / NOT ADDED** because the candidate was rejected before production modification; no behavior change is proposed.
- Product source or manifest changes: **NONE**.
- Generated HTML/package rebuild: **NOT RUN**, not applicable to this documentation-only decision.
- Browser/manual interactive acceptance: **NOT RUN** for this audit.
- CI for this new documentation commit: pending at commit time; update this record after checking the triggered run.

## Risk and rollback

No product behavior changes. The existing event timing ambiguity remains and should not be “fixed” by a mechanical dedup extraction. Roll back by reverting this report and the matching `CURRENT_STATUS.md`, `BASELINE.md`, and `NEXT_TASK.md` updates. Preserve V82.82 and the current product candidate unchanged.

## Next step

Inspect one additional non-audio candidate only. If it also lacks a clearly equivalent, low-risk extraction, stop the bounded dedup audit and return effort to product feature work rather than turning cleanup into an endless project.
