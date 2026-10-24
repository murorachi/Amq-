# Handoff — Stage58 Candidate278

Continue from `amq_learning_tool_v82_85_92_candidate278_homepage_shell_inplace_play_menu_20261025.html` (SHA-256 `cd2fdb8f1f762c4a30f64f54e64ab530607a3a3fb1866f9275804c507df08bf1`), created from immutable Candidate277 (SHA-256 `b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371`).

Implemented: remove initial legacy home buttons; remove profile card from Home; move player to bottom rail; replace conflicting home size rules with one layout authority; single viewport; replace floating play modal with in-place SOLO/MULTI menu; synthesized click sound; animated sparkle accents and hover bounce only while audio is playing.

Not implemented: BPM-synchronized visualizer because BPM source/audio analysis is not verified.

Testing: 67/67 inline JS syntax PASS; 108 CSS stylesheets parse PASS; 271 static DOM IDs unique PASS. Browser runtime BLOCKED because Chromium timed out on `about:blank`.

Next: use permitted browser to test responsive geometry, Start Game replacement positions, Settings, SOLO/MULTI routes, Home reset, player dock lifecycle and click sound volume. Implement a real BPM visualizer only after verifying BPM data or a reliable beat analysis path. Upload/read back the HTML and verify remote SHA-256 when feasible.
