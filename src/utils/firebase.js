// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1NORRIqAXyCDjX_lQJ1O7OZa5gBuAi_I",
  authDomain: "myvocab2.firebaseapp.com",
  projectId: "myvocab2",
  storageBucket: "myvocab2.appspot.com",
  messagingSenderId: "943146274517",
  appId: "1:943146274517:web:c3c51fd283cca8649fdc5c",
  measurementId: "G-KV49RBMWZD",
};
initializeApp(firebaseConfig);
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
export const db = getFirestore();

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyB0owUxHqFo9yfrG03D_G6Y-n1qkJHKre0",
//   authDomain: "myvocab-ab843.firebaseapp.com",
//   projectId: "myvocab-ab843",
//   storageBucket: "myvocab-ab843.appspot.com",
//   messagingSenderId: "214672186329",
//   appId: "1:214672186329:web:a8b47badc46a0539b157c8",
//   measurementId: "G-2BNT464LKX",
// };
// initializeApp(firebaseConfig);
// // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// export const db = getFirestore();

// -> myVocab Firestore, daily usage exceeded ( at 17:00pm)
