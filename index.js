import express from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import dotenv from 'dotenv';

import paymentRoutes from "./routers/payment.routes.js";

dotenv.config();

var corsOptions = {
  origin: "*", // Reemplazar con dominio
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// import "./firebase.js";

const app = express();

app.use(cors(corsOptions));

app.use(morgan("dev"));

app.use(express.json());

app.use(paymentRoutes);

// app.use(express.static(path.resolve("src/public")));

app.listen(process.env.PORT || 3100);
console.log("Server on port", 3100);
