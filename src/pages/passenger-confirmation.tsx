import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import PrimaryHeading from "../components/other/PrimaryHeading";
import Footer from "../components/other/Footer";
import PassengerConfirm from "../components/checkIn/PassengerConfirm";

const PassengerConfirmation = () => {
  const router = useRouter();
  const { flight }: any = router.query;
  const parsedFlights = flight ? JSON.parse(flight) : null;
  return (
    <div>
      <Head>
        <title>Passengers Confirmation</title>
      </Head>
      <PrimaryHeading />

      <PassengerConfirm />

      <Footer />
    </div>
  );
};

export default PassengerConfirmation;
