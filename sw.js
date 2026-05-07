const CACHE_NAME = 'caccia-tesoro-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://www.soundjay.com/buttons/sounds/button-16.mp3',
  'https://www.soundjay.com/buttons/sounds/button-10.mp3',
  'https://www.soundjay.com/buttons/sounds/button-09.mp3',
  'https://www.soundjay.com/buttons/sounds/button-4.mp3'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});