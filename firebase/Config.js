// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiWrB9ng1TQ0VyZiI6oJxJWfyShR6gVxk",
  authDomain: "todolistfirebase-e76e4.firebaseapp.com",
  databaseURL: "https://todolistfirebase-e76e4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todolistfirebase-e76e4",
  storageBucket: "todolistfirebase-e76e4.appspot.com",
  messagingSenderId: "407990849563",
  appId: "1:407990849563:web:df6532d3739ccd98a368be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// ADD DATABASE KEY FOR TODO'S HERE

export const TODOS_REF = '/todos/';