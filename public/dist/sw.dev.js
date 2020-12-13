"use strict";

var CACHE_NAME = "my_cache";
self.addEventListener("install", function (e) {
  console.log("About to install the service worker babyy");
  e.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
    return cache.addAll(["/", "/index.html", "static/js/bundle.js"]).then(function () {
      return self.skipWaiting();
    });
  }));
});
self.addEventListener("activate", function (event) {
  console.log("about to activate my service worker");
  event.waitUntil(self.clients.claim);
});
self.addEventListener("fetch", function (event) {
  console.log("about to fetch ".concat(event.request.url));
  if (event.request.cache === "only-if-cached" && event.request.mode !== "same-origin") return;

  if (navigator.onLine) {
    var fetchRequest = event.request.clone();
    return fetch(fetchRequest).then(function (response) {
      if (!response || response.status !== 200 || response.type !== "basic") {
        return response;
      }

      var responseToCache = response.clone();
      caches.open(CACHE_NAME).then(function (cache) {
        cache.put(event.request, responseToCache);
      });
      return response;
    });
  } else {
    event.respondWith(caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
    }));
  }
});