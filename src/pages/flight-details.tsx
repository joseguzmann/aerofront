import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import PrimaryHeading from "../components/other/PrimaryHeading";
import Footer from "../components/other/Footer";
import MainFlightSearch from "../components/fligthSearch/MainFlightSearch";

import config from "../config/index.json";
import FlightDetailsRounded from "../components/fligthSearch/FlightDetailsRounded";
const FlightDetails = () => {
  const { flight_details } = config;

  const router = useRouter();
  const { flights, passengers, flightsRounded }: any = router.query; // Obtener los query params
  const parsedFlights = flights ? JSON.parse(flights) : null;
  const parsedPassengers = passengers ? JSON.parse(passengers) : null;
  const parsedFlightsRounded = flightsRounded
    ? JSON.parse(flightsRounded)
    : null;

  console.log("PARSED FLIGHTS: ", parsedFlights);
  return (
    <div>
      <Head>
        <title>{flight_details.title}</title>
      </Head>
      <PrimaryHeading />
      {parsedFlights && (
        <MainFlightSearch
          flightSelected={parsedFlights}
          passengers={parsedPassengers}
          isDetails={true}
        />
      )}
      {parsedFlightsRounded && (
        <FlightDetailsRounded
          flightsRounded={parsedFlightsRounded}
          passengers={parsedPassengers}
        />
      )}

      <Footer />
    </div>
  );
};

export default FlightDetails;
