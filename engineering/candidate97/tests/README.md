# Candidate 97 tests

The local Playwright harnesses were run with deterministic API/image mocks.

Local scripts included in the release bundle:
- `test_candidate97_acceptance.py`: static validation, routes, source removal and mocked imports.
- `test_candidate97_core_stability.py`: startup, route repetition, workspace switching and DOM quiet window.
- `test_candidate97_custom_lists.py`: custom-list CRUD, reload carryover, filter, remove and delete.
- `test_candidate97_imports.py`: AniList/MAL/VNDB success, error, empty and duplicate scenarios.
- `test_candidate97_workspace_actions.py`: workspace action routes.
- `test_candidate97_catalog.py`: cover pipeline, work expansion and paging.
- `compare_candidate97_visual.py`: same-viewport internal screenshot comparison.

The standalone HTML is not yet in this branch. Place `amq_learning_tool_v82_85_46_workspace_proto44-list-removal-catalog_97_release.html` at the repository root before running the local scripts. Some detailed harnesses use `/mnt/data` paths and need path adjustment on another machine.

The current browser environment blocked `file://` and localhost navigation. Origin-backed localStorage persistence, live provider APIs, live cover hosts and official osu!stable screenshot comparison remain pending. The monolithic importer-to-CRUD run stalled at the stage transition; isolated suites pass, but long-session acceptance remains open.
