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
          <script
            id="yubox-ask-my-web"
            data-jwt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5MzA5ODE2MywidHlwZSI6ImFjY2VzcyIsIm5iZiI6MTY5MzA5ODE2Mywic3ViIjoiMiIsImV4cCI6MTY5MzcwMjk2MywiZG9tYWlucyI6WyJodHRwczovL2Flcm9iYWNrLWUwNDAzLndlYi5hcHAvIl19.sVPrZxCwY1IbpwalLF3KzYRb10QvyJHlP-pLiq5c3ek"
            src="http://3.129.44.255:8000/js/aichat.js"
          ></script>
          <Component {...pageProps} />
        </FlightContextProvider>
      </UserContextProvider>
    </>
  );
};
export default MyApp;
