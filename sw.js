importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([
  { url: '/index.html', revision: '1' },
  { url: '/standings.html', revision: '1' },
  { url: '/team.html', revision: '1' },
  { url: '/saved.html', revision: '1' },
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/css/style.css', revision: '1' },
  { url: '/js/materialize.min.js', revision: '1' },
  { url: '/js/api.js', revision: '1' },
  { url: '/js/idb.js', revision: '1' },
  { url: '/js/db.js', revision: '1' },
  { url: '/img/Bundesliga_logo_(2017).png', revision: '1' },
  { url: '/img/LaLiga.svg', revision: '1' },
  { url: '/img/ligue-1.png', revision: '1' },
  { url: '/img/player.svg', revision: '1' },
  { url: '/img/ligue-1.png', revision: '1' },
  { url: '/img/premier-league.png', revision: '1' },
  { url: '/img/save.svg', revision: '1' },
  { url: '/manifest.json', revision: '1' },
  { url: '/img/icon.png', revision: '1' },
  { url: '/font/material-icon.woff2', revision: '1' },
]);

workbox.routing.registerRoute(
  new RegExp('/'),
  workbox.strategies.staleWhileRevalidate()
);

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});