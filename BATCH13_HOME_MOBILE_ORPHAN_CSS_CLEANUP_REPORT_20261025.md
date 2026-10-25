# Batch 13 — Home mobile orphan CSS cleanup

- Source Candidate307 SHA-256: `f2c080906ef9f2db6367286401dda0fc0181dae6041549402384180724d47aa6` (1,665,250 bytes).
- Candidate308 SHA-256: `89e7829e8228e3b4ed1061657e6c2f7245496e4dd6e158344a6c6c76518b4d67` (1,665,019 bytes).
- Removed 7 old mobile rules for `.heroMain`, `.heroMain h2`, and `.daily` from the original style block. These exact tokens were absent from HTML and inline JavaScript. CSS rules 3,430 → 3,423; declarations 12,171 → 12,161; file reduced 231 bytes.
- PASS: JS syntax 68/68; CSS parse 0 errors; duplicate IDs 0; script contents unchanged; non-style HTML unchanged; Chromium computed style 6/6 desktop/tablet/mobile scenarios, zero differences.
- Full-app E2E NOT RUN. Candidate308 remains unpromoted. Candidate HTML remote upload BLOCKED; formal baseline remains Candidate302.
