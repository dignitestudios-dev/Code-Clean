import { getToken } from "firebase/messaging"; // Import getToken directly from firebase/messaging
import { messaging } from "./firebase"; // Import the initialized messaging instance from firebase.js

const getFCMToken = async () => {
  try {
    // Ask for permission
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.warn("Notification permission denied by user");
      return null;
    }

    // Get registration token
    const token = await getToken(messaging, {
      vapidKey:import.meta.env.VITE_APP_VAPID_KEY,
    });

    if (token) {
      localStorage.setItem("fcm_token", token); // optional caching
      return token;
    } else {
      console.warn("No registration token available.");
      return null;
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return null;
  }
};

const getFCM = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BPcmosYmWO7kJUQn5WtpztgEbS7_viq_RMd_7hyJams62Qe5FBlVFXkSH1Zvk3hhdvBeDoJ6BnegEAVZIYTAPGA", // Replace with your VAPID key
      });
      return token;
    } else {
      console.error("Notification permission denied");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

export default getFCMToken;
export { getFCM };
