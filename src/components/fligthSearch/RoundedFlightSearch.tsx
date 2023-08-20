import React, { useEffect } from "react";
import CardFligth from "./CardFligth";

interface IProps {
  FlightsRound: any;
  passengers: any;
}

const RoundedFlightSearch = ({ FlightsRound, passengers }: IProps) => {
  useEffect(() => {
    console.log("FLIGHT ROUND PAGE: ", FlightsRound);
  }, []);
  return (
    <div className=" relative flex flex-col justify-center items-center mb-20 ">
      <div className=" items-center  w-[75%] ">
        <div className=" bg-gradient-to-r from-[#FFEDB3] to-[#FFFDF5] py-2">
          <p className=" text-[#FF7100] font-bold ml-[15px]">FLIGHTS ORIGIN</p>
        </div>
        {FlightsRound.flightOrigin.map((res: any) => (
          <CardFligth key={res.id} flight={res} passengers={passengers} />
        ))}
      </div>
      <div className=" items-center  w-[75%] ">
        <div className=" bg-gradient-to-r from-[#FFEDB3] to-[#FFFDF5] py-2">
          <p className=" text-[#FF7100] font-bold ml-[15px]">FLIGHTS DESTINY</p>
        </div>
        {FlightsRound.flightDestiny.map((res: any) => (
          <CardFligth key={res.id} flight={res} passengers={passengers} />
        ))}
      </div>
    </div>
  );
};

export default RoundedFlightSearch;
