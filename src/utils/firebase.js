// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuZ44GwXKAYJBhwZJ9DiX5aEWewK8L818",
  authDomain: "nr-netflixgpt.firebaseapp.com",
  projectId: "nr-netflixgpt",
  storageBucket: "nr-netflixgpt.appspot.com",
  messagingSenderId: "454009251088",
  appId: "1:454009251088:web:937f9ecafab96cf6f07195",
  measurementId: "G-W7EP7FWJYH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
console.log(analytics);