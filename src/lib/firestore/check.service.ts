import { Timestamp, collection, doc, setDoc, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import {
  IFlights,
  IPassenger,
  IPassengerInput,
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

  try {
    await setDoc(doc(db, "reserva", idBooking), {
      correo_electronico: user.correo_electronico,
      destino: flight.destino.code,
      disponible: flight.disponibles,
      duracion: flight.duracion,
      edad: user.edad,
      fecha_salida: Timestamp.fromDate(
        dayjs(flight.fecha_salida.formattedDate, "ddd, DD MMMM YYYY").toDate()
      ),
      id: idBooking,
      id_pasajero: user.id,
      id_vuelo_: flight.id,
      nombre: user.nombre,
      numero_telefonico: user.numero_telefonico,
      origen: flight.origen.code,
      precio: flight.precio,
    });
    console.log("SUCCES BOOKING");
    addPassengersToBooking(idBooking, passengers);
  } catch (e) {
    console.error("Error al guardar los datos:", e);
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
            const { name, age, email, phone } = passenger;
            const passengerData = {
              nombre: name,
              edad: age,
              correo_electronico: email,
              numero_telefonico: phone,
            };
            await addDoc(
              collection(db, "reserva", idBooking, "passengers"),
              passengerData
            );
            console.log("PASSENGER: ", passengerType, " ADDED");
          } catch (e) {
            console.log("E", e);
          }
        });
      }
    }
  }
};
