import React, { useContext, useEffect, useState } from "react";
import config from "../../config/index.json";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import SeatsFlightPicker from "./SeatsFlightPicker";
import FlightContext from "../../contexts/flightContext";
import {
  getSeatsFlightById,
  updateFlightSeatStatus,
} from "../../lib/firestore/check.service";
import { DocumentData } from "firebase/firestore";
import { IFlights } from "../../interface/interface";

interface IProps {
  passengersInfo: any;
  setPassengersInfo: any;
  title: any;
  index: number;
  flightRounded?: IFlights;
  flightOne?: IFlights;
  isDestiny?: boolean;
}
const SeatsManager = ({
  passengersInfo,
  setPassengersInfo,
  title,
  index,
  flightRounded,
  isDestiny,
  flightOne,
}: IProps) => {
  const [open, setOpen] = useState(false);
  // const [flight, setFlight] = useState<any>();
  // if (!flightRounded) {
  //   const { flight } = useContext(FlightContext);
  //   setFlight(flight);
  // }

  useEffect(() => {
    console.log("PAssengerInfo: ", passengersInfo);
    console.log("title: ", title);
    console.log("index: ", index);
    console.log("flightRounded: ", flightRounded);
    console.log("isDestiny: ", isDestiny);
    console.log("flightOne: ", flightOne);
  }, []);

  const [seatsFlight, setSeatsFlight] = useState<
    { row: string; col: number; id: string; status: number }[] | null
  >();

  const getSeatsFlightSnapshot = async (snapshot: DocumentData) => {
    const flightsData = snapshot.docs.map((doc: DocumentData) => doc.data());
    setSeatsFlight(flightsData);
  };

  useEffect(() => {
    if (flightOne) {
      getSeatsFlightById(flightOne.id, getSeatsFlightSnapshot);
    }
    if (flightRounded) {
      getSeatsFlightById(flightRounded.id, getSeatsFlightSnapshot);
    }
    if (flightOne) {
      const unsubscribe = getSeatsFlightById(
        flightOne.id,
        getSeatsFlightSnapshot
      );

      // Limpiar el listener cuando el componente se desmonte
      return () => unsubscribe();
    }
    if (flightRounded) {
      const unsubscribe = getSeatsFlightById(
        flightRounded.id,
        getSeatsFlightSnapshot
      );

      // Limpiar el listener cuando el componente se desmonte
      return () => unsubscribe();
    }
    return undefined;
  }, [flightOne, flightRounded]);

  const cleanSeatSelection = () => {
    const passengerSeat = passengersInfo[title][index].seat;
    const passengerSeatRound = passengersInfo[title][index].seatRound;
    // If the passenger already has a seat, change its status to available
    if (flightOne) {
      if (passengerSeat) {
        updateFlightSeatStatus(flightOne.id, 0, passengerSeat);
      }
      if (passengerSeatRound) {
        updateFlightSeatStatus(flightOne.id, 0, passengerSeatRound);
      }
    }
    if (flightRounded) {
      if (passengerSeat) {
        updateFlightSeatStatus(flightRounded.id, 0, passengerSeat);
      }
      if (passengerSeatRound) {
        updateFlightSeatStatus(flightRounded.id, 0, passengerSeatRound);
      }
    }
  };

  const handleRandomSeat = () => {
    cleanSeatSelection();

    if (flightOne && seatsFlight) {
      // Find an available seat

      const availableSeat = seatsFlight.find((seat) => seat.status === 0);

      if (availableSeat) {
        const updateSeat: any = { ...passengersInfo };
        updateSeat[title][index] = {
          ...updateSeat[title][index],
          seat: availableSeat.id,
        };
        updateFlightSeatStatus(flightOne.id, 1, availableSeat.id);
      } //  else {
      //   console.log("No hay asientos disponibles.");
      // }
    }

    if (flightRounded && seatsFlight) {
      // Find an available seat

      const availableSeat = seatsFlight.find((seat) => seat.status === 0);

      if (availableSeat) {
        const updateSeat: any = { ...passengersInfo };
        updateSeat[title][index] = {
          ...updateSeat[title][index],
          [isDestiny ? "seatRound" : "seat"]: availableSeat.id,
        };
        updateFlightSeatStatus(flightRounded.id, 1, availableSeat.id);
      } // else {
      //   console.log("No hay asientos disponibles.");
      // }
    }
  };

  const handleFavoriteSeat = () => {
    console.log("FAVORITE SEAT?");
    cleanSeatSelection();
    setOpen(true);
  };
  return (
    <div className="my-9 flex items-center">
      <img
        src={config.other.imgSeatFlight}
        width={50}
        height={50}
        alt="SeatFlight"
        className=""
      />
      <p className="font-bold text-xl mr-6">SEATS</p>
      <RadioGroup row>
        <FormControlLabel
          value={1}
          control={<Radio />}
          label="Random Seat"
          onChange={handleRandomSeat}
        />
        <FormControlLabel
          value={2}
          control={<Radio />}
          label="Favorite Seat"
          onChange={handleFavoriteSeat}
        />
        <SeatsFlightPicker
          flightId={
            flightOne ? flightOne.id : flightRounded ? flightRounded.id : ""
          }
          open={open}
          setOpen={setOpen}
          passengersInfo={passengersInfo}
          setPassengersInfo={setPassengersInfo}
          title={title}
          index={index}
          isDestiny={isDestiny}
        />
      </RadioGroup>
    </div>
  );
};

export default SeatsManager;
