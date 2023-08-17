import React from "react";
// import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface DiscoverData {
  title: string;
  desc: string;
  img: string;
}
interface IProps {
  discover: DiscoverData | undefined;
}

const DiscoverBooking = ({ discover }: IProps) => {
  if (discover !== undefined) {
    return (
      <div className="flex flex-col border rounded-lg border-gray-300 border-b-4 border-opacity-75 w-[30%] h-[470px]">
        <img src={discover.img} width={464} height={229} alt="" />
        <div className="mx-10">
          <p className="text-3xl py-5">{discover.title}</p>
          <p>{discover.desc}</p>
        </div>
        <div className="flex-grow"></div>{" "}
        {/* Espacio flexible para empujar el siguiente div hacia abajo */}
        <div className="self-end p-4">
          <ArrowForwardIcon />
        </div>
      </div>
    );
  }
  return <></>;
};

export default DiscoverBooking;
