import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
// import Image from "next/image";
import config from "../../config/index.json";

const { passengers } = config.booking;

export interface SimpleDialogProps {
  open: boolean;
  selectedValue?: string;
  onClose: (value: any, sum: any) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const [sectionsV, setSectionsV] = useState(passengers.sections);
  const [totalSum, setTotalSum] = useState(1);

  useEffect(() => {
    setTotalSum(sectionsV.reduce((total, section) => total + section.n, 0));
  }, [sectionsV]);

  const { onClose, open } = props;

  const handleIncrement = (index: any) => {
    const updatedSections: any = [...sectionsV];
    updatedSections[index].n += 1;
    setSectionsV(updatedSections);
  };
  const handleDecrement = (index: any) => {
    const updatedSections: any = [...sectionsV];
    updatedSections[index].n -= 1;
    setSectionsV(updatedSections);
  };

  const handleClose = () => {
    const totalSum = sectionsV.reduce((total, section) => total + section.n, 0);

    onClose(sectionsV, totalSum);
  };

  return (
    <Dialog
      // onClose={handleClose}
      open={open}
    >
      <div className="px-9 py-4">
        {sectionsV.map((passenger, i) => (
          <div className="pt-5" key={passenger.title}>
            <div className="flex row ">
              <div className=" w-[190px]">
                <p className="font-bold text-xl">{passenger.title}</p>
                <p>{passenger.desc}</p>
              </div>
              <div className="flex row items-center w-[150px] justify-around">
                <button
                  // disabled={totalSum === 9 ? true : false}
                  className="w-[30px] h-[30px]"
                  onClick={() => {
                    if (passenger.n > 0) handleDecrement(i);
                  }}
                >
                  <img
                    src={config.other.svgLess}
                    width={30}
                    height={30}
                    alt="SVG Button"
                    className="hover:opacity-75 transition-opacity"
                  />
                </button>

                <p className="text-xl">{passenger.n}</p>
                <button
                  disabled={totalSum === 9 ? true : false}
                  className="w-[40px] h-[40px]"
                  onClick={() => {
                    handleIncrement(i);
                  }}
                >
                  <img
                    src={config.other.svgPlus}
                    width={50}
                    height={50}
                    alt="SVG Button"
                    className="hover:opacity-75 transition-opacity"
                  />
                </button>
              </div>
            </div>
            <div>
              <Divider />
            </div>
          </div>
        ))}
        <div className=" flex items-center justify-center my-5">
          {totalSum > 0 && (
            <Button
              disabled={totalSum === 9 ? true : false}
              style={{
                backgroundColor: "#ED6C02",
                color: "white",
              }}
              variant="contained"
              size="large"
              className="mt-9 mb-4"
              onClick={handleClose}
            >
              {passengers.continue}
            </Button>
          )}
        </div>
        {totalSum === 9 && (
          <div className="flex justify-center">
            <p>No puede añadir mas de 9 pasajeros</p>
          </div>
        )}
      </div>

      {/* </List> */}
    </Dialog>
  );
}
interface PassengersBookingProps {
  setPassengers: React.Dispatch<React.SetStateAction<any>>;
}

const PassengersBooking = ({ setPassengers }: PassengersBookingProps) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<any>();
  // const totalSum = selectedValue.reduce(
  //   (total: any, section: any) => total + section.n,
  //   0
  // );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: any, sum: any) => {
    setOpen(false);
    setSelectedValue(sum);
    setPassengers(value);
  };

  return (
    <div className=" flex flex-col items-center justify-center">
      <Button
        variant="outlined"
        className="text-black"
        onClick={handleClickOpen}
      >
        {passengers.title} : {selectedValue}
      </Button>
      <SimpleDialog
        //selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};

export default PassengersBooking;
