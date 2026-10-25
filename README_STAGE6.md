# Stage 6 — Static audit and regression package

## Scope
- Candidate295 remains the immutable formal baseline.
- Five local candidate HTMLs were re-hashed and statically checked.
- The source-derived EMQ loader test extracts the actual loader script from the HTML supplied on the command line, then exercises it with synthetic gzip/base64 payloads.
- No candidate HTML was modified and no Candidate303 was created.

## Run the EMQ loader tests
Use Node.js 18+:
```powershell
node .\stage6_emq_loader_regression_tests.cjs "C:\path\to\candidate302.html"
```
To compare Candidate301 with Candidate302:
```powershell
node .\stage6_emq_loader_regression_tests.cjs "C:\path\to\candidate301.html" "C:\path\to\candidate302.html"
```
The combined command exits nonzero because Candidate301 is expected to reproduce the known regression; inspect the JSON output. Candidate302 should show 9/9 PASS.

## Evidence limits
These are isolated synthetic tests, not real-catalog/browser end-to-end tests. The real AMQ/EMQ structural audit was run on the user's local machine in Stage 5. Browser E2E, real audio playback and remote Candidate302 HTML SHA-256 verification remain NOT RUN/BLOCKED.

## Files
- `STAGE6_FINAL_REPORT_20261025.md`: final report.
- `STAGE6_STATIC_AUDIT_RESULTS.json`: static results for Candidates 295/299/300/301/302.
- `STAGE6_EMQ_REGRESSION_RESULTS.json`: known Candidate301 regression vs Candidate302 fix.
- `STAGE6_EMQ_CANDIDATE302_TEST_RESULTS.json`: clean 9/9 Candidate302 result.
- `stage6_emq_loader_regression_tests.cjs`: reusable test harness.
