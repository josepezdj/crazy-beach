import { Router } from '@vaadin/router';
import './src/app';
import './src/styles/index.scss';

function initRouter() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('./sw.js')
                .then((registration) => {
                    console.log('SW registered: ', registration);
                })
                .catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }

    const router = new Router(document.querySelector('#app'));

    router.setRoutes([
        {
            path: '/',
            component: 'crazy-beach-app',
            children: [
                {
                    path: '',
                    component: 'crazy-beach-home-page',
                    action: async () => {
                        await import('./src/pages/home/crazy-beach-home-page');
                    },
                },
                {
                    path: '/juego',
                    component: 'crazy-beach-game-page',
                    action: async () => {
                        await import('./src/pages/game/crazy-beach-game-page');
                    },
                },
                {
                    path: '/ranking',
                    component: 'crazy-beach-ranking-page',
                    action: async () => {
                        await import('./src/pages/ranking/cb-ranking-page');
                    },
                },
                {
                    path: '/instrucciones',
                    component: 'crazy-beach-instructions-page',
                    action: async () => {
                        await import(
                            './src/pages/instructions/cb-instructions-page'
                        );
                    },
                },
                {
                    path: '/cuenta',
                    component: 'crazy-beach-account-page',
                    action: async () => {
                        await import('./src/pages/account/cb-account-page');
                    },
                },
                {
                    path: '/acerca',
                    component: 'crazy-beach-about-page',
                    action: async () => {
                        await import('./src/pages/about/cb-about-page');
                    },
                },
            ],
        },
        {
            path: '(.*)',
            component: 'crazy-beach-home-page',
            action: async () => {
                await import('./src/pages/home/crazy-beach-home-page');
            },
        },
    ]);
}

window.addEventListener('load', () => initRouter());
