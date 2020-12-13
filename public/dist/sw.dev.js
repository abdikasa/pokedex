"use strict";

var CACHE_NAME = "my_cache";
self.addEventListener("install", function (e) {
  console.log("About to install the service worker babyy");
  e.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
    return cache.addAll(["/", "./index.html", "static/js/bundle.js"]).then(function () {
      return self.skipWaiting();
    });
  }));
});
self.addEventListener("activate", function (event) {
  console.log("about to activate my service worker");
  event.waitUntil(self.clients.claim);
});
self.addEventListener("fetch", function _callee2(event) {
  var response;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!(event.request.cache === "only-if-cached" && event.request.mode !== "same-origin")) {
            _context2.next = 2;
            break;
          }

          return _context2.abrupt("return");

        case 2:
          response = null;

          if (navigator.onLine) {
            setTimeout(function _callee() {
              var cache;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return regeneratorRuntime.awrap(fetch(event.request));

                    case 2:
                      response = _context.sent;

                      if (!(!response || response.status !== 200 || response.type !== "basic")) {
                        _context.next = 5;
                        break;
                      }

                      return _context.abrupt("return", response);

                    case 5:
                      _context.next = 7;
                      return regeneratorRuntime.awrap(caches.open(CACHE_NAME));

                    case 7:
                      cache = _context.sent;
                      _context.next = 10;
                      return regeneratorRuntime.awrap(cache.put(event.request, response.clone()));

                    case 10:
                      return _context.abrupt("return", response);

                    case 11:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            }, 600);
          } else {
            event.respondWith(caches.match(event.request).then(function (response) {
              if (response) {
                return response;
              }
            }));
          }

        case 4:
        case "end":
          return _context2.stop();
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