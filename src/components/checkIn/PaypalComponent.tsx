import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";

const PaypalComponent = () => {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AZkiI5VWma_Nnzii_mJ9gmX7pOI8YSqauhn35TNhN-E7hcDKUWj_WnS0O5w00n6wJfhGbtGcvTO96loO" ||
          "",
      }}
    >
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value:
                    //SandBox
                    // (subTotal.current - discount).toString(),
                    "0.01",
                  //LIVE
                  // "0.01",
                },
              },
            ],
          });
        }}
        onApprove={(data, actions: any) => {
          return actions.order.capture().then((details: any) => {
            if (details.status === "COMPLETED") {
              // handleBuyProducts(true);
              console.log("COMPLETED");
            }
            if (details.payer.name) {
              const name = details.payer.name.given_name;
              // alert(`Transaction completed by ${name}`);
              console.log(`Transaction completed by ${name}`);
            }
          });
        }}
        style={{
          layout: "horizontal",
          shape: "pill",
          color: "gold",
          tagline: false,
        }}
        onCancel={(data) => {
          console.log("ERROR PAYPAL: ");
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalComponent;
