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
  const flights = [];
  console.log("PARAMS BACK", params);
  try {
    if (params.dateFinal) {
      console.log("ROUNDED BACK");

      const timeStampI = Timestamp.fromDate(params.dateInitial);
      const timeStampF = Timestamp.fromDate(params.dateFinal);
      const q1 = query(
        vueloRef,
        where("destino", "==", params.destination.code),
        where("origen", "==", params.origin.code),
        where("fecha_salida", "<=", timeStampI)

        // where("id", "==", 1)
      );
      const q2 = query(
        vueloRef,
        where("destino", "==", params.destination.code),
        where("origen", "==", params.origin.code),
        where("fecha_regreso", ">=", timeStampF)

        // where("id", "==", 1)
      );

      const querySnapshotInitial = await getDocs(q1);
      const querySnapshotFinal = await getDocs(q2);

      const dataInitial = querySnapshotInitial.docs.map((doc) => doc.data());
      const dataFinal = querySnapshotFinal.docs.map((doc) => doc.data());

      console.log("DATA INITIAL", typeof dataInitial);

      // const dataResult = dataInitial.filter((doc) => {
      //   console.log("DOCDATARESULT", doc);
      // });
    } else {
      console.log("ONE S WAY BACK");
      const timeStamp = Timestamp.fromDate(params.dateInitial);

      const qAvailable = query(
        vueloRef,
        where("destino", "==", params.destination.code),
        where("origen", "==", params.origin.code),
        where("disponibles", ">=", params.totalSumPassengers)
      );
      const qDate = query(
        vueloRef,
        where("destino", "==", params.destination.code),
        where("origen", "==", params.origin.code),
        where("fecha_salida", ">=", timeStamp)
      );

      const [fechaSalidaResults, disponiblesResults] = await Promise.all([
        getDocs(qDate),
        getDocs(qAvailable),
      ]);
      const filteredResults = fechaSalidaResults.docs.filter((doc) => {
        const disponibilidadDoc = disponiblesResults.docs.find(
          (disponibilidadDoc) => disponibilidadDoc.id === doc.id
        );
        return disponibilidadDoc !== undefined;
      });

      filteredResults.forEach((doc) => {
        console.log("INSIDE DOC", doc.data());
        flights.push({ id: doc.id, ...doc.data() });
      });
    }

    return flights;
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
  // const timeStamp = firebase.firestore.Timestamp.fromDate(params.date);
};
