self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open('static-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles.css',
                '/app.js',
            ]);
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== 'static-cache') {
                        console.log('Service Worker: Clearing old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetching', event.request.url);
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
