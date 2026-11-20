//   // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-analytics.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";
//   // TODO: Add SDKs for Firebase products that you want to use
//   // https://firebase.google.com/docs/web/setup#available-libraries

//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAo8nGicYap2VjxMmXSBcUsbGzMHi-JCmk",
    authDomain: "crud-app-ddb9b.firebaseapp.com",
    projectId: "crud-app-ddb9b",
    storageBucket: "crud-app-ddb9b.firebasestorage.app",
    messagingSenderId: "722584930548",
    appId: "1:722584930548:web:78ab1db7826ba7887476a1",
    measurementId: "G-CKQFSDNNZR"
};

//   // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// // Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { collection, getDocs, db, addDoc, deleteDoc, doc, updateDoc }