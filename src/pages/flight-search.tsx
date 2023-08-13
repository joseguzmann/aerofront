import React, { useEffect } from "react";
import { useRouter } from "next/router";
import config from "../config/index.json";
import Head from "next/head";
import PrimaryHeading from "../components/other/PrimaryHeading";
import MainFlightSearch from "../components/fligthSearch/MainFlightSearch";
import Footer from "../components/other/Footer";

const FlightSearch = () => {
  const router = useRouter();
  const { flights }: any = router.query; // Obtener los query params
  const parsedFlights = JSON.parse(flights);
  useEffect(() => {
    if (flights) {
      // Convertir los resultados a objetos
      // ... Usar los resultados como props en tu componente ...
      console.log("PARSED FLIGHT", parsedFlights);
    }
  }, []);

  const { search } = config;
  return (
    <div>
      <Head>
        <title>{search.title}</title>
      </Head>
      <PrimaryHeading />
      <MainFlightSearch flights={flights} />
      <Footer />
    </div>
  );
};

export default FlightSearch;
