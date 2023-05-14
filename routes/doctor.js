const express = require("express");
const { registerDoctor, login } = require("../controller/doctor");
const {isAuthenticated} = require("../middlewares/auth");

const router = express.Router();

router.post("/register", registerDoctor);

router.post("/login", login);

module.exports = router;
