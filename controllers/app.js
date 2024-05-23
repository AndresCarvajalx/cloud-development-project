import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
// https://firebase.google.com/docs/web/setup#available-libraries
// https://www.gstatic.com/firebasejs/10.12.1/firebase-SERVICE.js

const firebaseConfig = {
  apiKey: "AIzaSyBbWlgPSdNQB4OUEE62IXwOLBOkoVAEAwc",
  authDomain: "cloud-development-projec-122ce.firebaseapp.com",
  projectId: "cloud-development-projec-122ce",
  storageBucket: "cloud-development-projec-122ce.appspot.com",
  messagingSenderId: "623892529364",
  appId: "1:623892529364:web:eeac2132756895a5773b41",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const createUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
export const signIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
