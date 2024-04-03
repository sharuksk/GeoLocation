import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCZ8xDfFvUuozA7zqPOGQSqraU71ThA1PQ",
  authDomain: "geolocation-53bce.firebaseapp.com",
  projectId: "geolocation-53bce",
  storageBucket: "geolocation-53bce.appspot.com",
  messagingSenderId: "215301998838",
  appId: "1:215301998838:web:702c7a563331daad9e04d7",
  measurementId: "G-HLNE76MDPN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)
export const db = getFirestore(app)