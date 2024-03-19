import React, { useState, useEffect } from "react";
import { auth, signInWithGooglePopup } from "../../firebaseConfig/index";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";

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
      alert("OTP sent successfully");
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
      alert("Failed verifying OTP");
      console.log("Error verifying OTP", error);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const response = await signInWithGooglePopup();
      console.log(response);
      router.push("/auth/deleteAccount");
    } catch (error) {
      console.log("Error logging in", error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        padding: 3,
        backgroundColor: "background.paper",
        borderRadius: 4,
        boxShadow: 2,
        textAlign: "center"
      }}
    >
      <Typography variant="h4" gutterBottom>
  Login
</Typography>
<Typography variant="body1" gutterBottom>
  When logging in, please provide the original email address or phone number associated with your account. This should be the same email or phone number used during registration. 
</Typography>
      <div id="recaptcha-container"></div>
      <TextField
        fullWidth
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={handlePhoneChange}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" onClick={handleSendOtp} sx={{ marginBottom: 2 }}>
        Send OTP
      </Button>
      <TextField
        fullWidth
        type="text"
        placeholder="OTP"
        value={otp}
        onChange={handleOtpChange}
        sx={{ marginBottom: 2 }}
      />
      <Button
  variant="contained"
  onClick={handleSignInWithOtp}
  sx={{ marginBottom: 2 }}
>
  Sign In with OTP
</Button>
      <Button variant="contained" onClick={handleSignInWithGoogle} sx={{ marginBottom: 2, marginLeft: 1 }}>
        Sign In with Google
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      {showCaptcha && <div id="recaptcha"></div>}
    </Box>
  );
};

export default Login;
