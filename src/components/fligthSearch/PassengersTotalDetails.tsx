import React, { useEffect } from "react";
import { IFlights } from "../../interface/interface";
import config from "../../config/index.json";
import Divider from "@mui/material/Divider";
import DescriptionTotal from "./DescriptionTotal";

interface IProps {
  passengers: any;
  flight: IFlights;
  total?: number;
  isCheckIn?: boolean;
  setTicketTotal?: any;
}
const PassengersTotalDetails = ({
  passengers,
  flight,
  isCheckIn,
  setTicketTotal,
}: IProps) => {
  const calculateTotal = () => {
    const categories = [
      { key: "senior", priceFactor: 0.5 },
      { key: "adult", priceFactor: 1 },
      { key: "children", priceFactor: 1 },
      // Agregar más categorías según sea necesario
    ];

    let total = 0;

    if (flight) {
      categories.forEach((category, index) => {
        const { priceFactor } = category;
        const categoryPrice = parseFloat(
          (flight.precio * priceFactor).toFixed(2)
        );
        total += categoryPrice * passengers[index]?.n || 0;
      });

      return total;
    }
    return 0;
  };
  useEffect(() => {
    
    if (setTicketTotal) {
      setTicketTotal(calculateTotal());
    }
  }, []);

  return (
    <div className="flex justify-center items-center my-10">
      <div className="flex flex-col bg-gray-300 p-6 rounded-xl w-[60%]">
        <p className="my-3 text-xl">
          <b>DETAILS PASSENGERS</b>
        </p>
        {passengers &&
          passengers.map((res: any, i: number) => {
            const seniorPrice = flight.precio / 2;
            const srcString =
              res.title === "Senior Citizens"
                ? "imgSeniorCitizens"
                : `img${res.title}`;

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
                      <p>
                        {i === 0 ? (
                          <div className="flex">
                            <p>{res.title}</p>
                            <p className=" ml-1 text-red-400 font-bold text-[13px]">
                              50% Discount
                            </p>
                          </div>
                        ) : i === 3 ? (
                          <div className="flex">
                            <p>{res.title}</p>
                            <p className=" ml-1 text-red-400 font-bold text-[13px]">
                              100% Discount
                            </p>
                          </div>
                        ) : (
                          res.title
                        )}
                      </p>
                      <p className="ml-3">
                        ($
                        {i === 0
                          ? parseFloat(seniorPrice.toFixed(2))
                          : i === 3
                          ? 0
                          : flight.precio}
                      </p>
                      <p className="px-1">x</p>
                      <p>{res.n})</p>
                    </div>

                    <p>
                      <b>
                        $
                        {i === 0
                          ? (
                              parseFloat(seniorPrice.toFixed(2)) * res.n
                            ).toFixed(2)
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
        {!isCheckIn && <DescriptionTotal total={calculateTotal()} />}
      </div>
    </div>
  );
};

export default PassengersTotalDetails;
