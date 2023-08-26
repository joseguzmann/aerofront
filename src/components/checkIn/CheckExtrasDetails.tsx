import React, { useEffect, useState } from "react";
import { IFlights } from "../../interface/interface";
import config from "../../config/index.json";
import Divider from "@mui/material/Divider";

interface IProps {
  passengersInfo: any;
  setExtrastotal: any;
}
const CheckExtrasDetails = ({ passengersInfo, setExtrastotal }: IProps) => {
  const [keyInfoArray, setKeyInfoArray] = useState<any[]>();

  useEffect(() => {
    setKeyInfoArray(Object.keys(passengersInfo));
  }, [passengersInfo]);

  useEffect(() => {
    const newExtrastotal = keyInfoArray?.reduce((total, res) => {
      const elementArray = passengersInfo[res];
      return (
        total +
        elementArray.reduce((acc: any, elemntRes: any) => {
          let aditionalTotal = elemntRes.backpack * 10;
          if (elemntRes.favoriteSeat) {
            aditionalTotal += 12;
          }
          return acc + aditionalTotal;
        }, 0)
      );
    }, 0);

    setExtrastotal(newExtrastotal);
  }, [passengersInfo, keyInfoArray]);

  return (
    <div className="flex justify-center items-center my-10">
      <div className="flex flex-col bg-gray-300 p-6 rounded-xl w-[60%]">
        <p className="my-3 text-xl">
          <b>ADITIONAL CHARGES</b>
        </p>

        {keyInfoArray &&
          keyInfoArray.map((res, i) => {
            const srcString =
              res === "Senior Citizens" ? "imgSeniorCitizens" : `img${res}`;

            const elementArray = passengersInfo[res];
            return elementArray.map((elemntRes: any, index: number) => {
              let aditionalTotal = 0;
              aditionalTotal += elemntRes.backpack * 10;
              if (elemntRes.favoriteSeat) {
                aditionalTotal += 12;
              }

              return (
                <div key={i + index} className="py-2">
                  <div className="flex justify-between py-1">
                    <div className=" flex">
                      <img
                        className="mx-3"
                        src={
                          config["other"][
                            srcString as keyof typeof config["other"]
                          ]
                          // config.other.imgSeniorCitizens
                        }
                        width={25}
                        height={25}
                        alt={`img_${res}`}
                      />
                      <img
                        className="mx-3"
                        src={config.other.svgBackpack}
                        width={25}
                        height={25}
                        alt={`img_${res}_backpack`}
                      />
                      <p>
                        {elemntRes.backpack} (${elemntRes.backpack * 10})
                      </p>
                      {elemntRes.favoriteSeat && (
                        <>
                          <img
                            className="mx-3"
                            src={config.other.imgSeatFlight}
                            width={25}
                            height={25}
                            alt={`img_${res}_seatFlight`}
                          />
                          <p>Favorite seat (${12})</p>
                        </>
                      )}
                    </div>
                    <div>
                      <p>${aditionalTotal}</p>
                    </div>
                  </div>
                  <Divider className="py-1" />
                </div>
              );
            });
          })}
      </div>
    </div>
  );
};

export default CheckExtrasDetails;
