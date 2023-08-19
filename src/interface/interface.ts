//USER INTERFACE
export interface IPassenger {
  correo_electronico: string;
  edad: number;
  id: string;
  nombre: string;
  numero_telefonico: number;
}

//COUNTRY INTERFACE
export interface ICountry {
  code: string;
  label: string;
}

//FLIGHT INTERFACE
export interface IFlights {
  disponibles: number;
  destino: ICountry;
  duration?: string;
  fecha_regreso: iDate;
  fecha_salida: iDate;
  id: string;
  origen: ICountry;
  precio: number;
  passengers?: IPassengersFlight[];
}

interface IPassengersFlight {
  title: string;
  desc: string;
  n: number;
}
interface iDate {
  formattedDate: string;
  time: string;
}

//BAGS INTERFACE

//BOOKING INTERFACE
