# First-pass audit: script_036 scene background storage

Baseline V82.85.28. File src/scripts/script_036.htmlpart. Source blob 6d3690052c2fa049f9189faad6d0753ef91b4fa1.

Disposition: first-pass review complete; no production source change. This is a user-data and resource-lifecycle boundary.

## Profile and responsibilities
- 19,426 characters, 55 lines, 29 named functions detected by a conservative pattern.
- Uses IndexedDB database AniSongSceneBackgroundsV1, version 1, store sceneBackgrounds.
- Stores scene-specific image backgrounds and settings, creates/revokes object URLs, previews local images, applies selected/all scenes, clears overrides, and manages a settings modal.
- Enforces file/dimension limits: 12 MiB, 8192 maximum dimension and 40,000,000 pixels.

## Risks
- IndexedDB transaction success/error paths must not leave partially applied scene settings.
- Object URLs require explicit revoke on replacement/clear/close to avoid stale previews and retained blobs.
- Scene-specific configuration, detail/dialog backgrounds and global defaults have different scopes; do not collapse them into one value.
- File validation must reject unsupported/oversized images before persistence or decoding.
- The modal and detail observer are initialized dynamically; preserve one-time binding and cleanup behavior.

## Evidence and gaps
- The storage repository contract covers a different module and does not prove scene-background IndexedDB behavior.
- The reviewed unit inventory did not contain a dedicated scene-background transaction, object-URL cleanup or size-limit contract.
- Existing browser responsive acceptance does not establish upload/restore behavior for large or malformed images.

## Findings
| ID | Risk | Disposition |
|---|---|---|
| BG-01 | IndexedDB writes and scene application cross persistent and UI state. | High: add focused transaction/rollback coverage before changing. |
| BG-02 | Blob URL lifecycle can retain stale resources. | Medium/high: test replacement, clear and modal close. |
| BG-03 | Image size/dimension validation protects browser memory. | High: preserve all three limits and test boundaries. |

No product source change. Next useful follow-up is a focused scene-background contract if this area is modified. Rollback by reverting this report and matrix reference.
