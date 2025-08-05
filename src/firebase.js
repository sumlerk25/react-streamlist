// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDEWyrFSCmu_DEJlX1HqiWICxbzTQfKyZo",
  authDomain: "streamlist-app-7a55c.firebaseapp.com",
  projectId: "streamlist-app-7a55c",
  storageBucket: "streamlist-app-7a55c.firebasestorage.app",
  messagingSenderId: "169010985250",
  appId: "1:169010985250:web:2dee161c15a1e8d78ccd7b",
  measurementId: "G-BEHX406DY7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider};