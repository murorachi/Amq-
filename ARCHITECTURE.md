# Architecture: V82.68 CANDIDATE-POLICY-MODULE-01

## Runtime composition
The deliverable remains one classic standalone HTML document. CSS/script fragments retain original order. `src/modules/candidate_pool_policy.js` is source-modular only: the builder injects its bytes at a single marker inside the original `script_004` classic script. It adds no script tag, ESM import/export, runtime fetch, async execution, or storage migration.

## Build data flow
`src/template.html.in` + ordered fragments + modules described in `reports/FRAGMENT_MANIFEST.json` -> `tools/build.py` -> `dist/amq_learning_tool_v82_68.html`.

The builder verifies template, fragment and module hashes before assembly, rejects missing/duplicate markers and hash mismatches, checks final byte length/SHA-256, and atomically replaces the versioned output. `tools/verify.py` performs two independent builds and checks byte identity against the locked V82.65 baseline.

## First extracted source module
`candidate_pool_policy.js` contains pure candidate-policy decisions. It still exposes the same frozen `window.__aniCandidatePoolPolicyV8265` object at the same execution position. Source extraction is complete; broader semantic decoupling is not.
