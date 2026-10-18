# Next task

Current checkpoint: `v82.85.12-multiplayer-leave-poll-race-fix-01`, CI pending.

1. Verify the newest GitHub Actions run. Confirm deterministic V82.85.12 build, unit/storage/backup contracts, all Chromium browser suites, Firefox responsive smoke, and the specific stale-poll-after-leave assertion.
2. Confirm the generated V82.85.12 artifact fingerprint: 8,787,574 bytes / SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`.
3. If the complete suite passes, next plan the separate real-audio and production-origin storage acceptance gate. Mock media tests are not real audio acceptance.
4. Preserve immutable V82.82 (8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`). Do not overwrite it.

Rollback: `v82.85.11-firefox-responsive-acceptance-01` at `b82ba04f23ef5c28669d1cd90aa08bf5a91a7dd0`.

