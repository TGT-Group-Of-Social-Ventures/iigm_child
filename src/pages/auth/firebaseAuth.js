import React, { useState, useEffect } from "react";
import { auth, signInWithGooglePopup } from "../../firebaseConfig/index";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [phone, setPhone] = useState("+91");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [error, setError] = useState(null);
  const [recaptcha, setRecaptcha] = useState(null);
  const [showCaptcha, setShowCaptcha] = useState(true);
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    let recaptchaVerifier;
    recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
      size: "invisible",
    });
    setRecaptcha(recaptchaVerifier);
  }, []);

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async () => {
    try {
      const response = await signInWithPhoneNumber(auth, phone, recaptcha);
      alert("otp sended successfully");
      setShowCaptcha(false);
      setConfirmation(response);
    } catch (error) {
      switch (error.code) {
        case "auth/too-many-requests":
          alert("Too many requests. Please try again later.");
          break;
        case "auth/invalid-phone-number":
          alert("The phone number is invalid.");
          break;
        default:
          alert("Something went wrong. Please try again later.");
          break;
      }
      console.log(error);
    }
  };

  const handleSignInWithOtp = async () => {
    try {
      if (otp.length === 6) {
        const data = await confirmation.confirm(otp);
        router.push("/auth/deleteAccount");
        console.log(data);
      }
    } catch (error) {
      alert("Failed verifying otp");
      console.log("error verifying otp", error);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const response = await signInWithGooglePopup();
      console.log(response);
      router.push("/auth/deleteAccount");
    } catch (error) {
      console.log("error logging in", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div id="recaptcha-container"></div>
      <input type="text" placeholder="Phone Number" value={phone} onChange={handlePhoneChange} />
      <button id="sign-in-button" onClick={handleSendOtp}>
        Send OTP
      </button>
      <input type="text" placeholder="OTP" value={otp} onChange={handleOtpChange} />
      <button onClick={handleSignInWithOtp}>Sign In with OTP</button>
      <button onClick={handleSignInWithGoogle}>Sign In with Google</button>
      {error && <p>{error}</p>}
      {showCaptcha && <div id="recaptcha"></div>}
    </div>
  );
};

export default Login;
