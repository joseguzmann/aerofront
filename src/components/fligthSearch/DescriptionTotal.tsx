import React from "react";
import config from "../../config/index.json";

interface IProps {
  total: number;
}

const DescriptionTotal = ({ total }: IProps) => {
  const { flight_details } = config;
  return (
    <div className="relative flex justify-center items-center my-10 ">
      <div className=" w-[70%] flex row justify-around">
        <div className="bg-[#EDF7ED] p-2 flex row  w-[36%] justify-around ">
          <img
            src={config.other.svgCheck}
            width={25}
            height={25}
            alt="SVG Button"
            // className="hover:opacity-75 transition-opacity"
          />

          <div>
            <p className="font-bold">{flight_details.label1}</p>
            <p className="font-bold">{flight_details.label2}</p>
          </div>
        </div>
        <div className="flex flex-col p-2 ">
          <p className="font-bold text-xl">{flight_details.labelTotal}</p>
          <p className="text-xl">$ {total} USD</p>
        </div>
      </div>
    </div>
  );
};

export default DescriptionTotal;
