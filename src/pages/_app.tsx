import { AppProps } from "next/app";
import React, { useEffect, useState } from "react";

import "../styles/main.css";
import { IFlights, IPassenger } from "../interface/interface";
import { getCurrentUser, getUserByUid } from "../lib/firestore/auth.service";
import { UserContextProvider } from "../contexts/userContext";
import { FlightContextProvider } from "../contexts/flightContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [user, setUser] = useState<IPassenger | null>(null);
  const [flight, setFlight] = useState<IFlights | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.id;

    const getUserByUidSnapshot = (snapshot: any) => {
      const user = snapshot.data();

      setUser(user);
    };
    const getCurrentUserSnapshot = (snapshot: any) => {
      if (snapshot) {
        const userUid = snapshot.uid;
        getUserByUid(userUid, getUserByUidSnapshot);
      } else {
        setUser(null);
      }
    };
    getCurrentUser(getCurrentUserSnapshot);
  }, [flight]);
  return (
    <>
      <UserContextProvider value={{ user, setUser }}>
        <FlightContextProvider value={{ flight, setFlight }}>
         
          <Component {...pageProps} />
        </FlightContextProvider>
      </UserContextProvider>
    </>
  );
};
export default MyApp;
