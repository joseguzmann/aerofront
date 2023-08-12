import React from "react";
import config from "../../config/index.json";
import CardExplore from "./CardExplore";
import DiscoverBooking from "./DiscoverBooking";
interface FlightData {
  origin: string;
  date: string;
  status: string;
  duration: string;
  price: string;
  img: string;
}
interface BookingContent {
  content: FlightData[];
}
interface DiscoverData {
  title: string;
  desc: string;
  img: string;
}
interface DiscContet {
  discoverContent: DiscoverData[];
}

const ExploreBooking = () => {
  const { booking } = config;
  const { content }: BookingContent = booking;
  const { discoverContent }: DiscContet = booking;
  console.log("Content?", content);
  return (
    <div className="flex justify-center items-center">
      <div className="relative  items-center w-[75%]">
        <div className="flex justify-between">
          <p className="text-lg my-3 text-base text-black">
            {booking.recomendations}
          </p>
          <p className="text-lg my-3 text-base text-black">{booking.explore}</p>
        </div>
        <div className=" flex flex-row flex-wrap justify-between">
          {content.map((flight) => {
            return <CardExplore flight={flight} />;
          })}
        </div>
        <p className="text-lg my-3 text-base text-black">{booking.discover}</p>
        <div className=" flex flex-row flex-wrap justify-between mb-15">
          {discoverContent.map((discover) => {
            return <DiscoverBooking discover={discover} />;
          })}
        </div>
        <div>
  
        </div>
      </div>
    </div>
  );
};

export default ExploreBooking;
