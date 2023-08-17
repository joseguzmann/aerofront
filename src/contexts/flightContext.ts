import { createContext } from "react";

import { IFlights } from "../interface/interface";

interface IFlightsContext {
  flight: IFlights | null;
  setFlight: Function;
}

const FlightContext = createContext<IFlightsContext>({
  flight: null,
  setFlight: () => {},
});

export const FlightContextProvider = FlightContext.Provider;
export default FlightContext;
