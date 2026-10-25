# Batch 12 — Home / Song Select cross-block CSS consolidation

- Source Candidate306 SHA-256: `ac39a87d0ebc3c50f89754cae95cd62518a659a7c354075d6d1be6b6edc4de7e` (1,667,280 bytes).
- Candidate307 SHA-256: `f2c080906ef9f2db6367286401dda0fc0181dae6041549402384180724d47aa6` (1,665,250 bytes).
- Removed 9 superseded CSS rules / 23 declarations, reducing HTML by 2,030 bytes. Scope: Home discover heading/card styles and Song Select legacy card/layout declarations. Three style blocks touched; no JavaScript or non-style HTML changed.
- PASS: JS syntax 68/68; CSS parse 0 errors; duplicate IDs 0; scripts unchanged; non-style HTML byte-identical; Chromium computed style 6/6 desktop/tablet/mobile scenarios, zero differences, including representative synthetic Home/Song Select nodes.
- Full-app E2E NOT RUN. Candidate307 is unpromoted; formal baseline remains Candidate302. Candidate HTML remote upload BLOCKED.
