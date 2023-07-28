import firebase from "firebase/compat/app";
import "firebase/compat/auth";

//Configuración web app firebase:
export const app=firebase.initializeApp({
    "projectId": "aeroback-e0403",
    "appId": "1:161949477599:web:5445373b021e5249e7976a",
    "databaseURL": "https://aeroback-e0403-default-rtdb.firebaseio.com",
    "storageBucket": "aeroback-e0403.appspot.com",
    "apiKey": "AIzaSyAeZFhhtJHv7FZKhuLg09vdowhI7Uzgfik",
    "authDomain": "aeroback-e0403.firebaseapp.com",
    "messagingSenderId": "161949477599"
  });