# BASELINE — AMQ Song Select

## Current experimental checkpoint: Candidate 211 (NOT ACCEPTED)
- Local HTML: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_211_layout_scroll_focus.html`
- Size: 9,352,687 bytes
- SHA-256: `4ba1ded70e46e6c437628150be3c86bad045a070f49a84ba50dac7d02465c53b`
- Parent Candidate 210 SHA-256: `92f3e6353bd9e9d72d148037cd710818e25d514ce6c2ed57642e2ab248f6ec5f`
- This is an experimental local artifact. It has not been uploaded as an HTML file and is not an accepted baseline. Rollback to Candidate 210 or the unchanged direct source Candidate 207.

---

- No accepted final release exists for the current osu!stable Song Select refactor.
- Recovery baseline Candidate 178 SHA-256: b91109c7c660be064cedf76b20e473b12ca415be8e0650f16d8086339c2a9f80.
- Direct source Candidate 207: 9,310,496 bytes; SHA-256 2f3a092a139628daa48bc113d2a192f41e2d7474182471ed926de3de49fd6100. It remains unchanged.
- Candidate 208: rejected; SHA-256 0943bfde66d0f19e5d004f4ec70c7eea44c51bceede7864e893a64051ba720bf.
- Candidate 209: rejected; SHA-256 8a38e08cfb904703c02b7911b7974c8c3d6fc3617bacc6b6b85ef29e8d90ded1.
- Candidate 210 is an experimental local checkpoint rebuilt directly from Candidate 207. Current size 9,347,601 bytes; SHA-256 92f3e6353bd9e9d72d148037cd710818e25d514ce6c2ed57642e2ab248f6ec5f. Not accepted.
- Browser tests use Playwright set_content with an in-memory storage shim because the environment blocks file:// and localhost navigation. Durable localStorage persistence is not verified.
- Static checks: 68 executable inline JS blocks pass node --check; 107 CSS blocks / 2,745 qualified rules parse with zero tinycss2 errors; two inherited lxml structure warnings remain.
- Runtime corrections: Song Select row grid placement and dimensions; EMQ/MIX default-category render cost. Verified search, repeated mode switching, three cycles of four-workspace open/Escape-close, row selection/autoplay path, mouse-wheel centered selection, player button clicks, and synthetic random-seek hook.
- Remaining: real cover success/failure against external network, actual audio/random seek, native file-origin persistence, exhaustive Back matrix, pixel-region acceptance.
- GitHub HTML upload and remote SHA-256 readback are blocked by the available transfer interface and unavailable container DNS/network. No remote HTML hash is claimed.
- Preserve prior candidates. Rollback means discarding Candidate 210 and returning to unchanged Candidate 207; never overwrite Candidate 207.