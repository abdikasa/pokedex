const CACHE_NAME = "my_cache";

const urlsToCache = ["/", "./index.html", "static/js/bundle.js"];

self.addEventListener("install", (e) => {
  console.log("About to install the service worker babyy");
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      urlsToCache.forEach((url) => {
        return cache.add(url).then(() => self.skipWaiting());
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("about to activate my service worker");
  event.waitUntil(self.clients.claim);
});

self.addEventListener("fetch", function (event) {
  console.log("fetching ", event.request.url);
  if (
    event.request.cache === "only-if-cached" &&
    event.request.mode !== "same-origin"
  )
    return;

  if (navigator.onLine) {
    var fetchRequest = event.request.clone();
    return fetchWithTimeout(fetchRequest).then(function (response) {
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
    event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response) {
          return response;
        }
      })
    );
  }
});

function fetchWithTimeout(url, timeout = 7000) {
  return new Promise((resolve, reject) => {
    fetch(url).then(resolve, reject);
    if (timeout) {
      const e = new Error("Connection timed out");
      setTimeout(reject, timeout, e);
    }
  });
}

// self.addEventListener("fetch", async function (event) {
//   if (
//     event.request.cache === "only-if-cached" &&
//     event.request.mode !== "same-origin"
//   )
//     return;

//   let response = null;
//   if (navigator.onLine) {
//     response = await fetch(event.request);
//     if (!response || response.status !== 200 || response.type !== "basic") {
//       return response;
//     }
//     const cache = await caches.open(CACHE_NAME);
//     await cache.put(event.request, response.clone());
//     return response;
//   } else {
//     event.respondWith(
//       caches.match(event.request).then(function (response) {
//         if (response) {
//           return response;
//         }
//       })
//     );
//   }
// });

// const CACHE_NAME = "my_cache";

// self.addEventListener("install", (e) => {
//   console.log("About to install the service worker babyy");
//   e.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache
//         .addAll(["/", "/index.html", "static/js/bundle.js"])
//         .then(() => self.skipWaiting());
//     })
//   );
// });

// self.addEventListener("activate", (event) => {
//   console.log("about to activate my service worker");
//   event.waitUntil(self.clients.claim);
// });

// self.addEventListener("fetch", function (event) {
//   console.log(`about to fetch ${event.request.url}`);

//   if (
//     event.request.cache === "only-if-cached" &&
//     event.request.mode !== "same-origin"
//   )
//     return;

//   if (navigator.onLine) {
//     var fetchRequest = event.request.clone();
//     return fetch(fetchRequest).then(function (response) {
//       if (!response || response.status !== 200 || response.type !== "basic") {
//         return response;
//       }
//       var responseToCache = response.clone();
//       caches.open(CACHE_NAME).then(function (cache) {
//         cache.put(event.request, responseToCache);
//       });
//       return response;
//     });
//   } else {
//     event.respondWith(
//       caches.match(event.request).then(function (response) {
//         if (response) {
//           return response;
//         }
//       })
//     );
//   }
// });
