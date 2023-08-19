import React, { useContext, useEffect } from "react";
import FlightContext from "../../contexts/flightContext";
import { IFlights } from "../../interface/interface";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

interface IProps {
  flight: IFlights;
}
const PassengersData = ({ flight }: IProps) => {
  useEffect(() => {
    console.log("FLIGHT IN DATA: ", flight);
  }, []);

  return (
    <div className=" relative flex justify-center items-center mb-20 ">
      <div className=" items-center  w-[75%]   ">
        {flight &&
          flight.passengers?.map((passenger) => {
            if (passenger.n > 0) {
              const passengerDetails = [];
              console.log("Passsenger: ", passenger.n, passenger.title);
              for (let index = 0; index < passenger.n; index++) {
                passengerDetails.push(
                  <div className="bg-[#ECECEC] pb-3 mt-[3rem]">
                    <div className="bg-yellow-500 pl-[3rem]">
                      <p className="font-bold text-xl p-2">
                        {passenger.title}
                        {index + 1} Details
                      </p>
                    </div>
                    <div className="pl-[3rem] my-[2rem] ">
                      <div className="mb-5 flex items-center justify-around w-[50%] ">
                        <InputLabel>Name:</InputLabel>
                        <OutlinedInput label="Password" />
                        {/* <TextField label={"Steven"} /> */}
                      </div>
                      <div className="mb-5 flex items-center justify-around w-[50%] ">
                        {/* <p>Age: </p>
                      <TextField label={"21"} /> */}
                        <InputLabel>Age:</InputLabel>
                        <OutlinedInput label="Age" />
                      </div>
                      <div className="mb-5 flex items-center justify-around w-[50%] ">
                        <InputLabel>Email:</InputLabel>
                        <OutlinedInput label="Email" />
                      </div>
                      <div className="mb-5 flex items-center justify-around w-[50%] ">
                        <InputLabel>Phone:</InputLabel>
                        <OutlinedInput label="Password" />
                      </div>
                    </div>
                  </div>
                );

                // return (

                // );
              }
              return passengerDetails;
            }
            return null;
          })}
        <div className="flex justify-center my-9">
          {/* <Link href={"/flight-search"}> */}
          <Button
            style={{ backgroundColor: "#ED6C02", color: "white" }}
            variant="contained"
            size="large"
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
