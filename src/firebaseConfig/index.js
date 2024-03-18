import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBsBEGXJCXYg6MLz2SNdUw8aqT43c9Q9bA",
  authDomain: "self-certification-lbc.firebaseapp.com",
  projectId: "self-certification-lbc",
  storageBucket: "self-certification-lbc.appspot.com",
  messagingSenderId: "947284446681",
  appId: "1:947284446681:web:6a1a4604e6ec8f3695ddc8",
  measurementId: "G-DDR9WBWTH3",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account ",
});
export const auth = getAuth(app);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
