// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCAFWO4bjQYP9zCOj-QVpiyr9KmOnDgkc",
  authDomain: "podcast-app-react-fcfd0.firebaseapp.com",
  projectId: "podcast-app-react-fcfd0",
  storageBucket: "podcast-app-react-fcfd0.appspot.com",
  messagingSenderId: "438638681183",
  appId: "1:438638681183:web:10c3780b6de372f8294fea",
  measurementId: "G-6W4LE67YPQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db= getFirestore(app);
const storage= getStorage(app);
const auth= getAuth(app);

export {db, storage, auth};

