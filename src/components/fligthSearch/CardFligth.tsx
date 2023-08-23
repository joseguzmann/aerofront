import React from "react";

import config from "../../config/index.json";

import Divider from "@mui/material/Divider";
// import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
// import Image from "next/image";
import { useRouter } from "next/router";
import { IFlights } from "../../interface/interface";
import {
  FlightDetails,
  FlightSearchDescription,
  FlightSearchRounded,
} from "./FlightDescription";

interface IProps {
  flight: IFlights;
  passengers?: any;
  isRounded?: boolean;
  isDetails?: boolean;
  isSearch?: boolean;
  setRadioSelect?: any;
}

const CardFligth = ({
  flight,
  passengers,
  isDetails,
  isRounded,
  isSearch,
  setRadioSelect,
}: IProps) => {
  const router = useRouter();
  const handleChooseFlight = () => {
    router.push({
      pathname: "/flight-details",
      query: {
        flights: JSON.stringify(flight),
        passengers: JSON.stringify(passengers),
      },
    });
  };
  return (
    <div>
      <div className="my-[25px] ">
        <div className="bg-[#ECECEC] w-[100%] flex row p-1 items-center">
          <div className="mr-5">
            <img src={config.other.imgAirplane} width={64} height={42} alt="" />
          </div>

          <p className="mx-5">
            {flight.origen.label} ({flight.origen.code})
          </p>
          <img src={config.other.imgArrow2} width={99} height={13} alt="" />
          <p className="mx-5">
            {flight.destino.label}({flight.destino.code})
          </p>
        </div>
      </div>

      {isSearch && (
        <FlightSearchDescription
          flight={flight}
          handleChooseFlight={handleChooseFlight}
        />
      )}

      {isRounded && (
        <FlightSearchRounded
          flight={flight}
          setRadioSelected={setRadioSelect}
        />
      )}
      {isDetails && <FlightDetails flight={flight} />}

      <Divider />
    </div>
  );
};

export default CardFligth;
