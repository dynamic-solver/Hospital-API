const express = require("express");
const router = express.Router();
const { status } = require("../controller/reports");
const { isAuthenticated } = require("../middlewares/auth");

// get All reports with status
router.get("/:status", isAuthenticated, status);

module.exports = router;
