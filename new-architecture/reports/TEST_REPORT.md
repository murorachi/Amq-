# Test report — NEW_ARCH_V0.1.1_OSU_STABLE_UI_01

- `node --test tests/*.test.cjs`: 10 passed, 0 failed.
- Coverage includes core song/quiz/backup/settings behavior and UI structure assertions that home uses the game-style composition and song select uses a track list/detail panel rather than a generic table.
- `python tools/build.py` run twice: 64,114 bytes; SHA-256 `04c8f2e6d62a039442ed6dccce22ba1ee6674ea05d579723e27ea53c947faa63` both times.
- Browser visual acceptance not completed; headless Chromium attempt timed out. No screenshot comparison is claimed.
- Not verified/not implemented: real-origin storage reload, Firefox, real audio, multiplayer networking, spaced-repetition scheduling, pixel-measured screenshot comparison.
- This is a visual-direction correction checkpoint, not full product acceptance.