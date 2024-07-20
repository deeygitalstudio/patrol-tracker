import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBak_0JVkjitl9uqQSLluUMa8Hn3uY8hos",
  authDomain: "halotrack-7af92.firebaseapp.com",
  projectId: "halotrack-7af92",
   databaseURL: "https://halotrack-7af92-default-rtdb.firebaseio.com/",
  storageBucket: "halotrack-7af92.appspot.com",
  messagingSenderId: "861287592710",
  appId: "1:861287592710:web:061f72144df2c2c0162487"
};


const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firebase Realtime Database and export the database reference


export default app;