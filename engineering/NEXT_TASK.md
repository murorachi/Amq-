# Next Task

1. Audit every action in the four workspace definitions (`lists`, `batch`, `learning`, `analysis`) and classify as working in-place, legacy navigation, no-op/missing target, or destructive/applying action.
2. Migrate one workspace at a time into the retained popup, reusing the existing renderers/data stores and keeping the Song Select route active where required.
3. Test each action's visible result, route, Escape behavior, data safety/confirmation, and interactions with other controls.
4. Reproduce normal-origin browser testing for storage persistence, audio, and cover loading; current page.set_content tests cannot validate these.
5. Refine mobile behavior after functional migration: at 390x844 the popup is viewport-constrained but necessarily overlays the frame controls while open.
6. Keep Candidate 76 immutable as rollback checkpoint. Do not remove legacy views until all migrated actions pass regression.
