import React from "react";
import { IFlights } from "../../interface/interface";
import config from "../../config/index.json";
import Divider from "@mui/material/Divider";
import DescriptionTotal from "./DescriptionTotal";

interface IProps {
  passengers: any;
  flight: IFlights;
  total: number;
}
const PassengersTotalDetails = ({ passengers, flight, total }: IProps) => {
  return (
    <div className="flex justify-center items-center my-10">
      <div className="flex flex-col bg-gray-300 p-6 rounded-xl w-[60%]">
        <p className="my-3 text-xl">
          <b>DETAILS PASSENGERS</b>
        </p>
        {passengers &&
          passengers.map((res: any, i: number) => {
            const srcString =
              res.title === "Senior Citizens"
                ? "imgSeniorCitizens"
                : `img${res.title}`;
            console.log("STRING: ", srcString);
            if (res.n > 0) {
              return (
                <div key={i} className="py-2">
                  <div className="flex justify-between py-1">
                    <div className=" flex">
                      <p>{res.n}</p>
                      <img
                        className="mx-3"
                        src={
                          config["other"][
                            srcString as keyof typeof config["other"]
                          ]
                        }
                        width={25}
                        height={25}
                        alt={`img_${res.title}`}
                      />
                      <p>{res.title}</p>
                      <p className="ml-3">
                        ($
                        {i === 0
                          ? flight.precio / 2
                          : i === 3
                          ? 0
                          : flight.precio}
                      </p>
                      <p>x</p>
                      <p>{res.n})</p>
                    </div>

                    <p>
                      <b>
                        $
                        {i === 0
                          ? (flight.precio / 2) * res.n
                          : i === 3
                          ? 0
                          : flight.precio * res.n}
                      </b>
                    </p>
                  </div>
                  <Divider className="py-1" />
                </div>
              );
            }
            return;
          })}
        <DescriptionTotal total={total} />
      </div>
    </div>
  );
};

export default PassengersTotalDetails;
