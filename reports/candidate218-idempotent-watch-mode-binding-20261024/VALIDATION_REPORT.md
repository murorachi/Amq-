# Candidate218 Validation Report — 2026-10-24

## Baseline and artifact
- Parent: Candidate212, unchanged.
- Parent size: 9,352,632 bytes.
- Parent SHA-256: `52376c693c5c0701d77e80a6076620623ef9ef5decadd11265d6b57bcf6c6952`.
- Candidate: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_218_idempotent_watch_mode_binding.html`.
- Candidate size: 9,352,817 bytes.
- Candidate SHA-256: `5e1bd34e1bc49fe606fc8b9989cfaab26d00f2eee5e12ca0541d16a5ae63099c`.

## Root cause and change
The `updateWatchModes()` function bound `click` listeners with `addEventListener`. The same function is called once during `init()` and again after the tab strip is inserted dynamically. If the tabs already existed, the second call stacked another listener on the same elements.

Changed the function to assign `onclick` handlers to the two existing tab elements. Repeated calls now replace the handler rather than accumulating listeners. This does not change tab IDs, data schema, storage keys, list data, route names, or tab behavior.

## Tests
- PASS: byte comparison proves exactly one targeted function replacement and no other changes.
- PASS: 68 inline JavaScript blocks passed `node --check`; 2 embedded payload blocks excluded.
- PASS: old `addEventListener` bindings for these two tabs are absent; both idempotent assignments occur once in the function.
- NOT RUN: browser repeated-init/click-count; custom-list CRUD/filter/reload; four workspace lifecycle; AMQ/EMQ/MIX playback; IndexedDB persistence; pixel comparison.
- BLOCKED: current browser environment blocks `file://` and localhost navigation; external network/DNS unavailable.

## Safety and rollback
Candidate212 remains unchanged and is the rollback point. Candidate216 remains unchanged. Candidate218 is experimental, not an accepted release. No storage keys, stored data format, IndexedDB schema, or learning records were modified.

## Next continuous-work item
Inspect and consolidate `v44VolumeControl` construction paths only after determining a safe canonical ensure/mount function; preserve fallback behavior and audio-volume synchronization. Then inspect workspace placeholder ownership and observer/listener cleanup. Do not claim browser acceptance until executed.


## Follow-up static call-graph qualification (2026-10-24)

A later source-level trace found that the original normal initialization path does not by itself demonstrate duplicate listener stacking:

- Initial markup contains one `#watchModeTab`, one `#customModeTab`, and one `.mylistModeTabs`.
- The private `init()` calls `updateWatchModes()` once. It calls the function a second time only inside the branch that inserts a missing tab strip; in that branch the first call has no tab nodes to bind.
- `init()` is invoked through a single `DOMContentLoaded` listener with `{once:true}` or once immediately, and is not exported by this script.
- Candidate218's `onclick` assignments are idempotent and remain a reasonable defensive change, but static evidence alone does not prove the old code duplicates listeners during normal page startup. Repeated script evaluation or another trigger is not yet demonstrated.
- Updated disposition: **defensive idempotency change, browser acceptance NOT RUN; original duplicate-binding root cause not yet reproduced**. Do not treat this candidate as an accepted release until runtime click-count/repeated-mount tests complete.
