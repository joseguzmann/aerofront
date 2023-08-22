import React, { useContext, useEffect, useState } from "react";

import { IFlights } from "../../interface/interface";
import Button from "@mui/material/Button";
import PassengerDetails from "./PassengerDetails";
import { useField } from "@mui/x-date-pickers/internals";
import { exit } from "process";

interface IProps {
  flight: IFlights;
}
interface Passenger {
  name: string;
  age: number;
  email: string;
  phone: string;
  // ... otras propiedades si las tienes
}
interface PassengersObject {
  [key: string]: Passenger[] | undefined;
}

interface ErrorProps {
  value: boolean;
  msg?: string;
}
const PassengersData = ({ flight }: IProps) => {
  const [passengersInfo, setPassengersInfo] = useState<any>();
  const [error, setError] = useState<ErrorProps>({ value: false });

  useEffect(() => {
    // if (flight && flight.passengers) {
    const passengersObjetValues = flight.passengers?.reduce((acc, res) => {
      if (res.n > 0) {
        acc[res.title] = [];
      }
      return acc;
    }, {} as PassengersObject); // Indica el tipo del objeto aquí

    // console.log("passengersObjetValues", passengersObjetValues);
    setPassengersInfo(passengersObjetValues);
    console.log("INFOPAS", passengersInfo);
    // }
  }, []);

  const validateData = () => {
    let isValid = true;

    flight.passengers?.forEach((pass) => {
      const passengerArray = passengersInfo[pass.title];

      if (passengerArray !== undefined) {
        if (passengerArray.length === pass.n) {
          if (
            !passengerArray.every(
              (res: any) =>
                !isNaN(res.age) &&
                res.email !== "" &&
                res.name !== "" &&
                res.phone !== ""
            )
          ) {
            isValid = false;
          }
        } else {
          isValid = false;
        }
      }
    });
    return isValid;
  };
  const handleSaveData = () => {
    console.log("VALID DATE: ", validateData());
    const isValid = validateData();
    setError({
      value: isValid,
      msg: !isValid ? "Please fill all inputs" : "",
    });

    //RETORNA  TODOS LOS DATOS
    // const passengersValidity = flight.passengers?.map((pass) => {
    //   if (passengersInfo[pass.title] !== undefined) {
    //     if (passengersInfo[pass.title].length === pass.n) {
    //       const newPassenger: Passenger[] = passengersInfo[pass.title];
    //       const passengerValidity = newPassenger.map((res) => {
    //         const isAgeValid = !isNaN(res.age);
    //         const isEmailValid = res.email !== "";
    //         const isNameValid = res.name !== "";
    //         const isPhoneValid = res.phone !== "";
    //         const isPassengerValid =
    //           isAgeValid && isEmailValid && isNameValid && isPhoneValid;
    //         return {
    //           ...res,
    //           isAgeValid,
    //           isEmailValid,
    //           isNameValid,
    //           isPhoneValid,
    //           isPassengerValid,
    //         };
    //       });
    //       return passengerValidity;
    //     }
    //   }
    //   return [];
    // });
    // console.log("passengersValidity", passengersValidity);
    // RETORNA UN ARRAY [true, false, true, false]
    // const passengersValidity = flight.passengers?.map((pass) => {
    //   if (!passengersInfo[pass.title]) {
    //     return undefined;
    //   }
    //   if (passengersInfo[pass.title].length !== pass.n) {
    //     return false;
    //   }
    //   const newPassenger: Passenger[] = passengersInfo[pass.title];
    //   const passengerValidity = newPassenger.map((res) => {
    //     const isAgeValid = !isNaN(res.age);
    //     const isEmailValid = res.email !== "";
    //     const isNameValid = res.name !== "";
    //     const isPhoneValid = res.phone !== "";
    //     const isPassengerValid =
    //       isAgeValid && isEmailValid && isNameValid && isPhoneValid;
    //     return isPassengerValid;
    //   });
    //   return passengerValidity.every((validity) => validity);
    // });
  };

  return (
    <div className=" relative flex justify-center items-center mb-20 ">
      <div className=" items-center  w-[75%]   ">
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

export default PassengersData;
