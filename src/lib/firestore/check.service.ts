import {
  Timestamp,
  collection,
  doc,
  setDoc,
  addDoc,
  DocumentData,
  onSnapshot,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import {
  IFlights,
  IPassenger,
  IPassengerInput,
  IRoundFlight,
} from "../../interface/interface";
import dayjs from "dayjs";

import { uuid } from "uuidv4";

interface PassengersObject {
  [key: string]: IPassengerInput[] | undefined;
}
export const addFlightToBooking = async (
  flight: IFlights,
  user: IPassenger,
  passengers: PassengersObject
) => {
  const idBooking: string = uuid().substring(0, 8);
  const newTotalDisponible: number =
    flight.disponibles - (flight.totalPassenger ? flight.totalPassenger : 0);

  try {
    await setDoc(doc(db, "reserva", idBooking), {
      correo_electronico: user.correo_electronico,
      destino: flight.destino.code,
      disponible: newTotalDisponible,
      duracion: flight.duracion,
      edad: user.edad,
      fecha_salida: Timestamp.fromDate(
        dayjs(flight.fecha_salida.formattedDate, "ddd, DD MMMM YYYY").toDate()
      ),
      // fecha_regreso: Timestamp.fromDate(
      //   dayjs(flight.fecha_regreso.formattedDate, "ddd, DD MMMM YYYY").toDate()
      // ),
      id: idBooking,
      id_pasajero: user.id,
      id_vuelo_: flight.id,
      nombre: user.nombre,
      numero_telefonico: user.numero_telefonico,
      origen: flight.origen.code,
      precio: flight.precio,
    });

    addPassengersToBooking(idBooking, passengers);
    updateFlightAvailable(flight.id, newTotalDisponible);
    return idBooking;
  } catch (e) {
    console.error("Error al guardar los datos:", e);
    return e;
  }
};

export const addRoundedFlightToBooking = async (
  flight: IRoundFlight,
  user: IPassenger,
  passengers: PassengersObject
) => {
  const idBooking: string = uuid().substring(0, 8);
  const newTotalDisponibleInitial: number =
    flight.flightOrigin.disponibles -
    (flight.totalPassenger ? flight.totalPassenger : 0);

  const newTotalDisponibleRound: number =
    flight.flightDestiny.disponibles -
    (flight.totalPassenger ? flight.totalPassenger : 0);

  try {
    await setDoc(doc(db, "reserva", idBooking), {
      // correo_electronico: user.correo_electronico,
      // destino: flight.flightDestiny.destino.code,
      // disponible: newTotalDisponible,
      // duracion: flight.flightOrigin.duracion,
      // duracion_destino: flight.flightDestiny.duracion,
      // edad: user.edad,
      // fecha_salida: Timestamp.fromDate(
      //   dayjs(
      //     flight.flightOrigin.fecha_salida.formattedDate,
      //     "ddd, DD MMMM YYYY"
      //   ).toDate()
      // ),
      // fecha_regreso: Timestamp.fromDate(
      //   dayjs(
      //     flight.flightDestiny.fecha_regreso.formattedDate,
      //     "ddd, DD MMMM YYYY"
      //   ).toDate()
      // ),
      id: idBooking,
      id_pasajero: user.id,
      id_vuelo: flight.flightOrigin.id,
      id_vuelo_destino: flight.flightDestiny.id,
      // nombre: user.nombre,
      // numero_telefonico: user.numero_telefonico,
      // origen: flight.flightOrigin.origen.code,
      // precio: flight.flightOrigin.precio,
      // precio_destino: flight.flightDestiny.precio,
    });

    addPassengersToBooking(idBooking, passengers);
    updateFlightAvailable(flight.flightOrigin.id, newTotalDisponibleInitial);
    updateFlightAvailable(flight.flightDestiny.id, newTotalDisponibleRound);
    return idBooking;
  } catch (e) {
    console.error("Error al guardar los datos:", e);
    return e;
  }
};

const addPassengersToBooking = async (
  idBooking: string,
  passengersObject: PassengersObject
) => {
  for (const passengerType in passengersObject) {
    if (Object.prototype.hasOwnProperty.call(passengersObject, passengerType)) {
      const passengers = passengersObject[passengerType];

      if (passengers) {
        passengers.forEach(async (passenger) => {
          try {
            const {
              name,
              age,
              email,
              phone,
              backpack,
              seat,
              favoriteSeat,
              favoriteSeatRound,
            } = passenger;
            const passengerData = {
              nombre: name,
              edad: age,
              correo_electronico: email,
              numero_telefonico: phone,
              mochilas: backpack,
              asiento: seat,
              asientoFavorito: favoriteSeat ? favoriteSeat : null,
              asientoFavorito_destino: favoriteSeatRound
                ? favoriteSeatRound
                : null,
            };
            await addDoc(
              collection(db, "reserva", idBooking, "passengers"),
              passengerData
            );
          } catch (e) {
            console.log("E", e);
          }
        });
      }
    }
  }
};
const updateFlightAvailable = async (
  idFlight: string,
  totalPassenger: number
) => {
  return await updateDoc(doc(db, "vuelo", idFlight), {
    disponibles: totalPassenger,
  });
};

//UPLOAD
export const uploadSeatsToFlight = (
  idFlight: string,
  objSeats: { row: string; col: number; id: string; status: number }[]
) => {
  try {
   
    objSeats.forEach(async (res) => {
      await setDoc(doc(db, "vuelo", idFlight, "seatsFlight", res.id), res);
    });

 
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

export const getSeatsFlightById = (
  id: string,
  fSnapshot: (snapshot: DocumentData) => void
) => {
  const q = query(collection(db, "vuelo", id, "seatsFlight"));
  return onSnapshot(q, fSnapshot);
};

export const updateFlightSeatStatus = async (
  idFlight: string,
  status: number,
  idSeat: string
) => {
  return await updateDoc(doc(db, "vuelo", idFlight, "seatsFlight", idSeat), {
    status: status,
  });
};
