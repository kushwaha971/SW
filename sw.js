const CACHE_NAME = "my-cache/v1";

const CACHE_FILES = [
  "./index.html",
  "./style.css",
  "./photo.png",
  "./script.js",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(CACHE_FILES);
    })
  );
});
self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const cloneData = res.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, cloneData);
        });
        console.log("returning from network");
        return res;
      })
      .catch(() => {
        console.log("returning from cache");
        return caches.match(e.request).then((file) => file);
      })
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key != CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
