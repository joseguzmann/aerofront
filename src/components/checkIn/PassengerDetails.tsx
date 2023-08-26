import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import BackPackManager from "./BackpackManager";
import SeatsManager from "./SeatsManager";
import SeatsManagerRounded from "./SeatsManagerRounded";
import { IFlights, IPassengersFlight } from "../../interface/interface";

interface IProps {
  title: string;
  index: number;
  passengersInfo: any;
  setPassengersInfo: any;
  isRounded?: boolean;
  flightRounded?: {
    flightOrigin: IFlights;
    flightDestiny: IFlights;
    passengers: IPassengersFlight[];
    totalPassenger?: number;
  };
  flightOne?: IFlights;
}

const PassengerDetails = ({
  title,
  index,
  passengersInfo,
  setPassengersInfo,
  isRounded,
  flightRounded,
  flightOne,
}: IProps) => {
  const [isValidEmail, setIsValidEmail] = useState(true);

  const capitalizeFirstLetter = (inputString: string) => {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  };

  const validateEmail = (input: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleInputChange = (type: any, index: any, field: any, value: any) => {
    if (field === "email") {
      setIsValidEmail(validateEmail(value));
    }
    const updatedInfo: any = { ...passengersInfo };
    updatedInfo[type][index] = {
      ...updatedInfo[type][index],
      [field]: field === "age" ? parseInt(value) : value,
    };

    setPassengersInfo(updatedInfo);

    // console.log("UPDATE INFO: ", updatedInfo);
  };

  const inputLabel = ["name", "age", "email", "phone"];

  return (
    <div className="bg-[#ECECEC] pb-3 mt-[3rem]">
      <div className="bg-yellow-500 pl-[3rem]">
        <p className=" text-xl p-2">
          <b>Passenger {title} </b>
          Nº: {index + 1}
        </p>
      </div>
      <div className=" flex  pl-[3rem] my-[2rem] ">
        <div className=" w-[60%]">
          <p className="my-5">Please fill all the inputs </p>
          {inputLabel.map((res, i) => {
            return (
              <div
                key={`${res}+${i}`}
                className="mb-5  flex flex-col items-center justify-around  "
              >
                <TextField
                  className="w-[80%]"
                  error={res === "email" ? !isValidEmail : false}
                  type={
                    res === "age"
                      ? "number"
                      : res === "phone"
                      ? "number"
                      : "text"
                  }
                  key={`inp_${res}`}
                  onChange={(e) => {
                    handleInputChange(title, index, res, e.target.value);
                  }}
                  label={capitalizeFirstLetter(res)}
                />
                {!isValidEmail && res === "email" && (
                  <p className="pt-5 ">Enter a correct input</p>
                )}
              </div>
            );
          })}
        </div>

        <div className=" flex flex-col justify-center items-center  ">
          <BackPackManager
            passengersInfo={passengersInfo}
            setPassengersInfo={setPassengersInfo}
            title={title}
            index={index}
          />
          {isRounded ? (
            <SeatsManagerRounded
              flightRounded={flightRounded ? flightRounded : null}
              passengersInfo={passengersInfo}
              setPassengersInfo={setPassengersInfo}
              title={title}
              index={index}
            />
          ) : (
            <SeatsManager
              passengersInfo={passengersInfo}
              setPassengersInfo={setPassengersInfo}
              title={title}
              index={index}
              flightOne={flightOne}
            />
          
          )}
        </div>
      </div>
    </div>
  );
};

export default PassengerDetails;
