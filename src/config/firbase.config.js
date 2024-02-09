// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC-34e7p1z1h9Aje3iNRQREAsGDDIW7VAs",
  authDomain: "codepen-clone-ac408.firebaseapp.com",
  projectId: "codepen-clone-ac408",
  storageBucket: "codepen-clone-ac408.appspot.com",
  messagingSenderId: "506835721588",
  appId: "1:506835721588:web:f1b173a1aa7c58bc64e021"
};

// Initialize Firebase
const app = getApps.length >0 ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth , db };