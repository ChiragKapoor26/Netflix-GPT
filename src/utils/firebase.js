// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeE-RL-xZ0MlwIR9KKRmRtgNkmVYelJHU",
  authDomain: "netflix-gpt-cabc1.firebaseapp.com",
  projectId: "netflix-gpt-cabc1",
  storageBucket: "netflix-gpt-cabc1.firebasestorage.app",
  messagingSenderId: "706425195859",
  appId: "1:706425195859:web:39af58dd17e7347a2ce5a6",
  measurementId: "G-96MNNEKSDX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);