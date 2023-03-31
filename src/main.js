import { Router } from "@vaadin/router";
import "./pages/game/crazy-beach-game-page";
import "./pages/home/crazy-beach-home-page";

function initRouter() {
  const router = new Router(document.querySelector("#app"));

  router.setRoutes([
    {
      path: "/juego",
      component: "crazy-beach-game-page",
      // action:  () => import("./pages/game/crazy-beach-game-page")
    },
    {
      path: "/",
      component: "crazy-beach-home-page",
      // action:  () => import("./pages/home/crazy-beach-home-page")
    },
    {
      path: '(.*)',
      component: "crazy-beach-home-page",
      // action:  () => import("./pages/home/crazy-beach-home-page")
    }
  ]);
}

window.addEventListener("load", () => initRouter());