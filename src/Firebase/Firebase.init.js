// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgB0yfDVKYsWbmFQfL_hQlcHrPvU5y--o",
  authDomain: "movematrix-a955c.firebaseapp.com",
  projectId: "movematrix-a955c",
  storageBucket: "movematrix-a955c.firebasestorage.app",
  messagingSenderId: "826228075915",
  appId: "1:826228075915:web:2fb4a54d2e9eff2663138e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


