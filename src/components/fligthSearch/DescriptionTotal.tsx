import React from "react";
import config from "../../config/index.json";

interface IProps {
  total: number;
}

const DescriptionTotal = ({ total }: IProps) => {
  const { flight_details } = config;
  return (
    <div className="relative flex justify-end items-center ">
      <p className="font-bold text-xl">{`${flight_details.labelTotal} `} </p>
      <p className="text-xl">{` $ ${total}`} USD</p>
    </div>
  );
};

export default DescriptionTotal;
