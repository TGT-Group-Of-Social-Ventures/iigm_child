import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBsBEGXJCXYg6MLz2SNdUw8aqT43c9Q9bA",
  authDomain: "self-certification-lbc.firebaseapp.com",
  projectId: "self-certification-lbc",
  storageBucket: "self-certification-lbc.appspot.com",
  messagingSenderId: "947284446681",
  appId: "1:947284446681:web:6a1a4604e6ec8f3695ddc8",
  measurementId: "G-DDR9WBWTH3",
};

firebase.initializeApp(firebaseConfig);

const Login = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [error, setError] = useState(null);

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = () => {
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
      size: "invisible",
    });
    firebase
      .auth()
      .signInWithPhoneNumber(phone, recaptchaVerifier)
      .then((verificationId) => {
        setVerificationId(verificationId);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleSignInWithOtp = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((userCredential) => {
        // User successfully signed in
        const user = userCredential.user;
        console.log("User signed in:", user);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleSignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // User successfully signed in with Google
        const user = result.user;
        console.log("User signed in with Google:", user);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <div id="recaptcha-container"></div>
      <input type="text" placeholder="Phone Number" value={phone} onChange={handlePhoneChange} />
      <button onClick={handleSendOtp}>Send OTP</button>
      <input type="text" placeholder="OTP" value={otp} onChange={handleOtpChange} />
      <button onClick={handleSignInWithOtp}>Sign In with OTP</button>
      <button onClick={handleSignInWithGoogle}>Sign In with Google</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
