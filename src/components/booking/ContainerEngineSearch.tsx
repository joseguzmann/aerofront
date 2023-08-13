import React, { useState } from "react";
import config from "../../config/index.json";
import Divider from "../other/Divider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import AutoCompleteBooking from "./AutoCompleteBooking";
import DateBooking from "./DateBooking";
import Button from "@mui/material/Button";
import Link from "next/link";
import PassengersBooking from "./PassengersBooking";
import dayjs from "dayjs";
interface initialDate {
  date: dayjs.Dayjs | null;
  time: dayjs.Dayjs | null;
}

const ContainerEngineSearch = () => {
  const [valueRadio, setValueRadio] = useState("oneWay");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [initialDate, setInitialDate] = useState<initialDate>();
  const [finallDate, setFinalDate] = useState<initialDate>();
  const [passengerNumber, setPassengerNumber] = useState<string>("");

  const { booking } = config;
  const { sections } = booking;

  const oneWay = sections.items[0];

  const roundedWay = sections.items[1];
  const flexBoxDate =
    valueRadio === oneWay?.value
      ? "flex row px-20 py-5"
      : "flex flex-col px-20 py-5";

  const formatDateTime = () => {
    if (initialDate !== undefined && initialDate.time !== null) {
      const combinedDataTime = initialDate.date
        ?.set("hour", initialDate.time?.hour())
        .set("minute", initialDate.time?.minute());
      return combinedDataTime;
    }
    return;
  };

  //Format data to send to services to search
  const handleSearch = () => {
    let dateAux = formatDateTime();
    let fromAux = origin;
    let toAux = destination;
    let numberAux = passengerNumber;

    const searchParams = {
      date: dateAux,
      origin: fromAux,
      destination: toAux,
      passenger: numberAux,
    };

    console.log("PArams", searchParams);
  };

  return (
    <div className="flex justify-center items-center py-20">
      <div className="relative border-black border-2 rounded-lg p-6 shadow-lg  bg-white w-[75%]">
        <div className=" flex row ">
          <p className="mr-5">{sections.title}</p>
          <p>{sections.title}</p>
        </div>
        <Divider />
        <div className={flexBoxDate}>
          <div className="relative ">
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(event) => setValueRadio(event.target.value)}
                value={valueRadio}
              >
                <FormControlLabel
                  value={oneWay?.value}
                  control={<Radio />}
                  label={oneWay?.title}
                />
                <FormControlLabel
                  value={roundedWay?.value}
                  control={<Radio />}
                  label={roundedWay?.title}
                />
              </RadioGroup>
            </FormControl>
            <div
              className={
                valueRadio !== oneWay?.value ? "flex row justify-around " : ""
              }
            >
              <AutoCompleteBooking
                origin={setOrigin}
                destination={setDestination}
              />
              <PassengersBooking setPassengerNumber={setPassengerNumber} />
            </div>
          </div>
          <DateBooking
            pLabel={sections}
            valueRadio={valueRadio}
            setInitialDate={setInitialDate}
            initialDateValue={initialDate}
            setFinalDate={setFinalDate}
            finalDateValue={finallDate}
          />
        </div>

        <div className="flex justify-center">
          <Link href={"/flight-search"}>
            <Button
              style={{ backgroundColor: "#ED6C02", color: "white" }}
              variant="contained"
              size="large"
              onClick={handleSearch}
            >
              {sections.items[2]?.title}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContainerEngineSearch;
