// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// for image:
import { getStorage} from "firebase/storage"; 

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-gHg5dS8ncz8SFgXl6HjGr4i6E3u9Jis",
  authDomain: "blogz-1baf5.firebaseapp.com",
  projectId: "blogz-1baf5",
  storageBucket: "blogz-1baf5.appspot.com",
  messagingSenderId: "985356529273",
  appId: "1:985356529273:web:1a1c19a7a49f0b48fceea8",
  measurementId: "G-NF9SJ4NKS3"
};

const app = initializeApp(firebaseConfig);
// Initialize Firebase
const auth = getAuth(app);

const db = getFirestore(app); // firebase.firestore(); if do the other way
const imageDb = getStorage(app);// firebase.storage();

export { auth, db, imageDb };