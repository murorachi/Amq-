# Candidate288 experiment rejected

Status: FAIL / NOT DELIVERED.

Candidate288 attempted to remove 633 repeated property declarations when the selector and nested condition were identical. Static CSS parsing and JavaScript syntax checks passed, but browser computed-style comparison against Candidate287 failed on Song Select. The computed geometry of `#amqSongSelectStage .p32-catalog` changed from bottom 111.6px / height 754.406px to bottom 108px / height 758px.

Likely root cause: CSS blocks and script initialization are interleaved. JavaScript can read computed styles before later style blocks are parsed or before dynamic style insertion finishes. Removing earlier declarations can therefore change initialization-time measurements even when a later duplicate exists in the final cascade. Candidate288 is rejected; retain Candidate287 as current.

Candidate287: 9,377,520 bytes, SHA-256 `b4d645eb2c1bb532729aa35b7b2a078c65845c2da479c3145eb14456608b0eab`.
Immutable rollback Candidate283 SHA-256 `aa1af13d2ff9419968ba92f382c75e0fd65d0ae4b72957331a1b488f65d74a0b`.

Remaining work must prove that initialization-time JS cannot observe an earlier rule, or pass before/after browser computed-style comparisons for affected routes and states. Persistence and full workspace/Dock/player tests remain incomplete.
