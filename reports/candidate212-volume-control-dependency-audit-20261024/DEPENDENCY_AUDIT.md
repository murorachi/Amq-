# Candidate212 volume-control dependency audit

Date: 2026-10-24
Working baseline: Candidate212

## Baseline integrity
- File: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_212_mutation_loop_fix.html`
- Size: 9,352,632 bytes
- SHA-256: `52376c693c5c0701d77e80a6076620623ef9ef5decadd11265d6b57bcf6c6952`
- The source file was read only; no baseline modification was made.

## Located implementation sites
1. `#v44-submit-pipeline-and-volume` begins at source offset 5,302,161 and ends at 5,304,958 (2,744 script characters). It exits if `#quizView` is absent. If `#v44VolumeControl` is absent, it creates the control, loads `aniQuizVolume`, attaches the `input` handler, applies volume to `#audioPlayer`, and creates a `MutationObserver` to reapply volume when DOM mutations occur.
2. `#v82-35-single-player-reveal-video` begins at source offset 5,734,822 and ends at 5,742,779 (7,901 script characters). It also exits if `#quizView` is absent. It creates the media toolbar, moves an existing `#v44VolumeControl` into that toolbar, or otherwise creates a fallback control with a separate `input` handler.
3. The dynamic `#quizView` construction is found earlier at source offset 5,144,605, about 157 KB before the V44 script. The V82.35 media-controls script is about 432 KB after V44.

## Evidence-based assessment
- In the ordinary script order, `#quizView` is constructed before V44 executes, and V44 precedes V82.35. V44 therefore has the opportunity to create the volume control before V82.35 moves it.
- This supports treating the V82.35 fallback builder as a probable duplicate path, but does **not yet prove it is safe to delete**. V44 may fail to create the control if an unexpected DOM/exception condition occurs; the fallback may have been intended as recovery. Also, the V44 MutationObserver is broad and long-lived, which should be reviewed separately rather than silently removed during this change.
- The two implementations are not behavior-identical: V44 sets `muted = (volume === 0)`, while the fallback handler always sets `muted = false`; V44 applies volume immediately and reacts to mutations, while the fallback does not install the same observer. Blind deletion or naïve consolidation could alter mute behavior.

## Decision
Classification: **Integrate / Needs verification**.
Do not delete the fallback until runtime evidence establishes whether V44 control creation can fail while the root remains available, and tests verify volume 0, non-zero volume, persisted preference, audio element replacement, and toolbar placement.

## Tests
- PASS: source offsets, implementation blocks, root creation position, baseline byte size and SHA-256 verified by local script.
- NOT RUN: browser execution of both paths, audio volume/mute behavior, mutation-driven audio replacement, and real reload persistence.
- BLOCKED: the current browser workflow previously blocked `file://` and localhost navigation; no browser-runtime claim is made.

## Safe next action
Add a single shared volume-control factory/initializer only after the browser lifecycle path is confirmed, or retain the fallback but make its event behavior consistent with the primary implementation. Keep Candidate212 untouched and produce a new uniquely named candidate for any code change.
