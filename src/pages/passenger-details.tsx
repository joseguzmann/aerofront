import React from "react";
import config from "../config/index.json";
import Head from "next/head";
import Header from "../components/other/Header";
import PassengersData from "../components/authentication/PassengersData";
import { useRouter } from "next/router";
import PrimaryHeading from "../components/other/PrimaryHeading";
import Footer from "../components/other/Footer";

const PassengersDetails = () => {
  const router = useRouter();
  const { flight }: any = router.query;
  const parsedFlights = flight ? JSON.parse(flight) : null;
  const { login } = config;
  return (
    <div>
      <Head>
        <title>{login.title}</title>
      </Head>
      <PrimaryHeading />
      <PassengersData flight={parsedFlights} />
      <Footer />
    </div>
  );
};

export default PassengersDetails;
