import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Layout as AuthLayout } from "src/layouts/auth/layout";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("Loading...");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isVerificationSuccess, setIsVerificationSuccess] = useState(false);
  const [isSendOtpDisabled, setIsSendOtpDisabled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    getEmail();
  }, []);

  const getEmail = async () => {
    const emailParsed = await localStorage.getItem("verifyEmail");
    setEmail(emailParsed);
  };

  const headers = {
    "Content-Type": "application/json",
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    router.push('/auth/login');
  };

  const handleEmailSubmit = async (emailSub) => {
    try {
      const response = await axios.post(
        "https://backend.iigminstitute.com/api/otp/sendOTP",
        {
          email: emailSub,
        },
        { headers }
      );

      if (response.data.status) {
        setIsOtpSent(true);
        setSnackbarMessage("OTP sent to your email");
        setIsSnackbarOpen(true);
        setIsSendOtpDisabled(true); // Disable the "Send OTP" button
        setTimeout(() => {
          setIsSendOtpDisabled(false); // Enable the "Send OTP" button after 60 seconds
        }, 60000);
      } else {
        const msg = response.data.msg;
        alert(msg);
      }
    } catch (error) {
      alert("error sending otp");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backend.iigminstitute.com/api/auth/verifyEmail",
        {
          email,
          otp,
        },
        { headers }
      );

      if (response.data.status) {
        setIsVerificationSuccess(true);
        setSnackbarMessage("OTP verification successful");
        setIsSnackbarOpen(true);
        await localStorage.removeItem("verifyEmail");
        setIsDialogOpen(true);
      } else {
        const msg = response.data.msg;
        alert(msg);
      }
    } catch (error) {
      alert("error verifying otp");
    }
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}
    >
      <div style={{ marginBottom: "20px" }}>
        <strong>Email Address:</strong> {email}
      </div>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
        onClick={() => handleEmailSubmit(email)}
        disabled={isSendOtpDisabled}
      >
        Send OTP
      </Button>

      {isOtpSent && !isVerificationSuccess && (
        <form
          onSubmit={handleOtpSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <TextField
            label="Enter OTP"
            variant="outlined"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: "20px" }}>
            Verify OTP
          </Button>
        </form>
      )}

      <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={isVerificationSuccess ? "success" : "info"}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Registration Successful</DialogTitle>
        <DialogContent>
          <p>You've successfully registered. Login to continue.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Page;

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;
