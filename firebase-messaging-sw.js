importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  messagingSenderId: "555313413479"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "SwiftDrop Logistics";
  const options = {
    body: payload.notification?.body || "يوجد إشعار جديد على شحنتك",
    icon: "./1795190351498.jpg"
  };
  self.registration.showNotification(title, options);
});
