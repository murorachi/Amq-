# Candidate217 — Dependency Review Checkpoint

Date: 2026-10-24
Branch target: `amq-candidate104-songselect-layout-fix`
Parent baseline: Candidate212 (unchanged)
Parent SHA-256: `52376c693c5c0701d77e80a6076620623ef9ef5decadd11265d6b57bcf6c6952`

## 1. `v44VolumeControl`: duplicated construction branches, shared element ID

- First owner candidate: script `v44-submit-pipeline-and-volume`, around line 2246. It exits if `#quizView` is absent, then creates `#v44VolumeControl` only if it does not already exist, mounts it near quiz settings, reads `aniQuizVolume`, and wires the slider.
- Second construction site: script `v82-35-single-player-reveal-video`, around line 5330. It builds `#quizMediaControlsV835`, moves the existing `#v44VolumeControl` into the toolbar when present, but otherwise creates another `#v44VolumeControl` plus slider/output.
- Assessment: the second branch is a fallback, not proven dead code. Removing it could remove volume UI if the first script exits or initialization order changes. Safe consolidation needs one shared idempotent ensure/mount API and a browser lifecycle test. Do not delete based on duplicate ID text alone.
- Required tests: quiz view present/absent at startup, initial and repeated toolbar mount, navigation away/back, exactly one `#v44VolumeControl`, one `#v44Volume` and one `#v44VolumeValue`, persisted volume and audio volume synchronization.

## 2. `watchModeTab` / `customModeTab`: duplicate template sources and mount-time binding

- Initial markup includes both tabs.
- `switchWatchMode` toggles watchlist/custom-list panels.
- `updateWatchModes` binds click handlers directly to the two tabs.
- `init` calls `updateWatchModes`, and conditionally inserts a tabs template only when `.mylistModeTabs` is absent, then calls `updateWatchModes` again for newly inserted nodes.
- Assessment: the conditional second call is not automatically duplicate binding; it may bind newly inserted nodes. The function itself is not idempotent if called repeatedly on the same nodes. Current evidence does not prove multiple calls on existing nodes. A safe cleanup needs an initialization-once guard or delegated listener plus route/remount tests.
- Required tests: initial watchlist entry, route away/back, custom-list tab switch, repeated workspace mount, one effective handler per click and no duplicated render/save actions.

## 3. `amqSongSelectRankingPlaceholder`: multiple owner-like code paths

- Static audit identifies an early existence-guarded creation and later workspace-shell logic that expects the frame to exist; CSS rules are also repeated across prototype layers.
- Assessment: multiple consumers/owners exist in a progressive prototype stack. Deleting a creator without confirming script order can leave workspace initialization returning early (`if(!dock||!panel||!frame)return`).
- Required tests: trace every creator and consumer, designate one canonical owner, remove remaining creators, then test route entry/re-entry, frame geometry, keyboard close/focus restoration and workspace switching.

## Data safety

No storage keys, schema, IndexedDB stores, custom-list data, learning records, settings, or import/export behavior were modified.

## Test status

- PASS: source inspection and occurrence/line mapping against Candidate212.
- NOT RUN: browser mount lifecycle, listener counts, volume persistence/audio sync, workspace routing and pixel checks.
- BLOCKED: current runtime environment blocks `file://` and localhost browser navigation and external DNS/network.

## Decision

No additional production code was changed in this checkpoint because the current environment cannot execute lifecycle tests needed to distinguish dead duplicate code from fallback behavior. Candidate216 remains the only changed code candidate; Candidate212 remains the working baseline. This is a dependency checkpoint, not a claim of completed cleanup.
