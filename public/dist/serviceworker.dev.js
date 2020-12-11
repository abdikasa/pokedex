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
var typeNames = ["bug", "dark", "dragon", "electric", "fairy", "flying", "ghost", "grass", "ground", "fire", "ice", "normal", "posion", "psychic", "rock", "steel", "water"];

var images = function images(string) {
  return Array.from({
    length: 807
  }, function (_, i) {
    return i + 1;
  }).map(function (num) {
    return string + imageId(num);
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

var urlsToCache = ["index.html"];
var self = void 0; //install service worker

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
    console.log("opened cache");
    return cache.addAll(urlsToCache);
  }));
}); //listen for requests

self.addEventListener("fetch", function (e) {
  e.respondWith(caches.match(e.request).then(function () {
    return fetch(e.request);
  }));
}); //activate the service worker

self.addEventListener("activate", function (e) {
  var cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);
  e.waitUntil(caches.keys().then(function (cacheNames) {
    return Promise.all(cacheNames.map(function (cname) {
      if (!cacheWhitelist.includes(cname)) {
        return caches["delete"](cacheName);
      }
    }));
  }));
});