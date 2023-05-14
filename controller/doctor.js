const Doctor = require("../models/doctor");
const jwt = require("jsonwebtoken");
const Patient = require("../models/Patient");
const { sendCookie } = require("../utils/features");

// Doctor registration
module.exports.registerDoctor = async (req, res) => {
  try {
    const { name, password } = req.body;

    // finding doctor
    let doctor = await Doctor.findOne({ name: name });

    if (doctor) {
      return res.status(400).json({
        success: false,
        message: "Doctor already exist",
        doctor: doctor,
      });
    }

    // if doctor not available then create
    doctor = await Doctor.create({ name, password });

    // sending in cookie
    sendCookie(doctor, res, "Registered successfully..", 201);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Could not create the doctor due to internal server error",
    });
    next();
  }
};

// Doctor login
module.exports.login = async (req, res, next) => {
  try {
    const { name, password } = req.body;

    // finding doctor
    let doctor = await Doctor.findOne({ name: name }).select("+password");

    if (!doctor) {
      return res.status(401).json({
        success: false,
        message: "Invalid name/password",
      });
    }
    if (password != doctor.password) {
      return res.status(400).json({
        success: false,
        message: "Password or username not match",
      });
    }

    sendCookie(doctor, res, `Welcome ${doctor.name}`, 200);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    next();
  }
};
