# NEXT_TASK — AMQ 100-item engineering continuation

Working baseline: Candidate212 (unchanged). Candidate207 is the recorded recovery source. Candidate216 and Candidate218 remain separate experimental artifacts. Their prior recorded sizes/hashes are in `BASELINE.md`; current runtime could not export their original bytes, so no fresh original-byte hash verification is claimed.

## Latest confirmed results
- PASS: 68 executable inline JavaScript blocks from the readable Candidate212 export passed Node syntax checking; 2 embedded payload blocks excluded.
- PASS: 108 CSS style blocks parsed with zero stylesheet/declaration errors in the current scan.
- PASS: initial markup has 296 unique IDs; measured dynamic startup DOM has 631 IDs and no duplicate live IDs.
- PASS: Chromium `page.set_content()` startup, watch/custom tab click counts, 10 workspace panel open/close transitions, custom-list create/add/remove/delete, batch selection/status update, AMQ/EMQ/MIX switches, search, decade/type filters and name sort.
- PASS: primary V44 volume slider storage/property sync, zero-volume mute and audio-node replacement behavior in isolated fixture.
- FAIL: forced V82.35 volume fallback changes audio but not video and fails mute-at-zero parity.
- PASS (prototype only): a disposable fixture applying fallback volume/mute to all `audio,video` nodes passes 35% synchronization, zero-volume mute, single-control and no-page-error assertions. This is not a source edit and not release acceptance.
- FAIL: Song Select geometry shows about 7 rows and a 33%-visible bottom card, not the target of about 7.5 cards / half-visible bottom card.
- PASS: hover shift 3 px is smaller than selected shift 7 px; selected row and right-side title update together.
- BLOCKED: original Candidate212 raw-byte materialization and native `file://`/localhost browser navigation.
- NOT RUN: persistent-origin reload, IndexedDB Blob backup/restore, real sound output, live API recovery, full answer/score/history checks, owner-instrumented observer teardown and masked pixel comparison.

## Next work, in order
1. **Source integrity:** obtain a byte-preserving Candidate212 copy. The current readable reconstruction is 26 bytes shorter and must not be used for release output.
2. **Volume root fix:** use the tested fallback prototype to guide a shared volume-controller contract used by both V44 and V82.35. Preserve the fallback until route absence, replacement nodes, audio/video sync, mute-at-zero and retry behavior all pass.
3. **Song Select geometry:** identify the canonical geometry owner and quantify the row pitch/offset curve. Target about 7.5 visible cards and a half-visible bottom card at the fixed 1920×1080 reference viewport; preserve hover shift < selected shift and selected-song details synchronization.
4. **Initialization and dynamic ownership:** instrument actual watch/custom tab creation, binding counts and repeated mounts. Candidate218's idempotent assignment is defensive; do not call it a proven root-cause fix until the duplicate behavior is reproduced or its prevention is validated.
5. **Observer/timer lifecycle:** map owner, observed target, callbacks, activation, cleanup and route teardown. Measure counts before/after repeated workspace transitions; do not delete based on counts alone.
6. **P0 data/workspace acceptance:** test custom-list create/edit/delete, add/remove membership, search/filter and persistence after real reload; test four official workspaces and back navigation without leftover panels, listeners, timers or observers.
7. **Persistence/game acceptance:** verify local/session storage, IndexedDB stores/versioning/Blob backup/restore, AMQ/EMQ/MIX real audio and consistent answer/score/history behavior. Clearly label blocked external APIs and multiplayer cases.
8. **Dependency-led cleanup:** classify each candidate Keep / Integrate then delete / Delete / Needs confirmation with call-chain and runtime evidence. Batch organizer is live and must be integrated before its entry/runtime can be removed.
9. **Reference comparison:** register the fixed osu!stable reference, normalize viewport/scaling, compare aligned masked regions and report measured errors. Do not claim a pixel-similarity percentage without a real comparison.
10. **Release and GitHub:** after source integrity is restored, produce a uniquely named candidate, run the affected regression suite, update status/baseline/next-task and test reports, then upload and read back the exact HTML and verify version, byte size and SHA-256.

## Safety gate
No executable source has been changed in this continuation. Do not promote a candidate built from the reconstructed export. Preserve Candidate212/207/216/218 originals and all existing user data.
