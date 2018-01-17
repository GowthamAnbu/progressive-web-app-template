var cacheName = 'weatherPWA-step-6-1';
var filesToCache = [];

/**
 * all the storage related things go here 
 * things during the installation of the service worker
*/
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

/**
 * all the things like fetching data from cache or network,
 * deleting the cache data goes here
*/
self.addEventListener('activate', function(e) {
	console.log('[ServiceWorker] Activate');
});