importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCZeiD4LOwvkdDgaRhvIcb95_o_fNleeZA",
  authDomain: "swiftdrop-sync.firebaseapp.com",
  databaseURL: "https://swiftdrop-sync-default-rtdb.firebaseio.com",
  projectId: "swiftdrop-sync",
  storageBucket: "swiftdrop-sync.firebasestorage.app",
  messagingSenderId: "555313413479",
  appId: "1:555313413479:web:17ce2ed205807456b203c2"
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
