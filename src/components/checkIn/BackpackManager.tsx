import React, { useState } from "react";
import config from "../../config/index.json";

interface IProps {
  passengersInfo: any;
  setPassengersInfo: any;
}

const BackPackManager = ({ passengersInfo, setPassengersInfo }: IProps) => {
  const [backpack, setBackpack] = useState(1);
  console.log(passengersInfo);

  return (
    <div className="my-9 flex items-center">
      <img
        src={config.other.svgBackpack}
        width={50}
        height={50}
        alt="Backpack"
      />
      <p className="font-bold text-xl">BACKPACKS</p>
      <img
        className={`ml-6 ${
          backpack === 1 ? " cursor-not-allowed" : "cursor-pointer"
        }`}
        src={config.other.svgLess}
        width={30}
        height={30}
        alt="Less"
        onClick={() => {
          if (backpack > 1) {
            setBackpack(backpack - 1);
          }
        }}
      />
      <p className="text-xl mx-4"> {backpack} </p>
      <img
        className={`mr-6 ${
          backpack === 3 ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        src={config.other.svgPlus}
        width={30}
        height={30}
        alt="Plus"
        onClick={() => {
          if (backpack !== 3) {
            setBackpack(backpack + 1);
          }
        }}
      />
      <p className="text-xl">
        <b>Charge: $</b> {backpack * 10}
      </p>
    </div>
  );
};

export default BackPackManager;
