
import {initializeApp, getAnalytics} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyA7WldXxpkXLKlZzDq3mQJvsyhVEvOGQbY",
    authDomain: "goodhelp-c0f3f.firebaseapp.com",
    projectId: "goodhelp-c0f3f",
    storageBucket: "goodhelp-c0f3f.appspot.com",
    messagingSenderId: "63733202674",
    appId: "1:63733202674:web:3e053309e7860812619a6b",
    measurementId: "G-EPGSNN4S65"
  };
  
var app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const store = getStorage(app);
const firestore = getFirestore(app);
  
export {auth, store, firestore}