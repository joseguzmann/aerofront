import React from "react";
import Header from "../components/other/Header";
import config from "../config/index.json";
import Head from "next/head";
import Image from "next/image";
import AboutBooking from "../components/booking/AboutBooking";
import ContainerEngineSearch from "../components/booking/ContainerEngineSearch";
// import ExploreBooking from "../components/booking/ExploreBooking";
// interface BookingProps {
//   prop1: boolean;
// }

const Booking = () => {
  // const booking = true;
  const { booking } = config;

  const propBoolean = true;

  return (
    <div className="relative">
      <Head>
        <title>{booking.title}</title>
      </Head>
      <div className="bg-blue-500 w-full absolute top-0 left-0">
        <Image
          src={booking.img}
          width={1749}
          height={545}
          alt=""
          layout="responsive"
        />
      </div>

      <Header propBoolean={propBoolean} />
      <AboutBooking />
      <ContainerEngineSearch />
{/*    
      <ExploreBooking /> */}
      
    </div>
  );
};

export default Booking;
