import { Router } from '@vaadin/router';
import './pages/home/crazy-beach-home-page'; // Adding the lit-app component here for better performance

const routes = [
  {
    path: '/',
    component: 'crazy-beach-home-page',
  },
  {
    path: '/juego',
    component: 'crazy-beach-game-page',
    action: () =>
      import(/* webpackChunkName: "game" */ './pages/game/crazy-beach-game-page')
  },
  {
    path: '(.*)',
    component: 'crazy-beach-home-page',
  }
];

const app = document.getElementById('app');
export const router = new Router(app);
router.setRoutes(routes);