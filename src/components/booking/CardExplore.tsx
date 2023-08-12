import React from "react";
import Image from "next/image";

interface FlightData {
  origin: string;
  date: string;
  status: string;
  duration: string;
  price: string;
  img: string;
}

interface IProps {
  flight: FlightData | undefined;
}

const CardExplore = ({ flight }: IProps) => {
  if (flight !== undefined) {
    console.log("FLIGHT Inside,", flight);
    return (
      <div className="flex row rounded-lg border bg-gray-200 border-gray-300 border-b-4 border-opacity-75 shadow-lg w-[49%] mb-5 ">
        <Image src={flight.img} width={303} height={237} alt="" />
        <div className="flex flex-col my-5  w-[55%] px-5">
          <p className="text-xl py-4">{flight.origin}</p>
          <p>{flight.date}</p>
          <div className="flex row my-2 ">
            <p className="mr-5">{flight.status}</p>
            <p>{flight.duration}</p>
          </div>
          <div className="flex flex-col justify-end items-end h-full">
            <p className=" text-xl mb-4">{flight.price}</p>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};

export default CardExplore;
