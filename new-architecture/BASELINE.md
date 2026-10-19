# Baseline — independent new architecture

- Checkpoint: `NEW_ARCH_V0.1.2_HOME_WIKI_REBUILD_01`.
- Parent baseline: `NEW_ARCH_V0.1.1_OSU_STABLE_UI_01`, preserved unchanged.
- Scope: independent implementation only; legacy AMQ remains separate.
- Reference: official osu! stable Interface Wiki, https://osu.ppy.sh/wiki/en/Client/Interface and https://osu.ppy.sh/wiki/zh/Client/Interface.
- Change scope: home view markup, home-specific CSS, version label, tests and project records. Song select and other pages are unchanged.
- Source of truth locally: `src/`; build: `python tools/build.py`; tests: `node --test tests/*.test.cjs`.
- HTML: 66,041 bytes; SHA-256 `e13d8b96169c91227d7fac2b8cc28bafa7d8c44930e6199e637fb49fe15e8c03`.
- Tests: 10/10 passed. Browser smoke test completed via `set_content`; direct file-origin storage behavior remains unverified due environment restrictions.
- User visual acceptance: pending. Do not mark home accepted until reviewed.
- Remote publication currently contains project records only, not the source modules or HTML.
