// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9AUbXaC-vucUIbeIV1zeSsC1rpreyjE4",
  authDomain: "recipefinder-ce73e.firebaseapp.com",
  projectId: "recipefinder-ce73e",
  storageBucket: "recipefinder-ce73e.firebasestorage.app",
  messagingSenderId: "591890500849",
  appId: "1:591890500849:web:076615b26f044af3dcad50",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
