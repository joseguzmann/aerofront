import { createContext } from "react";

import { IPassenger } from "../interface/interface";

interface IPassengerContext {
  passenger: IPassenger | null;
  setPassegner: Function;
}

const PassengerContext = createContext<IPassengerContext>({
  passenger: null,
  setPassegner: () => {},
});

export const PassengerContextProvider = PassengerContext.Provider;
export default PassengerContext;
