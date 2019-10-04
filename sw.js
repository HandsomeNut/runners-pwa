
const staticCacheName = "site-static-v2"
const dynamicCacheName = "site-dynamic-v1"
const assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/style.css",
  "/css/materialize.min.css",
  "/img/cloudy.png",
  "/img/sunny.png",
  "/img/sunny_s_cloudy.png",
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
]

// install event
self.addEventListener("install", evt =>{
  console.log("service worker installed");
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  )
});

// activate event
self.addEventListener("activate", evt =>{
  console.log("service worker activated");
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      )
    })
  )
});

self.addEventListener("fetch", evt => {
  console.log("fetching some stuff");
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCacheName).then(cache =>{
          console.log("caching dynamically");
          cache.put(evt.request.url, fetchRes.clone());
          // limitCacheSize(dynamicCacheName, 15);
          return fetchRes;
        })

      });
    })
  )
});
