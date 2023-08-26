import React, { useEffect } from "react";
import { useRouter } from "next/router";
import config from "../config/index.json";
import Head from "next/head";
import PrimaryHeading from "../components/other/PrimaryHeading";
import MainFlightSearch from "../components/fligthSearch/MainFlightSearch";
import Footer from "../components/other/Footer";
import NoMatchesFlight from "../components/fligthSearch/NoMatchesFlight";
import { IFlights } from "../interface/interface";
import RoundedFlightSearch from "../components/fligthSearch/RoundedFlightSearch";

const FlightSearch = () => {
  const router = useRouter();
  const { flights, passengers, isRounded }: any = router.query; // Obtener los query params
  const parsedFlights: IFlights[] = flights ? JSON.parse(flights) : null;
  const parsedPassengers = passengers ? JSON.parse(passengers) : null;

  

  const { search } = config;
  return (
    <div>
      <Head>
        <title>{search.title}</title>
      </Head>
      <PrimaryHeading />
      {parsedFlights !== null ? (
        isRounded ? (
          <RoundedFlightSearch
            FlightsRound={JSON.parse(flights)}
            passengers={parsedPassengers}
          />
        ) : (
          <MainFlightSearch
            flights={parsedFlights}
            passengers={parsedPassengers}
          />
        )
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
