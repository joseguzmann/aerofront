import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import PrimaryHeading from "../components/other/PrimaryHeading";
import Footer from "../components/other/Footer";
import PassengerConfirm from "../components/checkIn/PassengerConfirm";
import PaymentDetails from "../components/checkIn/PaymentDetails";

const PassengerConfirmation = () => {
  const router = useRouter();
  const { bookingId, flight, passengersInfo }: any = router.query;
  const parsedBooking = bookingId ? JSON.parse(bookingId) : null;
  const parsedFlight = flight ? JSON.parse(flight) : null;
  const parsedPassengersInfo = passengersInfo
    ? JSON.parse(passengersInfo)
    : null;
  useEffect(() => {
    console.log("PArsedINfo: ", parsedPassengersInfo);
  }, []);

  return (
    <div>
      <Head>
        <title>Passengers Confirmation</title>
      </Head>
      <PrimaryHeading />
      {/* 
      <PassengerConfirm /> */}
      <PaymentDetails
        passengersInfo={parsedPassengersInfo}
        flight={parsedFlight}
      />

      <Footer />
    </div>
  );
};

export default PassengerConfirmation;
