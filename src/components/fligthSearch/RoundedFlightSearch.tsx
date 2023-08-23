import React, { useEffect, useState } from "react";
import CardFligth from "./CardFligth";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

interface IProps {
  FlightsRound: any;
  passengers: any;
}

const RoundedFlightSearch = ({ FlightsRound, passengers }: IProps) => {
  const router = useRouter();
  const [radioOrigin, setRadioOrigin] = useState();
  const [radioDestiny, setRadioDestiny] = useState();

  // useEffect(() => {
  //   console.log("RADIO Origin: ", radioOrigin);
  //   console.log("RADIO DESTINYU: ", radioDestiny);
  // }, [radioOrigin, radioDestiny]);

  const handleContinue = () => {
    console.log("FLIghtrsRound: ", FlightsRound);
    const flightOriginSelected = FlightsRound.flightOrigin.find(
      (flight: any) => flight.id === radioOrigin
    );

    const flightDestinySelected = FlightsRound.flightDestiny.find(
      (flight: any) => flight.id === radioDestiny
    );
    console.log("RADIO Origin: ", flightOriginSelected);
    console.log("RADIO DESTINYU: ", flightDestinySelected);

    // FlightsRound["flightOrigin"] = flightOriginSelected;
    // FlightsRound["flightDestiny"] = flightDestinySelected;
    console.log("NORMAL FlightsRound: ", FlightsRound);

    const updatedFlightsRound = {
      flightOrigin: flightOriginSelected,
      flightDestiny: flightDestinySelected,
    };

    console.log("Updated FlightsRound: ", updatedFlightsRound);

    router.push({
      pathname: "/flight-details",
      query: {
        flightsRounded: JSON.stringify(updatedFlightsRound),
        passengers: JSON.stringify(passengers),
      },
    });
  };
  return (
    <div className=" relative flex flex-col justify-center items-center mb-20 ">
      <div className=" items-center  w-[75%] ">
        <div className=" bg-gradient-to-r from-[#FFEDB3] to-[#FFFDF5] py-2">
          <p className=" text-[#FF7100] font-bold ml-[15px]">FLIGHTS ORIGIN</p>
        </div>
        <FormControl style={{ width: "100%" }}>
          <RadioGroup>
            {FlightsRound.flightOrigin.map((res: any) => (
              <CardFligth
                key={res.id}
                flight={res}
                passengers={passengers}
                isRounded={true}
                setRadioSelect={setRadioOrigin}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
      <div className=" items-center  w-[75%] ">
        <div className=" bg-gradient-to-r from-[#FFEDB3] to-[#FFFDF5] py-2">
          <p className=" text-[#FF7100] font-bold ml-[15px]">FLIGHTS DESTINY</p>
        </div>
        <FormControl style={{ width: "100%" }}>
          <RadioGroup>
            {FlightsRound.flightDestiny.map((res: any) => (
              <CardFligth
                key={res.id}
                flight={res}
                passengers={passengers}
                isRounded={true}
                setRadioSelect={setRadioDestiny}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
      {radioDestiny && radioOrigin && (
        <div className="my-8">
          <Button
            style={{ backgroundColor: "#ED6C02", color: "white" }}
            variant="contained"
            size="large"
            onClick={handleContinue}
          >
            continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default RoundedFlightSearch;
