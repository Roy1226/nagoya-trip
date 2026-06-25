const CACHE_NAME = 'nagoya-map-v1';
const urlsToCache = [
  './nagoya_map.html',
  './manifest.json',
  'https://unpkg.com/leaflet/dist/leaflet.css',
  'https://unpkg.com/leaflet/dist/leaflet.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果 Cache 有就回傳 Cache，無就去網絡拎
        return response || fetch(event.request);
      })
  );
});