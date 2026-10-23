# Test procedure and scope

Run the observation suite:
```bash
python3 /mnt/data/amq_songselect_work/run_songselect_observation.py /mnt/data/amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_130.html --outdir /mnt/data/amq_songselect_work/observations_candidate130
```

Run focused interaction checks:
```bash
python3 /mnt/data/amq_songselect_work/investigation_20261023/test_candidate130_interactions.py
```

Both use system Chromium + Playwright `page.set_content` and a test-only in-memory Storage shim. They provide real browser rendering/interaction, but do not prove direct file loading or durable storage across reload. The environment blocks file:// and localhost navigation with `ERR_BLOCKED_BY_ADMINISTRATOR`.

Focused test result: 8 PASS, 2 FAIL. Failures are the actual inline-song hover shift and ArrowDown selection.