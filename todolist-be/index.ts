import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  fs.appendFile("logs.log", "Logging with middleware", () => {});
  next();
});
app.use("/todos", require("./routes/routes"));

const PORT: number = 5000;

async function start() {
  try {
    mongoose.connect(process.env.DB_CONNECTION!, () => {
      console.log("Connected to DB");
      fs.appendFile("logs.log", "Connected to DB", () => {});
    });
    app.listen(PORT, () => console.log(`starting on port ${PORT}`));
  } catch (e) {
    console.log("Server error", e.message);
    process.exit();
  }
}
start();
