import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getFirestore,serverTimestamp,addDoc,collection,onSnapshot,orderBy,query,where,doc,updateDoc,getDoc,setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_KEY,
  authDomain: "code-clean-47801.firebaseapp.com",
  projectId: "code-clean-47801",
  storageBucket: "code-clean-47801.firebasestorage.app",
  messagingSenderId: "207099980263",
  appId: "1:207099980263:web:33b2f335cd69e56b7fb542",
  measurementId: "G-Z2DFVJQJDM",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");
export const db = getFirestore(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

const messaging = getMessaging(app);

export { messaging,collection,addDoc,serverTimestamp,onSnapshot,orderBy,query,where,doc,updateDoc,getDoc,setDoc };

export default app; // Export the app if needed
