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

      <PrimaryHeading />
      <ContainerEngineSearch />

      <ExploreBooking />
      <Footer />
    </div>
  );
};

export default Booking;
