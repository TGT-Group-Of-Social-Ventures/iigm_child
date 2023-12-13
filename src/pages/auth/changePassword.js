import React, { useState } from 'react';
import { TextField, Button, Snackbar, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { setCurrentPage } from '../../redux/action';
import axios from 'axios';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { useRouter } from 'next/navigation';



const Page = ({}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("Loading...");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlePageChange = (page, props) => {
    dispatch(setCurrentPage(page, props));
  };

  const headers = {
    'Content-Type': 'application/json'
  };


  useEffect(() => {
    console.log(email);
    getEmail();
  }, [])

  const getEmail = async () => {
    setIsLoading(true);
    // Simulating an asynchronous operation (e.g., fetching email from localStorage)
    try {
      const storedEmail = await localStorage.getItem('tempMail').split(1, -1);
      // Assuming tempMail is stored as a JSON string, so we need to parse it
      // const parsedEmail = JSON.parse(storedEmail);
      setEmail(storedEmail);
    } catch (error) {
      console.error('Error fetching email:', error);
      setEmail(''); // Set email to an empty string or handle error accordingly
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password doesn't match");
    }
    try {
      const response = await axios.post("https://backend.iigminstitute.com/api/auth/changePassword", {
        email,
        password,
        confirmPassword
      }, { headers })
      if (response.data.status) {
        setSnackbarMessage('Password successfully changed');
        setIsSnackbarOpen(true);
        await localStorage.removeItem("tempMail");
        setIsDialogOpen(true);
        // router.push("/auth/login")
      } else {
        const msg = response.data.msg;
        alert(msg);
      }
    } catch (error) {
      alert("error sending otp")
    }

    // TODO: Call your backend API to update the password
    // For demonstration purposes, assume a successful password update
    setSnackbarMessage('Password updated successfully');
    setIsSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    // Redirect to login page or any other desired action
    router.push('/auth/login')
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <div style={{ marginBottom: '20px' }}>
        <strong>Email Address:</strong>
        {email}
      </div>

      <Button onClick={() =>router.push("/auth/forgotPassword")} color="primary">
        Change Email Address
      </Button>


      <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <TextField
          label="New Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Update Password
        </Button>
      </form>

      <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Password Reset Successful</DialogTitle>
        <DialogContent>
          <p>Your password has been successfully updated. Please log in to continue.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;


export default Page;
