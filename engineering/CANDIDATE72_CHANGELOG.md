# Candidate 72 Change Log

Parent: Candidate 71.

## Changes

- Reworked the Home profile/player rail to use a full-width translucent frame with a profile/player proportion, and added a separate translucent lower rail.
- Increased the central AMQ icon dimensions through a final runtime geometry override so existing inline important styles do not defeat the stylesheet.
- Removed the duplicate Home-only background shortcut; the canonical background control remains in Settings.
- Replaced the Play submenu's full-screen opaque takeover with a transparent, in-Home state. Single Player, Multiplayer, and Back use consistent button geometry and a coordinated color family.
- Added a black top/bottom Song Select frame treatment with a clipped curved sweep below the song metadata.
- Moved the empty management frame from the bottom-right to the left-middle below song metadata. Removed its false “排行榜” label.
- Corrected the workspace panel's visibility and pointer-event state when the lower-left workspace buttons are expanded. The panel is intended to occupy the left-middle frame, not spawn as a lower-left popup.
- For requirement A, hid the entire global top header on the quiz screen, not merely the Settings control.
- Added Escape handling for the Home settings state. The handler closes settings before other navigation behavior.

## Scope boundary

This candidate addresses the newly specified Home and Song Select corrections only. It does not claim exact pixel parity with osu!stable. No unrelated data model or song catalogue behavior was intentionally changed.
