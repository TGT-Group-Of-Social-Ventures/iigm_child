import React from "react";
import { getAuth, deleteUser, signOut } from "firebase/auth";
import { db, auth } from "src/firebaseConfig";

export default function DeleteAccount() {
  const user = auth.currentUser;

  const handleDelete = async () => {
    // await db.collection("users").doc(uid).delete;
    try {
      const uid = user.uid;
      const response = deleteUser(user);
      console.log("res", response);
      alert("Success");
    } catch (error) {
      alert("error deleting data");
      console.log("error", error);
    }
  };

  const handleSignOut = async () => {
    console.log("auth", auth);

    try {
      const response = await signOut(auth);
      console.log("res", response);
    } catch (error) {
      alert("error signing out");
      console.log("error", error);
    }
  };

  return (
    <>
      <button id="delte" onClick={handleDelete}>
        Delete
      </button>
      <button id="signout" onClick={handleSignOut}>
        Sign Out
      </button>
    </>
  );
}
