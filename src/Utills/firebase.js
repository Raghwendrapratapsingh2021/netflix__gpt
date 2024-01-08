// Import the functions you need from the SDKs you need
import {getAuth} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCO-A-dHcTZZxYK6N3Fyx9J7lac-aFHVP8",
  authDomain: "netflixgpt-d1f7f.firebaseapp.com",
  projectId: "netflixgpt-d1f7f",
  storageBucket: "netflixgpt-d1f7f.appspot.com",
  messagingSenderId: "636974403119",
  appId: "1:636974403119:web:79a5d83cfc2895435f80da",
  measurementId: "G-9TYGKENKB0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth();