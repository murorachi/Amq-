# V82.85.33 final bounded non-audio dedup audit

## Decision

**Stop the historical dedup audit. No production changes. Return to product feature development.**

The second candidate was dock visibility synchronization in `src/scripts/script_012.htmlpart` and `src/scripts/script_013.htmlpart`. The repeated shape is real, but the handlers do not have the same ownership or restoration contract.

## Baseline and source evidence

- Branch: `v82.85.28-next-audio-state-reset-dedup-01`.
- Baseline HEAD: `125ae0b8ec6ba07aedd65caade25edd875c77718`.
- `script_012.htmlpart` blob SHA: `693fc4b0985b502346bc6ab689ae5357f47bd9e0`.
- `script_013.htmlpart` blob SHA: `eabb3336517eb96ec4f8547fddf197b7ebfaa31d`.

## Candidate behavior and rejection reason

Both modules observe `document.body` class changes and hide `#audioDock` while `quiz-mode` is active.

Differences prevent a safe mechanical merge:

1. Script 012 captures the initial inline display value in a local constant and also runs a capture-phase click listener with a deferred resync.
2. Script 013 persists the original inline display in `dock.dataset.v43OriginalDisplay`, then observes class changes independently.
3. The two observers can coexist and both write `dock.style.display`; the restoration source and the extra click resync are different.
4. Removing one observer or sharing a helper would alter initialization/restoration ownership unless the intended contract is first redesigned and tested. That would exceed a bounded dedup task.

This is not a recommendation to leave the overlap forever. It is a decision not to change lifecycle behavior under the guise of a text cleanup.

## Stage record

- Static source inspection: **PASS**. Both listeners and their surrounding state/restoration behavior were read.
- Focused regression test: **NOT RUN / NOT ADDED**; no product behavior was changed.
- Product build, source fingerprint update, browser test, and manual interaction acceptance: **NOT RUN**, because this was a rejected candidate and documentation-only stage.
- Product source, manifest, generated HTML, release artifacts, and immutable V82.82: **unchanged**.
- Prior docs CI run [39296906101](https://github.com/murorachi/Amq-/actions/runs/39296906101) passed all three jobs. The CI run for this report's commit must be checked separately.

## Audit stop condition met

Two consecutive non-audio candidates were rejected for concrete behavioral/ownership differences:
- V82.85.32: answer-mirror listeners in scripts 008 and 009 differ on new-question synchronization.
- V82.85.33: dock visibility listeners in scripts 012 and 013 differ in display-state ownership and deferred resynchronization.

Stop historical dedup scanning here. Do not continue searching for superficial repetitions just to keep the cleanup activity alive. Resume product feature work from the existing backlog and keep the verified audio acceptance closed.

## Rollback

This is documentation-only. Revert this report and the matching `CURRENT_STATUS.md`, `BASELINE.md`, and `NEXT_TASK.md` updates. No product artifact needs rollback.
