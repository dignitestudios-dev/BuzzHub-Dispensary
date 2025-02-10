import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_KEY,
  authDomain: "buzzhub-a3c54.firebaseapp.com",
  projectId: "buzzhub-a3c54",
  storageBucket: "buzzhub-a3c54.firebasestorage.app",
  messagingSenderId: "828809286179",
  appId: "1:828809286179:web:d46968287dd3774c641796",
  measurementId: "G-8LG8CS6F0H",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");
export const db = getFirestore(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

export default app; // Export the app if needed
