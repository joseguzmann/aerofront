import {
  collection,
  query,
  where,
  Timestamp,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db } from "../../config/firebase";

import firebase from "firebase/app";
const vueloRef = collection(db, "vuelo");

// export const getFlightsByParams = (params, fSnapshot) => {
//   // const timeStamp = firebase.firestore.Timestamp.fromDate(params.date);
//   const timeStamp = Timestamp.fromDate(params.date);

//   const q = query(
//     vueloRef,
//     where("destino", "==", params.origin.code),
//     where("origen", "==", params.destination.code),
//     where("fecha_salida", "==", timeStamp)
//   );
//   return onSnapshot(q, fSnapshot);
// };

export const getFlightByParams = async (params) => {
  try {
    //const timeStamp = Timestamp.fromDate(params.date);

    console.log("DATE PARM", params.date);
    console.log("NEW DATE", 1702238700);
    //console.log("TimeStap", timeStamp);

    const q = query(
      vueloRef,
      where("destino", "==", params.destination.code),
      where("origen", "==", params.origin.code)
      //  where("fecha_salida", "<=", 1702238700),
      //   where("id", "==", 1)
    );
    const querySnapshot = await getDocs(q);
    console.log("QuerySnapshot", querySnapshot);

    const flights = [];
    querySnapshot.forEach((doc) => {
      console.log("INSIDE DOC", doc.data());
      flights.push({ id: doc.id, ...doc.data() });
    });
    return flights;
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
  // const timeStamp = firebase.firestore.Timestamp.fromDate(params.date);
};
