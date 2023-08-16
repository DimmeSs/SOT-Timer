const CACHE_NAME = 'my-pwa-cache';
const urlsToCache = [
  '/Cook.html',
  '/js_cook.js',
  '/preloader-animation.js',
  '/README.md',
  '/style_cook.css',
  '/FONTS/Seconda Round W00 Bold.woff',
  '/FONTS/Windlass.woff',
  '/ICONS/background1-min.png',
  '/ICONS/bait.png',
  '/ICONS/Burned.png',
  '/ICONS/coins.png',
  '/ICONS/Doubloon.png',
  '/ICONS/FChicken.png',
  '/ICONS/FFish.png',
  '/ICONS/Fish.png',
  '/ICONS/FKraken.png',
  '/ICONS/FMegalodon.png',
  '/ICONS/FPork.png',
  '/ICONS/FShark.png',
  '/ICONS/FSnake.png',
  '/ICONS/Gold.png',
  '/ICONS/info.png',
  '/ICONS/map.png',
  '/ICONS/output.txt',
  '/ICONS/preloader.gif',
  '/ICONS/Skull.png',
  '/ICONS/SoT.png',
  '/ICONS/tips.png',
  '/ICONS/Top_image-min.png',
  '/ICONS/Top_image-min1.png',
  '/ICONS/Top_image-min1after.png',
  '/ICONS/Top_image.png',
  '/iconsApp/128x128.png',
  '/iconsApp/144x144.png',
  '/iconsApp/152x152.png',
  '/iconsApp/192x192.png',
  '/iconsApp/384x384.png',
  '/iconsApp/512x512.png',
  '/iconsApp/72x72.png',
  '/iconsApp/96x96.png',
  '/iconsApp/neromal.png',
  '/iconsApp/sot_icon.ico',
  '/iconsApp/sot_icon.png',
  '/iconsApp/sot_icon128x128.png',
  '/iconsApp/sot_icon144x144.png',
  '/iconsApp/sot_icon152x152.png',
  '/iconsApp/sot_icon192x192.png',
  '/iconsApp/sot_icon384x384.png',
  '/iconsApp/sot_icon512x512.png',
  '/iconsApp/sot_icon72x72.png',
  '/iconsApp/sot_icon96x96.png',
  '/preloader/11style.css',
  '/preloader/index.html',
  '/preloader/style.css',
  '/SOUND/END-SOUND-1.mp3',
  '/SOUND/END-SOUND-2.mp3',
  '/SOUND/SOUND-1.mp3',
  '/SOUND/SOUND-2.mp3'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      console.log('Otwarto pamięć podręczną');
      return cache.addAll(urlsToCache).catch(err => {
        console.error("Error adding files to cache:", err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request).then(function(response) {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        var responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then(function(cache) {
            cache.put(event.request, responseToCache);
          });
        return response;
      });
    })
  );
});