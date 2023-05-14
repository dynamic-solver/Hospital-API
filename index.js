const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./config/database");
const dotenv = require("dotenv");

// Fetching routes
const doctorRouter = require("./routes/doctor");
const patientRouter = require("./routes/patient");
const reportRouter = require("./routes/report");

const app = express();
const PORT = 3000;

dotenv.config({ path: "./data/config.env" });

// using MW
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// using routes
app.use("/doctors", doctorRouter);
app.use("/patients", patientRouter);
app.use("/reports", reportRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`server is giving an error: ${err}`);
  } else {
    console.log(`server is succesfully up and running on port:${PORT}`);
  }
});
