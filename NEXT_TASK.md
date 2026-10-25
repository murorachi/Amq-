# NEXT_TASK.md — Batch 2 dependency tracing

## Formal baseline
Candidate302: `amq_learning_tool_v82_86_13_candidate302_emq_loader_state_validation_20261025.html`
- Size: 1,720,249 bytes
- SHA-256: `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`
Candidate295 remains the immutable rollback point: `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`.

## Batch 1 deliverables
- `FEATURE_INVENTORY_BATCH1_CANDIDATE302_20261025.md` — feature classifications and evidence.
- Local machine-readable companion: `FEATURE_INVENTORY_BATCH1_CANDIDATE302_20261025.json`.
- Candidate302 static audit PASS: 67 inline executable JS blocks, 109 style blocks, 2,808 CSS rules, 271 unique IDs.
- No application source modified; no direct deletions approved.

## Batch 2 work order
1. **Route ownership:** trace all route wrapper assignments and source order, caller/delegate, intercepted destinations, body-class changes, home-menu effects, mount/unmount and back-navigation effects.
2. **Storage ownership:** for every literal storage key, record read/write/remove sites, canonical owner, schema, initialization timing, backup/restore coverage and data-loss risk.
3. **Custom lists:** map store/API, membership adapter, selector state, batch actions, imported list paths, AMQ/EMQ schema boundary and compatibility fallbacks.
4. **Lifecycle:** map event listeners, Mutation/Resize/IntersectionObserver creation and cleanup, timers/rAF creation and cancellation; distinguish string occurrences from actual live instances.
5. **CSS ownership:** compare repeated selectors by declarations, specificity, media/query context, document order and actual DOM reachability; identify candidate merge groups without deleting yet.
6. Mark each edge/evidence as source-confirmed, inferred, runtime-required or unresolved. Do not fabricate runtime proof.
7. Update reports, `BASELINE.md`, `CURRENT_STATUS.md`, `NEXT_TASK.md` and changelog. Run tests matched to any future code changes.

## Remaining global blockers
- The Candidate302 HTML is not present on the Stage 6 GitHub branch yet. Remote artifact SHA-256 remains NOT VERIFIED.
- Browser E2E/live audio cannot be claimed from static or synthetic checks.
- No direct DELETE decision is currently supported by Batch 1 evidence.

## Definition of done
The six cleanup goals require a complete feature inventory, dependency graph, canonical implementation map, deletion ledger with before/after evidence, reproducible regression matrix, and final HTML with verified remote hash. Candidate302 promotion alone does not satisfy them.
