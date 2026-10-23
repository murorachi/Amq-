# Candidate 186 — Root-Cause Recovery Checkpoint

- Date: 2026-10-24
- Status: Experimental checkpoint, **not accepted**. This is not a completed osu!stable UI redesign.
- Branch: `amq-candidate104-songselect-layout-fix`.
- Parent: Candidate 185, SHA-256 `2d0b9e6c5d69d6d5d0d799cbbc44c3787a6956da7e73111ba8facc6300d882a8`.
- Output: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_186_root_cause_recovery.html`
- Size: 9,301,454 bytes.
- SHA-256: `cedf5ee3ff107a04443a899b3e92ede5daf2c513d083b93fb622caca1c9843aa`.

## Changes made
1. Preserved Candidate 185 unchanged and created a unique Candidate 186 artifact.
2. Added explicit stacking and pointer-event rules for open/closed modal overlays, plus Escape and backdrop close handling.
3. Restyled the playback dock as a full-width black bottom command strip with a blue top rule, and reserved its vertical space in the catalogue.
4. Added a delayed MAL/Jikan cover fallback after the existing cover queue has had time to load. The fallback only applies if the same song remains selected.
5. Kept earlier code intact for rollback; this is a recovery layer, not yet a clean architecture consolidation.

## Tests
### PASS
- Static JavaScript syntax: 66 executable inline script blocks checked with `node --check`; 0 syntax errors. The one `application/octet-stream` payload is embedded gzip/base64 data and was correctly excluded from JavaScript parsing.
- Artifact integrity: file exists, 9,301,454 bytes; SHA-256 above reproduced locally.
- Static presence checks: Candidate 186 modal, dock and cover-recovery code markers found.

### BLOCKED
- Native `file://` browser load: Chromium returns `ERR_BLOCKED_BY_ADMINISTRATOR`.
- Local HTTP browser load: Chromium returns `ERR_BLOCKED_BY_ADMINISTRATOR` for `127.0.0.1` too. Therefore this environment cannot perform real browser rendering/interaction checks for this artifact.

### NOT RUN
- Actual top-right interaction freeze root cause: not confirmed from a successful interactive browser session. Candidate 186 improves overlay stacking, but this is not proof the freeze is fixed.
- Live anime-cover fetch/failure/retry: code path added, but external network and browser execution were not available.
- Player placement between the left learning statistics and back control: **not completed**; the dock is still a bottom strip, so the user's exact placement requirement remains unmet.
- Four left-side workspaces fully consolidated into in-place modal workspaces: **not completed**; legacy views and handlers remain, so this is not accepted as the requested redesign.
- Full osu!stable screenshot pixel/geometry comparison: not run; no similarity percentage is claimed.
- Persistent custom-list CRUD/reload, live APIs, real audio, keyboard navigation, and responsive interaction: not run.

## GitHub
- Documentation files are being updated on the existing branch.
- HTML upload and remote byte/SHA-256 verification are not yet complete. Do not treat documentation commits as HTML delivery.

## Rollback
Candidate 185 remains preserved at SHA-256 `2d0b9e6c5d69d6d5d0d799cbbc44c3787a6956da7e73111ba8facc6300d882a8`. Candidate 184 remains the earlier fallback at SHA-256 `f3032d62cc22a5fb6272b14671f356daad3bb1503447813083fe434b5576a870`.

## Next required work
1. Obtain a browser environment that can load the local artifact, then inspect hit-testing and event propagation at the upper-right controls to confirm the freeze's actual cause.
2. Implement the user's specified player placement rather than another bottom-dock approximation.
3. Replace the four legacy workspace destinations with one shared, genuinely in-place workspace modal flow, including close/Escape/back behavior and dependency review.
4. Verify cover loading and fallback in a network-enabled browser.
5. Compare against the pinned 2555×1438 osu!stable reference; report actual measurements only.
6. Run custom-list persistence, keyboard, API/audio, and responsive regression tests.
7. Upload HTML bytes to GitHub and independently verify the remote file and SHA-256 before declaring delivery.
