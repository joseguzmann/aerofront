const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", router);

app.listen(5000, () => console.log("SERVER RUNING"));

const contacEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aerofly.service555@gmail.com",
    pass: "kueqiloitxuzxbvj",
  },
});

contacEmail.verify((e) => {
  if (e) {
    console.log(e);
  } else {
    console.log("ready to send");
  }
});

router.post("/contact", (req, res) => {
  const {
    rounded,
    namePaypal,
    bookingId,
    destino,
    origen,
    duracion,
    duracionRound,
    fecha_salida,
    fecha_regreso,
    fecha_salidaRound,
    fecha_regresoRound,
    num_pasajeros,
    mail,
    nombre,
    ticketTotal,
    extrasToal,
    total,
  } = req.body;
  const mailFormatt = {
    from: "aerofly.service555@gmail.com",
    to: mail,
    subject: "Flight Booking Details",
    html: `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: white;
            border-radius: 15px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .info {
            margin-bottom: 10px;
            margin-top: 20px;
        
          }
          .bold {
            font-weight: bold;
          }
          .larger-text {
            font-size: 16px;
          }
          .total{
            border-radius: 15px;
            border: 2px solid #ccc;
            padding:5px
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
          ${
            rounded
              ? `<h1>Flight Round-trip Booking Details</h1>`
              : `<h1>Flight Booking Details</h1>`
          }
            
          </div>
          <div class="info">
            <p><span class="bold larger-text">Name:</span> ${nombre}</p>
            <p><span class="bold larger-text">Booking ID:</span> ${bookingId}</p>
            <p><span class="bold larger-text">Origin:</span> ${origen}</p>
            <p><span class="bold larger-text">Destination:</span> ${destino}</p>
            <p><span class="bold larger-text">Duration:</span> ${duracion}</p>
            ${
              duracionRound
                ? ` <p><span class="bold larger-text">Duration Round-trip:</span> ${duracionRound}</p>`
                : null
            }
            <p><span class="bold larger-text">Departure Date:</span> ${fecha_salida}</p>

            <p><span class="bold larger-text">Arrival Date:</span> ${fecha_regreso}</p>
            ${
              fecha_salidaRound
                ? ` <p><span class="bold larger-text">Departure Date Round-trip:</span> ${fecha_salidaRound}</p>`
                : null
            }
              ${
                fecha_regresoRound
                  ? ` <p><span class="bold larger-text">Arival Date Round-trip:</span> ${fecha_regresoRound}</p>`
                  : null
              }
            <p><span class="bold larger-text">Number of passengers :</span> ${num_pasajeros}</p>
          </div>
          <div class="total">
            <p><span class="bold larger-text">Subtotal Tickets:</span> ${ticketTotal}</p>
            <p><span class="bold larger-text">SubTotal Extras:</span> ${extrasToal}</p>
            <p><span class="bold larger-text">Total:</span> ${total}</p>
            <p><span class="bold larger-text">Payment Method:</span> Paid via PayPal by <b>${namePaypal}</b></p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  contacEmail.sendMail(mailFormatt, (error) => {
    if (error) {
      console.log("ERROR: ", error.message);
      res.json({ status: "Error" });
    } else {
      res.json({ status: "Message Send" });
    }
  });
});
