const CACHE_NAME = "zenith-v1";
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(["/", "/index.html"])));
  self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((k) => Promise.all(k.filter((x) => x !== CACHE_NAME).map((x) => caches.delete(x)))));
  self.clients.claim();
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || e.request.url.includes("supabase.co")) return;
  e.respondWith(fetch(e.request).then((r) => { if (r.status === 200) { caches.open(CACHE_NAME).then((c) => c.put(e.request, r.clone())); } return r; }).catch(() => caches.match(e.request)));
});