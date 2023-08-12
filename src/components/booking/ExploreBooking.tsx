import React from "react";
import config from "../../config/index.json";

const ExploreBooking = () => {
  const { booking } = config;
  return (
    <div className="flex justify-center items-center">
      <div className="relative bg-blue-500 items-center w-[75%]">
        <div className="flex justify-between">
          <p className="text-lg my-3 text-base text-black">
            {booking.recomendations}
          </p>
          <p className="text-lg my-3 text-base text-black">{booking.explore}</p>
        </div>
      </div>
    </div>
  );
};

export default ExploreBooking;
