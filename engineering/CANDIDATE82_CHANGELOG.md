# Candidate 82 Change Log

## Purpose
Function-first hardening of Candidate 81's three-stage workbench. Visual fidelity to osu!stable is deferred; this candidate focuses on route stability, existing feature DOM lifecycle, and safe operation entry points.

## Verified baseline
- Parent candidate: Candidate 81
- Parent SHA-256: `3383f89de5d6c437f1046e61ab9bfe856eec37bc2ca8c72bfa52a2f6328a00ff`

## Changes
1. DOM portal lifecycle saves/restores both the `.hidden` class and native `hidden` attribute, plus original parent, sibling position, inline display, and `aria-hidden`.
2. Dashboard, learning/practice, quiz, and multiplayer branches register mounted nodes in the `els` collection. Previously nodes could be moved while the empty-state fallback was still shown.
3. Catalog portal selection moves leaf `.view-catalog` nodes, avoiding nested ancestor/descendant double-portaling.
4. Practice actions select the matching existing mode control when available. They do not auto-start a practice session.
5. Batch selection remains selection-only. Apply/watch/create entry points only locate and focus existing controls; they do not click them.
6. Candidate 81 remains unchanged; Candidate 82 is a unique artifact.

## Scope limits
- This is a function-first stabilization pass, not completion of every feature migration or final osu!stable visual reproduction.
- Browser tests used Chromium with a test-only in-memory `localStorage` shim because local file/localhost navigation is blocked. Real persistent storage, audio, remote cover/API loading, and normal-origin behavior remain unverified.
- The HTML binary has not been uploaded through the current connector path; engineering text uploads do not imply remote HTML availability.
