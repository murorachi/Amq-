# NEXT TASK

1. Resolve the strict osu!stable reference gate: verify the official repository/source location, a source/version identifier demonstrably corresponding to Stable 20260924.1, the exact commit SHA, and the actual UI source files and contents. The public `ppy/osu` repository is lazer and must not be substituted.
2. Continue investigating the upstream `ppy/osu-stable-reference` repository and other official evidence. A SHA mentioned in an upstream issue is not proof that it maps to Stable 20260924.1.
3. Keep the pinned official osu!-wiki pages and screenshot assets as secondary, traceable visual evidence only. They are not proven captures from Stable 20260924.1 and do not satisfy the source/version gate by themselves.
4. Do not change candidate HTML/CSS/JS or start formal UI implementation while the source/version gate is BLOCKED.
5. Once the gate is resolved, compare the pinned Proto24 candidate against stable main menu, Play menu, Song Select, and Options at matching viewport dimensions; record measurable geometry/typography/asset differences before implementation.
6. Keep all work on a new isolated branch. Do not overwrite Proto17, Proto24 accepted-delivery-02, production V82.82, or read-only V82.85.30.
7. Before any production promotion, run dedicated real-audio output acceptance, quiz-answer lifecycle regression, and multiplayer lifecycle regression.
