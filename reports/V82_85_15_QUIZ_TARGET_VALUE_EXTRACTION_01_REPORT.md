# V82.85.15 Quiz target-value resolver extraction report

## Scope
- Branch: `v82.85.13-real-audio-acceptance-gate-01`
- Source: `src/scripts/script_004.htmlpart`
- Module: `src/modules/quiz_target_value.htmlpart`
- Extracted helper: `getTargetValue(s, type)`
- Change type: source-only semantic modularization. The exact original declaration is injected at its original IIFE position; no runtime script tag is added.

## Dependency and side-effect review
- Explicit inputs: song row `s` and target type `type`.
- Read-only dependencies: `window.__aniEmqAPI.getWorkSummary` and `window.byAnime.get` for anime/work names.
- Reads song row fields for title/artist and trims returned strings.
- No DOM, storage, timer, event, or mutable application-state writes.
- Existing branching and fallback behavior are preserved byte-for-byte by module injection.

## Validation plan
- New production-source contract checks module fingerprint/manifest, single marker, insertion position, restored declaration, and 11 behavior cases.
- `tools/verify.py` must confirm all fragment/module fingerprints and the deterministic V82.82 baseline build.
- CI rebuild must remain byte-identical to V82.85.12: 8,787,574 bytes / SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`.
- Firefox responsive, native-origin persistence/custom-list, quiz suggestion and answer/playback lifecycle suites are tracked separately from the audio output gate.

## Audio gate
The Chromium PCM capture gate remains 🟡 deferred. Previous evidence shows Chromium output capture peak=0 / RMS=0.0 despite a non-silent PulseAudio self-test; user confirmed the product is audible on their real machine. The threshold is unchanged and this extraction does not claim the audio gate passed.

## Rollback
Revert the V82.85.15 source/module/manifest/test/runner/workflow/docs commits. The immutable V82.82 product baseline remains unchanged.
