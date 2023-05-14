const Doctor = require("../models/doctor");
const Patient = require("../models/Patient");

// All report with particular report
module.exports.status = async (req, res, next) => {
  try {
    
    const patient = await Patient.find({
      reports: { $elemMatch: { status: req.params.status } },
    });
    res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "could not able to fetch the reports",
    });
  }
};
