import React, { useEffect, useState } from "react";
import config from "../../config/index.json";
import CardFligth from "./CardFligth";
import Image from "next/image";
import Button from "@mui/material/Button";

interface FlightsProps {
  asientos: any;
  destino: string;
  fecha_regreso: any;
  fecha_salida: any;
  id: number;
  origen: string;
  duration: string;
}
interface IProps {
  flights: FlightsProps[] | any;
  passengers: any;
  isDetails?: boolean;
}

const MainFlightSearch = ({ flights, passengers, isDetails }: IProps) => {
  const { desc } = config.search;
  const { flight_details } = config;
  // const [total, setTotal] = useState<number>(0);
  // let sumSenior = 0;
  // let sumAdult = 0;
  // let sumChildren = 0;
  // let sumInfant = 0;
  // let sumTOTAL = 0;
  // useEffect(() => {
  //   if (isDetails) {
  //     let sumSenior = 0;
  //     let sumAdult = 0;
  //     let sumChildren = 0;
  //     let sumInfant = 0;
  //     let sumTOTAL = 0;
  //     for (let index = 0; index < passengers.length; index++) {
  //       switch (index) {
  //         case 0:
  //           sumSenior =
  //             (flights.asientos.turista.precio / 2) * passengers[index].n;
  //           break;
  //         case 1:
  //           sumAdult = flights.asientos.turista.precio * passengers[index].n;
  //           break;
  //         case 2:
  //           sumChildren = flights.asientos.turista.precio * passengers[index].n;
  //           break;

  //         default:
  //           break;
  //       }
  //     }

  //     sumTOTAL = sumSenior + sumAdult + sumChildren;
  //     setTotal(sumTOTAL);
  //     console.log("VALOR TOTAL", sumTOTAL);
  //   }
  // }, []);

  const calculateTotal = (flights: any, passengers: any[]) => {
    const categories = [
      { key: "senior", priceFactor: 0.5 },
      { key: "adult", priceFactor: 1 },
      { key: "children", priceFactor: 1 },
      // Agregar más categorías según sea necesario
    ];

    let total = 0;

    categories.forEach((category, index) => {
      const { key, priceFactor } = category;
      const categoryPrice = flights.asientos.turista.precio * priceFactor;
      total += categoryPrice * passengers[index]?.n || 0;
    });

    return total;
  };

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (isDetails) {
      const sumTOTAL = calculateTotal(flights, passengers);
      setTotal(sumTOTAL);
      console.log("VALOR TOTAL", sumTOTAL);
    }
  }, []);
  return (
    <div className=" relative flex justify-center items-center ">
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
            <div className="relative flex justify-center items-center ">
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
