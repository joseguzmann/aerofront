import React from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

interface Iprops {
  pLabel: any;
  valueRadio: string;
}
const DateBooking = ({ pLabel, valueRadio }: Iprops) => {
  if (valueRadio === pLabel.items[0].value) {
    return (
      <div className="mx-20">
        <p className="mr-1 text-lg ">{pLabel.items[0].element4}</p>
        <div className="flex flex-col">
          <div className="my-5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker />
            </LocalizationProvider>
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker />
            </LocalizationProvider>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex row justify-around">
      <div>
        <p className=" text-lg ">{pLabel.items[0].element4}</p>
        <div className="flex flex-col">
          <div className="my-5 mx">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker />
            </LocalizationProvider>
          </div>
          <div className="my-5 mx">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker />
            </LocalizationProvider>
          </div>
        </div>
      </div>
      <div>
        <p className=" text-lg ">{pLabel.items[1].element1}</p>
        <div className="flex flex-col">
          <div className="my-5 mx">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker />
            </LocalizationProvider>
          </div>
          <div className="my-5 mx">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker />
            </LocalizationProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateBooking;
