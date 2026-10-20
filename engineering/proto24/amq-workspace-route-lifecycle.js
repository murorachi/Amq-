<script>
/* Proto25 Stage 28: scope the persistent workspace shell to the dashboard workspace.
 * The existing route handlers sometimes leave the body shell class enabled when the
 * catalog/quiz/home route changes. Clear it after their synchronous and deferred work.
 */
(() => {
  const clearUnlessWorkspace = () => {
    const view = window.__aniGetActiveViewV82?.();
    if (view && view !== "dashboard") {
      document.body.classList.remove("amq-workspace-active");
    }
  };
  const scheduleRouteSync = () => {
    requestAnimationFrame(clearUnlessWorkspace);
    setTimeout(clearUnlessWorkspace, 80);
    setTimeout(clearUnlessWorkspace, 260);
  };
  const standaloneActions = new Set([
    "quiz", "practiceExplore", "practiceWeak", "catalog",
    "watchlist", "learningPlan"
  ]);
  document.addEventListener("click", event => {
    const action = event.target.closest?.("[data-home-action]");
    if (action && standaloneActions.has(action.getAttribute("data-home-action"))) {
      scheduleRouteSync();
      return;
    }
    if (event.target.closest?.("#uiBackHome, #wsReturnHome, #mpBackHome")) {
      scheduleRouteSync();
    }
  }, true);
})();
</script>
