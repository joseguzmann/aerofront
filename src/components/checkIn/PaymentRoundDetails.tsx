import React, { useState } from "react";
import { IRoundFlight } from "../../interface/interface";
import CardFligth from "../fligthSearch/CardFligth";
import CheckExtrasDetails from "./CheckExtrasDetails";
import PassengersTotalDetails from "../fligthSearch/PassengersTotalDetails";
import PaypalComponent from "./PaypalComponent";

interface IProps {
  flightRound: IRoundFlight;
  passengersInfo: any;
}
const PaymentRoundDetails = ({ flightRound, passengersInfo }: IProps) => {

  const [ticketTotal, setTicketTotal] = useState<number>(0);
  const [ticketTotalRound, setTicketTotalRound] = useState<number>(0);
  const [extrasTotal, setExtrastotal] = useState<number>(0);
  return (
    <div className=" relative flex justify-center items-center mb-20 ">
      <div className=" items-center  w-[75%]    ">
        {flightRound && (
          <>
            <CardFligth
              isDetails={true}
              key={flightRound.flightOrigin.id}
              flight={flightRound.flightOrigin}
            />
            <CardFligth
              isDetails={true}
              key={flightRound.flightDestiny.id}
              flight={flightRound.flightDestiny}
            />
            <PassengersTotalDetails
              passengers={flightRound.passengers}
              flight={flightRound.flightOrigin}
              isCheckIn={true}
              setTicketTotal={setTicketTotal}
            />
            <PassengersTotalDetails
              passengers={flightRound.passengers}
              flight={flightRound.flightDestiny}
              isCheckIn={true}
              setTicketTotal={setTicketTotalRound}
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
              <p>TICKETS TOTAL(Rounded-trip):</p>
              <p>
                <b>${ticketTotal + ticketTotalRound}</b>
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
                <b>${ticketTotal + ticketTotalRound + extrasTotal}</b>
              </p>
            </div>
          </div>
          <div className=" w-[50%]">
            <PaypalComponent
              value={ticketTotal + ticketTotalRound + extrasTotal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentRoundDetails;
