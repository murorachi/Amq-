<script>
/* Proto25 Stage 28: scope the persistent workspace shell to the dashboard workspace.
 * Existing navigation handlers sometimes leave the shell class enabled after route changes.
 * Observe class mutations and re-check the authoritative active-view API after route clicks.
 */
(() => {
  window.__amqWorkspaceRouteGuardReady = true;
  const syncWorkspaceShell = () => {
    const view = window.__aniGetActiveViewV82?.();
    if (view && view !== "dashboard") {
      document.body.classList.remove("amq-workspace-active");
    }
  };
  const scheduleRouteSync = () => {
    requestAnimationFrame(syncWorkspaceShell);
    setTimeout(syncWorkspaceShell, 80);
    setTimeout(syncWorkspaceShell, 180);
    setTimeout(syncWorkspaceShell, 260);
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
  new MutationObserver(syncWorkspaceShell).observe(document.body, {
    attributes: true,
    attributeFilter: ["class"]
  });
})();
</script>
