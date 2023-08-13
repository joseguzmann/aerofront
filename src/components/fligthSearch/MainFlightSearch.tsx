import React from "react";
import config from "../../config/index.json";
import CardFligth from "./CardFligth";

interface FlightsProps {
  asientos: any;
  destino: string;
  fecha_regreso: any;
  fecha_salida: any;
  id: number;
  origen: string;
}
interface IProps {
  flights: FlightsProps[] | any;
  passengers: any;
  isDetails?: boolean;
}

const MainFlightSearch = ({ flights, passengers, isDetails }: IProps) => {
  const { desc } = config.search;
  console.log("FLIGHTS MAIN FLIGH", flights);

  return (
    <div className=" relative flex justify-center items-center ">
      <div className=" items-center  w-[75%] ">
        <div className=" bg-gradient-to-r from-[#FFEDB3] to-[#FFFDF5] py-2">
          <p className=" text-[#FF7100] font-bold ml-[15px]">
            {isDetails ? "DETALLE" : desc}
          </p>
        </div>
        {isDetails ? (
          <CardFligth
            key={flights.id}
            flight={flights}
            passengers={passengers}
          />
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
