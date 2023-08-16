import React, { useEffect, useState } from "react";
import config from "../../config/index.json";
import CardFligth from "./CardFligth";
import Image from "next/image";
import Button from "@mui/material/Button";

interface FlightsProps {
  disponibles: number;
  destino: string;
  fecha_regreso: any;
  fecha_salida: any;
  id: number;
  origen: string;
  duration: string;
  precio: number;
}
interface IProps {
  flights: FlightsProps[] | any;
  passengers: any;
  isDetails?: boolean;
}

const MainFlightSearch = ({ flights, passengers, isDetails }: IProps) => {
  const { desc } = config.search;
  const { flight_details } = config;

  const calculateTotal = (flights: any, passengers: any[]) => {
    const categories = [
      { key: "senior", priceFactor: 0.5 },
      { key: "adult", priceFactor: 1 },
      { key: "children", priceFactor: 1 },
      // Agregar más categorías según sea necesario
    ];

    let total = 0;

    categories.forEach((category, index) => {
      const {  priceFactor } = category;
      const categoryPrice = flights.precio * priceFactor;
      total += categoryPrice * passengers[index]?.n || 0;
    });

    return total;
  };

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    console.log("Passengers", passengers);
    if (isDetails) {
      const sumTOTAL = calculateTotal(flights, passengers);
      setTotal(sumTOTAL);
    }
  }, []);
  return (
    <div className=" relative flex justify-center items-center mb-20 ">
      <div className=" items-center  w-[75%] ">
        <div className=" bg-gradient-to-r from-[#FFEDB3] to-[#FFFDF5] py-2">
          <p className=" text-[#FF7100] font-bold ml-[15px]">
            {isDetails ? "DETALLE" : desc}
          </p>
        </div>
        {isDetails ? (
          <>
            <CardFligth
              key={flights.id}
              flight={flights}
              passengers={passengers}
            />
            <div className="relative flex justify-center items-center my-10 ">
              <div className=" w-[70%] flex row justify-around">
                <div className="bg-[#EDF7ED] p-2 flex row  w-[36%] justify-around ">
                  <Image
                    src={config.other.svgCheck}
                    width={25}
                    height={25}
                    alt="SVG Button"
                    // className="hover:opacity-75 transition-opacity"
                  />

                  <div>
                    <p className="font-bold">{flight_details.label1}</p>
                    <p className="font-bold">{flight_details.label2}</p>
                  </div>
                </div>
                <div className="flex flex-col p-2 ">
                  <p className="font-bold text-xl">
                    {flight_details.labelTotal}
                  </p>
                  <p className="text-xl">$ {total} USD</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center my-10">
              <div className="flex flex-col bg-gray-300 p-3">
                <p>
                  <b>DETAILS PASSENGERS</b>
                </p>
                {passengers.map((res: any, i: number) => {
                  if (res.n > 0) {
                    return (
                      <div className="flex justify-between py-1">
                        <p>{res.title} Total:</p>
                        <p>
                          {" "}
                          {i === 0
                            ? (flights.precio / 2) * res.n
                            : i === 3
                            ? 0
                            : flights.precio * res.n}{" "}
                        </p>
                      </div>
                    );
                  }
                  return;
                })}
              </div>
            </div>
            <div>
              <Button
                style={{ backgroundColor: "#ED6C02", color: "white" }}
                variant="contained"
                size="large"
                // onClick={handleSearch}
              >
                CONTINUAR EL PAGO
              </Button>
            </div>
          </>
        ) : (
          flights.map((flight: FlightsProps) => (
            <CardFligth
              key={flight.id}
              flight={flight}
              passengers={passengers}
            />
          ))
        )}

        {/* <CardFligth />
        <CardFligth /> */}
      </div>
    </div>
  );
};

export default MainFlightSearch;
