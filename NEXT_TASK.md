# Next task

Current checkpoint: V82.66 CANDIDATE-POOL-INTEGRATION-02. Overall status remains PARTIAL.

## M0: Close formal baseline gap
1. Obtain the exact V82.65 delivery ZIP and sidecar.
2. Recompute ZIP SHA-256; validate CRC, internal manifest coverage, all file hashes and HTML/server/catalog fingerprints.
3. Keep V82.64 and V82.65 originals untouched.

## M1: Candidate pool integration fixtures
Initial deterministic harness is complete: `tests/unit/candidate_pool_integration.test.cjs`, 22 passed, 0 failed. It executes the exact source pool function/wrapper with stubs and fixed catalog fixtures.
1. Validate actual EMQ API combine contract and AMQ/EMQ identity/source metadata isolation.
2. Add malformed/empty setting, missing helper, duplicate-source and all-audio-unhealthy coverage where meaningful.
3. Keep destructive tests isolated from live user storage.

## M2: Dependency tracing
1. Trace readers/writers for `aniQuizSettingsV14`, `aniQuizCustomListScopeInvalidV8265`, blacklist/history, custom-list scope and audio-health interfaces.
2. Inspect the 31 duplicate-name groups individually, starting with assignments/wrappers in script_004; do not delete by name alone.
3. Trace timer/listener setup and cleanup in quiz start/pause/resume/stop/settle/next paths.

## M3: First business refactor
Only after fixture expectations and the real combiner interface pass, extract the pure policy object to a dedicated source file and embed it during build. Compare outputs against current policy for all fixtures before integration.

## Current test entry point
```powershell
node tests\unit\candidate_pool_policy.test.cjs
node tests\unit\candidate_pool_integration.test.cjs
python tools\build.py
python tools\verify.py
```
