
const staticCacheName = "site-static-v15"
const dynamicCacheName = "site-dynamic-v12"
const assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/db.js",
  "/js/runTimer.js",
  "/js/materialize.min.js",
  "/css/style.css",
  "/css/materialize.min.css",
  "/img/cloudy.png",
  "/img/sunny.png",
  "/img/sunny_s_cloudy.png",
  "/img/wakelock.mp4",
  "/sound/go.mp3",
  "/sound/bing.mp3",
  "/sound/miep.mp3",
  "/sound/run.mp3",
  "/sound/pause.mp3",
  "/sound/warmup.mp3",
  "/sound/cooldown.mp3",
  "/sound/end.mp3",
  "/sound/almostDone.mp3",
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
]

// cache size limiter
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if(keys.length > size){
        cache.delete(keys[0]).then(limitCacheSize(name, size));
        console.log("Ich lösche...")
      }
    })
  })
};


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
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
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
