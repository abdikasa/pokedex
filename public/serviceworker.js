//cache - storage of the browser
const CACHE_NAME = "version-1";

const imageId = (id) => pad(id);

const pad = (number) => {
  let str = "" + number;
  while (str.length < 3) {
    str = "0" + str;
  }
  return str;
};

const twebp = "../src/pokemon_imgs/pokemon-thumb-webp/";
const bwebp = "../src/pokemon_imgs/pokemon-body-webp/";
const types = "../src/types-imgs/";
const typeNames = [
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "flying",
  "ghost",
  "grass",
  "ground",
  "fire",
  "ice",
  "normal",
  "posion",
  "psychic",
  "rock",
  "steel",
  "water",
];

const images = (string) => {
  return Array.from({ length: 807 }, (_, i) => i + 1).map((num) => {
    return string + imageId(num);
  });
};

const timages = (string) => {
  return Array.from({ length: 17 }, (_, i) => i + 1).map((num) => {
    return string + typeNames[num - 1] + ".svg";
  });
};

const urlsToCache = ["index.html"];

const self = this;
//install service worker
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

//listen for requests
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(() => {
      return fetch(e.request);
    })
  );
});

//activate the service worker
self.addEventListener("activate", (e) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);
  e.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cname) => {
          if (!cacheWhitelist.includes(cname)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
