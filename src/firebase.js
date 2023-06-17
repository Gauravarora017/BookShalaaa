// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyCDLuBZvJrBSwdTereEG6KlcaenQAIR_FY",
  authDomain: "bookshala-b9359.firebaseapp.com",
  projectId: "bookshala-b9359",
  storageBucket: "bookshala-b9359.appspot.com",
  messagingSenderId: "696158743601",
  appId: "1:696158743601:web:0538742b9985b2a7c7b910",
  measurementId: "G-72T6T8C3ZV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export {app , auth};