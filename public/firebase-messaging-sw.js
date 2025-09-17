// public/firebase-messaging-sw.js

// ✅ Use compat builds so global `firebase` exists
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBwe8KvXVBjpah4Mnhssq0w6QANlGy776g",
  authDomain: "code-clean-llb.firebaseapp.com",
  projectId: "code-clean-llb",
  storageBucket: "code-clean-llb.firebasestorage.app",
  messagingSenderId: "142780490445",
  appId: "1:142780490445:web:6614967687b7f5c5087f84",
  measurementId: "G-YS3BPP7VWH",
};

// ✅ Initialize Firebase inside the service worker
firebase.initializeApp(firebaseConfig);

// ✅ Get messaging instance
const messaging = firebase.messaging();

// ✅ Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message: ",
    payload
  );

  const notificationTitle = payload?.notification?.title || "New Notification";
  const notificationOptions = {
    body: payload?.notification?.body,
    icon: payload?.notification?.icon || "/logo192.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
