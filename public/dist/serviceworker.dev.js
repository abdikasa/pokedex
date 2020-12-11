"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

var urlsToCache = [].concat(_toConsumableArray(images(twebp)), _toConsumableArray(images(bwebp)), _toConsumableArray(timages(types)), ["index.html", "../src/css/all.css", "../src/types-imgs/type_style.css", "https://fonts.googleapis.com/css?family=Nunito:600,800&display=swap", "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css", "https://api.iconify.design/mdi-pokeball.svg?color=rgb(200%2C184%2C32)&height=5rem", "https://api.iconify.design/mdi-pokeball.svg?color=rgb(200%2C168%2C120)&height=5rem", "https://api.iconify.design/mdi-pokeball.svg?color=%23e09618&height=5rem", "https://api.iconify.design/mdi-pokeball.svg?color=%231798e2&height=5rem", "https://api.iconify.design/mdi-pokeball.svg?color=%23dbbc10&height=5rem", "https://api.iconify.design/mdi-pokeball.svg?color=%23EE90E6&height=5rem", "https://api.iconify.design/mdi-pokeball.svg?color=%23B763CF&height=5rem", "https://api.iconify.design/mdi-pokeball.svg?color=%23FBA54C&height=5rem", "https://api.iconify.design/mdi-pokeball.svg?color=%23e38799&height=5rem", "https://api.iconify.design/mdi-pokeball.svg?color=%23D3425F&height=5rem", "https://api.iconify.design/mdi-pokeball.svg?color=%23a28f4b&height=5rem", "https://api.iconify.design/mdi-pokeball.svg?color=%2386bef8&height=5rem", "https://api.iconify.design/mdi-pokeball.svg?color=%23615d57&height=5rem", "https://api.iconify.design/mdi-pokeball.svg?color=%2320ABAB&height=5rem"]);
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