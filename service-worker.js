// Core assets
let coreAssets = [
	'./',
	'./juego',
	'./acerca',
	'./cuenta',
	'./instrucciones',
	'./ranking',
	'./index.html',
	'./manifest.webmanifest',
	'./build/main.js',
	'./assets/icons/favicon-72x72.png',
	'./assets/icons/favicon-96x96.png',
	'./assets/icons/favicon-128x128.png',
	'./assets/icons/favicon-144x144.png',
	'./assets/icons/favicon-152x152.png',
	'./assets/icons/favicon-192x192.png',
	'./assets/icons/favicon-384x384.png',
	'./assets/icons/favicon-512x512.png',
	'./assets/icons/icon-arrow-down.png',
	'./assets/icons/icon-arrow-up.png',
	'./assets/icons/icon-arrow-left.png',
	'./assets/icons/icon-info.png',
	'./assets/icons/icon-instructions.png',
	'./assets/icons/icon-medal.png',
	'./assets/icons/icon-trophy.png',
	'./assets/icons/icon-user.png',
	'./assets/images/beach-bg-small.jpg',
	'./assets/images/beach-main.jpg',
	'./assets/images/boat.png',
	'./assets/images/gradient.png',
	'./assets/images/left.png',
	'./assets/images/right.png',
	'./assets/images/player.png',
	'./assets/images/waves.png',
	'./assets/images/instructions-page-bg.jpg',
	'./assets/images/ranking-bg.jpg',
	'./assets/images/sand.jpg',
	'./assets/music/level1.mp3',
	'./assets/music/soundscape-beach.mp3',
	'./assets/sounds/countdown-beep.mp3',
	'./assets/sounds/final.mp3',
	'./assets/sounds/gameover.mp3',
	'./assets/sounds/levelup.mp3',
	'./assets/sounds/step1.mp3',
	'./assets/sounds/step2.mp3',
];

const cacheAppName = 'crazy-beach-app-data';

const addResourcesToCache = async (resources) => {
	const cache = await caches.open(cacheAppName);
	resources.map(async (resource) => {
		await cache.add(resource);
	});
};

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(cacheAppName)
			.then((cache) => {
				return addResourcesToCache(coreAssets);
			})
			.then((success) => {
				console.log(`Success! Installed ${cacheAppName}`);
			})
			.catch((error) => {
				console.log('Could not cache' + error);
			})
	);
});

self.addEventListener('fetch', (event) => {
	if (
		event.request.cache === 'only-if-cached' &&
        event.request.mode !== 'same-origin'
	)
		return;

	event.respondWith(
		caches.match(event.request).then((cachedResponse) => {
			const networkFetch = fetch(event.request).then((response) => {
				// update the cache with a clone of the network response
				const responseClone = response.clone();
				caches.open(cacheAppName).then((cache) => {
					cache.put(event.request, responseClone);
				});
				return response;
			});
			// prioritize cached response over network
			return cachedResponse || networkFetch;
		})
	);
});
