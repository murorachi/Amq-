# Candidate 132 delivery

This is a testable intermediate Song Select build, not the final accepted release.

Main artifact: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_132.html`.

Evidence includes the stage report, static/browser report, final smoke summary, pixel metrics, screenshots (local delivery package), and rollback/handoff documents. Browser evidence used Playwright `page.set_content`; direct `file://` launch and durable persistence were not accepted as tested.

Only the 7.5-card viewport and selected-distance behavior are accepted for this checkpoint. Overall visual acceptance, persistence, live APIs, audio and full feature regression remain incomplete.
