import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
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

export const registerWithEmail = async (
  email: string,
  password: string,
  name: string,
  lastName: string,
  age: number
) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      //Save user in database
      saveUserToFireBase(user.uid, name, lastName, email, age);
    })
    .catch((error) => {
      const errorCode = error.code;
     
      // console.log("Bak", errorCode, errorMessage);
      throw new Error(errorCode);
    });
};

export const saveUserToFireBase = async (
  uid: string,
  name: string | null,
  lastName: string | null,
  email: string | null,
  age: number
) => {
  // const userRef = ref(db, "users/" + uid);
  // set(userRef, {
  //   name: name,
  //   lastName: lastName,
  //   email: email,
  // }).then(() => {
  //   console.log("User saved");
  // });

  return await setDoc(doc(db, "pasajero", uid), {
    nombre: name ? name : "",
    apellido: lastName ? lastName : "",
    correo_electronico: email ? email : "",
    id: uid,
    edad: age,
  });
};
