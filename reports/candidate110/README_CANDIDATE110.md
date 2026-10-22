# Candidate 110 handoff

## Scope
Fix song selection highlighting so it follows the actual selected song/work state instead of permanently styling the first DOM card.

## Changes
- Initial state keeps a first-row preview when no work is expanded.
- Clicking a work marks the expanded work with a pink active treatment, not the white song-selected treatment.
- The actual selected song row receives a white focus state, dark text, pink left accent, and -7 px horizontal movement.
- Switching work updates the active state; hover remains a separate transient style.

## Artifact
- File: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_110.html`
- Bytes: 9,220,277
- SHA-256: `27838d55b659818982fc55bb9d6de5664f6cef7d29a62ca4013e6fabc3a37d67`
- Parent: Candidate 109 -> Candidate 108. Candidate 104 remains preserved as an earlier rollback checkpoint.

## Tests
- Inline JS syntax: PASS, 60 blocks, 0 errors.
- Initial preview highlight: PASS.
- Active work highlight follows clicked work: PASS.
- Actual selected song row is white with dark text: PASS.
- Switching work moves active state: PASS.
- Hover dx=-7 px, dy=0, separate hover background: PASS.
- Browser page errors in focused run: PASS, none.
- Real remote audio: NOT VERIFIED.
- Durable storage across reload: BLOCKED/NOT RUN in sandbox.
- Pixel-perfect state match to osu reference: NOT CLAIMED; song/work content and page structure differ.

The HTML binary itself is not uploaded by this report-only connector action; remote HTML SHA verification remains pending.