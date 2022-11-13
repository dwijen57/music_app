const cacheName = 'cacheAssets-v10';

/**
 * On Install Event
 * Triggered when the service worker is installed
 */
self.addEventListener('install', function (event) {

  // This causes your service worker to kick out the 
  // current active worker and activate itself as 
  // soon as it enters the waiting phase .
  self.skipWaiting();

  // Cache some assets during the SW intallation.
  // It makes sure to wait for the caching before
  // continuing to the next cycle.
  event.waitUntil(
    caches.open(cacheName)
      .then(function (cache) {
        cache.addAll([
          '/',
          '/index.html',
          '/manifest.json',
          '/script.js',
          '/style.css',
          '/icons/android-chrome-192x192.png',
          '/icons/android-chrome-512x512.png',
          '/icons/maskable_icon_x512.png'
        ])
      })
  );
});

/**
 * On Activate Event
 * Triggered when the service worker is activated
 */
self.addEventListener('activate', function (event) {

  // When a service worker is initially registered,
  // pages won't use it until they next load. 
  // The claim() method causes those pages to be 
  // controlled immediately.
  event.waitUntil(clients.claim());

  // Delete the old versions of the cache
  event.waitUntil(
    caches.keys()
      .then(function (cacheNames) {
        return Promise.all(
          cacheNames
            .filter(item => item !== cacheName)
            .map(item => caches.delete(item))
        )
      })
  );

});

/**
 * On Fetch Event
 * Triggered when the service worker retrieves an asset
 */
self.addEventListener('notifClick',  (event) => {

  
  const action = event.action;
  const notification = event.notification;
  const data = notification.data;
  console.log("Data:", action);
  const options = {
    includeUncontrolled: true,
    type: "all",
  };

  switch (action) {
    case "agree":
      clients.matchAll(options).then((clients) => {
        clients.forEach((client) => {
          client.postMessage("So we both agree on that!");
        });
      });
      break;

    case "disagree":
      clients.matchAll(options).then((clients) => {
        clients.forEach((clients) => {
          clients.postMessage("Let's agree to disagree.");
        });
      });
      break;

    case "":
      console.log("Clicked on the notification.");
      const openPromise = clients.openWindow("/index.html");
      event.waitUntil(openPromise);
      break;
  }

  

});