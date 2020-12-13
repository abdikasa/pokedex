const CACHE_NAME = "my_cache";

self.addEventListener("install", (e) => {
  console.log("About to install the service worker babyy");
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache
        .addAll(["/", "/index.html", "static/js/bundle.js"])
        .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("about to activate my service worker");
  event.waitUntil(self.clients.claim);
});

self.addEventListener("fetch", async function (event) {
  console.log(`about to fetch ${event.request.url}`);
  if (
    event.request.cache === "only-if-cached" &&
    event.request.mode !== "same-origin"
  )
    return;
  if (navigator.onLine) {
    const response = await fetch(event.request);
    if (!response || response.status !== 200 || response.type !== "basic") {
      return response;
    }
    const cache = await caches.open(CACHE_NAME);
    await cache.put(event.request, response.clone());
    return response;
  } else {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response) {
          return response;
        }
      })
    );
  }
});
