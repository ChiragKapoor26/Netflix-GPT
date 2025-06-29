// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZyddEj4qU2hFEaolj5fXje4P4od2Qpyc",
  authDomain: "netflix-gpt-6943a.firebaseapp.com",
  projectId: "netflix-gpt-6943a",
  storageBucket: "netflix-gpt-6943a.firebasestorage.app",
  messagingSenderId: "907170678673",
  appId: "1:907170678673:web:b53095ef7e6193af01bc30",
  measurementId: "G-K2ZVYN5YZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();