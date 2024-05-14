// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxuuf83wWEnvQNdu9Owooqk93u9G4DKp0",
  authDomain: "curso-react-c6ce2.firebaseapp.com",
  projectId: "curso-react-c6ce2",
  storageBucket: "curso-react-c6ce2.appspot.com",
  messagingSenderId: "799376513620",
  appId: "1:799376513620:web:dbf4a8936bf1bfabef6bc1"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp );

export const FirebaseDB = getFirestore( FirebaseApp );