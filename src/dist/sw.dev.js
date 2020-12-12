"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/* eslint-disable no-undef, no-restricted-globals, no-underscore-dangle */
console.log("My Custom Service Worker");
var urlsToCache = ["../public/index.html", "../css/all.css", "./types-imgs/type_style.css", "https://fonts.googleapis.com/css?family=Nunito:600,800&display=swap", "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css", "https://api.iconify.design/mdi-pokeball.svg?color=rgb(200%2C184%2C32)&height=5rem", "https://api.iconify.design/mdi-pokeball.svg?color=rgb(200%2C168%2C120)&height=5rem", "https://api.iconify.design/mdi-pokeball.svg?color=%23e09618&height=5rem", "https://api.iconify.design/mdi-pokeball.svg?color=%231798e2&height=5rem", "https://api.iconify.design/mdi-pokeball.svg?color=%23dbbc10&height=5rem", "https://api.iconify.design/mdi-pokeball.svg?color=%23EE90E6&height=5rem", "https://api.iconify.design/mdi-pokeball.svg?color=%23B763CF&height=5rem", "https://api.iconify.design/mdi-pokeball.svg?color=%23FBA54C&height=5rem", "https://api.iconify.design/mdi-pokeball.svg?color=%23e38799&height=5rem", "https://api.iconify.design/mdi-pokeball.svg?color=%23D3425F&height=5rem", "https://api.iconify.design/mdi-pokeball.svg?color=%23a28f4b&height=5rem", "https://api.iconify.design/mdi-pokeball.svg?color=%2386bef8&height=5rem", "https://api.iconify.design/mdi-pokeball.svg?color=%23615d57&height=5rem", "https://api.iconify.design/mdi-pokeball.svg?color=%2320ABAB&height=5rem"].map(function (url) {
  if (url === "../public/index.html") return {
    url: url,
    revision: "6586221"
  };
  return {
    url: url,
    revision: null
  };
});
workbox.precaching.precacheAndRoute([self.__precacheManifest].concat(_toConsumableArray(urlsToCache)));
workbox.core.skipWaiting();
workbox.core.clientsClaim();