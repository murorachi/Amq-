# BASELINE — Proto25 UI Refactor

## Immutable accepted Proto24 baseline
- Branch: `v82.85.30-proto24-accepted-delivery-02`
- Commit at audit start: `39d250cf5a269a0e2bf8f514474584bcc864f599`
- File: `dist/amq_learning_tool_v82_85_30_workspace_proto24.html`
- Size: 8,850,993 bytes
- SHA-256: `c402b2af9e23fe3a1ddef2c78d2f63a79217547c1c3a607e911bacac47d9bc8e`
- Original Proto17 source commit: `4fc4a099389b59850c46d3eab2332be3401d487a`
- Production V82.82 and read-only V82.85.30 remain unchanged.

## osu!Stable reference
- Stable release label checked on 2026-10-21: `20260924.1`.
- Pinned official Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Main menu screenshot blob: `f6617a0da2058f79d9bdf11191326df8e74ecba1`.
- Play menu screenshot blob: `a4413f514a4aec91ee3c45995ee500cff882de3f`.
- Song Select screenshot blob: `1e927a00a1984a5ba20fa5efec639410f349607a`.
- Options screenshot blob: `05d5917ccc53c67e70415f7a88d084c711f9b9cc`.
- Exact Stable client source commit and screenshot capture build remain unknown. Use the user-authorized official Wiki screenshots as the visual fallback; do not substitute osu!lazer source.

## Current implementation checkpoint
- Working branch: `v82.85.30-proto25-ui-refactor-work-02` (current validation head).
- Stage 14 branch: `v82.85.30-proto25-ui-refactor-stage-14`.
- Stage 15 branch: `v82.85.30-proto25-ui-refactor-stage-15`.
- Stage 16 branch: `v82.85.30-proto25-ui-refactor-stage-16`.
- Stage 17 branch: `v82.85.30-proto25-ui-refactor-stage-17`.
- Stage 18 branch: `v82.85.30-proto25-ui-refactor-stage-18`.
- Stage 19 branch: `v82.85.30-proto25-ui-refactor-stage-19`.
- Stage 20 branch: `v82.85.30-proto25-ui-refactor-stage-20`.
- Stage 21 branch: `v82.85.30-proto25-ui-refactor-stage-21`.
- Stage 24 validation branch: `v82.85.30-proto25-ui-refactor-stage-24`; latest workflow commits `2294f0ce073d074df5f7df1728a9ab22b577b0d9` and `c9137b63747f861d86e4b45a7347f9d3c5d44023`.
- Stage 22 source commit: `e695b80c8aca4ca4e8c8a5337f422de0a4384eb0`.
- Last confirmed common source checkpoint: `12a999b6e23db26c95504d6abe7be9ba5b81a1f8`; stage-16 and working branches were fast-forwarded to this commit. Documentation updates follow that source checkpoint.
- Stage 16–22 candidate HTML and SHA-256 manifest: static checks pass. Run `39495757564` confirmed catalog/quicktools hidden but profile height remained 94px; border-box correction is committed as `ca70511a2978f0dbfbc422dcc9cb116f5f8b61bd`. Browser acceptance of geometry/routing: PASS on run `39496365330`; publication: FAIL due to non-fast-forward push to old target. Visual screenshot review found profile text clipping; dark compact profile fix and visible-name assertions are committed, and the next validation is isolated on Stage 24; publication and browser evidence remain unverified.
- Do not treat a source checkpoint branch as proof that a built HTML candidate passed acceptance.

## Rollback
Return to `v82.85.30-proto24-accepted-delivery-02` at `39d250cf5a269a0e2bf8f514474584bcc864f599`. Never force-push or overwrite that branch. Proto25 work remains isolated and has not been promoted to production.


## Latest workflow and validation checkpoint
- Current PR head checkpoint: `8a237b25b953193716e2d3bb41f24c91b7b795f1` on `v82.85.30-proto25-ui-refactor-work-02`.
- The Stage 24 workflow is PR-triggered only, to avoid a recursive publish loop. Despite the PR-head update, the available run/status integration currently returns no run and no status for this SHA. Triggering and browser acceptance therefore remain unverified.
- Do not use the previous screenshot as evidence for the newest profile CSS: that screenshot predates the dark compact-card correction.
