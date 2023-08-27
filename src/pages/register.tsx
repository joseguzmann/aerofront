import React from "react";
// import { useRouter } from "next/router";
import config from "../config/index.json";
import Head from "next/head";
import Header from "../components/other/Header";
import Footer from "../components/other/Footer";
import RegisterAuth from "../components/authentication/RegisterAuth";
//import { useRouter } from "next/router";

const Register = () => {
  //const router = useRouter();
  const { register } = config;
  //const { flight, isRounded, flightRounded }: any = router.query;
  // const parsedFlights = flight ? JSON.parse(flight) : null;
  // const parsedFlightsRounded = flightRounded ? JSON.parse(flightRounded) : null;

  return (
    <div>
      <Head>
        <title>{register.title}</title>
      </Head>
      <Header noSvg={true} />
      <RegisterAuth />
      <Footer />
    </div>
  );
};

export default Register;
