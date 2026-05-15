// server.js (or app.js)

import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { employeeApp } from "./APIs/EmployeeAPI.js";

dotenv.config();

const app = express();

/* ---------------- CORS CONFIG ---------------- */

const allowedOrigins = [
  "https://employee-app-alpha-ashen.vercel.app",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow REST tools like Postman (no origin)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
  })
);

// IMPORTANT: handle preflight requests properly
app.options("*", cors());

/* ---------------- MIDDLEWARE ---------------- */

app.use(express.json());
app.use(cookieParser());

/* ---------------- ROUTES ---------------- */

app.use("/employee-api", employeeApp);

/* ---------------- DB + SERVER ---------------- */

const port = process.env.PORT || 4000;

async function startServer() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB connection successful");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("DB connection error:", err);
  }
}

startServer();

/* ---------------- ERROR HANDLING ---------------- */

app.use((err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation Error",
      error: err.message
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID / Cast Error",
      error: err.message
    });
  }

  res.status(500).json({
    message: "Server Error",
    error: err.message
  });
});
