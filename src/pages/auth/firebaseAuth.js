import React, { useState } from "react";
import { auth, signInWithGooglePopup } from "../../firebaseConfig/index";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Login = () => {
  const [phone, setPhone] = useState("+91");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [error, setError] = useState(null);

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const generateRecaptcha = async() => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      },
    });
  };    
  const handleSendOtp = async() => {
    await generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        window.recaptchaVerifier.render().then(function (widgetId) {
          grecaptcha.reset(widgetId);
        });
        console.log(error);
      });
  };

  const handleSignInWithOtp = () => {
    if (otp.length === 6) {
      // verifu otp
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          let user = result.user;
          console.log(user);
          alert("User signed in successfully");
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          alert("User couldn't sign in (bad verification code?)");
        });
    }
  };

  const handleSignInWithGoogle = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
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
