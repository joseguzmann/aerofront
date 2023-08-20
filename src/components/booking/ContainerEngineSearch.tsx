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
import { getFlightByParams } from "../../lib/firestore/searchEngine.service";
import weekday from "dayjs/plugin/weekday";
import duration from "dayjs/plugin/duration";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import { countries } from "../../utils/constants";

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
  const [initialDate, setInitialDate] = useState<dayjs.Dayjs>();
  const [finalDate, setFinalDate] = useState<dayjs.Dayjs>();
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

  const formatDateTime = (date: dayjs.Dayjs) => {
    if (date !== undefined) {
      return date.toDate();
    }
    return;
  };

  const handleSearch = async () => {
    // Validar que se hayan proporcionado todos los datos necesarios
    if (!origin || !destination || !initialDate || !passengers) {
      setError({
        value: true,
        msg: "Please complete all fields before searching for a flight.",
      });
      return;
    }

    // Calcular el total de pasajeros
    const totalSumPassengers = passengers.reduce(
      (total: any, section: any) => total + section.n,
      0
    );

    // Validar que el origen y el destino no sean iguales
    if (origin.code === destination.code) {
      setError({
        value: true,
        msg: "Please ensure that the destination and origin countries for the flight are not the same.",
      });
      return;
    }

    setError({ value: false });

    // Inicializar variables
    let dateInitialAux,
      dateFinalAux,
      flightsQuery = null,
      isRounded = null;

    // Verificar el tipo de búsqueda (one-way o round-trip)
    if (valueRadio === oneWay?.value) {
      dateInitialAux = formatDateTime(initialDate);
    } else if (initialDate && finalDate) {
      dateInitialAux = formatDateTime(initialDate);
      dateFinalAux = formatDateTime(finalDate);
    } else {
      setError({ value: true, msg: "Please fill the date input" });
      return;
    }

    const searchParams = {
      dateInitial: dateInitialAux,
      dateFinal: dateFinalAux,
      origin,
      destination,
      totalSumPassengers,
      type: valueRadio,
    };

    try {
      const resultQuery = await getFlightByParams(searchParams);
      const dateFields = ["fecha_salida"];
      const placeFields = ["origen", "destino"];

      const processResults = (results: any) => {
        return results.map((res: any) => {
          dateFields.forEach((field) => {
            if (res[field] && res[field].seconds) {
              const date = new Date(res[field].seconds * 1000);
              date.setUTCHours(date.getUTCHours());
              res[field] = {
                formattedDate: dayjs(date).format("ddd, D MMMM YYYY"),
                time: dayjs(date).format("HH:mm"),
              };

              // Extraer horas y minutos de la duración
              if (res.duracion) {
                const [hoursStr, minutesStr] = res.duracion.split(":");
                const hours = parseInt(hoursStr);
                const minutes = parseInt(minutesStr);

                // Calcular la fecha de regreso agregando horas y minutos a la fecha de salida
                const returnDate = new Date(date);
                returnDate.setUTCHours(returnDate.getUTCHours() + hours);
                returnDate.setUTCMinutes(returnDate.getUTCMinutes() + minutes);

                res.fecha_regreso = {
                  formattedDate: dayjs(returnDate).format("ddd, D MMMM YYYY"),
                  time: dayjs(returnDate).format("HH:mm"),
                };
              }
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
      };

      if (valueRadio === oneWay?.value) {
        // Procesar resultados de búsqueda de vuelo one-way
        const modifiedResults = processResults(resultQuery);
        if (modifiedResults.length > 0) {
          flightsQuery = JSON.stringify(modifiedResults);
        }
      } else {
        // Procesar resultados de búsqueda de vuelo round-trip
        const { flightDestiny, flightOrigin } = resultQuery;
        const modifiedResultsOrigin = processResults(flightOrigin);
        const modifiedResultsDestiny = processResults(flightDestiny);

        if (
          modifiedResultsOrigin.length > 0 &&
          modifiedResultsDestiny.length > 0
        ) {
          flightsQuery = JSON.stringify({
            flightOrigin: modifiedResultsOrigin,
            flightDestiny: modifiedResultsDestiny,
          });
          isRounded = true;
        }
      }

      // Redireccionar a la página de resultados de búsqueda
      router.push({
        pathname: "/flight-search",
        query: {
          flights: flightsQuery,
          passengers: JSON.stringify(passengers),
          isRounded: isRounded,
        },
      });
    } catch (error) {
      console.error("Error:", error);
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
            finalDateValue={finalDate}
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
