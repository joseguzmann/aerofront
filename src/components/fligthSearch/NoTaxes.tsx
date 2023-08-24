import React from "react";
import config from "../../config/index.json";

const NoTaxes = () => {
  return (
    <div className=" my-7 bg-[#EDF7ED] p-2 flex row  w-[36%] justify-around ">
      <img
        src={config.other.svgCheck}
        width={25}
        height={25}
        alt="SVG Button"
        // className="hover:opacity-75 transition-opacity"
      />

      <div>
        <p className="font-bold">{config.flight_details.label1}</p>
        <p className="font-bold">{config.flight_details.label2}</p>
      </div>
    </div>
  );
};

export default NoTaxes;
