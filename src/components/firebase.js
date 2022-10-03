// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqqnoVZXxJW1WN5N_BXsk_e0IIgoH8yyY",
  authDomain: "photo-tagger-288ba.firebaseapp.com",
  projectId: "photo-tagger-288ba",
  storageBucket: "photo-tagger-288ba.appspot.com",
  messagingSenderId: "664262630192",
  appId: "1:664262630192:web:884770dc62a4d19d1a46f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;