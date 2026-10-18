# Next task

Current checkpoint: **V82.86.02 full engineering backlog**. Branch `v82.86.02-engineering-backlog-01`. Parent `7bbbd8eb883db6b97822fac5e32a2a2ff903bde9`.

## Deliverables
- `reports/ENGINEERING_BACKLOG.csv`: 34 task rows with evidence, dependencies, action, acceptance and automation.
- `reports/V82_86_02_ENGINEERING_BACKLOG_01.md`: scope, evidence, order, constraints and task index.
- `tests/unit/engineering_backlog_contract.py`: schema, ID, dependency and report parity checks.
- Main engineering workflow runs the new contract.

## Next bounded work
AMQ-TODO-001 through AMQ-TODO-004:
1. Trace shared quiz state reads/writes and transitions.
2. Map key DOM mutation owners.
3. Pair event/timer/animation registrations with cleanup and repeated entry/exit.
4. Revalidate suggestion click/keyboard/IME/focus/ARIA behavior against current source.
5. Add missing tests before production refactor.

## External gates
Firefox/CSS cascade; real audio provider/network; live two-client multiplayer/reconnect; expanded IndexedDB and production-origin policy/failure acceptance.

## Rollback
Return to parent commit `7bbbd8eb883db6b97822fac5e32a2a2ff903bde9` or revert this documentation/contract checkpoint. Product rollback is not required.
