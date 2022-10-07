// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBr_k1DEziZnajTs2--owuEsi3tYmqVKYo",
  authDomain: "scd-patient-app.firebaseapp.com",
  projectId: "scd-patient-app",
  storageBucket: "scd-patient-app.appspot.com",
  messagingSenderId: "438549594672",
  appId: "1:438549594672:web:ce24e36311fd03971223f5",
  measurementId: "G-ZHK0XFM3MJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
