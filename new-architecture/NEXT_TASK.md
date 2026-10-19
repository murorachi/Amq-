# Next task

**Blocked: UI specification reconciliation. Do not proceed to the next implementation stage.**

1. Retrieve the exact previously approved 13-stage UI decisions and reference screenshots/links from the project record. Do not infer or reinvent them.
2. Produce a traceability map from each reference region to the intended implementation region, including relative layout, visual hierarchy, density, spacing and button alignment.
3. Compare the current rendered build against the reference at a matching viewport. The last user acceptance was 10/100, so the current UI is rejected.
4. Correct only the first rejected screen, preserving the independent architecture and keeping legacy AMQ untouched.
5. Run core regression tests and actual browser visual acceptance; do not treat Node tests as proof of visual fidelity.
6. Advance to another page only after the current page meets the agreed reference and the user accepts it.
7. Keep remote source/HTML publication status explicit; documentation-only GitHub commits are not a full release.