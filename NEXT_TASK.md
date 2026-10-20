# Next Task

1. Keep this accepted Proto17 branch as the rollback point; do not overwrite the pinned source commit.
2. For the next UI phase, perform reference-based visual comparison of the Learning Center and Learning Analysis screens before changing styling.
3. Run the browser acceptance workflow after each scoped UI change.
4. Keep real audio output acceptance as a separate test gate; this workflow does not claim to validate audio playback.

## Explicit next action and completion gate (handoff 2026-10-21)

**Next action:** inspect this branch's workflow/test inventory and the exact candidate HTML path, then compare the Learning Center and Learning Analysis screens against the already supplied Osu reference images. Do not start with CSS edits until the discrepancies are written down.

**Complete only when:**
- the candidate HTML and source pin are identified from actual branch files and hashes;
- the visual discrepancy list maps each requested UI requirement to a concrete screen/region;
- only the scoped UI differences are changed, with no unrelated functionality revived;
- browser acceptance is rerun and its actual assertions/results are recorded;
- audio output is tested through its separate real-output acceptance gate, or explicitly remains blocked/not run;
- the candidate remains a separate version and the pinned source artifact is unchanged.

**Handoff safety rules:**
- Never call the packaging run a UI acceptance pass.
- Never claim the whole UI is “90%” or complete without screenshot/reference comparison evidence.
- Keep baseline, runtime/browser, storage, audio, and visual-fidelity results as separate gates.
- If branch head, candidate HTML path, or test results conflict, stop and document the conflict rather than choosing a convenient version.
- Rollback: return to this branch's accepted commit/checkpoint and pinned source commit `4fc4a099389b59850c46d3eab2332be3401d487a`; do not force-push or overwrite the baseline.
