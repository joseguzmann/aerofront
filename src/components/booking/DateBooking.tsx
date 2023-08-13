import React, { useState } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

interface initialDate {
  date: dayjs.Dayjs | null;
  time: dayjs.Dayjs | null;
}
interface Iprops {
  pLabel: any;
  valueRadio: string;
  setInitialDate: React.Dispatch<React.SetStateAction<initialDate | undefined>>;
  initialDateValue: initialDate | undefined;
  setFinalDate: React.Dispatch<React.SetStateAction<initialDate | undefined>>;
  finalDateValue: initialDate | undefined;
}
const DateBooking = ({
  pLabel,
  valueRadio,
  setInitialDate,
  initialDateValue,
  setFinalDate,
  finalDateValue,
}: Iprops) => {
  const [selectedDateFinal, setSelectedDateFinal] =
    useState<dayjs.Dayjs | null>(null);
  const [selectedTimeFinal, setSelectedTimeFinal] =
    useState<dayjs.Dayjs | null>(null);

  if (valueRadio === pLabel.items[0].value) {
    return (
      <div className="mx-20">
        <p className="mr-1 text-lg ">{pLabel.items[0].element4}</p>
        <div className="flex flex-col">
          <div className="my-5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                onChange={(value: dayjs.Dayjs | null) => {
                  if (initialDateValue) {
                    setInitialDate({ ...initialDateValue, date: value });
                  } else {
                    setInitialDate({ date: value, time: null });
                  }
                }}
              />
            </LocalizationProvider>
          </div>
          <div>
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
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex row justify-around">
      <div>
        <p className=" text-lg ">{pLabel.items[0].element4} ¿?</p>
        <div className="flex flex-col">
          <div className="my-5 mx">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                onChange={(value: dayjs.Dayjs | null) => {
                  if (initialDateValue) {
                    setInitialDate({ ...initialDateValue, date: value });
                  } else {
                    setInitialDate({ date: value, time: null });
                  }
                }}
              />
            </LocalizationProvider>
          </div>
          <div className="my-5 mx">
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
          </div>
        </div>
      </div>
      <div>
        <p className=" text-lg ">{pLabel.items[1].element1}</p>
        <div className="flex flex-col">
          <div className="my-5 mx">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                onChange={(value: dayjs.Dayjs | null) => {
                  if (finalDateValue) {
                    setFinalDate({ ...finalDateValue, date: value });
                  } else {
                    setFinalDate({ date: value, time: null });
                  }
                }}
              />
            </LocalizationProvider>
          </div>
          <div className="my-5 mx">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateBooking;
