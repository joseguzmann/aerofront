import React from "react";
import config from "../config/index.json";
import Head from "next/head";
import PassengersData from "../components/checkIn/PassengersData";
import { useRouter } from "next/router";
import PrimaryHeading from "../components/other/PrimaryHeading";
import Footer from "../components/other/Footer";
import PassengersRoundedData from "../components/checkIn/PassengersRoundedData";

const PassengersDetails = () => {
  const router = useRouter();
  const { flight, isRounded, flightRounded }: any = router.query;
  const parsedFlights = flight ? JSON.parse(flight) : null;
  const parsedFlightsRounded = flightRounded ? JSON.parse(flightRounded) : null;


  return (
    <div>
      <Head>
        <title>Passengers Data</title>
      </Head>
      <PrimaryHeading />
      {isRounded && parsedFlightsRounded && (
        <PassengersRoundedData flight={parsedFlightsRounded} />
      )}
      {parsedFlights && <PassengersData flight={parsedFlights} />}

      <Footer />
    </div>
  );
};

export default PassengersDetails;
