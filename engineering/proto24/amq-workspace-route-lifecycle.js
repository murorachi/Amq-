/* Proto25 Stage 28: keep the persistent workspace shell scoped to workspace routes.
 * Returning to home or opening a standalone route must clear the active-shell body class
 * after the existing route handler has completed. Existing navigation handlers remain intact.
 */
(() => {
  const standaloneActions = new Set([
    "quiz", "practiceExplore", "practiceWeak", "catalog",
    "watchlist", "learningPlan"
  ]);
  const clearWorkspaceShell = () => {
    requestAnimationFrame(() => {
      document.body.classList.remove("amq-workspace-active");
    });
  };
  document.addEventListener("click", event => {
    const action = event.target.closest?.("[data-home-action]");
    if (action && standaloneActions.has(action.getAttribute("data-home-action"))) {
      clearWorkspaceShell();
      return;
    }
    if (event.target.closest?.("#uiBackHome, #wsReturnHome, #mpBackHome")) {
      clearWorkspaceShell();
    }
  }, true);
})();
