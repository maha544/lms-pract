// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXtBbJJ9Th75NWGNZ3k1vwpKejS0fkRP8",
  authDomain: "lms-pract.firebaseapp.com",
  databaseURL: "https://lms-pract-default-rtdb.firebaseio.com",
  projectId: "lms-pract",
  storageBucket: "lms-pract.appspot.com",
  messagingSenderId: "746863120724",
  appId: "1:746863120724:web:2801494af5d57bd3ad38c1",
  measurementId: "G-PVSE7X7EPK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app)

export {db};