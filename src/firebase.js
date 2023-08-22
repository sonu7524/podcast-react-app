// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA97aI2lYUXl3_8CbyKNiTHU6eJ8fdXMLo",
  authDomain: "podcast-poject.firebaseapp.com",
  projectId: "podcast-poject",
  storageBucket: "podcast-poject.appspot.com",
  messagingSenderId: "999606635968",
  appId: "1:999606635968:web:bfe600a6bb061465374c25",
  measurementId: "G-E6Z4825GCE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, db, storage, provider };
