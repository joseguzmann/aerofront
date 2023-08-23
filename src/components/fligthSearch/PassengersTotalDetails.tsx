import React from "react";
import { IFlights } from "../../interface/interface";

interface IProps {
  passengers: any;
  flight: IFlights;
}
const PassengersTotalDetails = ({ passengers, flight }: IProps) => {
  return (
    <div className="flex justify-center items-center my-10">
      <div className="flex flex-col bg-gray-300 p-3">
        <p>
          <b>DETAILS PASSENGERS</b>
        </p>
        {passengers &&
          passengers.map((res: any, i: number) => {
            if (res.n > 0) {
              return (
                <div className="flex justify-between py-1">
                  <p>
                    {res.n} {res.title} Total:
                  </p>
                  <p>
                    {" "}
                    {i === 0
                      ? (flight.precio / 2) * res.n
                      : i === 3
                      ? 0
                      : flight.precio * res.n}{" "}
                  </p>
                </div>
              );
            }
            return;
          })}
      </div>
    </div>
  );
};

export default PassengersTotalDetails;
