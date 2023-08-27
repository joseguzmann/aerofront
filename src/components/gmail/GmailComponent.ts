import { IFlights, IPassenger, IRoundFlight } from "../../interface/interface";

interface IProps {
  flight: IFlights;
  passengersInfo: any[];
  user: IPassenger;
  bookingId: string;
  princing: {
    ticketTotal: number;
    extrasTotal: number;
    total: number;
  };
}
interface IPropsround {
  flight: IRoundFlight;
  passengersInfo: any[];
  user: IPassenger;
  bookingId: string;
  princing: {
    ticketTotal: number;
    extrasTotal: number;
    total: number;
  };
}

export const gmailSendEmail = async (
  name: string | null,
  details: IProps | undefined
) => {
  console.log("name");
  console.log("gmailSendEmail", details);
  if (details) {
    let mailData = {
      namePaypal: name
        ? name
        : `${details.user.nombre} ${details.user.apellido}`,
      bookingId: details.bookingId,
      destino: details.flight.destino.label,
      origen: details.flight.origen.label,
      duracion: details.flight.duracion,
      fecha_salida: details.flight.fecha_salida.formattedDate,
      fecha_regreso: details.flight.fecha_regreso.formattedDate,
      num_pasajeros: details.flight.totalPassenger,
      mail: details.user.correo_electronico,
      nombre: `${details.user.nombre} ${details.user.apellido}`,
      ticketTotal: details.princing.ticketTotal,
      extrasToal: details.princing.extrasTotal,
      total: details.princing.total,
    };
    let response = await fetch("http://18.222.162.61:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(mailData),
    });

    let result = await response.json();
    console.log("RESULT STATUS: ", result.status);
  }
};
export const gmailSendEmailRound = async (
  name: string | null,
  details: IPropsround | undefined
) => {
  console.log("name");
  console.log("ROUNDED: EMAIL", details);
  if (details) {
    let mailData = {
      rounded: true,
      namePaypal: name
        ? name
        : `${details.user.nombre} ${details.user.apellido}`,
      bookingId: details.bookingId,
      destino: details.flight.flightOrigin.destino.label,
      origen: details.flight.flightOrigin.origen.label,
      duracion: details.flight.flightOrigin.duracion,
      duracionRound: details.flight.flightDestiny.duracion,
      fecha_salida: details.flight.flightOrigin.fecha_salida.formattedDate,
      fecha_regreso: details.flight.flightOrigin.fecha_regreso.formattedDate,
      fecha_salidaRound:
        details.flight.flightDestiny.fecha_salida.formattedDate,
      fecha_regresoRound:
        details.flight.flightDestiny.fecha_regreso.formattedDate,
      num_pasajeros: details.flight.totalPassenger,
      mail: details.user.correo_electronico,
      nombre: `${details.user.nombre} ${details.user.apellido}`,
      ticketTotal: details.princing.ticketTotal,
      extrasToal: details.princing.extrasTotal,
      total: details.princing.total,
    };
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(mailData),
    });

    let result = await response.json();
    console.log("RESULT STATUS: ", result.status);
  }
};
