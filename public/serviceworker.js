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
    return string + imageId(num) + ".webp";
  });
};

const timages = (string) => {
  return Array.from({ length: 17 }, (_, i) => i + 1).map((num) => {
    return string + typeNames[num - 1];
  });
};

const urlsToCache = [
  ...images(twebp),
  ...images(bwebp),
  ...timages(types),
  "./index.html",
  "../src/css/all.css",
  "../src/types-imgs/type_style.css",
  "https://fonts.googleapis.com/css?family=Nunito:600,800&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css",
  "https://api.iconify.design/mdi-pokeball.svg?color=rgb(200%2C184%2C32)&height=5rem",
  "https://api.iconify.design/mdi-pokeball.svg?color=rgb(200%2C168%2C120)&height=5rem",
  "https://api.iconify.design/mdi-pokeball.svg?color=%23e09618&height=5rem",
  "https://api.iconify.design/mdi-pokeball.svg?color=%231798e2&height=5rem",
  "https://api.iconify.design/mdi-pokeball.svg?color=%23dbbc10&height=5rem",
  "https://api.iconify.design/mdi-pokeball.svg?color=%23EE90E6&height=5rem",
  "https://api.iconify.design/mdi-pokeball.svg?color=%23B763CF&height=5rem",
  "https://api.iconify.design/mdi-pokeball.svg?color=%23FBA54C&height=5rem",
  "https://api.iconify.design/mdi-pokeball.svg?color=%23e38799&height=5rem",
  "https://api.iconify.design/mdi-pokeball.svg?color=%23D3425F&height=5rem",
  "https://api.iconify.design/mdi-pokeball.svg?color=%23a28f4b&height=5rem",
  "https://api.iconify.design/mdi-pokeball.svg?color=%2386bef8&height=5rem",
  "https://api.iconify.design/mdi-pokeball.svg?color=%23615d57&height=5rem",
  "https://api.iconify.design/mdi-pokeball.svg?color=%2320ABAB&height=5rem",
];

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
    caches.match(e.request).then((response) => {
      if (response) {
        console.log("return from sw");
        return response;
      }
      console.log("a new request, not from sw");
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
