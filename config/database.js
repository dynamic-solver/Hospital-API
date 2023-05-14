const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017");

const db = mongoose.connection;

db.error(
  "error",
  console.error.bind(console, "Error in connecting with mongodb..")
);

db.once("open", () => {
  console.log("Succesfully connected to mongo db..");
});

module.exports = db;
