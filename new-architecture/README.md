# AMQ Learning Tool — Independent New Architecture

Checkpoint: `NEW_ARCH_V0.1.1_OSU_STABLE_UI_01`.

This is an independent UI implementation track. It must not import, execute, patch, or depend on the existing AMQ application. Integration remains out of scope until the legacy codebase is re-evaluated and both projects pass separate acceptance gates.

This checkpoint corrects the main menu and song selection layout to follow the agreed osu! stable-inspired direction. It is not a claim of pixel-perfect recreation: reference screenshot measurement and browser visual acceptance remain pending. The quiz screen must follow AMQ's established interaction direction, and results should use the approved osu!-inspired hierarchy.

Build: `python tools/build.py`. Tests: `node --test tests/*.test.cjs`.

Important publication limitation: this branch currently contains checkpoint documentation only. The exact source modules and generated HTML are not uploaded; this is not a complete remote source release.