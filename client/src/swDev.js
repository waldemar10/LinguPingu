/* eslint-disable no-restricted-globals */
export default function swDev() {
    if ("serviceWorker" in navigator) {
      const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
   
        navigator.serviceWorker
          .register(swUrl)
          .then(registration => {
            console.log("Service Worker registered with scope:", registration.scope);
          })
          .catch(error => {
            console.error("Service Worker registration failed:", error);
          });
    }
  }
 await Notification.requestPermission().then(permission => {
  // If the user accepts, create a notification
  if (permission === 'granted') {
    console.log('Notification permission granted');
    subscribeUserToPush();
  }
});
// If the user is subscribed to push notifications
function subscribeUserToPush() {
  if(navigator.serviceWorker === undefined) return;
  navigator.serviceWorker.ready.then(registration => {
    registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.REACT_APP_PUBLIC_VAPID_KEY
    })
    .then(subscription => {
      // console.log('User is subscribed:', subscription);
      sendSubscriptionToServer(subscription);
    })
    .catch(error => {
      // console.error('Failed to subscribe the user:', error);
    });
  });
}
 
function sendSubscriptionToServer(subscription) {
  // Payload contains information about the subscription
  const payload = {
    title:'Welcome to LinguPingu!',
    body:'LinguPingu is a language learning app. You can learn new words and phrases in different languages. Have fun!',
    icon:'/logo192.png'
  };

fetch(`${process.env.REACT_APP_SERVER_URI}/send-notification`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ subscription, payload }),
})
  .then(response => {
    console.log('Notification sent to server:', response);
  })
  .catch(error => {
    console.error('Error sending notification to server:', error);
  });
}
