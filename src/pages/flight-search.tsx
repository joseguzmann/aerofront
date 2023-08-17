import React, { useEffect } from "react";
import { useRouter } from "next/router";
import config from "../config/index.json";
import Head from "next/head";
import PrimaryHeading from "../components/other/PrimaryHeading";
import MainFlightSearch from "../components/fligthSearch/MainFlightSearch";
import Footer from "../components/other/Footer";
import NoMatchesFlight from "../components/fligthSearch/NoMatchesFlight";
import { IFlights } from "../interface/interface";

const FlightSearch = () => {
  const router = useRouter();
  const { flights, passengers }: any = router.query; // Obtener los query params
  const parsedFlights: IFlights[] = flights ? JSON.parse(flights) : null;
  const parsedPassengers = passengers ? JSON.parse(passengers) : null;

  useEffect(() => {
    console.log("PARSED FLLIGHTS: ", parsedFlights);
    console.log("PARSED Passengers: ", parsedPassengers);
  }, []);

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
