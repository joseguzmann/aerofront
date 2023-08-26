import React, { useContext, useEffect, useState } from "react";
import CardFligth from "./CardFligth";

import PassengersTotalDetails from "./PassengersTotalDetails";
import Button from "@mui/material/Button";
import FlightContext from "../../contexts/flightContext";
import { useRouter } from "next/router";

interface IProps {
  flightsRounded: any;
  passengers: any;
}

const FlightDetailsRounded = ({ flightsRounded, passengers }: IProps) => {
  const { setFlight } = useContext(FlightContext);
  const router = useRouter();

  const handleProceed = () => {
    if (flightsRounded) {
      flightsRounded.passengers = passengers;

      setFlight(flightsRounded);
      router.push({
        pathname: "login",
        query: {
          isRounded: true,
          flightRounded: JSON.stringify(flightsRounded),
        },
      });
    }
  };
  return (
    <div className=" relative flex justify-center items-center mb-20 ">
      <div className=" items-center  w-[75%] ">
        <div className=" bg-gradient-to-r from-[#FFEDB3] to-[#FFFDF5] py-2">
          <p className=" text-[#FF7100] font-bold ml-[15px]">
            {/* {isDetails ? "DETALLE" : desc} */} FLIGHT ORIGIN
          </p>
        </div>
        <CardFligth
          isDetails={true}
          key={flightsRounded.flightOrigin.id}
          flight={flightsRounded.flightOrigin}
        />
        <div className=" bg-gradient-to-r from-[#FFEDB3] to-[#FFFDF5] py-2">
          <p className=" text-[#FF7100] font-bold ml-[15px]">
            {/* {isDetails ? "DETALLE" : desc} */} FLIGHT DESTINY
          </p>
        </div>
        <CardFligth
          isDetails={true}
          key={flightsRounded.flightDestiny.id}
          flight={flightsRounded.flightDestiny}
        />

        {/* <DescriptionTotal total={total} /> */}
        <PassengersTotalDetails
          passengers={passengers}
          flight={flightsRounded.flightOrigin}
        />

        <PassengersTotalDetails
          passengers={passengers}
          flight={flightsRounded.flightDestiny}
        />

        <div>
          <Button
            style={{ backgroundColor: "#ED6C02", color: "white" }}
            variant="contained"
            size="large"
            onClick={handleProceed}
          >
            PROCEED WITH PAYMENT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsRounded;
