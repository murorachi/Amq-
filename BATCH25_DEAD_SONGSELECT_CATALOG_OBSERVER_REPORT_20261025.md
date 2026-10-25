# Batch 25: Remove dead Song Select catalog observer

- Source Candidate319 SHA-256: `744cca7a6134e454916d46a9a32522e16b80c3f787d8aab4596852421b5b5f54`.
- Candidate320: `amq_learning_tool_v82_86_31_candidate320_remove_dead_songselect_catalog_observer_20261025.html`, 1,645,470 bytes, SHA-256 `134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`.
- Removed one Candidate103 MutationObserver watching `.p32-catalog[style]`. Its callback only calls `fix()`, which does not write to the catalog; route body-class observer already calls the same fix when route state changes. Preserved body observer, audioPlayer observer and all other layout/audio/video/button behavior.
- PASS: JS syntax 67/67; CSS parse 0 errors (3,423 rules / 11,425 declarations); duplicate DOM IDs 0; isolated Chromium regression 2/2.
- Full-app E2E NOT RUN. GitHub HTML upload and remote SHA verification NOT VERIFIED. Candidate320 is not promoted; formal baseline remains Candidate302 (SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`).
- Skipped/NEEDS CONFIRMATION: Candidate103 and Candidate114 entire scripts were not removed because they retain distinct player/dock/layout responsibilities. Candidate114 retry timers may compete with other initializers; no evidence yet that they are safely removable.
- Next: continue lifecycle and owner consolidation, prioritizing provably dead observers/listeners and duplicate initializers. Preserve uncertain items as NEEDS CONFIRMATION and continue other safe items.
