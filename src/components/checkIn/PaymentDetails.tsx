import React, { useEffect, useState } from "react";
import { IFlights } from "../../interface/interface";
import CardFligth from "../fligthSearch/CardFligth";
import PaypalComponent from "./PaypalComponent";
import PassengersTotalDetails from "../fligthSearch/PassengersTotalDetails";
import CheckExtrasDetails from "./CheckExtrasDetails";

interface IProps {
  flight: IFlights;
  passengersInfo: any;
}

const PaymentDetails = ({ flight, passengersInfo }: IProps) => {
  const [ticketTotal, setTicketTotal] = useState<number>(0);
  const [extrasTotal, setExtrastotal] = useState<number>(0);

  useEffect(() => {
    console.log("FLIGHTPAY: ", flight);
  }, []);
  return (
    <div className=" relative flex justify-center items-center mb-20 ">
      <div className=" items-center  w-[75%]    ">
        {flight && (
          <>
            <CardFligth isDetails={true} key={flight.id} flight={flight} />
            <PassengersTotalDetails
              passengers={flight.passengers}
              flight={flight}
              isCheckIn={true}
              setTicketTotal={setTicketTotal}
            />
            <CheckExtrasDetails
              passengersInfo={passengersInfo}
              setExtrastotal={setExtrastotal}
            />
          </>
        )}

        <div className="flex flex-col  items-center   ">
          <div className="my-9 flex flex-col  w-[50%]  ">
            <div className=" flex justify-between">
              <p>TICKETS TOTAL:</p>
              <p>
                <b>${ticketTotal}</b>
              </p>
            </div>
            <div className=" flex justify-between">
              <p>EXTRAS TOTAL:</p>
              <p>
                <b>${extrasTotal}</b>
              </p>
            </div>
            <div className=" flex justify-between">
              <p className="text-2xl">TOTAL:</p>
              <p className="text-2xl">
                <b>${ticketTotal + extrasTotal}</b>
              </p>
            </div>
          </div>
          <div className=" w-[50%]">
            <PaypalComponent value={ticketTotal + extrasTotal} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
