// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {useEffect} from 'react'


import {getAuth,GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_I8UaeSmli_CR-JrFL3eU8SZVBu2b9Yk",
  authDomain: "task-manager-583b1.firebaseapp.com",
  projectId: "task-manager-583b1",
  storageBucket: "task-manager-583b1.appspot.com",
  messagingSenderId: "468055058682",
  appId: "1:468055058682:web:0516de53ced59a98dc8143",
  measurementId: "G-9PLHH2YKDP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore();
const auth =getAuth();
const provider= new GoogleAuthProvider();

export {db,auth,provider}