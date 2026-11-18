// Service Worker para PWA Control de Gastos - Versión 3 Limpia
const CACHE_NAME = 'gastos-cc-v3';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((k) => caches.delete(k)));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Passthrough directo a la red para que GitHub Pages y la APK siempre carguen en vivo
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
