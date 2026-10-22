# Candidate 97 tests

## Local test harness

The local acceptance run used Chromium through Playwright and separate deterministic API/image mocks. The test suite files delivered alongside the local artifact are:

- `test_candidate97_acceptance.py`: static validation, routes, source removal/import handling, custom-list CRUD/persistence carryover, and DOM quiet-window checks.
- `test_candidate97_workspace_actions.py`: workspace action routes.
- `test_candidate97_catalog.py`: Anime/VN cover pipeline, work expansion and paging.
- `compare_candidate97_visual.py`: same-viewport Candidate 96/Candidate 97 screenshot comparison.

The local HTML is not yet in this branch. Place `amq_learning_tool_v82_85_46_workspace_proto44-list-removal-catalog_97_release.html` at the project root before running the local scripts; the current local versions use `/mnt/data` paths and may need path adjustment on another machine.

## Evidence boundaries

Mocked API success does not prove live provider availability. Mocked image success does not prove live CDN availability. The current browser environment blocked `file://` and localhost navigation, so origin-backed localStorage persistence and official osu!stable screenshot comparison remain pending.
