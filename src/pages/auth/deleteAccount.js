import React from "react";
import { getAuth, deleteUser, signOut } from "firebase/auth";
import { db, auth } from "src/firebaseConfig";
import { useRouter } from "next/router";
import { doc, deleteDoc } from "firebase/firestore";
import { Button, Typography, Box } from "@mui/material";

export default function DeleteAccount() {
  const user = auth.currentUser;
  const router = useRouter();

  const deleteFromDatabase = async (uid) => {
    try {
      const response = await deleteDoc(doc(db, "users", uid));
      console.log("delete", response);
    } catch (error) {
      console.log("error deleting from firestore", error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Warning: Deleting your account will permanently remove all your information from the app, including course access, login information, etc. Are you sure you want to proceed?"
    );
    if (confirmDelete) {
      try {
        const uid = user.uid;
        await deleteFromDatabase(uid);
        const response = await deleteUser(user);
        console.log("res", response);
        alert("Account deleted successfully.");
        router.push("/auth/firebaseAuth");
      } catch (error) {
        alert("Error deleting account");
        console.log("error", error);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      const response = await signOut(auth);
      console.log("res", response);
      router.push("/auth/firebaseAuth");
    } catch (error) {
      alert("Error signing out");
      console.log("error", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="body1" gutterBottom sx={{color:"red"}}>http://localhost:3000
  Warning: Deleting your account will permanently remove all of your information from the app, including course access, login information, etc. 
  If you do not wish to delete your account, please sign out.
</Typography>
      <Box sx={{ mt: 2 }}>
        <Button id="delete" variant="contained" size="small" onClick={handleDelete} sx={{ mr: 2 }}>
          Delete Account
        </Button>
        <Button id="signout" variant="contained" size="small" onClick={handleSignOut}>
          Sign Out
        </Button>
      </Box>
    </Box>
  );
}
