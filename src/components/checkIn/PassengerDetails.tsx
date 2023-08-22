import TextField from "@mui/material/TextField";
import React from "react";

interface IProps {
  title: string;
  index: number;
  passengersInfo: any;
  setPassengersInfo: any;
}

const PassengerDetails = ({
  title,
  index,
  passengersInfo,
  setPassengersInfo,
}: IProps) => {
  const capitalizeFirstLetter = (inputString: string) => {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  };

  const handleInputChange = (type: any, index: any, field: any, value: any) => {
    if (field === "age") parseInt(value);
    const updatedInfo: any = { ...passengersInfo };
    updatedInfo[type][index] = {
      ...updatedInfo[type][index],
      [field]: field === "age" ? parseInt(value) : value,
    };

    setPassengersInfo(updatedInfo);
  };

  const inputLabel = ["name", "age", "email", "phone"];

  return (
    <div className="bg-[#ECECEC] pb-3 mt-[3rem]">
      <div className="bg-yellow-500 pl-[3rem]">
        <p className="font-bold text-xl p-2">
          {title}
          {index + 1} Details
        </p>
      </div>
      <div className="pl-[3rem] my-[2rem] ">
        {inputLabel.map((res) => {
          return (
            <div className="mb-5 flex items-center justify-around w-[50%]">
              <TextField
                type={res === "age" ? "number" : "text"}
                key={`inp_${res}`}
                onChange={(e) => {
                  handleInputChange(title, index, res, e.target.value);
                }}
                label={capitalizeFirstLetter(res)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PassengerDetails;
