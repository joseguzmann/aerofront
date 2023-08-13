import React, { useEffect } from "react";
import { useRouter } from "next/router";
import config from "../config/index.json";
import Head from "next/head";
import PrimaryHeading from "../components/other/PrimaryHeading";
import MainFlightSearch from "../components/fligthSearch/MainFlightSearch";
import Footer from "../components/other/Footer";
import NoMatchesFlight from "../components/fligthSearch/NoMatchesFlight";

const FlightSearch = () => {
  const router = useRouter();
  const { flights, passengers }: any = router.query; // Obtener los query params
  const parsedFlights = flights ? JSON.parse(flights) : null;
  const parsedPassengers = passengers ? JSON.parse(passengers) : null;

  console.log("PArsedFlight", parsedFlights);
  useEffect(() => {}, []);

  const { search } = config;
  return (
    <div>
      <Head>
        <title>{search.title}</title>
      </Head>
      <PrimaryHeading />
      {parsedFlights !== null ? (
        <MainFlightSearch
          flights={parsedFlights}
          passengers={parsedPassengers}
        />
      ) : (
        <div className="relative">
          <NoMatchesFlight />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default FlightSearch;
