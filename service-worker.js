const CACHE_NAME = 'fibropro-v1';
// This list should include all the files needed for the app shell to work offline.
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/index.tsx',
  '/App.tsx',
  '/types.ts',
  '/constants.ts',
  '/hooks/useLocalStorage.ts',
  '/hooks/useNotification.ts',
  '/components/icons/Icons.tsx',
  '/components/InfoCard.tsx',
  '/components/InfoScreen.tsx',
  '/components/TreatmentLog.tsx',
  '/components/AppointmentsLog.tsx',
  '/components/DailyLog.tsx',
  '/components/PainChart.tsx',
  '/components/LogStatistics.tsx',
  '/components/ConfirmationDialog.tsx',
  '/components/ReminderDialog.tsx',
  '/manifest.json'
];

// Install event: opens a cache and adds the app shell files to it.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        // AddAll can fail if one of the resources fails to be fetched.
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Activate event: cleans up old caches.
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: serves assets from cache first.
// This is a "cache-first" strategy, good for the app shell.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Not in cache - fetch from network, then cache it for next time.
        return fetch(event.request).then(
          (response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});
