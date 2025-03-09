import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpCYaJchmEpsWlXHPD-uisjFaSRJ8x8Hk",
  authDomain: "nepair.firebaseapp.com",
  projectId: "nepair",
  storageBucket: "nepair.firebasestorage.app",
  messagingSenderId: "276467154587",
  appId: "1:276467154587:web:cb67bb2d3216d3588c503e",
  measurementId: "G-70HPST05X7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Named export for auth
export { auth };

// Default export for app
export default app;
export const database = getDatabase(app);
export const db = getFirestore(app);