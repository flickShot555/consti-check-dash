import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration - Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBKhxqUj1lvRdwE4f5OSBYdNPejCdZsW-c",
  authDomain: "constitucheck.firebaseapp.com",
  databaseURL: "https://constitucheck-default-rtdb.firebaseio.com",
  projectId: "constitucheck",
  storageBucket: "constitucheck.firebasestorage.app",
  messagingSenderId: "1013706895454",
  appId: "1:1013706895454:web:20eb2f071a7fc6903c44cf",
  measurementId: "G-6YLQ2GG6SH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
