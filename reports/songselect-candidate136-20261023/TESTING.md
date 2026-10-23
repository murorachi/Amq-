# Testing instructions

Run the focused interaction suite:
`python /mnt/data/amq_songselect_work/investigation_20261023/test_candidate136_interactions.py`

Run viewport/screenshots suite:
`python /mnt/data/amq_songselect_work/investigation_20261023/test_candidate136_viewports.py`

The tests use system Chromium + Playwright `page.set_content` and a test-only in-memory Storage shim. They are real browser render/interaction tests, but not direct-file or durable-persistence tests. Direct `file://` and localhost navigation are blocked by `ERR_BLOCKED_BY_ADMINISTRATOR` in this environment.
