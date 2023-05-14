const express = require("express");

const {
  registerPatient,
  createReport,
  all_reports,
} = require("../controller/patient");

const {isAuthenticated} = require("../middlewares/auth");

const router = express.Router();

// patient registration
router.post("/register", isAuthenticated, registerPatient);

// patient create report
router.post("/:id/create_report", isAuthenticated, createReport);

// Patient all reports
router.get("/:id/all_reports", isAuthenticated, all_reports);

module.exports = router;
