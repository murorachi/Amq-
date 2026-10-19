# Test report — NEW_ARCH_V0.1.2_HOME_WIKI_REBUILD_01

- `node --test tests/*.test.cjs`: 10 passed, 0 failed.
- Core coverage: empty-state isolation, song validation, answer normalization, quiz settlement, invalid-backup rejection, backup round-trip, deterministic build, JSON import deduplication/unique IDs, settings validation.
- Home structure assertions: Wiki-inspired focal element, top user/status strip, practice/catalog/settings routes, and removal of the prior side stats/orbit/diagonal/numbered-menu structure.
- Chromium `set_content` smoke test: 1440×900 and 390×844; 5 menu buttons, catalog navigation works, no mobile horizontal overflow.
- Direct `file://` and localhost navigation blocked by environment (`ERR_BLOCKED_BY_ADMINISTRATOR`). Real double-click/localStorage behavior not verified.
- Pixel-measured comparison and user visual acceptance pending.
- Deterministic build passed twice: 66,041 bytes; SHA-256 `e13d8b96169c91227d7fac2b8cc28bafa7d8c44930e6199e637fb49fe15e8c03`.
- Existing AMQ untouched.
