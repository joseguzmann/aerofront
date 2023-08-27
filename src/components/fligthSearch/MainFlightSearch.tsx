import React, { useContext, useEffect, useState } from "react";
import config from "../../config/index.json";
import CardFligth from "./CardFligth";

// import Image from "next/image";
import Button from "@mui/material/Button";
import { IFlights } from "../../interface/interface";
import FlightContext from "../../contexts/flightContext";
import { useRouter } from "next/router";

import PassengersTotalDetails from "./PassengersTotalDetails";
import NoTaxes from "./NoTaxes";

interface IProps {
  flights?: IFlights[] | null;
  passengers: any;
  isDetails?: boolean;
  flightSelected?: IFlights;
}

const MainFlightSearch = ({
  flights,
  passengers,
  isDetails,
  flightSelected,
}: IProps) => {
  const { desc } = config.search;


  const { setFlight } = useContext(FlightContext);
  const router = useRouter();

  const calculateTotal = (passengers: any[]) => {
    const categories = [
      { key: "senior", priceFactor: 0.5 },
      { key: "adult", priceFactor: 1 },
      { key: "children", priceFactor: 1 },
      // Agregar más categorías según sea necesario
    ];

    let total = 0;

    if (flightSelected) {
      categories.forEach((category, index) => {
        const { priceFactor } = category;
        const categoryPrice = parseFloat(
          (flightSelected.precio * priceFactor).toFixed(2)
        );
        total += categoryPrice * passengers[index]?.n || 0;
      });

      return total;
    }
    return 0;
  };

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (isDetails) {
      const sumTOTAL = calculateTotal(passengers);
      setTotal(parseFloat(sumTOTAL.toFixed(2)));
    }
  }, []);

  const handleProceed = () => {
    if (flightSelected) {
      flightSelected.passengers = passengers;
      setFlight(flightSelected);

      router.push({
        pathname: "login",
        query: {
          flight: JSON.stringify(flightSelected),
        },
      });
    }
  };

  return (
    <div className=" relative flex justify-center items-center mb-20 ">
      <div className=" items-center  w-[75%] ">
        <div className=" bg-gradient-to-r from-[#FFEDB3] to-[#FFFDF5] py-2">
          <p className=" text-[#FF7100] font-bold ml-[15px]">
            {isDetails ? "DETAILS" : desc}
          </p>
        </div>
        {isDetails && flightSelected && (
          <>
            <CardFligth
              isDetails={true}
              key={flightSelected.id}
              flight={flightSelected}
              passengers={passengers}
            />

            <NoTaxes />

            {/* <div className="flex justify-center items-center my-10">
              <div className="flex flex-col bg-gray-300 p-3">
                <p>
                  <b>DETAILS PASSENGERS</b>
                </p>
                {passengers &&
                  passengers.map((res: any, i: number) => {
                    if (res.n > 0) {
                      return (
                        <div className="flex justify-between py-1">
                          <p>
                            {res.n} {res.title} Total:
                          </p>
                          <p>
                            {" "}
                            {i === 0
                              ? (flightSelected.precio / 2) * res.n
                              : i === 3
                              ? 0
                              : flightSelected.precio * res.n}{" "}
                          </p>
                        </div>
                      );
                    }
                    return;
                  })}
              </div>
            </div> */}
            <PassengersTotalDetails
              passengers={passengers}
              flight={flightSelected}
              total={total}
            />
            <div>
              <Button
                style={{ backgroundColor: "#ED6C02", color: "white" }}
                variant="contained"
                size="large"
                onClick={handleProceed}
              >
                PROCEED WITH PAYMENT
              </Button>
            </div>
          </>
        )}
        {!isDetails &&
          flights &&
          flights.map((flight: IFlights) => (
            <CardFligth
              key={flight.id}
              flight={flight}
              passengers={passengers}
              isSearch={true}
            />
          ))}
        {/* <CardFligth />
        <CardFligth /> */}
      </div>
    </div>
  );
};

export default MainFlightSearch;
