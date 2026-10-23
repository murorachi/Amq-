# Temporary CI trigger branch for isolated Proto25 Stage 16 acceptance.
This file exists only to create a pull request event so the browser/static acceptance workflow can be observed through the GitHub integration. It does not modify application code.

Retry after fixing the false-negative DOCTYPE assertion in the static check.

Retry after moving candidate write below Play menu injection.

Retry after correcting Multiplayer's return-home selector to #mpBackHome.

Retry after aligning Settings styles with the actual ui-settings-open state.

Rerun: test Settings background-image gradient rather than expecting a solid background-color.

Rerun: assert dark catalog palette and grid layout rather than a single computed background token.

Rerun after hiding underlying catalog controls on the home menu, compacting the top strip, and switching Song Select evidence to viewport capture.

Retry after strengthening the home catalog hide selectors and correcting the actual profile-card ID selectors; previous run 39492892899 failed these geometry assertions.
