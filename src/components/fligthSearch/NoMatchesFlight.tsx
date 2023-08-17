import React from "react";
// import Image from "next/image";
import config from "../../config/index.json";

const NoMatchesFlight = () => {
  return (
    <div className=" relative flex justify-center items-center mb-20  ">
      <div className=" flex flex-col  justify-center items-center  w-[75%]  p-10 rounded-lg border bg-gray-200 border-gray-300 border-b-4 border-opacity-75 shadow-lg ">
        <div>
          <p className="font-bold text-4xl my-9">No Flights Found</p>
        </div>
        <div>
          <img
            src={config.other.imgNoFligh}
            width={624}
            height={416}
            alt=""
          />
        </div>
        <div className="w-[60%]  my-9">
          <p className="text-lg">
            We're sorry, but we couldn't find any flights that match your search
            criteria. Please try adjusting your departure and destination,
            travel dates, or other search options.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoMatchesFlight;
