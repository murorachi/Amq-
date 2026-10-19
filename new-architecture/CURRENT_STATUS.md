# Current status — independent new architecture

Checkpoint: `NEW_ARCH_V0.1.2_HOME_WIKI_REBUILD_01`.

- Parent: `NEW_ARCH_V0.1.1_OSU_STABLE_UI_01`, preserved unchanged locally.
- Scope: rebuilt only the home/main-menu composition from the official osu! stable Interface Wiki. The new layout uses a prominent cookie-like focal element on the left, aligned route menu on the right, user/status area at the top, and tip/local status at the bottom.
- Reference: https://osu.ppy.sh/wiki/en/Client/Interface and https://osu.ppy.sh/wiki/zh/Client/Interface.
- Routes preserved: practice, catalog, lists, learning, stats and settings. Core data rules and legacy AMQ were not changed.
- Automated tests: 10 passed, 0 failed.
- Deterministic build: passed twice. HTML 66,041 bytes; SHA-256 `e13d8b96169c91227d7fac2b8cc28bafa7d8c44930e6199e637fb49fe15e8c03`.
- Chromium `set_content` smoke test: desktop 1440×900 and mobile 390×844; 5 menu controls, catalog navigation works, no mobile horizontal overflow. Direct `file://` and localhost navigation are blocked in this environment, so double-click/localStorage acceptance is not verified.
- Pixel-measured comparison and user visual acceptance remain pending. Do not proceed to song select until home is accepted.
- **GitHub publication is documentation-only at this commit. Source modules and generated HTML have not been uploaded or verified.**
- Existing AMQ: untouched and not integrated.
