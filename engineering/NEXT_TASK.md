# Next Task

1. Run per-action tests for all 28 workspace actions, with special attention to learning plan/practice initialization, VN catalog behavior, and preserving Song Select as the parent route.
2. Validate existing feature controls after DOM portal/restoration, including custom-list create/rename/delete confirmations, watch-status changes, selection state, and batch confirmation safety.
3. Test a real-origin browser for storage persistence, cover loading, and audio. The current environment blocks localhost navigation and page.set_content has an opaque origin.
4. Improve mobile three-stage navigation: keep the workspace action list accessible and return focus to the correct action.
5. Only after these pass, consider moving legacy rendering logic to native panel components. Do not remove legacy views before regression is complete.
