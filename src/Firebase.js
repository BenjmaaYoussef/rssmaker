import "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBzNZmIMUsPrPA-_0XseF31PqexbzhzNYs",
    authDomain: "rssfeeder-2f1c0.firebaseapp.com",
    projectId: "rssfeeder-2f1c0",
    storageBucket: "rssfeeder-2f1c0.appspot.com",
    messagingSenderId: "647688615190",
    appId: "1:647688615190:web:027d7b75ca3b9d992b8c37",
    measurementId: "G-45WPZLGEQT"
  };

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);
export const auth = getAuth(app)
export default app