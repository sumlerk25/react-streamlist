const CACHE_NAME = "streamlist-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/static/js/bundle.js",   // Adjust if using a build system
  "/static/js/0.chunk.js",
  "/static/js/main.chunk.js",
  "/styles.css",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  // Add other static assets (images, fonts, etc.)
];

// Install event: cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event: cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
});

// Fetch event: serve cached assets when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch(() => {
      // fallback if offline and not in cache
      return new Response("Offline", { status: 503 });
    })
  );
});