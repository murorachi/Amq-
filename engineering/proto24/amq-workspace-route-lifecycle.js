<script>
/* Proto25 Stage 28: scope the persistent workspace shell to the dashboard workspace.
 * Existing navigation handlers sometimes leave the shell class enabled after route changes.
 * Observe class mutations and re-check the authoritative active-view API after route clicks.
 */
(() => {
  window.__amqWorkspaceRouteGuardReady = true;
  const syncWorkspaceShell = () => {
    document.body.classList.remove("amq-workspace-active");
  };
  const scheduleRouteSync = () => {
    requestAnimationFrame(syncWorkspaceShell);
    setTimeout(syncWorkspaceShell, 80);
    setTimeout(syncWorkspaceShell, 180);
    setTimeout(syncWorkspaceShell, 260);
  };
  const installNavigationGuard = () => {
    const navigate = window.__aniNavigateApp;
    if (typeof navigate !== "function" || navigate.__amqWorkspaceGuarded) return;
    const guardedNavigate = function(view, ...args) {
      const result = navigate.call(this, view, ...args);
      if (view === "dashboard") {
        document.body.classList.remove("amq-standalone-route");
      } else {
        document.body.classList.add("amq-standalone-route");
        document.body.classList.remove("amq-workspace-active");
      }
      return result;
    };
    guardedNavigate.__amqWorkspaceGuarded = true;
    window.__aniNavigateApp = guardedNavigate;
  };
  installNavigationGuard();
  setTimeout(installNavigationGuard, 0);
  setTimeout(installNavigationGuard, 80);
  const standaloneActions = new Set([
    "quiz", "practiceExplore", "practiceWeak", "catalog",
    "watchlist", "learningPlan"
  ]);
  document.addEventListener("click", event => {
    const action = event.target.closest?.("[data-home-action]");
    if (action && standaloneActions.has(action.getAttribute("data-home-action"))) {
      document.body.classList.add("amq-standalone-route");
      scheduleRouteSync();
      return;
    }
    if (action && action.getAttribute("data-home-action") === "dashboard") {
      document.body.classList.remove("amq-standalone-route");
      return;
    }
    if (event.target.closest?.("#uiBackHome, #wsReturnHome, #mpBackHome")) {
      document.body.classList.add("amq-standalone-route");
      scheduleRouteSync();
    }
  }, true);
})();
</script>
