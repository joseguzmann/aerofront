import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAeZFhhtJHv7FZKhuLg09vdowhI7Uzgfik",
  authDomain: "aeroback-e0403.firebaseapp.com",
  databaseURL: "https://aeroback-e0403-default-rtdb.firebaseio.com",
  projectId: "aeroback-e0403",
  storageBucket: "aeroback-e0403.appspot.com",
  messagingSenderId: "161949477599",
  appId: "1:161949477599:web:f866423a8a72d979e7976a",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
