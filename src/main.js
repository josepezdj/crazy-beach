import { Router } from '@vaadin/router';
import './pages/game/crazy-beach-game-page';
import './pages/home/crazy-beach-home-page';
import './pages/ranking/cb-ranking-page';
import './pages/account/cb-account-page';
import './pages/about/cb-about-page';
import './pages/instructions/cb-instructions-page';

function initRouter() {
    const router = new Router(document.querySelector('#app'));

    router.setRoutes([
        {
            path: '/',
            component: 'crazy-beach-home-page',
            title: 'Home',
            // action:  () => import("./pages/home/crazy-beach-home-page")
        },
        {
            path: '/juego',
            component: 'crazy-beach-game-page',
            // action:  () => import("./pages/game/crazy-beach-game-page")
        },
        {
            path: '/ranking',
            component: 'crazy-beach-ranking-page',
            // action:  () => import("./pages/home/crazy-beach-home-page")
        },
        {
            path: '/instrucciones',
            component: 'crazy-beach-instructions-page',
            // action:  () => import("./pages/home/crazy-beach-home-page")
        },
        {
            path: '/cuenta',
            component: 'crazy-beach-account-page',
            // action:  () => import("./pages/home/crazy-beach-home-page")
        },
        {
            path: '/acerca',
            component: 'crazy-beach-about-page',
            // action:  () => import("./pages/home/crazy-beach-home-page")
        },
        {
            path: '(.*)',
            component: 'crazy-beach-home-page',
            // action:  () => import("./pages/home/crazy-beach-home-page")
        },
    ]);
}

window.addEventListener('load', () => initRouter());
