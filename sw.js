// Service Worker — Calculatrice PWA
// Stratégie : network-first avec cache runtime (installation garantie sans échec)

const CACHE_NAME = 'calculatrice-v2';

// Installation immédiate — ne pré-cache rien pour éviter tout échec
self.addEventListener('install', () => {
  self.skipWaiting(); // Active le SW immédiatement, sans attendre
});

// Activation — prend le contrôle de toutes les pages
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Stratégie réseau d'abord, puis cache (fallback hors ligne)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Mise en cache pour le futur mode hors ligne
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match('./')))
  );
});
