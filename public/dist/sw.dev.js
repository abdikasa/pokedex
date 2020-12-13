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
self.addEventListener("fetch", function _callee(event) {
  var response, cache;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(event.request.cache === "only-if-cached" && event.request.mode !== "same-origin")) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return");

        case 2:
          response = null;

          if (!navigator.onLine) {
            _context.next = 18;
            break;
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(fetch(event.request));

        case 6:
          response = _context.sent;

          if (!(!response || response.status !== 200 || response.type !== "basic")) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", response);

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(caches.open(CACHE_NAME));

        case 11:
          cache = _context.sent;
          console.log(event.request, response.clone());
          _context.next = 15;
          return regeneratorRuntime.awrap(cache.put(event.request, response.clone()));

        case 15:
          return _context.abrupt("return", response);

        case 18:
          event.respondWith(caches.match(event.request).then(function (response) {
            if (response) {
              return response;
            }
          }));

        case 19:
        case "end":
          return _context.stop();
      }
    }
  });
}); // const CACHE_NAME = "my_cache";
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