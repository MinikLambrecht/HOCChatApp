// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getMessaging } from 'firebase/messaging';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfAsCpdoZdoGAb0ODWj63i1NO_DuPiW1w",
  authDomain: "hoc-chatapp-522b8.firebaseapp.com",
  databaseURL: "https://hoc-chatapp-522b8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hoc-chatapp-522b8",
  storageBucket: "hoc-chatapp-522b8.appspot.com",
  messagingSenderId: "105020753017",
  appId: "1:105020753017:web:9bae7158f4ee29909b40a8",
  measurementId: "G-NZ2S5LPRDQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize SDKs
export const auth = getAuth(app);
export const nonSocial = createUserWithEmailAndPassword();
export const googleProvider = GoogleAuthProvider();
export const facebookProvider = FacebookAuthProvider();

export const firestone = getFirestore(app);
export const messaging = getMessaging(app);
export const database = getDatabase(app);