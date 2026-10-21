# Candidate 72 Test Report

Artifact SHA-256: `1b1e98437e088a7319e7f969e3d4703260c8511105a36127bde3f3982f544c81`

## Static checks

- Executable inline JavaScript: **50/50 syntax checks passed** using `node --check`.
- CSS blocks: **75/75 parsed without CSS parser errors** using `tinycss2`.
- Duplicate HTML IDs: **0** across 243 IDs.
- Requirement hook checks: **9/9 passed**, covering Home background shortcut removal, Home rail geometry rules, icon runtime sizing, non-opaque Play submenu, left-frame label removal, workspace visibility override, quiz global header removal, and settings Escape handler.

## Browser smoke checks

A Chromium `page.set_content()` smoke test was partially run. The following assertions passed in the available harness:

- Settings state changes from open to closed after Escape.
- Play submenu opens as a transparent Home-local state; its panel is positioned beside the existing central icon rather than replacing the page.
- Quiz mode computes the global top header as `display:none`.

Limitations: this environment denies direct `file://` and local HTTP navigation with `ERR_BLOCKED_BY_ADMINISTRATOR`; `page.set_content()` also has an opaque origin and reports localStorage access errors. The smoke test was run before the final geometry-only additions (larger icon override and smooth Song Select arc), so those final CSS changes have static validation but no new browser screenshot acceptance. This is **not** a full application-flow test. Candidate 71's prior 20/20 tests are not represented as Candidate 72 tests.

## Not run / not verified

- Full end-to-end Home -> Play submenu -> Solo quiz -> Escape navigation.
- Live route-driven Song Select frame and management panel visibility under the normal persisted browser origin.
- Real saved-background reload, IndexedDB persistence, remote VNDB image loading, and actual audio playback.
- Pixel-level screenshot comparison against a running osu!stable client.
- GitHub HTML binary upload and remote SHA-256 verification.
