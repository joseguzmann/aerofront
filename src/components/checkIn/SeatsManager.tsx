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

interface IProps {
  passengersInfo: any;
  setPassengersInfo: any;
  title: any;
  index: number;
}
const SeatsManager = ({
  passengersInfo,
  setPassengersInfo,
  title,
  index,
}: IProps) => {
  const [open, setOpen] = useState(false);
  const { flight } = useContext(FlightContext);
  const [seatsFlight, setSeatsFlight] = useState<
    { row: string; col: number; id: string; status: number }[] | null
  >();

  useEffect(() => {
    console.log("RADIO MOUNTING: ");

    const getSeatsFlightSnapshot = async (snapshot: DocumentData) => {
      const flightsData = snapshot.docs.map((doc: DocumentData) => doc.data());
      setSeatsFlight(flightsData);
    };
    if (flight) {
      getSeatsFlightById(flight.id, getSeatsFlightSnapshot);
    }

    if (flight) {
      const unsubscribe = getSeatsFlightById(flight.id, getSeatsFlightSnapshot);

      // Limpiar el listener cuando el componente se desmonte
      return () => unsubscribe();
    }
    return undefined;
  }, [flight]);

  const cleanSeatSelection = () => {
    const passengerSeat = passengersInfo[title][index].seat;

    // If the passenger already has a seat, change its status to available
    if (passengerSeat && flight) {
      updateFlightSeatStatus(flight.id, 0, passengerSeat);
    }
  };

  const handleRandomSeat = () => {
    if (flight && seatsFlight) {
      cleanSeatSelection();
      // Find an available seat

      const availableSeat = seatsFlight.find((seat) => seat.status === 0);

      if (availableSeat) {
        console.log("NEW Asiento asignado:", availableSeat);
        const updateSeat: any = { ...passengersInfo };
        updateSeat[title][index] = {
          ...updateSeat[title][index],
          seat: availableSeat.id,
        };
        updateFlightSeatStatus(flight.id, 1, availableSeat.id);
      } else {
        console.log("No hay asientos disponibles.");
      }
    }
  };

  const handleFavoriteSeat = () => {
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
          open={open}
          setOpen={setOpen}
          passengersInfo={passengersInfo}
          setPassengersInfo={setPassengersInfo}
          title={title}
          index={index}
        />
      </RadioGroup>
    </div>
  );
};

export default SeatsManager;
