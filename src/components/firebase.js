import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB0wZJhAzXgwWlRM6hFC6JrHWWrLSkFF4k",
  authDomain: "sign-70c1f.firebaseapp.com",
  projectId: "sign-70c1f",
  storageBucket: "sign-70c1f.appspot.com",
  messagingSenderId: "1075683076710",
  appId: "1:1075683076710:web:4e21e742db43539d8f5ba7",
  measurementId: "G-S6QKB0PLW2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
