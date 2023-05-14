const jwt = require("jsonwebtoken");

module.exports.sendCookie = (doctor, res, message, statusCode = 200) => {
  // token generation
  const token = jwt.sign({ _id: doctor._id }, "jwtsecret");
  
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({
      success: true,
      message: message,
      token: token,
    });
};
