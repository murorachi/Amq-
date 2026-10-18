# Next task

Accepted checkpoint: `v82.85.12-multiplayer-leave-poll-race-fix-01`.

1. Define a separate real-audio acceptance gate: distinguish media-element state/events from audible output, verify play rejection/autoplay policy, fallback-source progression, pause/resume, reveal continuity, track end, and cleanup.
2. Identify a permitted browser environment and origin for production-like storage policy checks. Keep local-origin IndexedDB acceptance separate from production-domain storage acceptance.
3. Keep V82.82 immutable: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`. V82.85.12 candidate is 8,787,574 bytes / SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`.
4. Do not claim real audio or production-domain behavior passed until an actual suitable environment has run those tests.

Rollback: `v82.85.11-firefox-responsive-acceptance-01` at `b82ba04f23ef5c28669d1cd90aa08bf5a91a7dd0`.

