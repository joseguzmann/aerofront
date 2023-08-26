import React from "react";
import { IFlights } from "../../interface/interface";
import config from "../../config/index.json";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

interface IProps {
  flight: IFlights;
  handleChooseFlight?: () => void;
  setRadioSelected?: any;
}

export const FlightSearchDescription = ({
  flight,
  handleChooseFlight,
}: IProps) => {
  return (
    <div
      onClick={handleChooseFlight}
      className="my-[25px] flex row  w-[100%] py-5 cursor-pointer"
    >
      <div className="bg-[#FF7100] w-10 flex row p-5 items-center"></div>
      <div className="flex row px-[11rem] justify-between py-[15px] bg-[#FFF8E1] w-[100%]">
        <div className="flex row  ">
          <div className="flex flex-col mx-9">
            <p>{flight.fecha_salida.formattedDate}</p>
            <p> {flight.origen.label}</p>
            <p>{flight.origen.code}</p>

            <p className="text-4xl font-bold">{flight.fecha_salida.time}</p>
          </div>
          <div className="flex flex-col justify-center items-center ">
            <p>{flight.duracion}</p>
            <img src={config.other.imgArrow} width={310} height={28} alt="" />
          </div>
          <div className="flex flex-col mx-9">
            <p>{flight.fecha_regreso.formattedDate}</p>
            <p> {flight.destino.label}</p>
            <p>{flight.destino.code}</p>

            <p className="text-4xl font-bold">{flight.fecha_regreso.time}</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p className="text-2xl  font-bold text-[#FF7100] underline">
            $ {flight.precio}
          </p>
          <p className=" py-2">
            Available: <b>{flight.disponibles}</b>
          </p>
        </div>
      </div>
    </div>
  );
};
export const FlightSearchRounded = ({ flight, setRadioSelected }: IProps) => {
  return (
    <div className="my-[25px] flex row  w-[100%] py-5">
      <div className="bg-[#FF7100] w-10 flex row p-5 items-center"></div>
      <div className="flex row px-6  justify-around py-[15px] bg-[#FFF8E1] w-[100%]">
        <div className="flex ">
          <FormControlLabel
            onChange={(event: any) => {
            
              setRadioSelected(event.target.value);
            }}
            value={flight.id}
            control={<Radio />}
            label="Select"
          />
        </div>
        <div className="flex row   ">
          <div className="flex flex-col mx-9">
            <p>{flight.fecha_salida.formattedDate}</p>
            <p> {flight.origen.label}</p>
            <p>{flight.origen.code}</p>

            <p className="text-4xl font-bold">{flight.fecha_salida.time}</p>
          </div>
          <div className="flex flex-col justify-center items-center ">
            <p>{flight.duracion}</p>
            <img src={config.other.imgArrow} width={310} height={28} alt="" />
          </div>
          <div className="flex flex-col mx-9">
            <p>{flight.fecha_regreso.formattedDate}</p>
            <p> {flight.destino.label}</p>
            <p>{flight.destino.code}</p>

            <p className="text-4xl font-bold">{flight.fecha_regreso.time}</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center  ">
          <p className="text-2xl  font-bold text-[#FF7100] underline">
            $ {flight.precio}
          </p>
          <p className=" py-2">
            Available: <b>{flight.disponibles}</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export const FlightDetails = ({ flight }: IProps) => {
  return (
    <div className="my-[25px] flex row  w-[100%] py-5 ">
      <div className="bg-[#FF7100] w-10 flex row p-5 items-center"></div>
      <div className="flex row px-[11rem] justify-between py-[15px] bg-[#FFF8E1] w-[100%]">
        <div className="flex row  ">
          <div className="flex flex-col mx-9">
            <p>{flight.fecha_salida.formattedDate}</p>
            <p> {flight.origen.label}</p>
            <p>{flight.origen.code}</p>

            <p className="text-4xl font-bold">{flight.fecha_salida.time}</p>
          </div>
          <div className="flex flex-col justify-center items-center ">
            <p>{flight.duracion}</p>
            <img src={config.other.imgArrow} width={310} height={28} alt="" />
          </div>
          <div className="flex flex-col mx-9">
            <p>{flight.fecha_regreso.formattedDate}</p>
            <p> {flight.destino.label}</p>
            <p>{flight.destino.code}</p>

            <p className="text-4xl font-bold">{flight.fecha_regreso.time}</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p className="text-2xl  font-bold text-[#FF7100] underline">
            $ {flight.precio}
          </p>
          <p className=" py-2">
            Available: <b>{flight.disponibles}</b>
          </p>
        </div>
      </div>
    </div>
  );
};
