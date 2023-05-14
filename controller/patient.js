const Doctor = require("../models/doctor");
const Patient = require("../models/Patient");
const jwt = require("jsonwebtoken");
const config = require("config");

// Patient Registration
module.exports.registerPatient = async (req, res, next) => {
  try {
    const { phone } = req.body;

    let patient = await Patient.findOne({ phone: req.body.phone });

    if (patient) {
      return res.status(400).json({
        success: false,
        message: "Patient already exist",
        data: patient,
      });
    }
    patient = await Patient.create({
      phone: phone,
      doctor: req.user,
    });
    res.status(200).json({
      success: true,
      message: "succesfully created the patient",
    });
  } catch (error) {
   
    res.status(500).json({
      success: false,
      message: "could not create a  patient, internal server error",
    });
  }
};

// Patient report creation
module.exports.createReport = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);

    req.body.date = Date.now();

    patient.reports.push(req.body);

    patient.save();

    res.status(200).json({
      success: true,
      message: "report submitted succesfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "could not created a  report, internal server error",
    });
  }
};

// All reports of a patient
module.exports.all_reports = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);

    res.status(200).json({
      success: true,
      reports: patient.reports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "could not able to fetch the patient reports",
    });
  }
};
