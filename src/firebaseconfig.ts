// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFoz1RiTdSa9bvniWfSFLF0ufk5T_UKXg",
  authDomain: "cyrus-310f3.firebaseapp.com",
  projectId: "cyrus-310f3",
  storageBucket: "cyrus-310f3.firebasestorage.app",
  messagingSenderId: "385108945343",
  appId: "1:385108945343:web:9141c7e405b209831f590a",
  measurementId: "G-KNEGSTS5ND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const store = getFirestore(app)