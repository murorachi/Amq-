# Candidate 147 visual audit — 2026-10-23

## Scope
One change from Candidate 145: the `updateDistances()` row-width array, to match the visible right-side song-card staircase in the supplied fixed reference. Candidate 145 remains the baseline; Candidate 147 is experimental and not accepted.

## Evidence
- Candidate SHA-256: `85b0f97c5f6bad71e0d162b830af6964a74a170b3a63401eed1604b8ed7b64bd`; size: 9,268,392 bytes.
- Reference image SHA-256: `f0fd3ab5ec11e87632d95aac0ab7b9df3595c96e20bb03c5201d012d613b99a4`.
- Candidate row left-edge estimates: [1048.2, 1017.9, 1017.9, 903.3, 1017.9, 1017.9, 1048.2, 1040.7] px. Reference visual estimates: [1054, 1025, 1025, 910, 1013, 1013, 1042, 1042] px. Mean absolute horizontal error is approximately 5.5px, versus 89.0px for Candidate 145. This is a manually estimated geometry comparison, not a pixel-perfect claim.
- Candidate 147 keeps the 7.5 visible-row viewport and selected-row/hover interaction behavior.
- Whole-image SSIM is 0.300940 and MAE is 56.0497. These did not improve versus Candidate 145 (SSIM 0.304511, MAE 54.6926); card geometry improved horizontally while other visual differences remain.

## Decision
Do not accept Candidate 147. The measured horizontal staircase is substantially closer, but vertical card positions, top filters, background/artwork, and bottom control composition remain mismatched. Continue with a geometry-only investigation before another visual edit.
