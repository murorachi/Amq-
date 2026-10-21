# Next Task

**Priority 1: integrate Song Select around the existing catalog and song-selection logic.**

1. Preserve the current candidate and existing behavior as the immutable baseline.
2. Map actual song/work data fields, mode filters, search/sort handlers, song-row click behavior, player APIs, and the four workspace button handlers.
3. Add failing acceptance assertions for the requested integrated layout before changing UI.
4. Implement the smallest complete UI change: left workspace navigation, selected-song metadata, horizontal anime/VN work rows, real search/filter/sort/mode behavior, persistent bottom player, and detail entry.
5. Route 清單管理、批次整理、學習中心、學習分析 into four panels within the same Song Select workspace, reusing existing functionality.
6. Run static checks, focused Playwright interactions, responsive layout checks, and existing regression tests.
7. Capture fixed 1440×900 and 390×844 screenshots; compare with the osu!stable reference and record limitations.
8. Produce a uniquely named single-file HTML and verify SHA-256, size, and remote commit contents.
9. Only after Song Select reaches a reviewable, operable state, proceed to homepage and Options adjustments.

Do not claim visual similarity percentages without measured comparison evidence.
