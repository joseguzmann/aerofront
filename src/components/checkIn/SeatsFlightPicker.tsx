import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
//import SeatPicker from "react-seat-picker";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import SensorDoorIcon from "@mui/icons-material/SensorDoor";
import Dialog from "@mui/material/Dialog";
import {
  getSeatsFlightById,
  updateFlightSeatStatus,
  uploadSeatsToFlight,
} from "../../lib/firestore/check.service";
import { DocumentData } from "firebase/firestore";
import FlightContext from "../../contexts/flightContext";

export interface SeatProps {
  open: boolean;
  seatsFlight: { row: string; col: number; id: string; status: number }[];
  selectedValue?: string;
  onClose: (value: any) => void;
  passengerObjData: any;
}

const SelectSeatModal = (props: SeatProps) => {
  const [isSelected, setIsSelected] = useState<string | null>();
  const { onClose, open, seatsFlight, passengerObjData } = props;
  const uniqueRows = seatsFlight.reduce((rows, seat) => {
    if (!rows.includes(seat.row)) {
      rows.push(seat.row);
    }
    return rows;
  }, [] as string[]);

  const handleClose = () => {
    // const totalSum = sectionsV.reduce((total, section) => total + section.n, 0);

    onClose(isSelected);
  };

  return (
    <Dialog open={open}>
      <div className="flex flex-col items-center">
        <div className="flex items-center p-2  ">
          <div className="flex flex-col  ">
            <div className="self-center my-5">
              <p className="text-xl text-gray-400">
                <SensorDoorIcon style={{ fontSize: 30, color: "#898989" }} />
                <b>Entrance</b>
              </p>
            </div>
            {uniqueRows.map((row) => (
              <div key={row} className="flex row">
                {seatsFlight
                  .filter((seat) => seat.row === row)
                  .map((seat) => {
                    const isAisle = seat.col === 3 || seat.col === 4;

                    return (
                      <div key={seat.id} className=" flex  row  m-1 ">
                        {seat.col === 4 && (
                          <>
                            {/* <Divider orientation="vertical" flexItem /> */}
                            <div className=" w-6  rounded-lg"></div>
                          </>
                        )}
                        <div
                          className={`${
                            seat.status === 0 ? "cursor-pointer" : null
                          }   flex flex-col items-center bg-gray-300 rounded-lg p-2 m-1`}
                          onClick={() => {
                            if (seat.status === 0) {
                              console.log("SELECTED: ", seat.id);
                              setIsSelected(seat.id);
                            }
                          }}
                        >
                          <EventSeatIcon
                            style={{
                              color:
                                isSelected === seat.id
                                  ? "#34D399"
                                  : seat.status === 1
                                  ? "#898989"
                                  : "#0059FE",
                              fontSize: 30,
                            }}
                          />
                          <p>
                            <b>
                              {seat.row}
                              {seat.col}
                            </b>
                          </p>
                        </div>
                        {seat.col === 3 && (
                          <>
                            <div className=" w-6  rounded-lg"></div>
                            {/* <Divider orientation="vertical" flexItem /> */}
                          </>
                        )}
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
          <div>
            <div className="flex items-center my-2 mx-5">
              <div className="bg-[#0059FE] rounded-lg w-9 h-9 mx-2"></div>
              <p>Available </p>
            </div>
            <div className="flex items-center my-2 mx-5">
              <div className="bg-[#898989] rounded-lg w-9 h-9 mx-2"></div>
              <p>Occupied </p>
            </div>
            <div className="flex items-center my-2 mx-5">
              <div className="bg-green-400 rounded-lg w-9 h-9 mx-2"></div>
              <p>Selected</p>
            </div>
          </div>
        </div>
        {isSelected && (
          <div>
            <Button
              style={{
                backgroundColor: "#ED6C02",
                color: "white",
              }}
              variant="contained"
              size="large"
              className="mt-9 mb-4"
              onClick={handleClose}
            >
              SAVE SEAT
            </Button>
          </div>
        )}
      </div>
    </Dialog>
  );
};

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  passengersInfo: any;
  setPassengersInfo: any;
  title: any;
  index: number;
}

const SeatsFlightPicker = ({
  open,
  setOpen,
  passengersInfo,
  setPassengersInfo,
  title,
  index,
}: IProps) => {
  // const [open, setOpen] = useState(false);
  const { flight } = useContext(FlightContext);
  const [seatsFlight, setSeatsFlight] = useState<
    { row: string; col: number; id: string; status: number }[] | null
  >();
  const handleClose = (value: any) => {
    if (flight) {
      updateFlightSeatStatus(flight.id, 1, value);
    }

    setOpen(false);
    const updateSeat: any = { ...passengersInfo };
    updateSeat[title][index] = {
      ...updateSeat[title][index],
      seat: value,
      favoriteSeat: true,
    };
    setPassengersInfo(updateSeat);
  };

  useEffect(() => {
    const getSeatsFlightSnapshot = async (snapshot: DocumentData) => {
      const flightsData = snapshot.docs.map((doc: DocumentData) => doc.data());

      setSeatsFlight(flightsData);
    };
    if (flight) {
      getSeatsFlightById(flight.id, getSeatsFlightSnapshot);
    }
  }, []);
  return (
    <>
      {seatsFlight && (
        <SelectSeatModal
          open={open}
          onClose={handleClose}
          seatsFlight={seatsFlight}
          passengerObjData={passengersInfo[title][index]}
        />
      )}
    </>
  );
};

export default SeatsFlightPicker;
