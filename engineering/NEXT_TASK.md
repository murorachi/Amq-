# Next Task

Priority: unblock real-browser validation. Chromium navigation is blocked by ERR_BLOCKED_BY_ADMINISTRATOR on file:// and localhost; find an approved browser/runtime route or supported CI browser artifact.

Candidate 54 acceptance checklist:
1. At 1440x900, 1280x720, and 390x844, verify Song Select fills viewport without shrink/clipping.
2. Verify compact top-left song metadata.
3. Verify central scene is free of automatic work artwork and remains compatible with custom scene backgrounds.
4. Verify catalog rows, covers, text, filters, search, and scrolling are readable.
5. Verify no legacy sidebar or duplicate entry remains visible/clickable.
6. Verify all four workspace modes work in place without Song Select collapsing or routing away.
7. Verify home, settings, playback dock, and back-navigation regressions.
8. Capture screenshots and geometry; compare only with verified osu!stable evidence, not osu!lazer.

Fix browser-discovered regressions before further styling. Attempt HTML upload to this isolated branch when a verified artifact upload route is available. Never claim upload/hash verification without evidence.
