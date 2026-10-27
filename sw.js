/* ============================================================
   Miriam College HRIS — Service Worker
   ------------------------------------------------------------
   Makes the HRIS installable (PWA) and keeps the app shell
   available offline. Static assets are served cache-first;
   live data (Supabase REST/Auth) always goes to the network so
   records stay current. Bump CACHE on every asset change.
   ============================================================ */
const CACHE = 'mc-hris-v1';

// App shell — relative to the service-worker scope (works on a
// GitHub Pages sub-path). A failed entry never blocks install.
const SHELL = [
  'hris.html',
  'manifest.webmanifest',
  'assets/css/styles.css',
  'assets/js/config.js',
  'assets/js/config-store.js',
  'assets/js/auth.js',
  'assets/js/data.js',
  'assets/js/ui.js',
  'assets/js/app.js',
  'assets/js/modules.js',
  'assets/js/portals.js',
  'assets/js/features.js',
  'assets/js/settings.js',
  'assets/js/db-supabase.js',
  'assets/Images/Miriam%20Logo.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await Promise.allSettled(SHELL.map((u) => c.add(u)));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;                       // never cache writes
  const url = new URL(req.url);

  // Live backend (Supabase) and any cross-origin API → network only.
  const isApi = /supabase\.(co|in)/.test(url.hostname) || url.pathname.includes('/rest/v1') || url.pathname.includes('/auth/v1');
  if (isApi) return;                                      // let the browser handle it

  // Navigations → network-first, fall back to the cached shell (offline).
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      try { return await fetch(req); }
      catch { return (await caches.match('hris.html')) || (await caches.match(req)) || Response.error(); }
    })());
    return;
  }

  // Same-origin static assets → cache-first, then populate the cache.
  if (url.origin === self.location.origin) {
    e.respondWith((async () => {
      const hit = await caches.match(req);
      if (hit) return hit;
      try {
        const res = await fetch(req);
        if (res && res.ok && res.type === 'basic') {
          const c = await caches.open(CACHE); c.put(req, res.clone());
        }
        return res;
      } catch {
        return hit || Response.error();
      }
    })());
    return;
  }

  // Cross-origin (fonts, logos) → cache-first with network fallback.
  e.respondWith((async () => {
    const hit = await caches.match(req);
    if (hit) return hit;
    try {
      const res = await fetch(req);
      const c = await caches.open(CACHE); c.put(req, res.clone());
      return res;
    } catch { return hit || Response.error(); }
  })());
});
