# Batch 19 — Song Select layout-owner conflict cleanup

Source Candidate313 SHA-256: bd5d82c6d1a03e3d0e62622ebf22cf63d7636435bed469ed44efd9f8eba21c6a.
Candidate314: 1,647,472 bytes, SHA-256 e3e2afb98574aea5db9bc5ac94eaeba809b6ed3416999657463964eefab05d17. Formal baseline remains Candidate302.

The older Candidate103 layout runtime still wrote catalog bottom/height. Its catalog style observer reran that old fix after Candidate106's final layout owner. At 390px, this changed the final owner's mobile bottom=86px back to the old clamp value. This batch removes only Candidate103's catalog bottom/height writes and local variable, preserving its observer and all audio/video, dock, Back/Home and mode-wrap behavior.

Tests: PASS JS syntax 68/68; CSS parse 0 errors; duplicate IDs 0; isolated Chromium using the actual Candidate103+Candidate106 scripts at 390/768/1440px. Mobile bottom stays 86px; tablet/desktop use clamp(104px, 12.4vh, 180px); legacy audio/video remain hidden. Full-app E2E NOT RUN. Candidate HTML remote upload/hash NOT VERIFIED.

Rollback: Candidate313 bd5d82c6d1a03e3d0e62622ebf22cf63d7636435bed469ed44efd9f8eba21c6a; immutable formal baseline Candidate302 f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd.
