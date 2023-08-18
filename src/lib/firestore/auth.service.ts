import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const userLogin = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (error: any) {
    let errorMessage = "";

    switch (error.code) {
      case "auth/invalid-email":
        errorMessage = "The email address entered is invalid.";
        break;
      // case "auth/user-disabled":
      //   errorMessage = t("auth_user_disabled");
      //   break;
      case "auth/user-not-found":
        errorMessage = "No user found with that email address.";
        break;
      case "auth/wrong-password":
        errorMessage = "Incorrect password entered.";
        break;
      default:
        errorMessage = "An error occurred while logging in. Please try again.";
        break;
    }

    throw new Error(errorMessage);
  }
};

export const getUserByUid = (
  uid: string,
  fSnapshot: (snapshot: any) => void
) => {
  return onSnapshot(doc(db, "pasajero", uid), fSnapshot);
};

export const getCurrentUser = (fSnapshot: (snapshot: any) => void) => {
  return onAuthStateChanged(auth, fSnapshot);
};

export const signOutUser = () => {
  return signOut(auth);
};
