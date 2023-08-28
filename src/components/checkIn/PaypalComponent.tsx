import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";
import { IFlights, IPassenger, IRoundFlight } from "../../interface/interface";
import { gmailSendEmail, gmailSendEmailRound } from "../gmail/GmailComponent";
import { ToastContainer, toast, Flip } from "react-toastify";

import { useRouter } from "next/router";

interface IProps {
  detailsFlightBuy?: {
    flight: IFlights;
    passengersInfo: any[];
    user: IPassenger;
    bookingId: string;
    princing: {
      ticketTotal: number;
      extrasTotal: number;
      total: number;
    };
  };
  detailsFlightBuyRound?: {
    flight: IRoundFlight;
    passengersInfo: any[];
    user: IPassenger;
    bookingId: string;
    princing: {
      ticketTotal: number;
      extrasTotal: number;
      total: number;
    };
  };
  value: number;
}
const PaypalComponent = ({
  value,
  detailsFlightBuy,
  detailsFlightBuyRound,
}: IProps) => {
  const router = useRouter();

  const SuccesToast = () => {
    toast.success("Buy complete!!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      onClose: () => {
        console.log("END TOAS");
        router.push({ pathname: "/" });
      },
    });
  };
  return (
    <>
      <ToastContainer
        draggablePercent={60}
        transition={Flip}
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <PayPalScriptProvider
        options={{
          clientId:
            "AZkiI5VWma_Nnzii_mJ9gmX7pOI8YSqauhn35TNhN-E7hcDKUWj_WnS0O5w00n6wJfhGbtGcvTO96loO" ||
            "",
        }}
      >
        <PayPalButtons
          createOrder={(data, actions) => {
            console.log("Data:", data);
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value:
                      //SandBox
                      // (subTotal.current - discount).toString(),
                      value.toString(),
                    //LIVE
                    // "0.01",
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions: any) => {
            console.log("Data:", data);
            return actions.order.capture().then((details: any) => {
              if (details.status === "COMPLETED") {
                if (details.payer.name) {
                  const name = details.payer.name.given_name;
                  if (detailsFlightBuy) {
                    gmailSendEmail(name, detailsFlightBuy);
                  }
                  if (detailsFlightBuyRound) {
                    gmailSendEmailRound(name, detailsFlightBuyRound);
                  }

                  console.log("NOTIFY");
                  SuccesToast();
                  // console.log(`Transaction completed by ${name}`);
                } else {
                  console.log("SENDINGMAIL NO NAME");
                  if (detailsFlightBuy) {
                    gmailSendEmail(null, detailsFlightBuy);
                  }
                  if (detailsFlightBuyRound) {
                    gmailSendEmailRound(null, detailsFlightBuyRound);
                  }
                  SuccesToast();
                }

                //  console.log("COMPLETED");
              }
            });
          }}
          style={{
            layout: "horizontal",
            shape: "pill",
            color: "gold",

            height: 55,
          }}
          onCancel={(data) => {
            console.log("Data:", data);
            console.log("ERROR PAYPAL: ");
          }}
        />
      </PayPalScriptProvider>
    </>
  );
};

export default PaypalComponent;
