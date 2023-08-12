import React from "react";
import config from "../../config/index.json";
const AboutBooking = () => {
  const { booking } = config;

  return (
    <div className="relative flex flex-col items-end  pr-28  my-20">
      <p className=" text-right mb-3 text-5xl  text-base text-white ">
        {booking.subtitle}
      </p>
      <p className=" text-right text-5xl text-base text-white ">
        {booking.description}
      </p>
    </div>
  );
};

export default AboutBooking;
