import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAE5RTlCr1i8Sd62Oig5cr-CSX3V9jgcUc",
  authDomain: "ave-login.firebaseapp.com",
  projectId: "ave-login",
  storageBucket: "ave-login.firebasestorage.app",
  messagingSenderId: "1051709838471",
  appId: "1:1051709838471:web:8160a0f7169446ebe91422"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();