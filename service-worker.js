self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("shivlilamrut-v1").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/style.css",
        "/app.js",
        "/data/shivlilamrut.json"
      ]);
    })
  );
});
