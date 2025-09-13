import { getMessaging, getToken } from "firebase/messaging";  // Import getToken directly from firebase/messaging
import { messaging } from "./firebase"; // Import the initialized messaging instance from firebase.js

const getFCMToken = async () => {
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
