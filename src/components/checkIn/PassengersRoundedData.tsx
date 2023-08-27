import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/userContext";

import { IPassengerInput, IRoundFlight } from "../../interface/interface";
import PassengerDetails from "./PassengerDetails";
import Button from "@mui/material/Button";
import { addRoundedFlightToBooking } from "../../lib/firestore/check.service";

import { useRouter } from "next/router";

interface ErrorProps {
  value: boolean;
  msg?: string;
}

interface PassengersObject {
  [key: string]: IPassengerInput[] | undefined;
}

interface IProps {
  flight: IRoundFlight;
}
const PassengersRoundedData = ({ flight }: IProps) => {
  const [passengersInfo, setPassengersInfo] = useState<any>({ backpack: 1 });
  const [error, setError] = useState<ErrorProps>({ value: false });
  const { user } = useContext(UserContext);
  const router = useRouter();
  // const { flight } = useContext(FlightContext);
  useEffect(() => {
    if (flight) {
      const passengersObjetValues = flight.passengers.reduce((acc, res) => {
        if (res.n > 0) {
          acc[res.title] = Array.from({ length: res.n }, () => ({
            backpack: 1,
          }));
        }
        return acc;
      }, {} as PassengersObject);

      setPassengersInfo(passengersObjetValues);
    }

    // }
  }, [flight]);

  const validateData = () => {
    let isValid = true;
    let auxIndex: number = 0;

    if (flight) {
      flight.passengers?.forEach((pass) => {
        const passengerArray = passengersInfo[pass.title];

        auxIndex += pass.n;

        if (passengerArray !== undefined) {
          if (passengerArray.length === pass.n) {
            if (
              !passengerArray.every(
                (res: IPassengerInput) =>
                  res.age !== undefined &&
                  !isNaN(res.age) &&
                  res.email !== "" &&
                  res.name !== "" &&
                  res.phone !== "" &&
                  res.seat !== undefined &&
                  res.seat !== "" &&
                  res.seatRound !== undefined &&
                  res.seatRound !== ""
              )
            ) {
              isValid = false;
            }
          } else {
            isValid = false;
          }
        }
      });

      flight.totalPassenger = auxIndex;
    }

    return isValid;
  };

  const handleSaveData = async () => {
    const isValid = validateData();
    setError({
      value: isValid,
      msg: !isValid ? "Please fill all inputs" : "",
    });

    try {
      if (user && isValid) {
        const response = await addRoundedFlightToBooking(
          flight,
          user,
          passengersInfo
        );
        if (response) {
          router.push({
            pathname: "/passenger-confirmation",
            query: {
              bookingId: JSON.stringify(response),
              flightRound: JSON.stringify(flight),
              passengersInfo: JSON.stringify(passengersInfo),
            },
          });
        }
      }
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  return (
    <div className=" relative flex justify-center items-center mb-20 ">
      <div className=" items-center  w-[75%]">
        {flight &&
          flight.passengers?.map((passenger) => {
            if (passenger.n > 0) {
              return Array.from({ length: passenger.n }).map((_, index) => (
                <PassengerDetails
                  key={index}
                  title={passenger.title}
                  index={index}
                  passengersInfo={passengersInfo}
                  setPassengersInfo={setPassengersInfo}
                  isRounded={true}
                  flightRounded={flight}
                />
              ));
            }
            return null;
          })}
        {!error.value && (
          <div className="mt-5">
            <p className="font-bold text-2xl text-red-500">{error.msg}</p>
          </div>
        )}
        <div className="flex justify-center my-9">
          {/* <Link href={"/flight-search"}> */}
          <Button
            style={{ backgroundColor: "#ED6C02", color: "white" }}
            variant="contained"
            size="large"
            onClick={handleSaveData}
          >
            SAVE
          </Button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default PassengersRoundedData;
