import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5I45caFtLPEd23s7Hn2GNq70ixuYkGgE",
  authDomain: "frontend-cd3bf.firebaseapp.com",
  projectId: "frontend-cd3bf",
  storageBucket: "frontend-cd3bf.firebasestorage.app",
  messagingSenderId: "195594422841",
  appId: "1:195594422841:web:49d1c20a392b787ddd9be8",
  measurementId: "G-1HYW7DCPB7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();