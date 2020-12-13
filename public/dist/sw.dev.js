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
          console.log("about to fetch ".concat(event.request.url));

          if (!navigator.onLine) {
            _context.next = 15;
            break;
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(fetch(event.request));

        case 4:
          response = _context.sent;

          if (!(!response || response.status !== 200 || response.type !== "basic")) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", response);

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(caches.open(CACHE_NAME));

        case 9:
          cache = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(cache.put(event.request, response.clone()));

        case 12:
          return _context.abrupt("return", response);

        case 15:
          event.respondWith(caches.match(event.request).then(function (response) {
            if (response) {
              return response;
            }
          }));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
});