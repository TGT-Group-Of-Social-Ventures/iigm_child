import React, { useState } from "react";
import { TextField, Button, Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
// import { setCurrentPage } from '../../redux/action';
import { useRouter } from 'next/navigation';
import axios from "axios";
import { Layout as AuthLayout } from 'src/layouts/auth/layout';


const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isVerificationSuccess, setIsVerificationSuccess] = useState(false);

  const handlePageChange = (page, props) => {
    dispatch(setCurrentPage(page, props));
  };

  const headers = {
    "Content-Type": "application/json",
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backend.iigminstitute.com/api/otp/sendOTP",
        {
          email,
        },
        { headers }
      );
      if (response.data.status) {
        setIsOtpSent(true);
        setSnackbarMessage("OTP sent to your email");
        setIsSnackbarOpen(true);
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
        "https://backend.iigminstitute.com/api/otp/verifyOTP",
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
        await localStorage.setItem("tempMail", email);
        router.push("/auth/changePassword");
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
      {!isOtpSent && (
        <form
          onSubmit={handleEmailSubmit}
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="normal"
          />
          <Button type="submit"
variant="contained"
color="primary"
style={{ marginTop: "20px" }}>
            Send OTP
          </Button>
        </form>
      )}

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
          <Button type="submit"
variant="contained"
color="primary"
style={{ marginTop: "20px" }}>
            Verify OTP
          </Button>
        </form>
      )}

      <Snackbar open={isSnackbarOpen}
autoHideDuration={6000}
onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar}
severity={isVerificationSuccess ? "success" : "info"}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
