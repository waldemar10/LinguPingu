console.log("Service Worker loaded");
self.addEventListener("install", event => {
  try {
    console.log("Service Worker installed");
    event.waitUntil(
      caches.open("main-cache").then(cache => {
        return cache.addAll([
          '/index.html',
          '/static/js/app.js',
        ]);
      })
    );
  } catch (error) {
    console.error("Error during install:", error);
  }
  });

  self.addEventListener("activate", event => {
    console.log("Service Worker activated");
  });

  self.addEventListener('fetch', event => {
    console.log("Fetching:", event.request.url);
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });

 /*  self.addEventListener('sync', event => {
    if (event.tag === 'sync-task') {
      event.waitUntil(syncData());
    }
  }); */


  /* Push notification */
  self.addEventListener('push', event => {
    console.log('Push notification received:', event);
    const eventData = JSON.parse(event.data.text());
    const options = {
      title: eventData.title,
      body: eventData.body,
      icon: eventData.icon,
    };
   
    event.waitUntil(
      self.registration.showNotification(eventData.title,options)
        .then(() => console.log('Notification displayed successfully'))
        .catch(error => console.error('Error displaying notification:', error))
    );
  });

