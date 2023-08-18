import { createContext } from "react";

import { IPassenger } from "../interface/interface";

interface IUserContext {
  user: IPassenger | null;
  setUser: Function;
}

const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
});

export const UserContextProvider = UserContext.Provider;
export default UserContext;
