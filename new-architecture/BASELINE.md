# Baseline — independent new architecture

- Checkpoint: `NEW_ARCH_V0.1.1_OSU_STABLE_UI_01`.
- Base checkpoint: local `AMQ_NEW_ARCH_V0.1.0_FOUNDATION_01`; v0.1.0 files remain unchanged.
- Scope: independent implementation only; no legacy integration.
- UI: osu! stable-inspired main menu and song-select composition; quiz should follow AMQ interaction direction; results visual work remains open.
- Build: `python tools/build.py`; tests: `node --test tests/*.test.cjs`.
- Local output size: 64,114 bytes.
- Local output SHA-256: `04c8f2e6d62a039442ed6dccce22ba1ee6674ea05d579723e27ea53c947faa63`.
- Local automated tests: 10/10 passed.
- Browser visual acceptance not completed.
- This checkpoint does not replace or modify the existing AMQ product baseline.
- Remote branch publication is documentation-only until exact source and HTML are uploaded.