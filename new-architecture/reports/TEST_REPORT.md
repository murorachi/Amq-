# Test report — NEW_ARCH_V0.1.0_FOUNDATION_01

- `node --test tests/*.test.cjs`: **9 passed, 0 failed**.
- Covered empty-state isolation, song validation, answer normalization, quiz settlement, invalid-backup rejection, backup round-trip, deterministic build, JSON import deduplication/unique IDs, and settings validation.
- `python tools/build.py` executed twice: both outputs were 50,807 bytes / SHA-256 `ed9de6758477e39e7a94f6698669d32076b54883f3b3b92f7f31114b8091c54d`.
- Browser interaction acceptance: blocked/not completed. `file://` navigation returned `ERR_BLOCKED_BY_ADMINISTRATOR`; Playwright `set_content` subsequently terminated with `EPIPE`. No browser interaction assertion is counted as passed.
- Not run or not implemented: real-origin storage reload, Firefox, real audio, multiplayer networking, spaced-repetition scheduling, full catalog completeness.
- This is a foundation vertical slice, not full product acceptance.