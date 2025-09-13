import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getFirestore,serverTimestamp,addDoc,collection,onSnapshot,orderBy,query,where,doc,updateDoc,getDoc,setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_APP_FIREBASE_KEY,
  authDomain: "code-clean-llb.firebaseapp.com",
  projectId: "code-clean-llb",
  storageBucket: "code-clean-llb.firebasestorage.app",
  messagingSenderId: "142780490445",
  appId: "1:142780490445:web:6614967687b7f5c5087f84",
  measurementId: "G-YS3BPP7VWH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");
export const db = getFirestore(app);
export const storage = getStorage(app);

const messaging = getMessaging(app);

export { messaging,collection,addDoc,serverTimestamp,onSnapshot,orderBy,query,where,doc,updateDoc,getDoc,setDoc };

export default app; // Export the app for use in other parts of your app
