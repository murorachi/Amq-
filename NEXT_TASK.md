# Next task: safely reduce multiplayer audio callback duplication

Branch: `v82.85.23-audio-failure-contract-01`.

## Current checkpoint

- Parent production baseline: V82.85.22, candidate 8,787,300 bytes / SHA-256 `69909839f922b702635eec217fcbb836c388502f83d40b11021cd194de20cdc2`.
- Immutable V82.82 remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Added a focused contract for both identical `failed` callbacks in `script_028.htmlpart`; production source unchanged.
- The test is wired into CI. Local execution was not performed; check the new GitHub Actions run before declaring it passed.
- Prior browser checks passed for Firefox responsive and the listed native-origin lifecycle/storage suites, but Chromium real-audio output remains a failed required gate (`peak=0, rms=0.0)).

## Steps

1. Confirm the new callback contract passes in CI.
2. If it passes, assess a minimal callback factory that explicitly receives/captures the relevant `id`, media element and pending/active routing context.
3. Run the callback contract, source verifier/build, and multiplayer browser lifecycle acceptance before accepting any production refactor.
4. Continue diagnosing Chromium audio output independently; do not weaken its assertion.
5. Update the candidate HTML fingerprint/package only if production source changes.

## Rollback

Revert the test and workflow registration plus stage docs if the contract itself proves invalid. If a later production refactor is made, revert that source change and its manifest/release fingerprint together. Never overwrite V82.82.
