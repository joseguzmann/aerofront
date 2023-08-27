import React from "react";
//import { useRouter } from "next/router";
import Head from "next/head";
import PrimaryHeading from "../components/other/PrimaryHeading";
import Footer from "../components/other/Footer";
// import PaymentDetails from "../components/checkIn/PaymentDetails";

const CheckIn = () => {
  //const router = useRouter();
 // const { flight }: any = router.query;
  //const parsedFlights = flight ? JSON.parse(flight) : null;

  return (
    <div>
      <Head>
        <title>Check In</title>
      </Head>
      <PrimaryHeading />
     {/* // <PaymentDetails flight={parsedFlights} /> */}
      <Footer />
    </div>
  );
};

export default CheckIn;
