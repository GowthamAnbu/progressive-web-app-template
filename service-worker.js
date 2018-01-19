var cacheName = 'weatherPWA-step-6-2';
var filesToCache = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/styles/inline.css',
  '/images/clear.png',
  '/images/cloudy-scattered-showers.png',
  '/images/cloudy.png',
  '/images/fog.png',
  '/images/ic_add_white_24px.svg',
  '/images/ic_refresh_white_24px.svg',
  '/images/partly-cloudy.png',
  '/images/rain.png',
  '/images/scattered-showers.png',
  '/images/sleet.png',
  '/images/snow.png',
  '/images/thunderstorm.png',
  '/images/wind.png'
];

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
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

/**
 * basic registration to just mock the notification during the installation/registration (don't know which one for sure :( )
 */
self.registration.showNotification('Service Worker Notification', {
  body:'this is the body',
  actions: [
    {action: 'add', title: 'add'},
    {action: 'rate', title: 'rate'}
  ]
});

// in both the notificationclose and notificationclick one usually send the analysis part to the google analytics
/* event listener to just close the notification during the close notification click  */
self.addEventListener('notificationclose', event => {
console.log('notification closed');
});

/* actions to do once the notification is clicked */
self.addEventListener('notificationclick', event => {
  event.notification.close();
  switch (event.action) {
    case 'add':
      console.log('add clicked');
      break;
    case 'rate':
      console.log('rate clicked');
      break;
    default:
      console.log('notification clicked');
      break;
  }
});