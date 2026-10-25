// Ascend Prep service worker: app shell works offline, API always goes to the network.
const VERSION = 'v4';
const SHELL = `ascend-shell-${VERSION}`;
const ASSETS = ['/', '/index.html', `/app.js?v=${VERSION}`, `/styles.css?v=${VERSION}`, '/manifest.webmanifest', '/icons/icon-192.png', '/icons/icon-512.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(SHELL).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== SHELL).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (url.origin !== location.origin) return; // fonts etc.: let the browser handle them
  if (url.pathname.startsWith('/api/')) return; // never cache student data
  if (e.request.mode === 'navigate') { e.respondWith(fetch(e.request).catch(() => caches.match('/index.html'))); return; }
  e.respondWith(caches.match(e.request).then(cached => { const net = fetch(e.request).then(res => { if (res.ok) caches.open(SHELL).then(c => c.put(e.request, res.clone())); return res; }).catch(() => cached); return cached || net; }));
});
self.addEventListener('message', (e) => { if (e.data === 'skipWaiting') self.skipWaiting(); });
