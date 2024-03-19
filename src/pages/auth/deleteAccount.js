import React from "react";
import { getAuth, deleteUser, signOut } from "firebase/auth";
import { db, auth } from "src/firebaseConfig";
import { useRouter } from "next/router";
import { doc, deleteDoc } from "firebase/firestore";

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
    // await db.collection("users").doc(uid).delete;
    try {
      const uid = user.uid;
      await deleteFromDatabase(uid);
      const response = await deleteUser(user);
      console.log("res", response);
      alert("Success");
      router.push("/auth/firebaseAuth");
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
      router.push("/auth/firebaseAuth");
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
