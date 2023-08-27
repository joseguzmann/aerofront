import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import PrimaryHeading from "../components/other/PrimaryHeading";
import Footer from "../components/other/Footer";

import PaymentDetails from "../components/checkIn/PaymentDetails";
import PaymentRoundDetails from "../components/checkIn/PaymentRoundDetails";

const PassengerConfirmation = () => {
  const router = useRouter();
  const { bookingId }: any = router.query;
  const { flight, passengersInfo, flightRound }: any = router.query;
  const parsedBooking = bookingId ? JSON.parse(bookingId) : null;
  const parsedFlight = flight ? JSON.parse(flight) : null;
  const parsedFlightRound = flightRound ? JSON.parse(flightRound) : null;
  const parsedPassengersInfo = passengersInfo
    ? JSON.parse(passengersInfo)
    : null;

  return (
    <div>
      <Head>
        <title>Passengers Confirmation</title>
      </Head>
      <PrimaryHeading />

      {parsedFlight && (
        <PaymentDetails
          bookingId={parsedBooking}
          passengersInfo={parsedPassengersInfo}
          flight={parsedFlight}
        />
      )}
      {parsedFlightRound && (
        <PaymentRoundDetails
          bookingId={parsedBooking}
          flightRound={parsedFlightRound}
          passengersInfo={parsedPassengersInfo}
        />
      )}

      <Footer />
    </div>
  );
};

export default PassengerConfirmation;
