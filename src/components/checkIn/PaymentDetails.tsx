import React from "react";
import { IFlights } from "../../interface/interface";
import CardFligth from "../fligthSearch/CardFligth";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PaypalComponent from "./PaypalComponent";

interface IProps {
  flight: IFlights;
}

const PaymentDetails = ({ flight }: IProps) => {
  return (
    <div className=" relative flex justify-center items-center mb-20 ">
      <div className=" items-center  w-[75%]   ">
        <CardFligth isDetails={true} key={flight.id} flight={flight} />
        <div className="flex row items-center justify-between bg-gray-500">
          <div> SUBTOTAL Y TODO COMPONENT MAYBE?</div>
          <div>
            <PaypalComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
