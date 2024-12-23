const CACHE_NAME = 'offline-cache-v3'; // قم بتغيير هذا الرقم في كل تحديث

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll([
        'offline.html',
        // أضف باقي الملفات التي تريد تخزينها في الكاش
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // حذف الكاش القديم
          }
        })
      );
    })
  );
  self.clients.claim();
});
