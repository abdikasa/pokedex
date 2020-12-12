"use strict";

//cache - storage of the browser
var CACHE_NAME = "version-1";

var imageId = function imageId(id) {
  return pad(id);
};

var pad = function pad(number) {
  var str = "" + number;

  while (str.length < 3) {
    str = "0" + str;
  }

  return str;
};

var twebp = "../src/pokemon_imgs/pokemon-thumb-webp/";
var bwebp = "../src/pokemon_imgs/pokemon-body-webp/";
var types = "../src/types-imgs/";
var typeNames = ["bug", "dark", "dragon", "electric", "fairy", "flying", "ghost", "grass", "ground", "fire", "ice", "normal", "poison", "psychic", "rock", "steel", "water"];

var images = function images(string) {
  return Array.from({
    length: 807
  }, function (_, i) {
    return i + 1;
  }).map(function (num) {
    return string + imageId(num) + ".webp";
  });
};

var timages = function timages(string) {
  return Array.from({
    length: 17
  }, function (_, i) {
    return i + 1;
  }).map(function (num) {
    return string + typeNames[num - 1] + ".svg";
  });
};

var urlsToCache = [// ...images(twebp),
// ...images(bwebp),
// ...timages(types),
"./index.html" // "../src/css/all.css",
// "../src/types-imgs/type_style.css",
// "https://fonts.googleapis.com/css?family=Nunito:600,800&display=swap",
// "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css",
// "https://api.iconify.design/mdi-pokeball.svg?color=rgb(200%2C184%2C32)&height=5rem",
// "https://api.iconify.design/mdi-pokeball.svg?color=rgb(200%2C168%2C120)&height=5rem",
// "https://api.iconify.design/mdi-pokeball.svg?color=%23e09618&height=5rem",
// "https://api.iconify.design/mdi-pokeball.svg?color=%231798e2&height=5rem",
// "https://api.iconify.design/mdi-pokeball.svg?color=%23dbbc10&height=5rem",
// "https://api.iconify.design/mdi-pokeball.svg?color=%23EE90E6&height=5rem",
// "https://api.iconify.design/mdi-pokeball.svg?color=%23B763CF&height=5rem",
// "https://api.iconify.design/mdi-pokeball.svg?color=%23FBA54C&height=5rem",
// "https://api.iconify.design/mdi-pokeball.svg?color=%23e38799&height=5rem",
// "https://api.iconify.design/mdi-pokeball.svg?color=%23D3425F&height=5rem",
// "https://api.iconify.design/mdi-pokeball.svg?color=%23a28f4b&height=5rem",
// "https://api.iconify.design/mdi-pokeball.svg?color=%2386bef8&height=5rem",
// "https://api.iconify.design/mdi-pokeball.svg?color=%23615d57&height=5rem",
// "https://api.iconify.design/mdi-pokeball.svg?color=%2320ABAB&height=5rem",
];
self.addEventListener("install", function (e) {
  console.log("[ServiceWorker] Installed"); // e.waitUntil Delays the event until the Promise is resolved

  e.waitUntil( // Open the cache
  caches.open(CACHE_NAME).then(function (cache) {
    // Add all the default files to the cache
    console.log("[ServiceWorker] Caching urlsToCache");
    return cache.addAll(urlsToCache);
  })); // end e.waitUntil
});
self.addEventListener("activate", function (e) {
  console.log("[ServiceWorker] Activated");
  e.waitUntil( // Get all the cache keys (CACHE_NAME)
  caches.keys().then(function (cacheNames) {
    return Promise.allSettled(cacheNames.map(function (thisCacheName) {
      // If a cached item is saved under a previous CACHE_NAME
      if (thisCacheName !== CACHE_NAME) {
        // Delete that cached file
        console.log("[ServiceWorker] Removing Cached Files from Cache - ", thisCacheName);
        return caches["delete"](thisCacheName);
      }
    }));
  })); // end e.waitUntil
});
self.addEventListener("fetch", function (e) {
  console.log("[ServiceWorker] Fetch", e.request.url); // e.respondWidth Responds to the fetch event

  e.respondWith( // Check in cache for the request being made
  caches.match(e.request).then(function (response) {
    // If the request is in the cache
    if (response) {
      console.log("[ServiceWorker] Found in Cache", e.request.url, response); // Return the cached version

      return response;
    } // If the request is NOT in the cache, fetch and cache


    var requestClone = e.request.clone();
    return fetch(requestClone).then(function (response) {
      if (!response) {
        console.log("[ServiceWorker] No response from fetch ");
        return response;
      }

      var responseClone = response.clone(); //  Open the cache

      caches.open(CACHE_NAME).then(function (cache) {
        // Put the fetched response in the cache
        cache.put(e.request, responseClone);
        console.log("[ServiceWorker] New Data Cached", e.request.url); // Return the response

        return response;
      }); // end caches.open
    })["catch"](function (err) {
      console.log("[ServiceWorker] Error Fetching & Caching New Data", err);
    });
  }) // end caches.match(e.request)
  ); // end e.respondWith
});