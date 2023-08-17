import React, { useState } from "react";

import Canvas from "../components/other/Canvas";
import Header from "../components/other/Header";
import LazyShow from "../components/other/LazyShow";
import MainHero from "../components/other/MainHero";
import MainHeroImage from "../components/other/MainHeroImage";
import Divider from "../components/other/Divider";
import Head from "next/head";
import Footer from "../components/other/Footer";
import { PassengerContextProvider } from "../contexts/userContext";
import { IFlights, IPassenger } from "../interface/interface";
import { FlightContextProvider } from "../contexts/flightContext";

const App = () => {
  const [passenger, setPassegner] = useState<IPassenger | null>(null);
  const [flight, setFlight] = useState<IFlights | null>(null);

  return (
    <div>
      <PassengerContextProvider value={{ passenger, setPassegner }}>
        <FlightContextProvider value={{ flight, setFlight }}>
          <Head>
            <title>AeroFly</title>
            <meta name="description" content="MainPage" />
          </Head>
          <div className={`bg-background grid gap-y-16 overflow-hidden`}>
            <div className={`relative bg-background`}>
              <div className="max-w-7xl mx-auto">
                <div
                  className={`relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32`}
                >
                  <Header />
                  <MainHero />
                </div>
              </div>
              <MainHeroImage />
            </div>
            <Divider />
            <LazyShow>
              <>{/* <Dashboard /> */}</>
            </LazyShow>
            <LazyShow>
              <>
                <Canvas />
                <Footer />
              </>
            </LazyShow>
          </div>
        </FlightContextProvider>
      </PassengerContextProvider>
    </div>
  );
};

export default App;
