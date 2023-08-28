import React from "react";
import config from "../config/index.json";
import Head from "next/head";
import ContainerEngineSearch from "../components/booking/ContainerEngineSearch";
import ExploreBooking from "../components/booking/ExploreBooking";
import Footer from "../components/other/Footer";
import PrimaryHeading from "../components/other/PrimaryHeading";

const Booking = () => {
  const { booking } = config;

  return (
    <div className="relative">
      <Head>
        <title>{booking.title}</title>
      </Head>
      <script
        id="yubox-ask-my-web"
        data-jwt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5MzA5ODE2MywidHlwZSI6ImFjY2VzcyIsIm5iZiI6MTY5MzA5ODE2Mywic3ViIjoiMiIsImV4cCI6MTY5MzcwMjk2MywiZG9tYWlucyI6WyJodHRwczovL2Flcm9iYWNrLWUwNDAzLndlYi5hcHAvIl19.sVPrZxCwY1IbpwalLF3KzYRb10QvyJHlP-pLiq5c3ek"
        src="http://3.129.44.255:8000/js/aichat.js"
      ></script>
      <PrimaryHeading />
      <ContainerEngineSearch />
     
      <ExploreBooking />
      <Footer />
    </div>
  );
};

export default Booking;
