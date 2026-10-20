# NEXT TASK

1. Resolve the osu!stable visual-reference gate before changing any UI code: obtain a traceable screenshot set from Stable 20260924.1 at the target viewport, or record an explicit approved fallback to the pinned official osu!-wiki screenshots. Do not substitute osu!lazer source or claim the wiki screenshot is version-matched.
2. Once the reference gate is resolved, compare the current Proto24 candidate against the stable main menu, Play menu, Song Select, and Options at matching viewport dimensions. Record measurable geometry/typography/asset differences and a per-screen acceptance checklist before implementation.
3. Keep all work on a new isolated branch. Do not overwrite Proto17, Proto24 accepted-delivery-02, production V82.82, or read-only V82.85.30.
4. Before any production promotion, run dedicated real-audio output acceptance, quiz-answer lifecycle regression, and multiplayer lifecycle regression.
