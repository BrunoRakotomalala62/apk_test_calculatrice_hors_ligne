// Service Worker — Calculatrice PWA
// Met en cache tous les fichiers de l'application pour un fonctionnement hors ligne.

const CACHE_NAME = 'calculatrice-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon.svg',
  './icon-192.png',
  './icon-512.png'
];

// Installation : pré-charge tous les fichiers dans le cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activation : supprime les anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Interception réseau : cache-first (sert depuis le cache, sinon réseau)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        // On met à jour le cache pour les futures requêtes
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          if (response.ok) cache.put(event.request, clone);
        });
        return response;
      }).catch(() => caches.match('./index.html')); // fallback offline
    })
  );
});
