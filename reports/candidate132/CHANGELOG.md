# Change log — Candidate 132

Parent: Candidate 130 (`9085754d5b6d8b1463709c25a97402a217e8ddb07afb9e4beb5d14dd1fbc3916`). Remote Candidate 131 is preserved as a distinct artifact.

- Replaced fixed 60px Song Select catalog rows with container-derived sizing: seven full cards and half of the eighth at all three desktop acceptance viewports.
- Added a procedural dark fallback background for the no-custom-background state using CSS gradients and faint diagonal lines only.
- Preserved the custom scene image layer; no external artwork, screenshot crop, or fabricated song/player data was used.
- Added per-row distance metadata around the selected song; natural song order remains unchanged.
- Selected row shifts 7px left with 2px top/bottom margins; hover shifts a non-selected row 3px left.
- Fixed the cover max-height constraint and old fixed card-body height.
- Edited existing Song Select style/runtime owners; no new stylesheet block was appended.
