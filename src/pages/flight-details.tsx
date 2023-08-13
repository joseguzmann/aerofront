import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import PrimaryHeading from "../components/other/PrimaryHeading";
import Footer from "../components/other/Footer";
import MainFlightSearch from "../components/fligthSearch/MainFlightSearch";
const FlightDetails = () => {
  const router = useRouter();
  const { flights, passengers }: any = router.query; // Obtener los query params
  const parsedFlights = flights ? JSON.parse(flights) : null;
  const parsedPassengers = passengers ? JSON.parse(passengers) : null;
  return (
    <div>
      <Head>
        <title>Flight Details</title>
      </Head>
      <PrimaryHeading />
      <MainFlightSearch
        flights={parsedFlights}
        passengers={parsedPassengers}
        isDetails={true}
      />
      <Footer />
    </div>
  );
};

export default FlightDetails;
