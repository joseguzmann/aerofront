import React, { useEffect, useState } from "react";
import CardFligth from "./CardFligth";
import DescriptionTotal from "./DescriptionTotal";
import PassengersTotalDetails from "./PassengersTotalDetails";

interface IProps {
  flightsRounded: any;
  passengers: any;
}

const FlightDetailsRounded = ({ flightsRounded, passengers }: IProps) => {
  const [total, setTotal] = useState<number>(0);

  const calculateTotal = (passengers: any[]) => {
    const categories = [
      { key: "senior", priceFactor: 0.5 },
      { key: "adult", priceFactor: 1 },
      { key: "children", priceFactor: 1 },
      // Agregar más categorías según sea necesario
    ];

    let total = 0;

    if (flightsRounded) {
      categories.forEach((category, index) => {
        const { priceFactor } = category;
        for (const flights in flightsRounded) {
          if (Object.prototype.hasOwnProperty.call(flightsRounded, flights)) {
            const element = flightsRounded[flights];
            console.log("ELEMENT: ");
            const categoryPrice = element.precio * priceFactor;
            total += categoryPrice * passengers[index]?.n || 0;
          }
        }
      });

      return total;
    }
    return 0;
  };

  useEffect(() => {
    const sumTOTAL = calculateTotal(passengers);
    console.log("SUM TOTAL: ", sumTOTAL);
    setTotal(sumTOTAL);
  }, []);

  return (
    <div className=" relative flex justify-center items-center mb-20 ">
      <div className=" items-center  w-[75%] ">
        <div className=" bg-gradient-to-r from-[#FFEDB3] to-[#FFFDF5] py-2">
          <p className=" text-[#FF7100] font-bold ml-[15px]">
            {/* {isDetails ? "DETALLE" : desc} */} FLIGHT ORIGIN
          </p>
        </div>
        <CardFligth
          isDetails={true}
          key={flightsRounded.flightOrigin.id}
          flight={flightsRounded.flightOrigin}
        />
        <div className=" bg-gradient-to-r from-[#FFEDB3] to-[#FFFDF5] py-2">
          <p className=" text-[#FF7100] font-bold ml-[15px]">
            {/* {isDetails ? "DETALLE" : desc} */} FLIGHT DESTINY
          </p>
        </div>
        <CardFligth
          isDetails={true}
          key={flightsRounded.flightDestiny.id}
          flight={flightsRounded.flightDestiny}
        />

        <DescriptionTotal total={total} />
        <PassengersTotalDetails
          passengers={passengers}
          flight={flightsRounded.flightOrigin}
        />
      </div>
    </div>
  );
};

export default FlightDetailsRounded;
