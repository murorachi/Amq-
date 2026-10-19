# Current status — independent new architecture

Checkpoint: `NEW_ARCH_V0.1.1_OSU_STABLE_UI_01`.

- User visual acceptance: FAIL, 10/100. The delivered UI does not conform to the agreed reference specification. See `UI_SPEC_CONFORMANCE_AUDIT.md`.
- UI stage progression is frozen. Do not implement subsequent pages until the exact 13-stage specification and reference screens are reconciled page by page.
- The current home/song-select treatment is only an unverified stylistic approximation, not an accepted osu! stable reconstruction.
- Shared button dimensions and focus-visible behavior were standardized in the prior checkpoint, but that does not establish visual conformance.
- Automated tests: 10 passed, 0 failed.
- Build output: 64,114 bytes; SHA-256 `04c8f2e6d62a039442ed6dccce22ba1ee6674ea05d579723e27ea53c947faa63`.
- Browser visual acceptance: user tested and scored 10/100 (FAIL). The previous headless Chromium attempt timed out, so no screenshot-based comparison was completed before delivery.
- Real-origin storage reload, Firefox, real audio, multiplayer networking, and spaced-repetition scheduling remain unverified or unimplemented.
- Existing AMQ source and product were not modified.
- GitHub source/HTML publication remains open; documentation-only remote publication is not a complete source release.