import React, { useState, useEffect } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import dayjs from "dayjs";

interface Iprops {
  pLabel: any;
  valueRadio: string;
  setInitialDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs | undefined>>;
  initialDateValue: dayjs.Dayjs | undefined;
  setFinalDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs | undefined>>;
  finalDateValue: dayjs.Dayjs | undefined;
}
const DateBooking = ({
  pLabel,
  valueRadio,
  setInitialDate,
  setFinalDate,
}: Iprops) => {
  const [dateInitialRound, setDateInitialRound] = useState<
    dayjs.Dayjs | undefined
  >();
  const [dateFinalRound, setDateFinalRound] = useState<
    dayjs.Dayjs | undefined
  >();
  const [dateInitial, setDateInitial] = useState<dayjs.Dayjs | undefined>();

  useEffect(() => {}, [dateFinalRound, dateInitialRound]);

  if (valueRadio === pLabel.items[0].value) {
    return (
      <div className="mx-20">
        <p className="mr-1 text-lg ">{pLabel.items[0].element4}</p>
        <div className="flex flex-col">
          <div className="my-5 flex row items-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                key={dateInitial ? dateInitial.toString() : "default"}
                defaultValue={dateInitial || undefined}
                minDate={dateInitial ? dateInitial : dayjs()}
                onChange={(value: dayjs.Dayjs | any) => {
                  setDateInitial(value);
                  setInitialDate(value);
                  // if (initialDateValue) {
                  //   setInitialDate({ ...initialDateValue, date: value });
                  // } else {
                  //   setInitialDate({ date: value, time: null });
                  // }
                }}
              />
            </LocalizationProvider>
            {dateInitial && (
              <button
                className="mx-3 w-[30px] h-[30px]"
                onClick={() => {
                  setDateInitial(undefined);
                }}
              >
                <p className="font-bold text-red-500">X</p>
              </button>
            )}
          </div>
          {/* <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                onChange={(value: dayjs.Dayjs | null) => {
                  console.log("TIME: ", value);
                  if (initialDateValue) {
                    setInitialDate({ ...initialDateValue, time: value });
                  } else {
                    setInitialDate({ date: null, time: value });
                  }
                }}
              />
            </LocalizationProvider>
          </div> */}
        </div>
      </div>
    );
  }
  return (
    <div className="flex row justify-around">
      <div>
        <p className=" text-lg ">{pLabel.items[0].element4}</p>
        <div className="flex flex-col">
          <div className="my-5 mx  flex items-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                key={dateInitialRound ? dateInitialRound.toString() : "default"}
                defaultValue={dateInitialRound || undefined}
                minDate={dateInitialRound ? dateInitialRound : dayjs()}
                maxDate={dateFinalRound}
                onChange={(value: dayjs.Dayjs | any) => {
                  setDateInitialRound(value);
                  setInitialDate(value);
                  // if (initialDateValue) {
                  //   setInitialDate({ ...initialDateValue, date: value });
                  // } else {
                  //   setInitialDate({ date: value, time: null });
                  // }
                }}
              />
            </LocalizationProvider>

            {dateInitialRound && (
              <button
                className="mx-3 w-[30px] h-[30px]"
                onClick={() => {
                  setDateInitialRound(undefined);
                }}
              >
                <p className="font-bold text-red-500">X</p>
              </button>
            )}
          </div>
          {/* <div className="my-5 mx">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                onChange={(value: dayjs.Dayjs | null) => {
                  if (initialDateValue) {
                    setInitialDate({ ...initialDateValue, time: value });
                  } else {
                    setInitialDate({ date: null, time: value });
                  }
                }}
              />
            </LocalizationProvider>
          </div> */}
        </div>
      </div>
      <div>
        <p className=" text-lg ">{pLabel.items[1].element1}</p>
        <div className="flex flex-col">
          <div className="my-5 mx flex items-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                key={dateFinalRound ? dateFinalRound.toString() : "default"}
                defaultValue={dateFinalRound || undefined}
                minDate={dateInitialRound ? dateInitialRound : dayjs()}
                maxDate={dateFinalRound}
                onChange={(value: dayjs.Dayjs | any) => {
                  setDateFinalRound(value);
                  setFinalDate(value);
                  // if (finalDateValue) {
                  //   setFinalDate({ ...finalDateValue, date: value });
                  // } else {
                  //   setFinalDate({ date: value, time: null });
                  // }
                }}
              />
            </LocalizationProvider>
            {dateFinalRound && (
              <button
                className="mx-3 w-[30px] h-[30px]"
                onClick={() => {
                  setDateFinalRound(undefined);
                }}
              >
                <p className="font-bold text-red-500">X</p>
              </button>
            )}
          </div>
          {/* <div className="my-5 mx">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                onChange={(value: dayjs.Dayjs | null) => {
                  if (finalDateValue) {
                    setFinalDate({ ...finalDateValue, time: value });
                  } else {
                    setFinalDate({ date: null, time: value });
                  }
                }}
              />
            </LocalizationProvider>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DateBooking;
