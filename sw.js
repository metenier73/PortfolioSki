// Configuration du Service Worker
const CACHE_NAME = 'portfolio-ski-v1';
const OFFLINE_URL = '/offline.html';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/css/main.min.css',
  '/assets/css/images.css',
  '/assets/js/main.js',
  '/assets/js/image-loader.js',
  '/optimized_images/logoMM-400w.webp',
  '/optimized_images/logoMM-400w.png',
  '/optimized_images/PisteArc-400w.webp',
  '/optimized_images/PisteArc-400w.png',
  '/optimized_images/PisteRosiere-400w.webp',
  '/optimized_images/PisteRosiere-400w.png',
  '/assets/webfonts/fa-brands-400.woff2',
  '/assets/webfonts/fa-solid-900.woff2',
  OFFLINE_URL
];

// Installation du Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
  self.skipWaiting();
});

// Activation du Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Stratégie: Cache First, puis réseau
self.addEventListener('fetch', event => {
  // Ignorer les requêtes non-GET et les requêtes vers des API externes
  if (event.request.method !== 'GET' || 
      event.request.url.startsWith('chrome-extension') || 
      event.request.url.includes('browser-sync') ||
      event.request.url.includes('google-analytics')) {
    return;
  }

  // Gérer les requêtes d'images avec stratégie Cache First
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request).then(fetchResponse => {
          // Ne pas mettre en cache les images si la réponse n'est pas valide
          if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
            return fetchResponse;
          }

          // Mettre en cache la réponse pour les requêtes ultérieures
          const responseToCache = fetchResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return fetchResponse;
        }).catch(() => {
          // En cas d'erreur, retourner une image de secours si disponible
          return caches.match('/assets/images/placeholder.jpg');
        });
      })
    );
    return;
  }

  // Pour les autres requêtes, utiliser la stratégie Network First
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then(response => {
        // Si la page demandée n'est pas en cache, afficher la page hors ligne
        if (event.request.mode === 'navigate') {
          return caches.match(OFFLINE_URL);
        }
        return response;
      });
    })
  );
});

// Gérer les mises à jour en arrière-plan
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
