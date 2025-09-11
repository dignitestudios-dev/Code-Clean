importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyBwe8KvXVBjpah4Mnhssq0w6QANlGy776g",
  authDomain: "code-clean-llb.firebaseapp.com",
  projectId: "code-clean-llb",
  storageBucket: "code-clean-llb.firebasestorage.app",
  messagingSenderId: "142780490445",
  appId: "1:142780490445:web:6614967687b7f5c5087f84",
  measurementId: "G-YS3BPP7VWH"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Background notifications
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || '/logo192.png',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
