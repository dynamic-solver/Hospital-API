const Doctor = require("../models/doctor");
const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Login first",
      });
    }

    let decodedData;
    try {
      decodedData = jwt.verify(token, "jwtsecret");
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    if (!decodedData) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    // find user & saving in req
    req.user = await Doctor.findById(decodedData._id);
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
