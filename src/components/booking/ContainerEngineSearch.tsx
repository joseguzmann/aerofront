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
import PassengersBooking from "./PassengersBooking";
import dayjs from "dayjs";
import { useRouter } from "next/router";
// @ts-ignore
import { getFlightByParams } from "../../lib/firestore/searchEngine.service.js";
import weekday from "dayjs/plugin/weekday";
import duration from "dayjs/plugin/duration";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import { countries } from "../../utils/constants";

interface initialDate {
  date: dayjs.Dayjs | null;
  time: dayjs.Dayjs | null;
}

interface IErrors {
  value: boolean;
  msg?: string;
}

dayjs.extend(weekday);
dayjs.extend(duration);
dayjs.extend(localizedFormat);
dayjs.extend(utc);

const ContainerEngineSearch = () => {
  const router = useRouter();
  const [valueRadio, setValueRadio] = useState("oneWay");
  const [origin, setOrigin] = useState<any>();
  const [destination, setDestination] = useState<any>();
  const [initialDate, setInitialDate] = useState<initialDate>();
  const [finallDate, setFinalDate] = useState<initialDate>();
  const [passengers, setPassengers] = useState<any>();
  const [error, setError] = useState<IErrors>({ value: false });

  const { booking } = config;
  const { sections } = booking;

  const oneWay = sections.items[0];

  const roundedWay = sections.items[1];
  const flexBoxDate =
    valueRadio === oneWay?.value
      ? "flex row px-20 py-5"
      : "flex flex-col px-20 py-5";

  const formatDateTime = (date: initialDate) => {
    if (date !== undefined && date.time !== null) {
      const combinedDataTime = date.date
        ?.set("hour", date.time?.hour())
        .set("minute", date.time?.minute());

      return combinedDataTime?.toDate();
    }
    return;
  };

  const handleSearch = async () => {
    if (origin && destination && initialDate && passengers) {
      const totalSumPassengers = passengers.reduce(
        (total: any, section: any) => total + section.n,
        0
      );

      if (origin.code === destination.code) {
        setError({
          value: true,
          msg: "Please ensure that the destination and origin countries for the flight are not the same.",
        });
        return;
      }

      setError({ value: false });
      let dateInitialAux;
      let dateFinalAux;
      let flightsQuery = null;

      if (valueRadio === oneWay?.value && initialDate) {
        dateInitialAux = formatDateTime(initialDate);
      } else if (initialDate && finallDate) {
        dateInitialAux = formatDateTime(initialDate);
        dateFinalAux = formatDateTime(finallDate);
      } else {
        setError({ value: true, msg: "Please fill the data input" });
        return;
      }

      const searchParams = {
        dateInitial: dateInitialAux,
        dateFinal: dateFinalAux,
        origin,
        destination,
        totalSumPassengers,
      };

      try {
        const resultQuery = await getFlightByParams(searchParams);
        const dateFields = ["fecha_salida", "fecha_regreso"];
        const placeFields = ["origen", "destino"];

        const modifiedResults = resultQuery.map((res: any) => {
          if (res.fecha_salida && res.fecha_regreso) {
            const departureDate = dayjs(res.fecha_salida.seconds * 1000);
            const returnDate = dayjs(res.fecha_regreso.seconds * 1000);
            const duration = dayjs.duration(returnDate.diff(departureDate));
            let durationString = "";

            if (duration.days() > 0) {
              durationString += `${duration.days()}d `;
            }

            durationString += `${duration.hours()}h ${duration.minutes()}m`;
            res.duration = durationString;
          }

          dateFields.forEach((field) => {
            if (res[field] && res[field].seconds) {
              const date = new Date(res[field].seconds * 1000);
              date.setUTCHours(date.getUTCHours());
              res[field] = {
                formattedDate: dayjs(date).format("ddd, D MMMM YYYY"),
                time: dayjs(date).format("HH:mm"),
              };
            }
          });

          placeFields.forEach((field) => {
            const foundCountry = countries.find(
              (country) => country.code === res[field]
            );
            if (foundCountry) {
              res[field] = {
                code: foundCountry.code,
                label: foundCountry.label,
              };
            }
          });

          return res;
        });

        if (modifiedResults.length > 0) {
          flightsQuery = JSON.stringify(modifiedResults);
        }



        router.push({
          pathname: "/flight-search",
          query: {
            flights: flightsQuery,
            passengers: JSON.stringify(passengers),
          },
        });
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setError({
        value: true,
        msg: " Please complete all fields before searching for a flight.",
      });
    }
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
                onChange={(event) => {
                  setError({ value: false });
                  setValueRadio(event.target.value);
                }}
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
              <PassengersBooking setPassengers={setPassengers} />
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
        {error.value && (
          <div>
            <p className="p-3 text-lg text-red-500">{error.msg}</p>
          </div>
        )}

        <div className="flex justify-center">
          {/* <Link href={"/flight-search"}> */}
          <Button
            style={{ backgroundColor: "#ED6C02", color: "white" }}
            variant="contained"
            size="large"
            onClick={handleSearch}
          >
            {sections.items[2]?.title}
          </Button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default ContainerEngineSearch;
