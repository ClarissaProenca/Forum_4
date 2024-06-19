import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA4-JMi1ERIFPm9T1gHbWam2dffK19uoCE",
  authDomain: "forum-gamificado-2bcf9.firebaseapp.com",
  projectId: "forum-gamificado-2bcf9",
  storageBucket: "forum-gamificado-2bcf9.appspot.com",
  messagingSenderId: "821488973214",
  appId: "1:821488973214:web:dfa7fc18cfc64eab39528f",
  measurementId: "G-P7DJX87RC7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
