//USER INTERFACE
export interface IPassenger {
  correo_electronico: string;
  edad: number;
  id: string;
  nombre: string;
  numero_telefonico: number;
}

export interface IPassengerInput {
  name?: string;
  age?: number;
  email?: string;
  phone?: string;
  backpack: number;
  seat?: string;
  favoriteSeat?: boolean;
  favoriteSeatRound?: boolean;
  seatRound?: string;
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
  duracion?: string;
  fecha_regreso: iDate;
  fecha_salida: iDate;
  id: string;
  origen: ICountry;
  precio: number;
  passengers?: IPassengersFlight[];
  totalPassenger?: number;
}
export interface IRoundFlight {
  flightOrigin: IFlights;
  flightDestiny: IFlights;
  passengers: IPassengersFlight[];
  totalPassenger?: number;
}
export interface IPassengersFlight {
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
