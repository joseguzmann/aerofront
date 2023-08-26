import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import React, { useState } from "react";
import config from "../../config/index.json";
import { IFlights, IPassengersFlight } from "../../interface/interface";
import SeatsManager from "./SeatsManager";

interface IProps {
  passengersInfo: any;
  setPassengersInfo: any;
  title: any;
  index: number;
  flightRounded: {
    flightOrigin: IFlights;
    flightDestiny: IFlights;
    passengers: IPassengersFlight[];
    totalPassenger?: number;
  } | null;
}
const SeatsManagerRounded = ({
  passengersInfo,
  setPassengersInfo,
  title,
  index,
  flightRounded,
}: IProps) => {
  const [initialFlightSeats, setInitialFlightSeats] = useState(false);
  const [roundedFlightSeats, setRoundedFlightSeats] = useState(false);
  return (
    <div>
      <ButtonGroup variant="contained">
        <Button
          onClick={() => {
            setInitialFlightSeats(true);
            setRoundedFlightSeats(false);
          }}
        >
          <div className="flex">
            <img
              src={config.other.imgSeatFlight}
              width={20}
              height={20}
              alt="SeatFlight"
              className=""
            />
            <p className="ml-2">Initial Flight</p>
          </div>
        </Button>
        <Button
          onClick={() => {
            setInitialFlightSeats(false);
            setRoundedFlightSeats(true);
          }}
        >
          <div className="flex">
            <img
              src={config.other.imgSeatFlight}
              width={20}
              height={20}
              alt="SeatFlight"
              className=""
            />
            <p className="ml-2">Round-trip Flight</p>
          </div>
        </Button>
      </ButtonGroup>
      <div className="my-3">
        {initialFlightSeats && (
          <SeatsManager
            passengersInfo={passengersInfo}
            setPassengersInfo={setPassengersInfo}
            title={title}
            index={index}
            flightRounded={flightRounded?.flightOrigin}
          />
        )}
        {roundedFlightSeats && (
          <SeatsManager
            passengersInfo={passengersInfo}
            setPassengersInfo={setPassengersInfo}
            title={title}
            index={index}
            flightRounded={flightRounded?.flightDestiny}
            isDestiny={true}
          />
        )}
      </div>
    </div>
  );
};

export default SeatsManagerRounded;
