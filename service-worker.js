const CACHE_NAME = 'my-pwa-cache';
const urlsToCache = [
  '/',
  '/style_cook.css',
  '/js_cook.js',
  '/ICONS/',
  '/iconsApp',
  'END-ALARM-1.mp3',
  'END-ALARM-2.mp3',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});