import React from "react";
import config from "../../config/index.json";
import AboutBooking from "../booking/AboutBooking";
import Header from "./Header";
import Image from "next/image";

const PrimaryHeading = () => {
  const { booking } = config;
  const propBoolean = true;
  return (
    <div>
      <div className=" w-full absolute top-0 left-0">
        
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
    </div>
  );
};

export default PrimaryHeading;
