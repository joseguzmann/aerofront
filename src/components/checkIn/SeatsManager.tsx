import React from "react";
import config from "../../config/index.json";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";

interface IProps {
  passengersInfo: any;
  setPassengersInfo: any;
}
const SeatsManager = ({ passengersInfo, setPassengersInfo }: IProps) => {
  console.log(passengersInfo);
  return (
    <div className="my-9 flex items-center">
      <img
        src={config.other.imgSeatFlight}
        width={50}
        height={50}
        alt="SeatFlight"
        className=""
      />
      <p className="font-bold text-xl mr-6">SEATS</p>
      <RadioGroup row defaultValue={1}>
        <FormControlLabel value={1} control={<Radio />} label="Random Seat" />
        <FormControlLabel value={2} control={<Radio />} label="Favorite Seat" />
      </RadioGroup>
    </div>
  );
};

export default SeatsManager;
