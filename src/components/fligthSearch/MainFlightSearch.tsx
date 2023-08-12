import React from "react";
import config from "../../config/index.json";
import CardFligth from "./CardFligth";

const MainFlightSearch = () => {
  const { desc } = config.search;

  return (
    <div className=" relative flex justify-center items-center ">
      <div className=" items-center  w-[75%] ">
        <div className=" bg-gradient-to-r from-[#FFEDB3] to-[#FFFDF5] py-2">
          <p className=" text-[#FF7100] font-bold ml-[15px]">{desc}</p>
        </div>
        <CardFligth />
        <CardFligth />
        <CardFligth />
      </div>
    </div>
  );
};

export default MainFlightSearch;
