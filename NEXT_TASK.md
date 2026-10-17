# Next task

Current checkpoint: V82.66 CANDIDATE-POOL-TESTS-01. Overall status remains PARTIAL.

## M0: Close formal baseline gap
1. Obtain the exact V82.65 delivery ZIP and sidecar.
2. Recompute ZIP SHA-256; validate CRC, internal manifest coverage, all file hashes and HTML/server/catalog fingerprints.
3. Keep V82.64 and V82.65 originals untouched.

## M1: Candidate pool integration fixtures
1. Create disposable fixtures for AMQ rows, anime metadata, tags, familiarity, blacklist, watchlist and repeat state.
2. Assert exact candidate IDs and order at each stage: base eligibility, quick pool, status, metadata, tags, watchlist, repeat, EMQ/Mixed combine, audio health and custom-list scope.
3. Include absent/null/empty/zero/invalid setting values, invalid source mode, empty custom scope, missing combiner/helper, duplicate source IDs, and all-audio-unhealthy cases.
4. Keep AMQ and EMQ identity/source metadata distinct; never use live user storage for destructive tests.

## M2: Dependency tracing
1. Trace readers/writers for aniQuizSettingsV14, aniQuizCustomListScopeInvalidV8265, blacklist/history, custom-list scope and audio-health interfaces.
2. Inspect the 31 duplicate-name groups individually, beginning with assignments/wrappers in script_004; do not delete by name alone.
3. Trace timer/listener setup and cleanup in quiz start/pause/resume/stop/settle/next paths.

## M3: First business refactor
Only after exact candidate fixture expectations and interface tests pass, extract the pure policy object to a dedicated source file and embed it during build. Compare outputs against the current policy for all fixtures before integrating.

## Current test entry points
```powershell
node tests\\unit\\candidate_pool_policy.test.cjs
python tools\\build.py
python tools\\verify.py
python tools\\semantic_inventory.py
```

The policy unit test executes the exact existing policy block, not full browser getQuizPool behavior. Browser/audio/network, IndexedDB round-trip, and multi-device tests remain outstanding.
