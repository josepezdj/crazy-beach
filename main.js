import { Router } from '@vaadin/router';
import './src/pages/game/crazy-beach-game-page';
import './src/pages/home/crazy-beach-home-page';
import './src/pages/ranking/cb-ranking-page';
import './src/pages/account/cb-account-page';
import './src/pages/about/cb-about-page';
import './src/pages/instructions/cb-instructions-page';

async function initRouter() {
    if (navigator && navigator.serviceWorker) {
        try {
            const registration = await navigator.serviceWorker.register(
                'service-worker.js',
                {
                    scope: './',
                }
            );
            if (registration.installing) {
                console.log('Service worker installing');
            } else if (registration.waiting) {
                console.log('Service worker installed');
            } else if (registration.active) {
                console.log('Service worker active');
            }
        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
    } else {
        console.error('Service workers are not supported.');
    }

    const router = new Router(document.querySelector('#app'));

    router.setRoutes([
        {
            path: '/juego',
            component: 'crazy-beach-game-page',
        },
        {
            path: '/ranking',
            component: 'crazy-beach-ranking-page',
        },
        {
            path: '/instrucciones',
            component: 'crazy-beach-instructions-page',
        },
        {
            path: '/cuenta',
            component: 'crazy-beach-account-page',
        },
        {
            path: '/acerca',
            component: 'crazy-beach-about-page',
        },
        {
            path: '/',
            component: 'crazy-beach-home-page',
            title: 'Home',
        },
        {
            path: '(.*)',
            component: 'crazy-beach-home-page',
        },
    ]);
}

window.addEventListener('load', () => initRouter());
